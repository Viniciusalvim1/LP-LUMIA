"use client";

import { motion } from "framer-motion";
import { storyBeats } from "@/content/story";

const highlights = storyBeats.slice(0, 3);

const icons: Record<string, React.ReactNode> = {
  contatos: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  agenda: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  ia: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
};

export default function FeatureHighlights() {
  return (
    <section className="bg-[#F7F7F7] py-20">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-12">
        <div className="text-center mb-12">
          <span className="section-badge mb-4">Destaques</span>
          <h2
            className="text-[32px] md:text-[38px] font-semibold leading-[1.2] text-[#183A51] mt-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Funcionalidades que fazem a diferença no dia a dia
          </h2>
        </div>

        <div className="flex flex-col gap-12">
          {highlights.map((beat, i) => (
            <motion.div
              key={beat.id}
              className={`flex flex-col ${i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-10 items-center`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {/* Text */}
              <div className="flex-1">
                <div className="text-[#4CB794] mb-4">{icons[beat.id]}</div>
                <span
                  className="text-[13px] font-semibold text-[#1673A3] uppercase tracking-wider mb-3 block"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {beat.eyebrow}
                </span>
                <h3
                  className="text-[26px] font-semibold text-[#183A51] leading-[1.3] mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {beat.headline}
                </h3>
                <p
                  className="text-[17px] leading-[1.7] text-[#69727D]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {beat.body}
                </p>
              </div>

              {/* Visual placeholder */}
              <div className="flex-1 w-full">
                <div className="w-full aspect-video rounded-2xl bg-[#183A51]/6 border border-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-[#4CB794]/60 flex justify-center mb-2">{icons[beat.id]}</div>
                    <p className="text-[13px] text-gray-400" style={{ fontFamily: "var(--font-display)" }}>
                      Screenshot em breve
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
