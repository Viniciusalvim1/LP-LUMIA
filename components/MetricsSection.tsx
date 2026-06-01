"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { metrics } from "@/content/story";

function useCountUp(target: number, active: boolean, duration = 1800) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);

  return count;
}

function MetricCard({
  value,
  suffix,
  label,
  sublabel,
  delay,
}: (typeof metrics)[number] & { delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const count = useCountUp(value, inView);

  return (
    <motion.div
      ref={ref}
      className="text-center py-8 px-6"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
    >
      <p
        className="text-[60px] font-bold text-[#4CB794] leading-none mb-2"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {count}
        {suffix}
      </p>
      <p
        className="text-[18px] font-semibold text-white mb-1"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {label}
      </p>
      <p
        className="text-[14px] text-white/50"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {sublabel}
      </p>
    </motion.div>
  );
}

export default function MetricsSection() {
  return (
    <section id="resultados" className="relative py-20">
      <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-12">
        <div className="text-center mb-12">
          <span
            className="inline-block bg-[#4CB794]/20 text-[#4CB794] text-[14px] font-medium px-4 py-1.5 rounded-full mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Resultados reais
          </span>
          <h2
            className="text-[32px] md:text-[38px] font-semibold leading-[1.2] text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Números que provam a diferença
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {metrics.map((m, i) => (
            <MetricCard key={m.label} {...m} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
}
