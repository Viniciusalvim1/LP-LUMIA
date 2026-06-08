"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SENTENCE = [
  { text: "Tudo" }, { text: "que" }, { text: "sua" }, { text: "clínica" },
  { text: "precisa" }, { text: "para" }, { text: "crescer", hl: true },
  { text: "—" }, { text: "em" }, { text: "um", hl: true }, { text: "só", hl: true }, { text: "lugar", hl: true },
  { text: "—" }, { text: "por" }, { text: "um" }, { text: "valor" }, { text: "que" },
  { text: "cabe", hl: true }, { text: "no", hl: true }, { text: "seu", hl: true }, { text: "bolso", hl: true }, { text: "." },
];

export default function PropostaScrollReveal() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const hintOpacity = useTransform(scrollYProgress, [0, 0.7, 0.9], [1, 1, 0]);

  return (
    <section className="relative bg-[#183A51]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(76,183,148,0.07)_0%,transparent_60%)] pointer-events-none" />

      <div ref={scrollRef} className="relative" style={{ height: "160vh" }}>
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-5 lg:px-12">
          <span
            className="inline-block bg-[#4CB794]/20 text-[#4CB794] text-[13px] font-medium px-4 py-1.5 rounded-full mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Investimento
          </span>

          <p
            className="max-w-[820px] text-center text-[24px] md:text-[36px] font-bold leading-[1.35] text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {SENTENCE.map((tok, i) => {
              const start = 0.05 + (i / SENTENCE.length) * 0.8;
              const end = start + 0.8 / SENTENCE.length;
              return (
                <Word key={i} text={tok.text} hl={tok.hl} start={start} end={end} progress={scrollYProgress} />
              );
            })}
          </p>

          <motion.div className="absolute bottom-10 flex flex-col items-center gap-2" style={{ opacity: hintOpacity }}>
            <span className="text-[11px] text-white/40 tracking-widest uppercase" style={{ fontFamily: "var(--font-display)" }}>
              Role para baixo
            </span>
            <motion.div
              className="w-5 h-8 rounded-full border border-white/25 flex justify-center pt-1.5"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-1 h-2 rounded-full bg-[#4CB794]" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Word({ text, hl, start, end, progress }: { text: string; hl?: boolean; start: number; end: number; progress: any }) {
  const opacity = useTransform(progress, [start, end], [0.12, 1]);
  const y = useTransform(progress, [start, end], [10, 0]);

  return (
    <motion.span style={{ opacity, y }} className="inline-block mr-[0.28em]">
      {hl ? (
        <span style={{ background: "linear-gradient(90deg,#4CB794,#6ef5d0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          {text}
        </span>
      ) : text}
    </motion.span>
  );
}
