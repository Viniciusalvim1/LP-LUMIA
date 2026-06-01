"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { storyBeats } from "@/content/story";

const TAB_LABELS: Record<string, string> = {
  contatos:   "Contatos",
  agenda:     "Agenda",
  ia:         "IA",
  vendas:     "Funil de Vendas",
  financeiro: "Financeiro",
  marketing:  "Marketing",
  relatorios: "Relatórios",
};

// Mapeia o id do beat (LP) para o id da feature na página /funcionalidades.
// Ids sem correspondência caem na página sem âncora.
const FEATURE_ANCHOR: Record<string, string> = {
  contatos:   "clientes360",
  agenda:     "agenda",
  vendas:     "funil",
  financeiro: "financeiro",
  marketing:  "marketing",
  relatorios: "relatorios",
};

// Gradiente de fundo do mockup — varia por feature
const GRADIENTS: Record<string, string> = {
  contatos:   "linear-gradient(135deg, #0a1e2e 0%, #183A51 50%, #1a6a8a 100%)",
  agenda:     "linear-gradient(135deg, #0f2a1a 0%, #183A51 45%, #1a7a5a 100%)",
  ia:         "linear-gradient(135deg, #1a0a2e 0%, #2a1a51 45%, #4a3a8a 100%)",
  vendas:     "linear-gradient(135deg, #1a1a0a 0%, #3a3a18 45%, #5a5a1a 100%)",
  financeiro: "linear-gradient(135deg, #0a1e1a 0%, #183A34 45%, #1a6a5a 100%)",
  marketing:  "linear-gradient(135deg, #1a0a1a 0%, #3a1834 45%, #6a1a5a 100%)",
  relatorios: "linear-gradient(135deg, #0a1a2e 0%, #183A51 50%, #2a6a9a 100%)",
};

export default function FeaturesSection() {
  const [active, setActive] = useState(storyBeats[0].id);
  const beat = storyBeats.find((b) => b.id === active)!;

  return (
    <section id="funcionalidades" className="bg-white py-20">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-12">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="section-badge mb-4">Funcionalidades</span>
          <h2
            className="text-[32px] md:text-[38px] font-semibold leading-[1.2] text-[#183A51] mt-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            O software definitivo para simplificar a gestão da sua clínica
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {storyBeats.map((b) => (
            <button
              key={b.id}
              onClick={() => setActive(b.id)}
              className="px-4 py-1.5 rounded-[18px] border-2 border-[#4CB794] text-[14px] font-medium cursor-pointer transition-all duration-200"
              style={{
                fontFamily: "var(--font-display)",
                backgroundColor: active === b.id ? "#4CB794" : "transparent",
                color: "#183A51",
              }}
            >
              {TAB_LABELS[b.id]}
            </button>
          ))}
        </div>

        {/* Content: texto esq + mockup dir */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
          >
            {/* ── Texto ── */}
            <div className="flex-1 flex flex-col min-w-0">
              <span className="section-badge self-start mb-5">
                {beat.eyebrow}
              </span>

              <h3
                className="text-[28px] md:text-[34px] font-semibold leading-[1.2] text-[#183A51] mb-5"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {beat.headline}
              </h3>

              <p
                className="text-[17px] leading-[1.75] text-[#69727D] mb-8"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {beat.body}
              </p>

              <a
                href={FEATURE_ANCHOR[beat.id] ? `/funcionalidades#${FEATURE_ANCHOR[beat.id]}` : "/funcionalidades"}
                className="self-start inline-flex items-center gap-2 text-[14px] font-semibold px-6 py-3 rounded-[6px] transition-colors duration-200 cursor-pointer"
                style={{
                  fontFamily: "var(--font-display)",
                  background: "#4CB794",
                  color: "#fff",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#3da882"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#4CB794"; }}
              >
                Conhecer funcionalidade
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>

            {/* ── Mockup ── */}
            <div className="w-full lg:w-[580px] shrink-0">
              {/* Container com gradiente de fundo */}
              <div
                className="rounded-2xl p-4"
                style={{
                  background: GRADIENTS[beat.id],
                  boxShadow: "0 28px 64px rgba(24,58,81,0.22), 0 4px 16px rgba(0,0,0,0.12)",
                }}
              >
                {/* Janela do browser */}
                <div
                  className="rounded-xl overflow-hidden"
                  style={{
                    boxShadow: "0 4px 32px rgba(0,0,0,0.28)",
                  }}
                >
                  {/* Barra macOS */}
                  <div
                    className="flex items-center gap-2 px-4 py-2.5"
                    style={{
                      background: "#EBEBEB",
                      borderBottom: "1px solid #D0D0D0",
                    }}
                  >
                    <div className="flex items-center gap-1.5 shrink-0">
                      <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                      <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                      <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                    </div>
                    <div
                      className="flex-1 mx-3 h-5 rounded flex items-center px-2"
                      style={{ background: "#DCDCDC" }}
                    >
                      <span
                        className="text-[10px] text-gray-500 truncate"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        app.lumiacrm.com.br/{beat.videoKey}
                      </span>
                    </div>
                  </div>

                  {/* Vídeo da funcionalidade */}
                  <div className="relative w-full aspect-video bg-gray-100">
                    <video
                      key={beat.videoKey}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover block"
                      poster={`/videos/${beat.videoKey}-poster.jpg`}
                    >
                      <source src={`/videos/${beat.videoKey}.webm`} type="video/webm" />
                      <source src={`/videos/${beat.videoKey}.mp4`} type="video/mp4" />
                    </video>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
