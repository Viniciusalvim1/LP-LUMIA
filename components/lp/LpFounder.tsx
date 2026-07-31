"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { lpFounder } from "@/content/lp";

function Portrait() {
  if (lpFounder.photo) {
    return (
      <Image
        src={lpFounder.photo}
        alt={`Retrato de ${lpFounder.name}`}
        width={447}
        height={447}
        className="w-full h-full object-cover"
        // Preto e branco no CSS: mantém um único arquivo no repo e
        // deixa trocar a foto sem reeditar imagem.
        style={{ filter: "grayscale(1) contrast(1.06)" }}
      />
    );
  }

  const initials = lpFounder.name
    .replace(/^Dr[a]?\.?\s*/i, "")
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");

  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ background: "linear-gradient(135deg, #183A51 0%, #1673A3 120%)" }}
    >
      <span
        className="text-[64px] font-bold text-white/85"
        style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
      >
        {initials}
      </span>
    </div>
  );
}

export default function LpFounder() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const hintRef = useRef<HTMLDivElement>(null);

  const words = lpFounder.quote.split(" ");

  // Reveal dirigido pelo scroll, controlado À MÃO (sem framer): calculo o
  // progresso de quanto já rolei dentro do "trilho" fixado (a wrapper alta)
  // e seto a opacidade/translate de cada palavra direto no DOM. Assim é
  // garantidamente monotônico (a palavra acende e fica acesa) — o
  // useTransform do framer estava fazendo a opacidade subir e voltar.
  useEffect(() => {
    const wrap = wrapperRef.current;
    if (!wrap) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      wordRefs.current.forEach((el) => {
        if (el) {
          el.style.opacity = "1";
          el.style.transform = "none";
        }
      });
      if (hintRef.current) hintRef.current.style.opacity = "0";
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const denom = rect.height - vh; // quanto dá pra rolar com a seção fixada
      // progress: 0 quando a wrapper encosta no topo, 1 quando termina o pin
      const progress = denom > 0 ? Math.max(0, Math.min(1, -rect.top / denom)) : rect.top <= 0 ? 1 : 0;

      const total = wordRefs.current.length;
      for (let i = 0; i < total; i++) {
        const el = wordRefs.current[i];
        if (!el) continue;
        const revealAt = (i / total) * 0.82; // ponto do scroll em que começa a acender
        const local = Math.max(0, Math.min(1, (progress - revealAt) / 0.12));
        el.style.opacity = String(0.15 + local * 0.85);
        el.style.transform = `translateY(${(1 - local) * 4}px)`;
      }

      if (hintRef.current) {
        hintRef.current.style.opacity = String(Math.max(0, Math.min(1, (0.7 - progress) / 0.2)));
      }
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    schedule(); // estado inicial
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="fundador" className="relative bg-[#F7F7F7] scroll-mt-[92px]">
      {/* Wrapper alta = "trilho" de scroll; o filho sticky prende a seção na
          tela (o scroll "para") enquanto o depoimento se revela ao lado do
          rosto do fundador, palavra por palavra. */}
      <div ref={wrapperRef} className="relative h-[185svh] md:h-[200svh]">
        <div className="sticky top-0 h-[100svh] flex items-center justify-center px-5 lg:px-12">
          <div className="max-w-[1050px] w-full mx-auto">
            <div className="text-center mb-6 md:mb-8">
              <span className="section-badge">De onde veio a Lumia</span>
            </div>

            <div className="grid md:grid-cols-[minmax(0,0.58fr)_minmax(0,1fr)] gap-6 md:gap-12 items-center">
              {/* Rosto do fundador + credenciais */}
              <div className="text-center md:text-left">
                <div
                  className="relative rounded-2xl overflow-hidden aspect-square max-w-[190px] md:max-w-[300px] mx-auto md:mx-0"
                  style={{ boxShadow: "0 24px 60px rgba(24,58,81,0.20)" }}
                >
                  <Portrait />
                </div>
                <p
                  className="mt-4 md:mt-6 text-[18px] md:text-[20px] font-bold text-[#183A51]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {lpFounder.name}
                </p>
                <p
                  className="text-[13px] md:text-[14px] text-[#4CB794] font-semibold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {lpFounder.role}
                </p>
                <ul className="hidden md:flex flex-col gap-2 items-start mt-4">
                  {lpFounder.credentials.map((credential) => (
                    <li key={credential} className="flex items-start gap-2.5">
                      <span className="mt-[3px] w-4 h-4 rounded-full bg-[#4CB794] flex items-center justify-center shrink-0">
                        <svg
                          width="9"
                          height="9"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span
                        className="text-[14px] leading-snug text-[#69727D] text-left"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {credential}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Depoimento que se revela palavra por palavra */}
              <blockquote>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="#4CB794"
                  opacity="0.16"
                  className="mb-3"
                  aria-hidden="true"
                >
                  <path d="M9.5 5C6.46 5 4 7.46 4 10.5S6.46 16 9.5 16c.17 0 .33-.01.5-.03V16c0 1.66-1.34 3-3 3v2c2.76 0 5-2.24 5-5v-5.5C12 7.46 9.54 5 9.5 5zm10 0C16.46 5 14 7.46 14 10.5S16.46 16 19.5 16c.17 0 .33-.01.5-.03V16c0 1.66-1.34 3-3 3v2c2.76 0 5-2.24 5-5v-5.5C22 7.46 19.54 5 19.5 5z" />
                </svg>

                <p
                  className="text-[17px] md:text-[22px] leading-[1.55] text-[#183A51] font-medium"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {words.map((word, i) => (
                    <span
                      key={i}
                      ref={(el) => {
                        wordRefs.current[i] = el;
                      }}
                      className="inline-block mr-[0.26em] transition-[opacity,transform] duration-150 ease-out"
                      style={{
                        opacity: 0.15,
                        transform: "translateY(4px)",
                        willChange: "opacity, transform",
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </p>

                <footer className="mt-5 md:mt-6 pt-4 md:pt-5 border-t border-gray-200">
                  <p
                    className="text-[13px] md:text-[14px] text-[#69727D]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    — <span className="font-semibold text-[#183A51]">{lpFounder.name}</span>,{" "}
                    {lpFounder.role.toLowerCase()}
                  </p>
                </footer>
              </blockquote>
            </div>
          </div>

          {/* Indicador "role para baixo" (some quando a frase termina) */}
          <div
            ref={hintRef}
            className="hidden sm:flex absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
          >
            <span
              className="text-[11px] text-[#69727D] tracking-widest uppercase"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Role para baixo
            </span>
            <motion.div
              className="w-5 h-8 rounded-full border border-[#183A51]/25 flex justify-center pt-1.5"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-1 h-2 rounded-full bg-[#4CB794]" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
