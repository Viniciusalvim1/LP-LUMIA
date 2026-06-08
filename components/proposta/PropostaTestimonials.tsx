"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

const BLOB = "https://p5baoahwu1dipoiy.public.blob.vercel-storage.com";

const testimonials = [
  {
    name: "Clínica parceira Lumia",
    quote: "Antes do Lumia, eu passava 2 horas por dia só confirmando agendamentos. Hoje tudo é automático. Recuperei tempo para focar nos meus pacientes e no crescimento da clínica.",
    src: `${BLOB}/depoimentos/Depoimento%20Lumia.mp4`,
    poster: "/images/Capa%20Essence.jpg",
  },
  {
    name: "Clínica parceira Lumia",
    quote: "O módulo financeiro do Lumia foi um divisor de águas. Finalmente consigo ver exatamente quanto entra, o que vai sair e qual procedimento dá mais lucro.",
    src: `${BLOB}/depoimentos/Depoimento%20Lumia%202.MOV`,
    poster: "/images/Capa%20Meire%20Final.jpg",
  },
  {
    name: "Clínica parceira Lumia",
    quote: "O Sistema Lumia está ajudando nossa clínica a alcançar resultados extraordinários. Recomendo para qualquer clínica que queira crescer com organização.",
    src: `${BLOB}/depoimentos/O%20Sistema%20Lumia%20esta%CC%81%20ajudando%20cli%CC%81nicas%20de%20este%CC%81tica%20em%20todo%20o%20mundo%20a%20alcanc%CC%A7ar%20resultados%20extraor.mp4`,
    poster: "/images/Carina.jpg",
  },
];

function VideoCard({ src, poster, name, quote, index }: typeof testimonials[0] & { index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    const v = videoRef.current;
    if (!v) return;
    if (playing) { v.pause(); setPlaying(false); }
    else { v.play(); setPlaying(true); }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      {/* Player */}
      <div
        className="relative w-full rounded-xl overflow-hidden mb-5 cursor-pointer group bg-[#0d1a28]"
        style={{ aspectRatio: "9/16" }}
        onClick={toggle}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className="absolute inset-0 w-full h-full object-cover"
          playsInline
          preload="none"
          onEnded={() => setPlaying(false)}
        />

        <div className="absolute inset-0 flex items-end transition-opacity duration-300" style={{ opacity: playing ? 0 : 1, pointerEvents: playing ? "none" : "auto" }}>
          <div className="absolute inset-0 bg-gradient-to-t from-[#183A51]/80 via-transparent to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-[#4CB794] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-200">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3" /></svg>
            </div>
          </div>
          <div className="relative z-10 p-4">
            <p className="text-white text-[13px] font-semibold" style={{ fontFamily: "var(--font-display)" }}>{name}</p>
          </div>
        </div>

        {playing && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="w-12 h-12 rounded-full bg-black/40 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
            </div>
          </div>
        )}
      </div>

      {/* Quote */}
      <div className="bg-[#F7F7F7] rounded-xl p-5">
        <div className="flex gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#4CB794" aria-hidden="true">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ))}
        </div>
        <p className="text-[14px] leading-[1.65] text-[#69727D] italic" style={{ fontFamily: "var(--font-display)" }}>
          "{quote}"
        </p>
      </div>
    </motion.div>
  );
}

export default function PropostaTestimonials() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-[1100px] mx-auto px-5 lg:px-12">
        <div className="text-center mb-12">
          <span
            className="inline-block bg-[#4CB794]/15 text-[#4CB794] text-[13px] font-medium px-4 py-1.5 rounded-full mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Depoimentos
          </span>
          <h2
            className="text-[26px] md:text-[36px] font-bold text-[#183A51] leading-[1.2] mt-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            O que as clínicas falam sobre a Lumia
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <VideoCard key={i} {...t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
