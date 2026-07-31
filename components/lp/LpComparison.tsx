"use client";

import { motion } from "framer-motion";
import {
  lpComparisonColumns,
  lpComparisonColumnsShort,
  lpComparisonRows,
  type LpCompareCell,
} from "@/content/lp";

function Cell({ value }: { value: LpCompareCell }) {
  if (value === true) {
    return (
      <span
        className="inline-flex w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#4CB794] items-center justify-center"
        role="img"
        aria-label="Sim"
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
    );
  }

  if (value === "parcial") {
    return (
      <span
        className="inline-flex w-5 h-5 md:w-6 md:h-6 rounded-full bg-amber-100 items-center justify-center"
        role="img"
        aria-label="Parcialmente"
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="3.5" strokeLinecap="round" aria-hidden="true">
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </span>
    );
  }

  return (
    <span
      className="inline-flex w-5 h-5 md:w-6 md:h-6 rounded-full bg-gray-100 items-center justify-center"
      role="img"
      aria-label="Não"
    >
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="3.5" strokeLinecap="round" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </span>
  );
}

export default function LpComparison() {
  const cols = lpComparisonColumns;
  const colsShort = lpComparisonColumnsShort;

  return (
    <section className="bg-white py-20 md:py-24">
      <div className="max-w-[980px] mx-auto px-5 lg:px-12">
        <div className="text-center mb-4">
          <span className="section-badge mb-4">Comparativo honesto</span>
          <h2
            className="text-[30px] md:text-[38px] font-semibold leading-[1.2] text-[#183A51] mt-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Por que trocar o que você já usa
          </h2>
          <p
            className="text-[16px] md:text-[17px] leading-[1.7] text-[#69727D] mt-4 max-w-[620px] mx-auto"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Planilha não avisa, não cobra e não lembra por você. E sistema
            genérico não foi desenhado para pacote, sessão e protocolo.
          </p>
        </div>

        {/* Tabela única, compacta o bastante para caber no mobile sem
            scroll lateral: cabeçalhos curtos abaixo de md, completos
            acima; ícones e fontes reduzem no celular. */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <table className="w-full border-collapse table-fixed">
            <colgroup>
              <col className="w-[46%] md:w-[40%]" />
              <col className="w-[18%] md:w-[20%]" />
              <col className="w-[18%] md:w-[20%]" />
              <col className="w-[18%] md:w-[20%]" />
            </colgroup>
            <thead>
              <tr>
                <th />
                {cols.map((col, i) => {
                  const isLumia = i === cols.length - 1;
                  return (
                    <th
                      key={col}
                      scope="col"
                      className="px-1.5 md:px-4 py-3 md:py-4 text-center align-bottom"
                      style={{
                        fontFamily: "var(--font-display)",
                        background: isLumia ? "#183A51" : "transparent",
                        color: isLumia ? "#ffffff" : "#69727D",
                        borderRadius: isLumia ? "12px 12px 0 0" : undefined,
                        fontWeight: isLumia ? 700 : 500,
                      }}
                    >
                      {/* Curto no mobile, completo no desktop */}
                      <span className="md:hidden text-[12px] leading-tight">{colsShort[i]}</span>
                      <span className="hidden md:block text-[14px] leading-tight" style={{ fontSize: isLumia ? 17 : 14 }}>
                        {col}
                      </span>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {lpComparisonRows.map((row, rowIndex) => {
                const isLast = rowIndex === lpComparisonRows.length - 1;
                return (
                  <tr key={row.label} className="border-t border-gray-100">
                    <th
                      scope="row"
                      className="py-3.5 md:py-4 pr-2 md:pr-4 text-left text-[13px] md:text-[15px] font-medium text-[#1D1D1D] leading-snug"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {row.label}
                    </th>
                    {row.values.map((value, i) => {
                      const isLumia = i === row.values.length - 1;
                      return (
                        <td
                          key={i}
                          className="px-1 md:px-4 py-3.5 md:py-4 text-center"
                          style={{
                            background: isLumia ? "rgba(76,183,148,0.07)" : undefined,
                            borderRadius: isLumia && isLast ? "0 0 12px 12px" : undefined,
                          }}
                        >
                          <Cell value={value} />
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>

        <p
          className="text-[12px] md:text-[13px] text-[#69727D] text-center mt-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-300 align-middle mr-1.5" />
          Traço amarelo = existe, mas só pela metade ou como módulo pago à parte.
        </p>
      </div>
    </section>
  );
}
