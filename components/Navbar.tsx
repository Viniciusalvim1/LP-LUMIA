"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const links = [
  { label: "Funcionalidades", href: "/funcionalidades" },
  { label: "Sobre Nós", href: "/#sobre" },
  { label: "Planos", href: "/#cta" },
];

// Posição vertical onde medimos — fundo do pill (~68px do topo da viewport)
const DETECT_Y = 68;

type Theme = "dark" | "light";

// elementFromPoint retorna o próprio navbar (z-index alto), então
// varremos os rects das seções diretamente para saber qual cobre DETECT_Y.
function getThemeAtY(y: number): Theme {
  const sections = document.querySelectorAll<HTMLElement>("[data-navbar-theme]");
  for (const section of sections) {
    const rect = section.getBoundingClientRect();
    if (rect.top <= y && rect.bottom >= y) {
      return (section.dataset.navbarTheme as Theme) ?? "dark";
    }
  }
  return "dark";
}

// Estilos para cada tema
const styles: Record<Theme, {
  bg: string;
  border: string;
  shadow: string;
  linkColor: string;
  linkHoverBg: string;
  logoText: string;
  divider: string;
}> = {
  dark: {
    bg: "rgba(255, 255, 255, 0.12)",
    border: "rgba(255, 255, 255, 0.28)",
    shadow: "0 8px 32px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(255,255,255,0.08)",
    linkColor: "rgba(255,255,255,0.78)",
    linkHoverBg: "rgba(255,255,255,0.10)",
    logoText: "#ffffff",
    divider: "rgba(255,255,255,0.15)",
  },
  light: {
    bg: "rgba(255, 255, 255, 0.72)",
    border: "rgba(255, 255, 255, 0.75)",
    shadow: "0 8px 32px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.90), inset 0 -1px 0 rgba(0,0,0,0.04)",
    linkColor: "rgba(24,58,81,0.80)",
    linkHoverBg: "rgba(24,58,81,0.07)",
    logoText: "#183A51",
    divider: "rgba(24,58,81,0.12)",
  },
};

export default function Navbar() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const update = () => setTheme(getThemeAtY(DETECT_Y));
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const s = styles[theme];

  const pillStyle: React.CSSProperties = {
    background: s.bg,
    backdropFilter: "blur(28px) saturate(200%)",
    WebkitBackdropFilter: "blur(28px) saturate(200%)",
    border: `1px solid ${s.border}`,
    boxShadow: s.shadow,
    transition: "background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
  };

  return (
    <>
      {/* ── Desktop: pill flutuante centrado ── */}
      <motion.header
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50 hidden md:block"
        initial={{ y: -56, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-1 px-3 py-2.5 rounded-full" style={pillStyle}>
          {/* Logo */}
          <a
            href="/"
            className="flex items-center pl-1 pr-4 mr-1 shrink-0"
            style={{ borderRight: `1px solid ${s.divider}` }}
          >
            <Image
              src={theme === "dark" ? "/LOGO LUMIA/icon-teal.png" : "/LOGO LUMIA/icon-navy.png"}
              alt="Lumia"
              width={36}
              height={36}
              className="rounded-xl object-cover transition-all duration-300"
              style={{ width: 36, height: 36 }}
            />
          </a>

          {/* Links */}
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative px-4 py-1.5 text-[14px] font-medium rounded-full transition-all duration-300 cursor-pointer"
              style={{
                fontFamily: "var(--font-display)",
                color: s.linkColor,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = s.linkHoverBg;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
              }}
            >
              {l.label}
            </a>
          ))}

          {/* CTA */}
          <a
            href="/#cta"
            className="ml-2 text-[13px] font-semibold px-5 py-2 rounded-full cursor-pointer transition-all duration-200"
            style={{
              fontFamily: "var(--font-display)",
              background: "#4CB794",
              color: "#fff",
              boxShadow: "0 2px 12px rgba(76,183,148,0.45)",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#3da882"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#4CB794"; }}
          >
            Demonstração
          </a>
        </div>
      </motion.header>

      {/* ── Mobile: pill esticado ── */}
      <motion.header
        className="fixed top-4 left-4 right-4 z-50 md:hidden"
        initial={{ y: -56, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-between px-4 py-3 rounded-full" style={pillStyle}>
          <a href="/" className="flex items-center shrink-0">
            <Image
              src={theme === "dark" ? "/LOGO LUMIA/icon-teal.png" : "/LOGO LUMIA/icon-navy.png"}
              alt="Lumia"
              width={34}
              height={34}
              className="rounded-xl object-cover transition-all duration-300"
              style={{ width: 34, height: 34 }}
            />
          </a>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex flex-col gap-[5px] p-1.5 cursor-pointer"
            aria-label="Abrir menu"
          >
            {[
              menuOpen ? "rotate(45deg) translateY(6.5px)" : "none",
              undefined,
              menuOpen ? "rotate(-45deg) translateY(-6.5px)" : "none",
            ].map((transform, i) =>
              i === 1 ? (
                <span
                  key={i}
                  className="block w-5 h-[1.5px] transition-all duration-200"
                  style={{
                    background: s.logoText,
                    opacity: menuOpen ? 0 : 1,
                  }}
                />
              ) : (
                <span
                  key={i}
                  className="block w-5 h-[1.5px] transition-all duration-200 origin-center"
                  style={{ background: s.logoText, transform: transform ?? "none" }}
                />
              )
            )}
          </button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="mt-2 rounded-2xl overflow-hidden flex flex-col"
              style={pillStyle}
              initial={{ opacity: 0, scale: 0.96, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-6 py-4 text-[15px] font-medium transition-colors cursor-pointer border-b last:border-0"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: s.linkColor,
                    borderColor: s.divider,
                  }}
                >
                  {l.label}
                </a>
              ))}
              <div className="p-4">
                <a
                  href="/#cta"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full text-center text-[14px] font-semibold py-3 rounded-full cursor-pointer"
                  style={{
                    fontFamily: "var(--font-display)",
                    background: "#4CB794",
                    color: "#fff",
                  }}
                >
                  Agendar Demonstração
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
