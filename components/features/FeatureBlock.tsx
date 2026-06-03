"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { FeatureContent } from "@/content/features";
import { featureIcons } from "./featureIcons";

interface Props {
  feature: FeatureContent;
  index: number;
}

export default function FeatureBlock({ feature }: Props) {
  const [showData, setShowData] = useState(false);

  return (
    <section
      id={feature.id}
      className="scroll-mt-28 py-12 md:py-16 border-b border-gray-100 last:border-0"
    >
      {/* Cabeçalho */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="w-11 h-11 rounded-xl bg-[#4CB794]/12 flex items-center justify-center text-[#4CB794] shrink-0">
            <span className="w-6 h-6">{featureIcons[feature.id]}</span>
          </span>
          <h2
            className="text-[24px] md:text-[32px] font-semibold text-[#183A51]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {feature.name}
          </h2>
        </div>
        <p
          className="text-[16px] md:text-[18px] leading-[1.7] text-[#69727D] max-w-[820px]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {feature.description}
        </p>
      </motion.div>

      {/* Preview grande no topo */}
      <motion.div
        className="mt-7 mb-9"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <div
          className="rounded-2xl p-2.5 md:p-3"
          style={{
            background: "linear-gradient(135deg, #183A51 0%, #1673A3 100%)",
            boxShadow: "0 24px 56px rgba(24,58,81,0.20)",
          }}
        >
          <div className="rounded-xl overflow-hidden bg-[#0d1a28]">
            {/* barra browser */}
            <div className="flex items-center gap-1.5 px-3 md:px-4 py-2 md:py-2.5 bg-[#EBEBEB]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
              <div className="flex-1 mx-2 md:mx-3 h-5 rounded bg-[#DCDCDC] hidden sm:flex items-center px-2">
                <span className="text-[10px] text-gray-500 truncate" style={{ fontFamily: "var(--font-display)" }}>
                  app.lumiaclin.com.br/{feature.id}
                </span>
              </div>
            </div>
            {(feature.videoUrl || feature.videoKey) ? (
              <div className="relative w-full aspect-video bg-gray-100">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="none"
                  className="absolute inset-0 w-full h-full object-cover"
                  poster={feature.videoUrl ? undefined : `/videos/${feature.videoKey}-poster.jpg`}
                >
                  {feature.videoUrl ? (
                    <source src={feature.videoUrl} type="video/mp4" />
                  ) : (
                    <>
                      <source src={`/videos/${feature.videoKey}.webm`} type="video/webm" />
                      <source src={`/videos/${feature.videoKey}.mp4`} type="video/mp4" />
                    </>
                  )}
                </video>
              </div>
            ) : (
              <div className="relative w-full aspect-video bg-[#183A51]/10 flex items-center justify-center">
                <span className="w-12 h-12 text-white/25">{featureIcons[feature.id]}</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Conteúdo embaixo — 2 colunas no desktop */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
      >
        {/* Coluna esquerda: o que você pode fazer */}
        <div>
          <h3
            className="text-[13px] font-semibold uppercase tracking-wider text-[#1673A3] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            O que você pode fazer
          </h3>
          <ul className="grid grid-cols-1 gap-2.5">
            {feature.canDo.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-0.5 w-4 h-4 rounded-full bg-[#4CB794] flex items-center justify-center shrink-0">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span
                  className="text-[15px] leading-[1.55] text-[#3a4754]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Coluna direita: automático + por que importa */}
        <div className="flex flex-col gap-6">
          {feature.automatic && (
            <div className="rounded-xl p-5 bg-[#4CB794]/8 border border-[#4CB794]/20">
              <h3
                className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wider text-[#2ea882] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                Acontece automaticamente
              </h3>
              <ul className="flex flex-col gap-2">
                {feature.automatic.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#4CB794] shrink-0" />
                    <span
                      className="text-[15px] leading-[1.55] text-[#3a4754]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="border-l-2 border-[#1673A3] pl-5">
            <h3
              className="text-[13px] font-semibold uppercase tracking-wider text-[#1673A3] mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Por que isso importa
            </h3>
            <p
              className="text-[15px] leading-[1.7] text-[#69727D]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {feature.whyMatters}
            </p>
          </div>

          {/* Dados gerenciados (recolhível) */}
          {feature.dataManaged && (
            <div>
              <button
                onClick={() => setShowData((v) => !v)}
                className="flex items-center gap-1.5 text-[13px] font-medium text-[#69727D] hover:text-[#183A51] transition-colors cursor-pointer"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <svg
                  width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transform: showData ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}
                  aria-hidden="true"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
                Ver dados gerenciados
              </button>
              {showData && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-3 flex flex-col gap-1.5 overflow-hidden"
                >
                  {feature.dataManaged.map((item) => (
                    <li
                      key={item}
                      className="text-[13px] leading-[1.5] text-[#8a94a0] pl-5"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      • {item}
                    </li>
                  ))}
                </motion.ul>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
