"use client";

import { motion } from "framer-motion";
import { lpGuaranteeItems } from "@/content/lp";

export default function LpGuarantee() {
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="max-w-[900px] mx-auto px-5 lg:px-12">
        <div className="text-center mb-12">
          <span className="section-badge mb-4">Risco zero</span>
          <h2
            className="text-[30px] md:text-[38px] font-semibold leading-[1.2] text-[#183A51] mt-4 max-w-[640px] mx-auto"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Quem tem que provar valor somos nós
          </h2>
          <p
            className="text-[16px] md:text-[17px] leading-[1.7] text-[#69727D] mt-4 max-w-[580px] mx-auto"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Você já foi enrolado por contrato de 12 meses antes. Aqui não tem
            nenhum dos ganchos que te fizeram desconfiar.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {lpGuaranteeItems.map((item, i) => (
            <motion.div
              key={item.title}
              className="rounded-2xl p-7 border border-gray-100 bg-[#F7F7F7]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
            >
              <span className="inline-flex w-11 h-11 rounded-xl bg-[#4CB794]/15 items-center justify-center mb-5">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4CB794"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              </span>
              <h3
                className="text-[18px] font-semibold text-[#183A51] leading-[1.3] mb-2.5"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {item.title}
              </h3>
              <p
                className="text-[15px] leading-[1.65] text-[#69727D]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
