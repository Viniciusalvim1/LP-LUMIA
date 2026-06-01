"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type Transition } from "framer-motion";
import Starfield from "./Starfield";
import ShootingStars from "./ShootingStars";

// ── Frases com segmentos destacados ──────────────────────────────
type Seg = { text: string; h: boolean };
type Phrase = Seg[];

const PHRASES: Phrase[] = [
  [
    { text: "Acabe com a ", h: false },
    { text: "ineficiência da sua agenda", h: true },
    { text: " clínica.", h: false },
  ],
  [
    { text: "Transforme a ", h: false },
    { text: "gestão da sua clínica", h: true },
    { text: " estética.", h: false },
  ],
  [
    { text: "Multiplique os ", h: false },
    { text: "retornos dos seus pacientes", h: true },
    { text: ".", h: false },
  ],
  [
    { text: "Destrave o ", h: false },
    { text: "potencial da sua clínica", h: true },
    { text: " de estética.", h: false },
  ],
  [
    { text: "Organize a operação da sua clínica ", h: false },
    { text: "em um só lugar", h: true },
    { text: ".", h: false },
  ],
  [
    { text: "Aumente a ", h: false },
    { text: "performance da sua equipe", h: true },
    { text: " de atendimento.", h: false },
  ],
  [
    { text: "Transforme ", h: false },
    { text: "sessões pendentes", h: true },
    { text: " em novas oportunidades.", h: false },
  ],
  [
    { text: "Controle a ", h: false },
    { text: "jornada completa", h: true },
    { text: " do seu paciente.", h: false },
  ],
  [
    { text: "Centralize ", h: false },
    { text: "agenda, vendas e financeiro", h: true },
    { text: " com a Lumia.", h: false },
  ],
  [
    { text: "Eleve a ", h: false },
    { text: "eficiência da sua clínica", h: true },
    { text: " todos os dias.", h: false },
  ],
];

// Achata a frase em array de {char, h}
function flatChars(phrase: Phrase) {
  return phrase.flatMap((seg) =>
    seg.text.split("").map((char) => ({ char, h: seg.h }))
  );
}

const FLAT_PHRASES = PHRASES.map(flatChars);

const TYPE_SPEED  = 35;   // ms por caractere digitando
const ERASE_SPEED = 16;   // ms por caractere apagando
const HOLD_TIME   = 2600; // ms de pausa após digitar
const GAP_TIME    = 200;  // ms de pausa antes de começar a próxima frase

type Phase = "typing" | "holding" | "erasing";

// Agrupa chars consecutivos com mesmo valor de `h` para que o
// gradiente se aplique a toda a palavra, não caractere por caractere.
function groupChars(chars: Array<{ char: string; h: boolean }>) {
  const groups: Array<{ text: string; h: boolean }> = [];
  for (const c of chars) {
    const last = groups[groups.length - 1];
    if (last && last.h === c.h) {
      last.text += c.char;
    } else {
      groups.push({ text: c.char, h: c.h });
    }
  }
  return groups;
}

// ── Componente de typewriter ──────────────────────────────────────
function RotatingHeadline() {
  const [idx, setIdx]         = useState(0);
  const [visible, setVisible] = useState(0);
  const [phase, setPhase]     = useState<Phase>("typing");
  const timerRef              = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const chars = FLAT_PHRASES[idx];
    if (timerRef.current) clearTimeout(timerRef.current);

    if (phase === "typing") {
      if (visible < chars.length) {
        timerRef.current = setTimeout(() => setVisible((v) => v + 1), TYPE_SPEED);
      } else {
        // Transição imediata para "holding" — evita hold duplo
        timerRef.current = setTimeout(() => setPhase("holding"), 60);
      }
    } else if (phase === "holding") {
      timerRef.current = setTimeout(() => setPhase("erasing"), HOLD_TIME);
    } else if (phase === "erasing") {
      if (visible > 0) {
        timerRef.current = setTimeout(() => setVisible((v) => v - 1), ERASE_SPEED);
      } else {
        timerRef.current = setTimeout(() => {
          setIdx((i) => (i + 1) % PHRASES.length);
          setPhase("typing");
        }, GAP_TIME);
      }
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [phase, visible, idx]);

  const shown  = groupChars(FLAT_PHRASES[idx].slice(0, visible));
  const typing = phase === "typing" || phase === "erasing";

  return (
    <span aria-live="polite" aria-atomic="true">
      {shown.map((g, i) =>
        g.h ? (
          <span key={i} className="headline-highlight">{g.text}</span>
        ) : (
          <span key={i}>{g.text}</span>
        )
      )}
      {typing && <span className="cursor-blink" aria-hidden="true" />}
    </span>
  );
}

// ── Hero ─────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.65, ease: "easeOut" } as Transition,
});

export default function Hero() {
  return (
    <section
      className="relative min-h-[820px] overflow-hidden"
      style={{ backgroundColor: "#183A51" }}
    >
      {/* Fundo */}
      <Starfield count={150} seed={1} />
      <ShootingStars />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_60%,rgba(76,183,148,0.09)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_30%,rgba(22,115,163,0.08)_0%,transparent_55%)] pointer-events-none" />

      {/* ── Copy (metade esquerda) ─────────────────────────────── */}
      <div className="relative z-10 flex items-center min-h-[820px] pt-[96px] pb-16">
        <div className="w-full max-w-[1200px] mx-auto px-5 lg:px-12">
          <div className="w-full lg:max-w-[500px]">

            <motion.p
              className="text-[13px] font-semibold tracking-wider text-[#4CB794] uppercase mb-5"
              style={{ fontFamily: "var(--font-display)" }}
              {...fadeUp(0.1)}
            >
              ✦ Software para clínicas de laser, emagrecimento e estética avançada
            </motion.p>

            <motion.h1
              className="text-[38px] md:text-[50px] lg:text-[52px] font-bold leading-[1.12] tracking-[-0.02em] text-white mb-6 min-h-[2.4em]"
              style={{ fontFamily: "var(--font-display)" }}
              {...fadeUp(0.2)}
            >
              <RotatingHeadline />
            </motion.h1>

            <motion.p
              className="text-[16px] leading-[1.7] text-white/60 mb-9"
              style={{ fontFamily: "var(--font-display)" }}
              {...fadeUp(0.3)}
            >
              Agenda, sessões, financeiro e IA em um só lugar. Em 2 horas você sabe o que lucra, quem vai sumir e o que realmente vale a pena — sem planilha, sem papel.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row gap-3 mb-6" {...fadeUp(0.4)}>
              <a
                href="#cta"
                className="inline-flex items-center justify-center text-[15px] font-semibold px-7 py-4 rounded-[8px] transition-all duration-200 cursor-pointer"
                style={{
                  fontFamily: "var(--font-display)",
                  background: "#4CB794",
                  color: "#fff",
                  boxShadow: "0 4px 20px rgba(76,183,148,0.40)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "#3da882";
                  el.style.boxShadow = "0 6px 28px rgba(76,183,148,0.55)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "#4CB794";
                  el.style.boxShadow = "0 4px 20px rgba(76,183,148,0.40)";
                }}
              >
                Começar trial gratuito →
              </a>

              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 text-[15px] font-semibold px-7 py-4 rounded-[8px] border transition-all duration-200 cursor-pointer"
                style={{
                  fontFamily: "var(--font-display)",
                  background: "rgba(255,255,255,0.06)",
                  borderColor: "rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.85)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(255,255,255,0.10)";
                  el.style.borderColor = "rgba(255,255,255,0.25)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(255,255,255,0.06)";
                  el.style.borderColor = "rgba(255,255,255,0.15)";
                }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
                Falar com especialista no WhatsApp
              </a>
            </motion.div>

            <motion.p
              className="text-[13px] text-white/35"
              style={{ fontFamily: "var(--font-display)" }}
              {...fadeUp(0.5)}
            >
              Sem cartão · Setup em 2 horas · Suporte humano incluso
            </motion.p>

          </div>
        </div>
      </div>

      {/* ── Video mockup — encostado na borda direita ─────────── */}
      <motion.div
        className="hidden lg:block absolute z-20 pointer-events-none"
        style={{
          right: 0,
          top: "88px",
          bottom: "56px",
          width: "min(620px, 46vw)",
        }}
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.9, ease: "easeOut" } as Transition}
      >
        {/* Frame — só canto superior esquerdo arredondado; bottom e right clipam pela section */}
        <div
          className="h-full flex flex-col"
          style={{
            borderRadius: "14px 0 0 14px",
            border: "1px solid rgba(255,255,255,0.18)",
            borderRight: "none",
            background: "rgba(15,25,40,0.95)",
            boxShadow:
              "-28px 0 90px rgba(0,0,0,0.55), -4px 0 20px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.10)",
            overflow: "hidden",
          }}
        >
          {/* Barra do browser */}
          <div
            className="flex items-center gap-3 px-5 py-3.5 shrink-0"
            style={{
              background: "rgba(255,255,255,0.04)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28C840]" />
            </div>
            <div
              className="flex-1 h-6 rounded-md flex items-center px-3 mx-2"
              style={{ background: "rgba(255,255,255,0.07)" }}
            >
              <span
                className="text-[11px] text-white/35"
                style={{ fontFamily: "var(--font-display)" }}
              >
                app.lumiacrm.com.br/dashboard
              </span>
            </div>
          </div>

          {/* Vídeo — preenche toda a altura restante */}
          <div className="flex-1 relative" style={{ background: "#0d1a28" }}>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover object-left-top block"
              poster="/videos/dashboard-poster.jpg"
            >
              <source src="/videos/dashboard.webm" type="video/webm" />
              <source src="/videos/dashboard.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </motion.div>

    </section>
  );
}
