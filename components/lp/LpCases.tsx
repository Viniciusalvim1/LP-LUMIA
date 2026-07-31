"use client";

import { motion } from "framer-motion";
import { lpCases } from "@/content/lp";

/**
 * ⚠️ NÃO USAR EM PRODUÇÃO ATÉ TER DADOS REAIS.
 * Os números de resultado vêm de content/lp.ts como placeholders
 * ("00"). Publicar resultado de cliente que não aconteceu é
 * depoimento falso. Só importe esta seção na page.tsx depois de
 * substituir os valores por dados reais e verificáveis de clínicas
 * parceiras. Ver o bloco de aviso em content/lp.ts → lpCases.
 */
export default function LpCases() {
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="max-w-[1100px] mx-auto px-5 lg:px-12">
        <div className="text-center mb-12">
          <span className="section-badge mb-4">Resultados reais</span>
          <h2
            className="text-[30px] md:text-[38px] font-bold leading-[1.18] text-[#183A51] mt-4 max-w-[640px] mx-auto"
            style={{ fontFamily: "var(--font-display)" }}
          >
            O antes e o depois de três clínicas
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {lpCases.map((c, i) => (
            <motion.div
              key={c.segment}
              className="rounded-2xl border border-gray-100 bg-[#F7F7F7] p-7 flex flex-col"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
            >
              <p
                className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#4CB794] mb-5"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {c.segment}
              </p>

              <div className="mb-4">
                <p
                  className="text-[11px] font-bold uppercase tracking-wider text-[#ef4444] mb-1.5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Antes
                </p>
                <p
                  className="text-[15px] leading-[1.6] text-[#69727D]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {c.before}
                </p>
              </div>

              <div className="mb-6">
                <p
                  className="text-[11px] font-bold uppercase tracking-wider text-[#4CB794] mb-1.5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Depois
                </p>
                <p
                  className="text-[15px] leading-[1.6] text-[#1D1D1D]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {c.after}
                </p>
              </div>

              <div className="mt-auto pt-5 border-t border-gray-200">
                <p
                  className="text-[34px] font-bold leading-none text-[#183A51] tabular-nums"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {c.metric}
                </p>
                <p
                  className="text-[14px] text-[#69727D] mt-1.5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {c.metricLabel}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
