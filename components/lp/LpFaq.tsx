"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { lpFaqs } from "@/content/lp";

export default function LpFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-[#F7F7F7] py-20 md:py-24">
      <div className="max-w-[800px] mx-auto px-5 lg:px-12">
        <div className="text-center mb-12">
          <span className="section-badge mb-4">Antes de decidir</span>
          <h2
            className="text-[30px] md:text-[38px] font-semibold leading-[1.2] text-[#183A51] mt-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            As dúvidas que sempre aparecem
          </h2>
        </div>

        <div className="bg-white rounded-2xl px-6 md:px-8 py-2 shadow-sm">
          {lpFaqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.q} className="border-b border-gray-100 last:border-0">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span
                    className="text-[16px] md:text-[17px] font-medium text-[#183A51]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {faq.q}
                  </span>
                  <span
                    className="shrink-0 w-7 h-7 rounded-full border-2 border-[#4CB794] flex items-center justify-center transition-transform duration-200"
                    style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#4CB794"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <p
                        className="text-[15px] md:text-[16px] leading-[1.75] text-[#69727D] pb-5 pr-10"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
