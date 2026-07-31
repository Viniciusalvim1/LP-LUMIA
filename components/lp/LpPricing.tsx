"use client";

import { motion } from "framer-motion";
import Starfield from "../Starfield";
import LpCta from "./LpCta";
import LpDemoCta from "./LpDemoCta";
import { track } from "@/lib/analytics";

const FEATURES = [
  "Agenda com confirmação automática por WhatsApp",
  "Pacientes, pacotes e sessões em um cadastro só",
  "Funil de vendas e contrato com assinatura digital",
  "Financeiro com lucro por procedimento",
  "Campanhas e automações de WhatsApp",
  "IA nativa: cria, responde e analisa",
  "Relatórios e indicadores em tempo real",
  "Implantação, migração e treinamento inclusos",
  "Usuários ilimitados — sem cobrança por pessoa",
  "Suporte humano todos os dias",
];

export default function LpPricing() {
  return (
    <section
      id="planos"
      className="relative overflow-hidden scroll-mt-[92px]"
      style={{ backgroundColor: "#183A51" }}
    >
      <Starfield count={150} seed={10} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(76,183,148,0.09)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-[1000px] mx-auto px-5 lg:px-12 py-20 md:py-24">
        <div className="text-center mb-12">
          <span
            className="inline-block bg-[#4CB794]/20 text-[#4CB794] text-[14px] font-medium px-4 py-1.5 rounded-full mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Investimento
          </span>
          <h2
            className="text-[30px] md:text-[40px] font-semibold leading-[1.18] text-white max-w-[680px] mx-auto"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Lumia Completo por R$ 349,90 por mês
          </h2>
          <p
            className="text-[16px] md:text-[17px] leading-[1.7] text-white/55 mt-5 max-w-[560px] mx-auto"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Por unidade. Sem fidelidade, sem taxa de setup e com usuários
            ilimitados. Um preço só — o que você vê é o que você paga.
          </p>
        </div>

        <motion.div
          className="relative max-w-[520px] mx-auto"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          onViewportEnter={() => track("view_pricing", { location: "lp" })}
        >
          <div className="absolute -inset-6 bg-[radial-gradient(ellipse_at_center,rgba(76,183,148,0.20)_0%,transparent_70%)] blur-xl pointer-events-none" />

          <div
            className="relative rounded-3xl overflow-hidden border border-white/12"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            <div className="p-8 md:p-10 flex flex-col items-center text-center">
              <span
                className="inline-block bg-[#4CB794]/20 text-[#4CB794] text-[13px] font-medium px-4 py-1.5 rounded-full mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Lumia Completo
              </span>

              <div className="flex items-end justify-center gap-1 mb-2 mt-1">
                <span
                  className="text-[20px] text-white/60 mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  R$
                </span>
                <span
                  className="text-[58px] font-bold leading-none"
                  style={{
                    fontFamily: "var(--font-display)",
                    background: "linear-gradient(90deg, #4CB794, #6ef5d0)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  349,90
                </span>
                <span
                  className="text-[18px] text-white/60 mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  /mês
                </span>
              </div>

              <p
                className="text-[13px] text-white/45 mb-8"
                style={{ fontFamily: "var(--font-display)" }}
              >
                por unidade · sem fidelidade · cancele quando quiser
              </p>

              <ul className="flex flex-col gap-3 w-full mb-8 text-left">
                {FEATURES.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-[#4CB794] flex items-center justify-center shrink-0">
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span
                      className="text-[15px] text-white/80 leading-snug"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <LpCta location="pricing" full size="lg" />
              <LpDemoCta location="pricing" onDark className="w-full mt-3" />

              <p
                className="text-[12px] text-white/35 mt-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                14 dias grátis · sem cartão de crédito
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
