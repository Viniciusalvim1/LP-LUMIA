"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const logos = [
  { src: "/images/logos/MedBe Logo.png",                    alt: "MEDbe",                     w: 140, h: 44 },
  { src: "/images/logos/Logo Golaser.jpg",                   alt: "Go Laser Depilação",        w: 160, h: 44 },
  { src: "/images/logos/La Cutanée.png",                     alt: "La Cutanée Dermatológico",  w: 180, h: 44 },
  { src: "/images/logos/Cliente Logo - Liso Laser.png",      alt: "Lisò Laser",                w: 120, h: 36 },
  { src: "/images/logos/Cliente Logo - Clinescultural.png",  alt: "Clinescultural",            w: 160, h: 44 },
];

// Duplicamos 3× para o loop infinito parecer contínuo
const track = [...logos, ...logos, ...logos];

export default function ClientLogos() {
  return (
    <section className="bg-white py-10 border-y border-gray-100">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-12">
        <p
          className="text-center text-[13px] font-medium text-[#69727D] uppercase tracking-widest mb-8"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Clínicas que já transformaram sua gestão com a Lumia
        </p>

        <div className="overflow-hidden relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex items-center gap-16"
            style={{ width: "max-content" }}
            animate={{ x: ["0px", `calc(-100% / 3)`] }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          >
            {track.map((logo, i) => (
              <div key={i} className="shrink-0 flex items-center justify-center opacity-75 hover:opacity-100 transition-opacity duration-200">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.w}
                  height={logo.h}
                  className="object-contain"
                  style={{ maxHeight: logo.h }}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
