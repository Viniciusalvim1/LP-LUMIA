"use client";

import { motion } from "framer-motion";
import { chaosLines } from "@/content/story";

export default function PainSection() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Pain list */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge mb-5">Situação Atual</span>
            <h2
              className="text-[32px] md:text-[38px] font-semibold leading-[1.2] text-[#183A51] mt-4 mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Reconhece algum destes problemas?
            </h2>

            <ul className="flex flex-col gap-4">
              {chaosLines.map((line, i) => (
                <motion.li
                  key={line}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <div className="mt-1 shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </div>
                  <span
                    className="text-[17px] text-[#1D1D1D] leading-[1.5]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {line}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Answer */}
          <motion.div
            className="flex-1 bg-[#183A51] rounded-2xl p-10 text-white"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="w-12 h-12 rounded-full bg-[#4CB794]/20 flex items-center justify-center mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4CB794" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 2C8.5 2 6 5 6 8.5c0 3 1.8 5.5 4.5 6.5L9 22h6l-1.5-7C16.2 14 18 11.5 18 8.5 18 5 15.5 2 12 2z" />
              </svg>
            </div>
            <h3
              className="text-[24px] font-semibold leading-[1.3] mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              E se cada problema tivesse uma resposta?
            </h3>
            <p
              className="text-[16px] leading-[1.7] text-white/70 mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              O Lumia foi construído para eliminar exatamente esses problemas — um módulo dedicado para cada dor da sua clínica, integrado em um só lugar.
            </p>
            <ul className="flex flex-col gap-3">
              {[
                "Agendamento automatizado com confirmação",
                "Funil de vendas que não deixa leads esfriar",
                "Financeiro transparente em tempo real",
                "Campanhas de marketing com 1 clique",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="shrink-0 w-5 h-5 rounded-full bg-[#4CB794] flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span
                    className="text-[15px] text-white/80"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <a
              href="#cta"
              className="inline-block mt-8 bg-[#4CB794] hover:bg-[#3da882] text-[#183A51] font-semibold text-[15px] px-8 py-3.5 rounded-[5px] transition-colors duration-200 cursor-pointer"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Quero resolver esses problemas
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
