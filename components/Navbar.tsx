"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { track } from "@/lib/analytics";
import { withCampaignParams } from "@/lib/utm";

const SIGNUP_URL = "https://app.lumiaclin.com.br/#signup";

export interface NavLink {
  label: string;
  href: string;
}

// Padrão do site. A LP de tráfego pago passa a própria lista, com
// âncoras internas — lá cada link para fora é uma rota de fuga num
// clique que já foi pago.
const DEFAULT_LINKS: NavLink[] = [
  { label: "Funcionalidades", href: "/funcionalidades" },
  { label: "Sobre Nós", href: "/#sobre" },
  { label: "Planos", href: "/#planos" },
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

interface Props {
  /** Sobrescreve os links do site. */
  links?: NavLink[];
  /** Destino do logo — na LP aponta para o topo, não para a home. */
  logoHref?: string;
  /** No hero, começa como barra completa e se transforma no pill ao rolar. */
  morphFromHero?: boolean;
}

export default function Navbar({
  links = DEFAULT_LINKS,
  logoHref = "/",
  morphFromHero = false,
}: Props) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const ctaDesktopRef = useRef<HTMLAnchorElement>(null);
  const ctaMobileRef = useRef<HTMLAnchorElement>(null);
  const { scrollY } = useScroll();
  const morphTarget = useTransform(scrollY, [0, 120], [0, 1], {
    clamp: true,
  });
  const morphProgress = useSpring(morphTarget, {
    stiffness: 260,
    damping: 34,
    mass: 0.34,
    restDelta: 0.001,
  });

  const desktopTop = useTransform(morphProgress, [0, 1], [0, 20]);
  const desktopViewportWidth = useTransform(morphProgress, [0, 1], [100, 0]);
  const desktopFixedWidth = useTransform(morphProgress, [0, 1], [0, 760]);
  const desktopWidth = useMotionTemplate`calc(${desktopViewportWidth}vw + ${desktopFixedWidth}px)`;
  const desktopHeight = useTransform(morphProgress, [0, 1], [72, 58]);
  const desktopRadius = useTransform(morphProgress, [0, 1], [0, 999]);
  const desktopPaddingX = useTransform(morphProgress, [0, 1], [48, 12]);

  const mobileTop = useTransform(morphProgress, [0, 1], [0, 16]);
  const mobileInset = useTransform(morphProgress, [0, 1], [0, 32]);
  const mobileWidth = useMotionTemplate`calc(100vw - ${mobileInset}px)`;
  const mobileHeight = useTransform(morphProgress, [0, 1], [66, 58]);
  const mobileRadius = useTransform(morphProgress, [0, 1], [0, 999]);
  const mobilePaddingX = useTransform(morphProgress, [0, 1], [20, 16]);

  const heroSurfaceOpacity = useTransform(
    morphProgress,
    [0, 0.8, 1],
    [1, 0.18, 0],
  );
  const compactChromeOpacity = useTransform(
    morphProgress,
    [0, 0.12, 1],
    [0, 0, 1],
  );
  const desktopWordmarkOpacity = useTransform(
    morphProgress,
    [0, 0.62, 0.92],
    [1, 1, 0],
  );
  const desktopWordmarkWidth = useTransform(
    morphProgress,
    [0, 0.62, 1],
    [88, 88, 0],
  );
  const desktopWordmarkMargin = useTransform(
    morphProgress,
    [0, 1],
    [12, 0],
  );

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

  // Repassa utm/gclid/fbclid ao cadastro, igual aos CTAs da LP —
  // sem isso o botão mais clicado do site perde a atribuição no
  // salto entre domínios. Reescrevemos o href no DOM (sem state)
  // para não forçar re-render nem quebrar o SSR. Depende de menuOpen
  // porque o CTA mobile só monta quando o menu abre.
  useEffect(() => {
    const upgraded = withCampaignParams(SIGNUP_URL);
    if (ctaDesktopRef.current) ctaDesktopRef.current.href = upgraded;
    if (ctaMobileRef.current) ctaMobileRef.current.href = upgraded;
  }, [menuOpen]);

  const s = styles[theme];

  const pillStyle: React.CSSProperties = {
    background: s.bg,
    backdropFilter: "blur(28px) saturate(200%)",
    WebkitBackdropFilter: "blur(28px) saturate(200%)",
    border: `1px solid ${s.border}`,
    boxShadow: s.shadow,
    transition: "background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
  };
  const heroPillStyle: React.CSSProperties = {
    ...pillStyle,
    border: "none",
    boxShadow: "none",
  };

  return (
    <>
      {/* ── Desktop: pill flutuante centrado ── */}
      <motion.header
        className={
          morphFromHero
            ? "fixed left-1/2 z-50 hidden w-full -translate-x-1/2 md:block"
            : "fixed top-5 left-1/2 z-50 hidden -translate-x-1/2 md:block"
        }
        style={
          morphFromHero
            ? { top: desktopTop, width: desktopWidth }
            : undefined
        }
        initial={{ y: -56, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className={
            morphFromHero
              ? "relative flex items-center overflow-hidden"
              : "relative flex items-center overflow-hidden rounded-full px-3 py-2.5"
          }
          style={
            morphFromHero
              ? {
                  ...heroPillStyle,
                  height: desktopHeight,
                  borderRadius: desktopRadius,
                  paddingLeft: desktopPaddingX,
                  paddingRight: desktopPaddingX,
                }
              : pillStyle
          }
        >
          {morphFromHero && (
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[rgba(8,43,59,0.72)]"
              style={{ opacity: heroSurfaceOpacity }}
            />
          )}

          <div className="relative z-10 mx-auto flex w-full max-w-[1380px] items-center justify-between gap-1">
            {/* Logo */}
            <a
              href={logoHref}
              aria-label="Lumia"
              className="mr-1 flex shrink-0 items-center border-r pr-4"
              style={{ borderColor: s.divider }}
            >
              <Image
                src={theme === "dark" ? "/LOGO LUMIA/icon-teal.png" : "/LOGO LUMIA/icon-navy.png"}
                alt=""
                width={36}
                height={36}
                className="rounded-xl object-cover transition-all duration-300"
                style={{ width: 36, height: 36 }}
              />
              {morphFromHero && (
                <motion.span
                  className="block overflow-hidden whitespace-nowrap text-[22px] font-semibold lowercase"
                  style={{
                    width: desktopWordmarkWidth,
                    opacity: desktopWordmarkOpacity,
                    marginLeft: desktopWordmarkMargin,
                    color: s.logoText,
                    fontFamily: "var(--font-display)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  lumia
                </motion.span>
              )}
            </a>

            {/* Links */}
            <nav className="flex items-center gap-1" aria-label="Navegação principal">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="relative cursor-pointer rounded-full px-4 py-1.5 text-[14px] font-medium transition-all duration-300"
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
            </nav>

            {/* CTA */}
            <a
              ref={ctaDesktopRef}
              href={SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("trial_click", { location: "navbar" })}
              className="ml-2 cursor-pointer whitespace-nowrap rounded-full px-5 py-2 text-[13px] font-semibold transition-all duration-200"
              style={{
                fontFamily: "var(--font-display)",
                background: "#4CB794",
                color: "#fff",
                boxShadow: "0 2px 12px rgba(76,183,148,0.45)",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#3da882"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#4CB794"; }}
            >
              Começar grátis
            </a>
          </div>
        </motion.div>
        {morphFromHero && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 w-full"
            style={{
              height: desktopHeight,
              borderRadius: desktopRadius,
              border: `1px solid ${s.border}`,
              boxShadow: s.shadow,
              opacity: compactChromeOpacity,
            }}
          />
        )}
      </motion.header>

      {/* ── Mobile: pill esticado ── */}
      <motion.header
        className={
          morphFromHero
            ? "fixed left-1/2 z-50 w-full -translate-x-1/2 md:hidden"
            : "fixed top-4 left-4 right-4 z-50 md:hidden"
        }
        style={
          morphFromHero
            ? { top: mobileTop, width: mobileWidth }
            : undefined
        }
        initial={{ y: -56, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className={
            morphFromHero
              ? "relative flex items-center justify-between overflow-hidden"
              : "relative flex items-center justify-between overflow-hidden rounded-full px-4 py-3"
          }
          style={
            morphFromHero
              ? {
                  ...heroPillStyle,
                  height: mobileHeight,
                  borderRadius: mobileRadius,
                  paddingLeft: mobilePaddingX,
                  paddingRight: mobilePaddingX,
                }
              : pillStyle
          }
        >
          {morphFromHero && (
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[rgba(8,43,59,0.72)]"
              style={{ opacity: heroSurfaceOpacity }}
            />
          )}

          <div className="relative z-10 flex w-full items-center justify-between">
            <a href={logoHref} className="flex shrink-0 items-center">
              <Image
                src={theme === "dark" ? "/LOGO LUMIA/icon-teal.png" : "/LOGO LUMIA/icon-navy.png"}
                alt="Lumia"
                width={34}
                height={34}
                className="rounded-xl object-cover transition-all duration-300"
                style={{ width: 34, height: 34 }}
              />
            </a>

            {/* Wordmark "lumia" centralizado */}
            <a
              href={logoHref}
              aria-label="Lumia"
              className="text-[22px] font-semibold lowercase transition-colors duration-300"
              style={{
                fontFamily: "var(--font-display)",
                color: s.logoText,
                letterSpacing: "-0.01em",
              }}
            >
              lumia
            </a>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex cursor-pointer flex-col gap-[5px] p-1.5"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
            >
              {[
                menuOpen ? "rotate(45deg) translateY(6.5px)" : "none",
                undefined,
                menuOpen ? "rotate(-45deg) translateY(-6.5px)" : "none",
              ].map((transform, i) =>
                i === 1 ? (
                  <span
                    key={i}
                    className="block h-[1.5px] w-5 transition-all duration-200"
                    style={{
                      background: s.logoText,
                      opacity: menuOpen ? 0 : 1,
                    }}
                  />
                ) : (
                  <span
                    key={i}
                    className="block h-[1.5px] w-5 origin-center transition-all duration-200"
                    style={{ background: s.logoText, transform: transform ?? "none" }}
                  />
                )
              )}
            </button>
          </div>
        </motion.div>
        {morphFromHero && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 w-full"
            style={{
              height: mobileHeight,
              borderRadius: mobileRadius,
              border: `1px solid ${s.border}`,
              boxShadow: s.shadow,
              opacity: compactChromeOpacity,
            }}
          />
        )}

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
                  ref={ctaMobileRef}
                  href={SIGNUP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => { track("trial_click", { location: "navbar-mobile" }); setMenuOpen(false); }}
                  className="block w-full text-center text-[14px] font-semibold py-3 rounded-full cursor-pointer"
                  style={{
                    fontFamily: "var(--font-display)",
                    background: "#4CB794",
                    color: "#fff",
                  }}
                >
                  Começar trial gratuito
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
