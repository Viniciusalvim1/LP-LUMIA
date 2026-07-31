"use client";

import { motion, type Transition } from "framer-motion";
import Starfield from "../Starfield";
import ShootingStars from "../ShootingStars";
import LpCta from "./LpCta";
import LpDemoCta from "./LpDemoCta";
import LpDevices from "./LpDevices";
import LpAvatars from "./LpAvatars";
import { lpHero } from "@/content/lp";

// Só opacity na entrada — movimento vertical no hero gera CLS e
// derruba o LCP, que é justamente o que o tráfego pago paga caro.
const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { delay, duration: 0.5, ease: "easeOut" } as Transition,
});

export default function LpHero() {
  return (
    <section
      className="relative overflow-hidden min-h-[100svh] flex flex-col"
      style={{ backgroundColor: "#183A51" }}
    >
      <Starfield count={60} seed={1} />
      <ShootingStars />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(76,183,148,0.11)_0%,transparent_58%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_70%,rgba(22,115,163,0.10)_0%,transparent_55%)] pointer-events-none" />

      {/* Mobile: coluna única centralizada, ancorada no topo (o pill da
          navbar termina por volta de 76px, daí o pt-[84px]).
          Desktop: duas colunas, copy à esquerda e mockup à direita,
          com o conjunto centrado na vertical. */}
      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-5 lg:px-12 pt-[84px] pb-10 md:pb-16 flex-1 lg:flex lg:items-center">
        <div className="w-full grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] gap-10 lg:gap-12 items-center">
          {/* ── Copy ── */}
          <div className="text-center lg:text-left">
            {/* Selo de segmento */}
            <motion.p
              className="inline-flex items-center gap-2 text-[11px] md:text-[12px] font-semibold tracking-wider text-[#4CB794] uppercase px-4 py-1.5 rounded-full mb-5"
              style={{
                fontFamily: "var(--font-display)",
                background: "rgba(76,183,148,0.12)",
                border: "1px solid rgba(76,183,148,0.25)",
              }}
              {...fadeIn(0.05)}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#4CB794] shrink-0" />
              {lpHero.badge}
            </motion.p>

            {/* Avatares + prova, entre o selo e a promessa */}
            <motion.div className="mb-6" {...fadeIn(0.1)}>
              <LpAvatars label={lpHero.proof} />
            </motion.div>

            <motion.h1
              className="text-[31px] sm:text-[40px] md:text-[48px] font-bold leading-[1.1] tracking-[-0.02em] text-white"
              style={{ fontFamily: "var(--font-display)" }}
              {...fadeIn(0.14)}
            >
              {lpHero.headline.before}
              <span className="headline-highlight">{lpHero.headline.highlight}</span>
              {lpHero.headline.after}
            </motion.h1>

            <motion.p
              className="text-[15px] md:text-[17px] leading-[1.65] text-white/60 mt-5 max-w-[620px] mx-auto lg:mx-0"
              style={{ fontFamily: "var(--font-display)" }}
              {...fadeIn(0.2)}
            >
              {lpHero.subheadline}
            </motion.p>

            <motion.div className="mt-8" {...fadeIn(0.26)}>
              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3 sm:gap-4">
                <LpCta location="hero" size="lg" />
                <LpDemoCta location="hero" onDark />
              </div>
              <p
                className="text-[12px] md:text-[13px] text-white/40 mt-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {lpHero.microcopy}
              </p>
            </motion.div>
          </div>

          {/* ── Mockup ──
              No mobile ele sangra pela borda de baixo de propósito:
              corta na dobra e sinaliza que a página continua. */}
          <motion.div
            className="mt-4 -mb-16 px-2 sm:px-8 lg:mt-0 lg:mb-0 lg:px-0"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34, duration: 0.7, ease: "easeOut" } as Transition}
          >
            <LpDevices />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
