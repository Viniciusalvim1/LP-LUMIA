"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { chaosLines } from "@/content/story";

export default function ChaosSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-24"
    >
      {/* Red/orange glow — signals "pain" */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(239,68,68,0.08)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-[900px] mx-auto px-6 lg:px-12 text-center">
        {/* Section label */}
        <motion.p
          className="text-sm font-medium tracking-[0.1em] uppercase text-white/40 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          A realidade de muitas clínicas
        </motion.p>

        {/* Chaos lines — each reveals as user scrolls */}
        <div className="flex flex-col gap-6">
          {chaosLines.map((line, i) => (
            <ChaosLine key={line} line={line} index={i} total={chaosLines.length} scrollYProgress={scrollYProgress} />
          ))}
        </div>

        {/* Closing line */}
        <motion.p
          className="mt-16 text-base text-white/40 italic"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Isso não é falta de esforço. É falta da ferramenta certa.
        </motion.p>
      </div>
    </section>
  );
}

function ChaosLine({
  line,
  index,
  total,
  scrollYProgress,
}: {
  line: string;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = (index / total) * 0.6;
  const end = start + 0.15;
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const y = useTransform(scrollYProgress, [start, end], [24, 0]);

  return (
    <motion.p
      className="font-display font-black text-3xl md:text-5xl lg:text-[52px] leading-[1.05] tracking-[-0.02em] text-white"
      style={{ opacity, y }}
    >
      {line}
    </motion.p>
  );
}
