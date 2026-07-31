"use client";

import { motion } from "framer-motion";
import Starfield from "../Starfield";
import { lpMetrics } from "@/content/lp";

/**
 * Prova em números para a LP. Diferente do MetricsSection do site, que
 * conta de 0 e só anima ao entrar na viewport (e chega a exibir 0 no
 * HTML servido), aqui o valor final já está no markup desde o load —
 * animação é enriquecimento, não requisito. Cada número traz a origem.
 */
export default function LpProof() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: "#183A51" }}>
      <Starfield count={140} seed={4} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(76,183,148,0.08)_0%,transparent_55%)] pointer-events-none" />

      <div className="relative z-10 max-w-[1000px] mx-auto px-5 lg:px-12 py-20 md:py-24">
        <motion.h2
          className="text-center text-[28px] md:text-[36px] font-semibold leading-[1.2] text-white mb-14"
          style={{ fontFamily: "var(--font-display)" }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          {lpMetrics.headline}
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10 md:gap-6">
          {lpMetrics.items.map((item, i) => (
            <motion.div
              key={item.label}
              className="text-center px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
            >
              <p
                className="text-[52px] md:text-[60px] font-bold leading-none mb-2"
                style={{
                  fontFamily: "var(--font-display)",
                  background: "linear-gradient(90deg, #4CB794, #6ef5d0)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {item.value}
              </p>
              <p
                className="text-[18px] font-semibold text-white mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {item.label}
              </p>
              <p
                className="text-[13px] leading-[1.55] text-white/45 max-w-[240px] mx-auto"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {item.source}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
