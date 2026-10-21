"use client";

import { useEffect } from "react";

/**
 * Programa de Afiliados Lumia: quem chega por lumiaclin.com.br/?ref=<codigo>
 * fica com o código guardado por 90 dias (o prazo de atribuição do
 * regulamento). Ao clicar em qualquer link de cadastro do app, o código vai
 * junto como #signup?ref=<codigo>. Quem valida o código é o banco do app.
 *
 * Delegação de clique em vez de reescrever os links: pega também os menus
 * que só aparecem depois (navbar no celular) sem tocar em cada componente.
 */
const CHAVE = "lumia_ref_afiliado";
const VALIDADE_MS = 90 * 24 * 60 * 60 * 1000;
const CODIGO = /^[a-z0-9]{3,24}$/;

function refGuardado(): string | null {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE) || "null");
    if (salvo?.ref && CODIGO.test(salvo.ref) && Date.now() - salvo.em < VALIDADE_MS) return salvo.ref;
  } catch {
    /* storage bloqueado */
  }
  return null;
}

export default function RefAfiliado() {
  useEffect(() => {
    const daUrl = (new URLSearchParams(window.location.search).get("ref") || "").trim().toLowerCase();
    if (CODIGO.test(daUrl)) {
      try {
        // Primeira indicação válida: um link novo não sobrescreve outro ainda no prazo.
        if (!refGuardado()) localStorage.setItem(CHAVE, JSON.stringify({ ref: daUrl, em: Date.now() }));
      } catch {
        /* storage bloqueado: segue sem guardar */
      }
    }

    const aoClicar = (ev: MouseEvent) => {
      const a = (ev.target as HTMLElement | null)?.closest?.("a");
      if (!a || !a.href.includes("app.lumiaclin.com.br/#signup")) return;
      const ref = refGuardado() || (CODIGO.test(daUrl) ? daUrl : null);
      if (!ref || a.href.includes("ref=")) return;
      a.href = a.href + (a.href.includes("#signup?") ? "&" : "?") + "ref=" + encodeURIComponent(ref);
    };
    document.addEventListener("click", aoClicar, true);
    return () => document.removeEventListener("click", aoClicar, true);
  }, []);

  return null;
}
