import type { ReactNode } from "react";

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const featureIcons: Record<string, ReactNode> = {
  // Aliases usados pelos ids do seletor da LP (content/lp.ts), que
  // nomeiam as mesmas telas de um jeito ligeiramente diferente da
  // página /funcionalidades (contatos≈clientes360, contrato≈contratos,
  // integracao≈integracoes) — reaproveitam o mesmo desenho.
  contatos: (
    <svg viewBox="0 0 24 24" {...base} aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  contrato: (
    <svg viewBox="0 0 24 24" {...base} aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  ),
  integracao: (
    <svg viewBox="0 0 24 24" {...base} aria-hidden="true">
      <circle cx="6" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="12" r="3" />
      <path d="M8.6 16.4 15.4 13.6M8.6 7.6l6.8 2.8" />
    </svg>
  ),
  ia: (
    <svg viewBox="0 0 24 24" {...base} aria-hidden="true">
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
      <circle cx="12" cy="12" r="3.2" />
    </svg>
  ),
  cadastro: (
    <svg viewBox="0 0 24 24" {...base} aria-hidden="true">
      <path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
      <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      <path d="M17 8v6M20 11h-6" />
    </svg>
  ),
  painel: (
    <svg viewBox="0 0 24 24" {...base} aria-hidden="true">
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </svg>
  ),
  agenda: (
    <svg viewBox="0 0 24 24" {...base} aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  atendimento: (
    <svg viewBox="0 0 24 24" {...base} aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="m9 15 2 2 4-4" />
    </svg>
  ),
  estoque: (
    <svg viewBox="0 0 24 24" {...base} aria-hidden="true">
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  ),
  pacotes: (
    <svg viewBox="0 0 24 24" {...base} aria-hidden="true">
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  ),
  funil: (
    <svg viewBox="0 0 24 24" {...base} aria-hidden="true">
      <path d="M22 3H2l8 9.46V19l4 2v-8.54z" />
    </svg>
  ),
  checkpoints: (
    <svg viewBox="0 0 24 24" {...base} aria-hidden="true">
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="12" cy="12" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M8.2 7.5 9.8 10M14.2 14 15.8 16.5" />
    </svg>
  ),
  escutaativa: (
    <svg viewBox="0 0 24 24" {...base} aria-hidden="true">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  ),
  vendas: (
    <svg viewBox="0 0 24 24" {...base} aria-hidden="true">
      <line x1="12" y1="2" x2="12" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  contratos: (
    <svg viewBox="0 0 24 24" {...base} aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  ),
  clientes360: (
    <svg viewBox="0 0 24 24" {...base} aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  fichas: (
    <svg viewBox="0 0 24 24" {...base} aria-hidden="true">
      <path d="M9 2h6a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v0a2 2 0 0 1 2-2z" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M9 12h6" />
      <path d="M9 16h6" />
    </svg>
  ),
  financeiro: (
    <svg viewBox="0 0 24 24" {...base} aria-hidden="true">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  relatorios: (
    <svg viewBox="0 0 24 24" {...base} aria-hidden="true">
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  ),
  marketing: (
    <svg viewBox="0 0 24 24" {...base} aria-hidden="true">
      <path d="m3 11 18-5v12L3 14v-3z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </svg>
  ),
  conversas: (
    <svg viewBox="0 0 24 24" {...base} aria-hidden="true">
      <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.2A8.4 8.4 0 0 1 4 11.5a8.5 8.5 0 0 1 17 0z" />
    </svg>
  ),
  integracoes: (
    <svg viewBox="0 0 24 24" {...base} aria-hidden="true">
      <circle cx="6" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="12" r="3" />
      <path d="M8.6 16.4 15.4 13.6M8.6 7.6l6.8 2.8" />
    </svg>
  ),
};
