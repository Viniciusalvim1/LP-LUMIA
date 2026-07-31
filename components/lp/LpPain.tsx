"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { lpPains, lpTurn } from "@/content/lp";

function PainItem({
  index,
  title,
  text,
  isActive,
}: {
  index: number;
  title: string;
  text: string;
  isActive: boolean;
}) {
  return (
    <div
      className="relative pl-6 md:pl-8 py-9 md:py-11 border-t border-gray-200 first:border-t-0 transition-opacity duration-500"
      style={{ opacity: isActive ? 1 : 0.22 }}
    >
      {/* Barra de acento — só o item em foco recebe */}
      <span
        className="absolute left-0 top-9 md:top-11 bottom-9 md:bottom-11 w-[3px] rounded-full transition-all duration-500"
        style={{
          background: "#4CB794",
          opacity: isActive ? 1 : 0,
          transform: isActive ? "scaleY(1)" : "scaleY(0.4)",
        }}
      />

      <span
        className="block text-[13px] font-bold tracking-[0.18em] mb-3 tabular-nums transition-colors duration-500"
        style={{
          fontFamily: "var(--font-display)",
          color: isActive ? "#4CB794" : "#69727D",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <h3
        className="text-[24px] md:text-[31px] font-bold leading-[1.18] tracking-[-0.01em] text-[#183A51] mb-4"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h3>

      <p
        className="text-[16px] md:text-[17px] leading-[1.7] text-[#69727D] max-w-[520px]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {text}
      </p>
    </div>
  );
}

export default function LpPain() {
  const listRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Progresso de 0 a 1 enquanto a lista atravessa o centro da tela.
  // Fatiado pelo número de itens, dá qual deles está no meio.
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start center", "end center"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const idx = Math.floor(p * lpPains.length);
    setActive(Math.min(lpPains.length - 1, Math.max(0, idx)));
  });

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          {/* Lista — sempre depois do título, à direita no desktop */}
          <div ref={listRef} className="order-2">
            {lpPains.map((pain, i) => (
              <PainItem
                key={pain.title}
                index={i}
                title={pain.title}
                text={pain.text}
                isActive={i === active}
              />
            ))}
          </div>

          {/* Título — fica parado enquanto a lista corre ao lado */}
          <motion.div
            className="order-1 lg:sticky lg:top-[150px] lg:self-start"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <p
              className="text-[14px] font-semibold text-[#4CB794] mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              A realidade de hoje
            </p>
            <h2
              className="text-[38px] md:text-[52px] font-bold leading-[1.08] tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="text-[#183A51]">Você reconhece</span>
              <br />
              <span className="text-[#4CB794]">a sua semana aqui?</span>
            </h2>
            <p
              className="text-[16px] md:text-[17px] leading-[1.7] text-[#69727D] mt-6 max-w-[420px]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Cada uma dessas situações custa dinheiro, tempo ou uma paciente.
              E todas elas têm exatamente a mesma causa.
            </p>
          </motion.div>
        </div>

        {/* Virada */}
        <motion.div
          className="relative max-w-[900px] mx-auto rounded-2xl p-8 md:p-12 text-center overflow-hidden mt-16 md:mt-24"
          style={{ background: "linear-gradient(135deg, #183A51 0%, #1673A3 130%)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.55 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(76,183,148,0.18)_0%,transparent_65%)] pointer-events-none" />
          <div className="relative z-10" style={{ fontFamily: "var(--font-display)" }}>
            <p className="text-[15px] md:text-[16px] font-semibold text-[#4CB794] mb-4">
              {lpTurn.opener}
            </p>

            <h3 className="text-[26px] md:text-[36px] font-bold leading-[1.2] text-white">
              {lpTurn.headline}
            </h3>

            <div className="mt-6 flex flex-col gap-4 max-w-[640px] mx-auto">
              {lpTurn.body.map((paragraph) => (
                <p key={paragraph} className="text-[16px] md:text-[17px] leading-[1.75] text-white/65">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Apelo à identidade + devolução da dignidade: o par que
                carrega a carga emocional da seção, separado do corpo
                para não ser lido em varredura junto com o resto. */}
            <div className="mt-8 pt-8 border-t border-white/12 max-w-[660px] mx-auto">
              <p className="text-[18px] md:text-[21px] leading-[1.55] text-white/90">
                {lpTurn.punch}
              </p>
              <p className="text-[19px] md:text-[23px] leading-[1.45] font-bold text-white mt-5">
                {lpTurn.dignity}
              </p>
            </div>

            <p className="text-[15px] md:text-[16px] leading-[1.7] text-white/55 mt-8 max-w-[560px] mx-auto">
              {lpTurn.closing}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
