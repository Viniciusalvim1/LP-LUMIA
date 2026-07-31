"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";
import { withCampaignParams } from "@/lib/utm";

const SIGNUP_URL = "https://app.lumiaclin.com.br/#signup";

type Variant = "primary" | "onLight" | "outlineOnDark";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, React.CSSProperties> = {
  primary: {
    background: "#4CB794",
    color: "#fff",
    boxShadow: "0 4px 20px rgba(76,183,148,0.40)",
  },
  onLight: {
    background: "#183A51",
    color: "#fff",
    boxShadow: "0 4px 20px rgba(24,58,81,0.25)",
  },
  outlineOnDark: {
    background: "transparent",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.35)",
  },
};

const SIZES: Record<Size, string> = {
  sm: "text-[13px] px-5 py-2.5 rounded-full",
  md: "text-[15px] px-7 py-4 rounded-[10px]",
  lg: "text-[16px] px-9 py-[18px] rounded-[10px]",
};

interface Props {
  /** Onde na página o botão vive — vai junto no evento de analytics. */
  location: string;
  label?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  full?: boolean;
}

/**
 * CTA único da LP: leva sempre ao cadastro do trial, carregando os
 * parâmetros de campanha da URL atual para não quebrar a atribuição.
 */
export default function LpCta({
  location,
  label = "Começar meu teste grátis",
  variant = "primary",
  size = "md",
  className = "",
  full = false,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  // A query só existe no cliente. Reescrevemos o href direto no DOM em
  // vez de guardar em state: evita um render extra e mantém o link
  // válido no HTML servido, inclusive para abrir em nova aba.
  useEffect(() => {
    const anchor = ref.current;
    if (anchor) anchor.href = withCampaignParams(SIGNUP_URL);
  }, []);

  return (
    <a
      ref={ref}
      href={SIGNUP_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("trial_click", { location })}
      className={`inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 cursor-pointer hover:brightness-110 hover:-translate-y-px ${
        SIZES[size]
      } ${full ? "w-full" : ""} ${className}`}
      style={{ fontFamily: "var(--font-display)", ...VARIANTS[variant] }}
    >
      {label}
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </a>
  );
}
