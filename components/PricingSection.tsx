"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Starfield from "./Starfield";

// ── Frase que se forma no scroll ─────────────────────────────────
type Token = { text: string; hl?: boolean };
const SENTENCE: Token[] = [
  { text: "Tudo" }, { text: "que" }, { text: "sua" }, { text: "clínica" },
  { text: "precisa" }, { text: "para" }, { text: "crescer", hl: true },
  { text: "—" }, { text: "em" }, { text: "um", hl: true }, { text: "só", hl: true }, { text: "lugar", hl: true },
  { text: "—" }, { text: "por" }, { text: "um" }, { text: "valor" }, { text: "que" },
  { text: "cabe", hl: true }, { text: "no", hl: true }, { text: "seu", hl: true }, { text: "bolso", hl: true }, { text: "." },
];

function Word({
  token, index, total, progress,
}: {
  token: Token; index: number; total: number; progress: MotionValue<number>;
}) {
  // cada palavra acende numa fatia do progresso do scroll
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(progress, [start, end], [0.12, 1]);
  const y = useTransform(progress, [start, end], [8, 0]);

  return (
    <motion.span style={{ opacity, y }} className="inline-block mr-[0.28em]">
      {token.hl ? <span className="headline-highlight">{token.text}</span> : token.text}
    </motion.span>
  );
}

// ── Card com revelação por lanterna de luz ───────────────────────
const PLAN = {
  name: "Lumia Completo",
  price: "349,90",
  period: "/mês",
  note: "por unidade · sem fidelidade",
  features: [
    "Agenda, CRM, vendas e financeiro",
    "Atendimento com assinatura digital",
    "Marketing e automações de WhatsApp",
    "IA nativa: cria, responde e analisa",
    "Relatórios e indicadores em tempo real",
    "Suporte humano todos os dias",
  ],
};

function RevealCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [spot, setSpot] = useState<{ x: number; y: number } | null>(null);

  // prefers-reduced-motion → revela direto
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
    }
  }, []);

  function move(clientX: number, clientY: number) {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    setSpot({ x: clientX - r.left, y: clientY - r.top });
  }

  const mask = spot
    ? `radial-gradient(circle 150px at ${spot.x}px ${spot.y}px, transparent 0%, transparent 38%, rgba(0,0,0,0.85) 70%, #000 100%)`
    : undefined;

  return (
    <div className="relative w-full max-w-[420px] mx-auto">
      {/* glow ambiente */}
      <div className="absolute -inset-6 bg-[radial-gradient(ellipse_at_center,rgba(76,183,148,0.18)_0%,transparent_70%)] blur-xl pointer-events-none" />

      <div
        ref={cardRef}
        className="relative rounded-3xl overflow-hidden border border-white/12"
        style={{ background: "rgba(255,255,255,0.04)", minHeight: 520 }}
        onMouseMove={(e) => !revealed && move(e.clientX, e.clientY)}
        onMouseLeave={() => !revealed && (setSpot(null), setRevealed(true))}
        onTouchMove={(e) => {
          if (revealed) return;
          const t = e.touches[0];
          move(t.clientX, t.clientY);
        }}
        onTouchEnd={() => !revealed && setRevealed(true)}
      >
        {/* ── Conteúdo do plano (sempre no DOM) ── */}
        <div className="relative z-10 p-8 flex flex-col items-center text-center">
          <span
            className="inline-block bg-[#4CB794]/20 text-[#4CB794] text-[13px] font-medium px-4 py-1.5 rounded-full mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Plano único
          </span>

          <h3
            className="text-[22px] font-semibold text-white mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {PLAN.name}
          </h3>

          <div className="flex items-end justify-center gap-1 mb-1">
            <span className="text-[20px] text-white/60 mb-2" style={{ fontFamily: "var(--font-display)" }}>R$</span>
            <span
              className="text-[56px] font-bold leading-none"
              style={{
                fontFamily: "var(--font-display)",
                background: "linear-gradient(90deg, #4CB794, #6ef5d0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {PLAN.price}
            </span>
            <span className="text-[18px] text-white/60 mb-2" style={{ fontFamily: "var(--font-display)" }}>{PLAN.period}</span>
          </div>
          <p className="text-[13px] text-white/40 mb-7" style={{ fontFamily: "var(--font-display)" }}>{PLAN.note}</p>

          <ul className="flex flex-col gap-3 w-full mb-8 text-left">
            {PLAN.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-[#4CB794] flex items-center justify-center shrink-0">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="text-[15px] text-white/75 leading-snug" style={{ fontFamily: "var(--font-display)" }}>{f}</span>
              </li>
            ))}
          </ul>

          <a
            href="https://app.lumiaclin.com.br/#login"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center text-[15px] font-semibold py-4 rounded-[10px] cursor-pointer transition-all duration-200"
            style={{ fontFamily: "var(--font-display)", background: "#4CB794", color: "#fff", boxShadow: "0 4px 20px rgba(76,183,148,0.4)" }}
          >
            Começar trial gratuito →
          </a>
        </div>

        {/* ── Cobertura (céu noturno) com furo de luz ── */}
        <AnimatePresence>
          {!revealed && (
            <motion.div
              className="absolute inset-0 z-20 flex flex-col items-center justify-center cursor-pointer select-none"
              style={{
                background: "linear-gradient(160deg, #0a1a28 0%, #102a3e 100%)",
                maskImage: mask,
                WebkitMaskImage: mask,
              }}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Starfield count={70} seed={11} />
              {/* lua */}
              <svg className="relative w-12 h-12 text-white/30 mb-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C8.5 2 6 5 6 8.5c0 3 1.8 5.5 4.5 6.5L9 22h6l-1.5-7C16.2 14 18 11.5 18 8.5 18 5 15.5 2 12 2z" />
              </svg>
              <p className="relative text-white/70 text-[15px] font-medium" style={{ fontFamily: "var(--font-display)" }}>
                Passe o mouse para revelar
              </p>
              <p className="relative text-white/35 text-[13px] mt-1" style={{ fontFamily: "var(--font-display)" }}>
                no celular, arraste o dedo
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Fallback acessível */}
      {!revealed && (
        <button
          onClick={() => setRevealed(true)}
          className="mt-4 mx-auto block text-[13px] text-white/45 hover:text-white/80 underline underline-offset-4 transition-colors cursor-pointer"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Ver valor
        </button>
      )}
    </div>
  );
}

// ── Seção ────────────────────────────────────────────────────────
export default function PricingSection() {
  const sentenceRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sentenceRef,
    offset: ["start 0.85", "end 0.55"],
  });

  return (
    <section id="planos" className="relative bg-[#183A51] py-24 overflow-hidden">
      <Starfield count={130} seed={10} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(76,183,148,0.08)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-[1100px] mx-auto px-5 lg:px-12">
        <div className="text-center mb-4">
          <span
            className="inline-block bg-[#4CB794]/20 text-[#4CB794] text-[14px] font-medium px-4 py-1.5 rounded-full"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Planos
          </span>
        </div>

        {/* Frase que se forma no scroll */}
        <div ref={sentenceRef} className="max-w-[820px] mx-auto text-center mb-16">
          <p
            className="text-[26px] md:text-[36px] font-semibold leading-[1.35] text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {SENTENCE.map((tok, i) => (
              <Word key={i} token={tok} index={i} total={SENTENCE.length} progress={scrollYProgress} />
            ))}
          </p>
        </div>

        {/* Card revelável */}
        <RevealCard />
      </div>
    </section>
  );
}
