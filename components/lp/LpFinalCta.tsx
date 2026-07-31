"use client";

import { motion } from "framer-motion";
import Starfield from "../Starfield";
import ShootingStars from "../ShootingStars";
import LpCta from "./LpCta";
import LpDemoCta from "./LpDemoCta";

const STEPS = [
  { n: "1", label: "Você cria a conta", detail: "Leva menos de um minuto, sem cartão." },
  { n: "2", label: "A gente configura junto", detail: "Serviços, pacotes, equipe e agenda." },
  { n: "3", label: "A clínica roda", detail: "Em até 48 horas, com a base migrada." },
];

export default function LpFinalCta() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: "#183A51" }}>
      <Starfield count={120} seed={3} />
      <ShootingStars />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(76,183,148,0.12)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-[900px] mx-auto px-5 lg:px-12 py-20 md:py-28 text-center">
        <motion.h2
          className="text-[32px] md:text-[44px] font-bold leading-[1.15] text-white mb-5"
          style={{ fontFamily: "var(--font-display)" }}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          Amanhã a sua clínica vai ter o mesmo dia de hoje.{" "}
          <span className="headline-highlight">A menos que algo mude.</span>
        </motion.h2>

        <motion.p
          className="text-[17px] md:text-[18px] leading-[1.7] text-white/60 max-w-[600px] mx-auto mb-10"
          style={{ fontFamily: "var(--font-display)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          São 14 dias grátis, sem cartão e sem compromisso. Se em duas semanas
          a Lumia não tiver mostrado onde está o seu dinheiro, você simplesmente
          não continua.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18, duration: 0.5 }}
        >
          <LpCta location="cta-final" size="lg" />
          <LpDemoCta location="cta-final" onDark />
        </motion.div>

        <motion.ol
          className="grid sm:grid-cols-3 gap-6 sm:gap-4 mt-16 pt-12 border-t border-white/10 text-left"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.24, duration: 0.5 }}
        >
          {STEPS.map((step) => (
            <li key={step.n} className="flex sm:flex-col items-start gap-4 sm:gap-3">
              <span
                className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-[15px] font-bold"
                style={{
                  fontFamily: "var(--font-display)",
                  background: "rgba(76,183,148,0.18)",
                  color: "#6ef5d0",
                  border: "1px solid rgba(110,245,208,0.35)",
                }}
              >
                {step.n}
              </span>
              <div>
                <p
                  className="text-[16px] font-semibold text-white mb-1"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {step.label}
                </p>
                <p
                  className="text-[14px] leading-[1.6] text-white/45"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {step.detail}
                </p>
              </div>
            </li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
