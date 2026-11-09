"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";

/**
 * Rastreio de canais (painel "Canais" do Lumia HQ).
 *
 * Registra no banco do app, de forma anônima, cada página vista e cada clique
 * em "criar conta" ou no WhatsApp, com a origem da sessão (UTM, clique de
 * anúncio, site de onde veio). Sem nome, e-mail ou IP: só um código aleatório
 * do navegador (cookie lumia_vid) e outro da sessão.
 *
 * O cookie lumia_origem guarda a última origem que não foi acesso direto, por
 * 90 dias, no domínio .lumiaclin.com.br: o cadastro no app lê e grava em
 * clinicas.aquisicao. Mesma lógica de src/utils/rastreioSite.js do app.
 */

const URL_BANCO = process.env.NEXT_PUBLIC_SUPABASE_URL;
const CHAVE = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const CLICK_IDS = ["gclid", "gbraid", "wbraid", "fbclid", "ttclid", "msclkid", "oppref"];
const UTMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
const BOT = /bot|crawl|spider|slurp|headless|lighthouse|preview|facebookexternalhit|whatsapp/i;
const INTERNO_RE = /(^|\.)lumiaclin\.com\.br$/;
// O próprio endereço também é interno (vale em localhost e prévias).
const interna = (host: string) => INTERNO_RE.test(host) || host === location.hostname;

type Origem = Partial<Record<string, string>>;

// document.referrer não muda na navegação interna do Next: só vale na 1ª carga.
let primeiraCarga = true;

function dominio() {
  return INTERNO_RE.test(location.hostname) ? "; domain=.lumiaclin.com.br" : "";
}
function lerCookie(nome: string) {
  const m = document.cookie.match(new RegExp("(?:^|; )" + nome + "=([^;]*)"));
  return m ? decodeURIComponent(m[1]) : null;
}
function gravarCookie(nome: string, valor: string, dias: number) {
  document.cookie = `${nome}=${encodeURIComponent(valor)}; max-age=${dias * 86400}; path=/; SameSite=Lax${dominio()}${
    location.protocol === "https:" ? "; Secure" : ""
  }`;
}
function idAleatorio() {
  const b = new Uint8Array(12);
  crypto.getRandomValues(b);
  return Array.from(b, (x) => x.toString(36).padStart(2, "0")).join("").slice(0, 20);
}
function visitante() {
  let v = lerCookie("lumia_vid");
  if (!v || !/^[A-Za-z0-9_-]{8,40}$/.test(v)) v = idAleatorio();
  gravarCookie("lumia_vid", v, 400);
  return v;
}
function origemGuardada(): Origem | null {
  try {
    return JSON.parse(lerCookie("lumia_origem") || "null");
  } catch {
    return null;
  }
}

/** Origem trazida por esta entrada no site, ou null se for acesso direto/interno. */
function toqueAtual(): Origem | null {
  const q = new URLSearchParams(location.search);
  const t: Origem = {};
  UTMS.forEach((k) => {
    const v = (q.get(k) || "").slice(0, 150);
    if (v) t[k] = v;
  });
  const click = CLICK_IDS.find((k) => q.get(k));
  if (click) t.click_id = click;
  else if (/^[a-z0-9]{3,24}$/i.test(q.get("ref") || "")) t.click_id = "ref";
  let host = "";
  try {
    host = primeiraCarga && document.referrer ? new URL(document.referrer).hostname.toLowerCase() : "";
  } catch {
    /* nada */
  }
  if (host && !interna(host)) t.referrer_host = host.slice(0, 120);
  if (!Object.keys(t).length) return null;
  t.caminho = location.pathname.slice(0, 300);
  t.tocado_em = new Date().toISOString();
  return t;
}

type Sessao = { id: string; visto: number; origem: Origem };

function sessao(toque: Origem | null): Sessao {
  try {
    const s: Sessao | null = JSON.parse(sessionStorage.getItem("lumia_sessao") || "null");
    if (s && Date.now() - s.visto < 30 * 60 * 1000 && !toque) {
      s.visto = Date.now();
      sessionStorage.setItem("lumia_sessao", JSON.stringify(s));
      return s;
    }
  } catch {
    /* nada */
  }
  let interno = !primeiraCarga;
  try {
    if (primeiraCarga) interno = interna(new URL(document.referrer).hostname);
  } catch {
    /* nada */
  }
  const s: Sessao = { id: idAleatorio(), visto: Date.now(), origem: toque || (interno ? origemGuardada() : null) || {} };
  try {
    sessionStorage.setItem("lumia_sessao", JSON.stringify(s));
  } catch {
    /* nada */
  }
  return s;
}

function enviar(evento: "page_view" | "cta_cadastro" | "cta_whatsapp", caminho: string, rotulo: string | null, s: Sessao) {
  if (!URL_BANCO || !CHAVE) return;
  const o = s.origem || {};
  const p = {
    visitante: visitante(),
    sessao: s.id,
    evento,
    site: "lp",
    caminho,
    rotulo,
    referrer_host: o.referrer_host || null,
    click_id: o.click_id || null,
    utm_source: o.utm_source || null,
    utm_medium: o.utm_medium || null,
    utm_campaign: o.utm_campaign || null,
    utm_content: o.utm_content || null,
    utm_term: o.utm_term || null,
    dispositivo: matchMedia("(max-width: 768px)").matches ? "mobile" : "desktop",
  };
  fetch(`${URL_BANCO}/rest/v1/rpc/site_registrar`, {
    method: "POST",
    keepalive: true, // o clique no link pode sair da página antes da resposta
    headers: { "Content-Type": "application/json", apikey: CHAVE, Authorization: `Bearer ${CHAVE}` },
    body: JSON.stringify({ p }),
  }).catch(() => {});
}

function pular() {
  return BOT.test(navigator.userAgent) || (navigator as Navigator & { webdriver?: boolean }).webdriver === true;
}

export default function RastreioSite() {
  const caminho = usePathname();

  // Uma visita por página (inclusive navegação interna do Next).
  useEffect(() => {
    if (pular()) return;
    try {
      const toque = toqueAtual();
      if (toque) gravarCookie("lumia_origem", JSON.stringify(toque), 90);
      const s = sessao(toque);
      primeiraCarga = false;
      enviar("page_view", caminho || "/", null, s);
    } catch {
      /* rastreio nunca atrapalha o site */
    }
  }, [caminho]);

  // Cliques em "criar conta" (links para o cadastro do app) e no WhatsApp.
  useEffect(() => {
    if (pular()) return;
    const aoClicar = (ev: MouseEvent) => {
      try {
        const a = (ev.target as HTMLElement | null)?.closest?.("a");
        if (!a?.href) return;
        const tipo = a.href.includes("app.lumiaclin.com.br") && a.href.includes("#signup")
          ? "cta_cadastro"
          : /(wa\.me|api\.whatsapp\.com|whatsapp\.com\/send)/.test(a.href)
            ? "cta_whatsapp"
            : null;
        if (!tipo) return;
        const local = a.getAttribute("data-local");
        const rotulo = (local || a.textContent || "").trim().slice(0, 60) || null;
        enviar(tipo, location.pathname, rotulo, sessao(null));
        // Google e Meta (via GTM) recebem o clique de QUALQUER botão de cadastro
        // ou WhatsApp, não só dos que chamavam track() por conta própria.
        const onde = local || (a.closest("footer") ? "rodape" : a.closest("nav, header") ? "menu" : location.pathname);
        track(tipo === "cta_cadastro" ? "trial_click" : "whatsapp_click", { location: onde.slice(0, 60) });
      } catch {
        /* nada */
      }
    };
    document.addEventListener("click", aoClicar, true);
    return () => document.removeEventListener("click", aoClicar, true);
  }, []);

  return null;
}
