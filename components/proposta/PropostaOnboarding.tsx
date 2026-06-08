"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const steps = [
  {
    title: "Reunião de onboarding",
    body: "Marcamos uma reunião para entender seu cenário, seus processos e seus objetivos — tudo para personalizar a plataforma à realidade da sua clínica.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    title: "Configurações e cadastros",
    body: "Nossa equipe configura a plataforma e cadastra seus serviços, pacotes, profissionais e horários. Você já começa com tudo pronto para operar.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9"/>
      </svg>
    ),
  },
  {
    title: "Migração dos seus dados",
    body: "Importamos seus contatos, histórico de clientes e agenda para o Lumia. A transição é feita junto com um especialista, sem perder nenhum dado.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/>
      </svg>
    ),
  },
  {
    title: "Acesso ao Lumia Academy",
    body: "Sua equipe ganha acesso a treinamentos completos em vídeo para dominar cada módulo — todos saem usando a plataforma com confiança desde o início.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
  },
  {
    title: "Monitoramento contínuo",
    body: "Acompanhamos seus primeiros resultados de perto, ajustamos configurações e garantimos que a plataforma evolua junto com o crescimento da clínica.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
      </svg>
    ),
  },
  {
    title: "Suporte todos os dias",
    body: "Suporte humano disponível todos os dias, com resposta rápida via chat e WhatsApp. Você nunca fica sozinho — estamos ao seu lado o tempo todo.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
      </svg>
    ),
  },
];

export default function PropostaOnboarding() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 65%"],
  });

  const trailHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActiveIndex(p <= 0 ? -1 : Math.min(steps.length - 1, Math.floor(p * steps.length)));
  });

  return (
    <section id="onboarding" className="relative bg-[#183A51] py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(76,183,148,0.08)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-[1100px] mx-auto px-5 lg:px-12">
        <div className="text-center mb-16">
          <span
            className="inline-block bg-[#4CB794]/20 text-[#4CB794] text-[13px] font-medium px-4 py-1.5 rounded-full mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Implantação &amp; Onboarding
          </span>
          <h2
            className="text-[28px] md:text-[40px] font-bold leading-[1.15] text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            A gente implementa{" "}
            <span style={{ background: "linear-gradient(90deg,#4CB794,#6ef5d0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              com você
            </span>
          </h2>
          <p
            className="text-[16px] leading-[1.7] text-white/60 max-w-[520px] mx-auto"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Você não fica sozinho. Nosso time te acompanha do primeiro acesso até os primeiros resultados.
          </p>
        </div>

        <div ref={containerRef} className="relative">
          {/* Linha base */}
          <div className="absolute top-0 bottom-0 left-[27px] lg:left-1/2 w-px -translate-x-1/2 bg-white/10" />

          {/* Trilha luminosa */}
          <motion.div
            className="absolute top-0 left-[27px] lg:left-1/2 w-px -translate-x-1/2 origin-top"
            style={{
              height: trailHeight,
              background: "linear-gradient(to bottom, transparent, #4CB794 30%, #6ef5d0)",
              boxShadow: "0 0 8px rgba(110,245,208,0.6)",
            }}
          >
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
              <div className="w-3 h-3 rounded-full bg-white" style={{ boxShadow: "0 0 8px 2px rgba(255,255,255,0.9), 0 0 20px 6px rgba(110,245,208,0.7)" }} />
            </div>
          </motion.div>

          <div className="flex flex-col gap-10 lg:gap-14">
            {steps.map((step, i) => {
              const isActive = i <= activeIndex;
              const onLeft = i % 2 === 0;
              return (
                <div key={step.title} className="relative pl-[68px] lg:pl-0 lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
                  {/* Nó */}
                  <div className="absolute left-[27px] lg:left-1/2 top-0 lg:top-1/2 -translate-x-1/2 lg:-translate-y-1/2 z-10">
                    <div
                      className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-[14px] font-bold transition-all duration-500"
                      style={{
                        fontFamily: "var(--font-display)",
                        background: isActive ? "#4CB794" : "rgba(255,255,255,0.08)",
                        color: isActive ? "#0d2a1e" : "rgba(255,255,255,0.45)",
                        border: `1px solid ${isActive ? "#6ef5d0" : "rgba(255,255,255,0.15)"}`,
                        boxShadow: isActive ? "0 0 16px rgba(110,245,208,0.55)" : "none",
                      }}
                    >
                      {i + 1}
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <motion.div
                    className={onLeft ? "lg:col-start-1 lg:text-right lg:pr-4" : "lg:col-start-2 lg:pl-4"}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className={`inline-flex items-center gap-3 mb-3 ${onLeft ? "lg:flex-row-reverse" : ""}`}>
                      <span
                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500"
                        style={{
                          background: isActive ? "rgba(76,183,148,0.18)" : "rgba(255,255,255,0.05)",
                          color: isActive ? "#6ef5d0" : "rgba(255,255,255,0.5)",
                        }}
                      >
                        <span className="w-6 h-6">{step.icon}</span>
                      </span>
                      <h3 className="text-[18px] font-semibold text-white" style={{ fontFamily: "var(--font-display)" }}>
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-[15px] leading-[1.65] text-white/55" style={{ fontFamily: "var(--font-display)" }}>
                      {step.body}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
