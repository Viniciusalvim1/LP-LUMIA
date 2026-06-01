"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      setCount(Math.round(start));
      if (start >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 6, suffix: "+", label: "Anos de experiência" },
  { value: 100, suffix: "+", label: "Clínicas atendidas" },
  { value: 98, suffix: "%", label: "Satisfação dos clientes" },
  { value: 40, suffix: "%", label: "Redução de faltas" },
];

export default function AboutSection() {
  return (
    <section id="sobre" className="bg-[#F7F7F7] py-20">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-14 lg:gap-20 items-center">
          {/* Texto */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge mb-5">Sobre Nós</span>
            <h2
              className="text-[32px] md:text-[38px] font-semibold leading-[1.2] text-[#183A51] mt-4 mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Há mais de 6 anos ajudando clínicas a crescerem sem caos
            </h2>
            <p
              className="text-[17px] leading-[1.7] text-[#69727D] mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              A Lumia nasceu da necessidade real de profissionais de estética que precisavam de uma solução completa — não uma colcha de retalhos de aplicativos. Desenvolvemos cada módulo ouvindo donos de clínicas, gestores e recepcionistas.
            </p>
            <p
              className="text-[17px] leading-[1.7] text-[#69727D]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Hoje somos o CRM all-in-one mais completo para o setor de estética, com suporte dedicado e atualizações constantes para acompanhar o crescimento da sua clínica.
            </p>

            <a
              href="#cta"
              className="btn-primary inline-block mt-8 text-[15px] px-8 py-3.5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Fale com um Especialista
            </a>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            className="flex-1 grid grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-white rounded-xl p-7 flex flex-col items-center text-center shadow-sm"
              >
                <span
                  className="text-[40px] font-bold text-[#183A51] leading-none mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  <CountUp target={s.value} suffix={s.suffix} />
                </span>
                <span
                  className="text-[14px] text-[#69727D]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
