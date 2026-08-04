"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Starfield from "./Starfield";
import { track } from "@/lib/analytics";

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
  // cada palavra acende numa fatia do progresso do scroll (a frase só
  // completa conforme o usuário rola)
  const start = 0.05 + (index / total) * 0.8;
  const end = start + 0.8 / total;
  const opacity = useTransform(progress, [start, end], [0.1, 1]);
  const y = useTransform(progress, [start, end], [10, 0]);

  return (
    <motion.span style={{ opacity, y }} className="inline-block mr-[0.28em]">
      {token.hl ? <span className="headline-highlight">{token.text}</span> : token.text}
    </motion.span>
  );
}

// ── Plano ────────────────────────────────────────────────────────
const PLAN = {
  name: "Lumia Completo",
  pricePrefix: "A partir de",
  price: "349,90",
  period: "/mês",
  note: "Trial gratuito de 14 dias · Sem fidelidade · Cancele quando quiser",
  features: [
    "Agenda, CRM, vendas e financeiro",
    "Atendimento com assinatura digital",
    "Marketing e automações de WhatsApp",
    "IA nativa: cria, responde e analisa",
    "Relatórios e indicadores em tempo real",
    "Suporte humano todos os dias",
  ],
};

function PlanCard() {
  return (
    <div className="relative w-full max-w-[420px] mx-auto">
      {/* glow ambiente */}
      <div className="absolute -inset-6 bg-[radial-gradient(ellipse_at_center,rgba(76,183,148,0.18)_0%,transparent_70%)] blur-xl pointer-events-none" />

      <div
        className="relative rounded-3xl overflow-hidden border border-white/12"
        style={{ background: "rgba(255,255,255,0.04)" }}
      >
        <div className="relative z-10 p-8 flex flex-col items-center text-center">
          <span
            className="inline-block bg-[#4CB794]/20 text-[#4CB794] text-[13px] font-medium px-4 py-1.5 rounded-full mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Planos a partir de R$ 349,90
          </span>

          <h3
            className="text-[22px] font-semibold text-white mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {PLAN.name}
          </h3>

          <span className="text-[14px] text-white/50 mb-1" style={{ fontFamily: "var(--font-display)" }}>
            {PLAN.pricePrefix}
          </span>

          <div className="flex items-end justify-center gap-1 mb-2">
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
          <p className="text-[13px] text-white/45 mb-7 leading-relaxed" style={{ fontFamily: "var(--font-display)" }}>{PLAN.note}</p>

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
            href="https://app.lumiaclin.com.br/#signup"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("trial_click", { location: "planos" })}
            className="w-full text-center text-[15px] font-semibold py-4 rounded-[10px] cursor-pointer transition-all duration-200"
            style={{ fontFamily: "var(--font-display)", background: "#4CB794", color: "#fff", boxShadow: "0 4px 20px rgba(76,183,148,0.4)" }}
          >
            Começar trial gratuito →
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Seção ────────────────────────────────────────────────────────
export default function PricingSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  // Indicador "role para baixo" some depois que a frase termina de formar
  const hintOpacity = useTransform(scrollYProgress, [0, 0.7, 0.9], [1, 1, 0]);

  return (
    <section id="planos" className="relative bg-[#183A51]">
      <Starfield count={150} seed={10} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(76,183,148,0.07)_0%,transparent_60%)] pointer-events-none" />

      {/* ── Bloco 1: frase sticky que se completa com o scroll ── */}
      <div ref={scrollRef} className="relative" style={{ height: "180vh" }}>
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-5 lg:px-12">
          <span
            className="inline-block bg-[#4CB794]/20 text-[#4CB794] text-[14px] font-medium px-4 py-1.5 rounded-full mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Planos
          </span>

          <p
            className="max-w-[860px] text-center text-[28px] md:text-[40px] font-semibold leading-[1.35] text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {SENTENCE.map((tok, i) => (
              <Word key={i} token={tok} index={i} total={SENTENCE.length} progress={scrollYProgress} />
            ))}
          </p>

          {/* indicador de scroll */}
          <motion.div
            className="absolute bottom-10 flex flex-col items-center gap-2"
            style={{ opacity: hintOpacity }}
          >
            <span className="text-[12px] text-white/40 tracking-widest uppercase" style={{ fontFamily: "var(--font-display)" }}>
              Role para baixo
            </span>
            <motion.div
              className="w-5 h-8 rounded-full border border-white/25 flex justify-center pt-1.5"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-1 h-2 rounded-full bg-[#4CB794]" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Bloco 2: card do plano ── */}
      <div className="relative pb-28 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          onViewportEnter={() => track("view_pricing")}
        >
          <PlanCard />
        </motion.div>
      </div>
    </section>
  );
}
