// ─────────────────────────────────────────────────────────────
// Helper de tracking via dataLayer do Google Tag Manager.
// Uso: track("trial_click", { location: "hero" })
//
// O mesmo evento é espelhado no pixel do ChatGPT Ads (OpenAI), que
// não passa pelo GTM. Meta/Google continuam sendo servidos pelas
// tags configuradas dentro do container GTM-KX3X5W3S.
// ─────────────────────────────────────────────────────────────

import { measure } from "./openai-pixel";

type GTMWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
};

export type AnalyticsEvent =
  // Tier 1 — conversões
  | "generate_lead"
  | "trial_click"
  | "whatsapp_click"
  // Tier 2 — funil / engajamento
  | "cta_click"
  | "feature_tab_select"
  | "feature_detail_click"
  | "testimonial_play"
  | "view_pricing"
  | "select_blog_post";

// Tradução dos nossos eventos para o catálogo da OpenAI. Só entram aqui
// os que valem como sinal de conversão — o resto fica só no GTM.
// trial_click/whatsapp_click são intenção, não conversão: vão como evento
// customizado para não se misturarem com lead_created no Ads Manager.
const OPENAI_EVENTS: Partial<Record<AnalyticsEvent, () => void>> = {
  generate_lead: () => measure("lead_created", { type: "customer_action" }),
  trial_click: () =>
    measure("custom", { type: "custom" }, { custom_event_name: "trial_click" }),
  whatsapp_click: () =>
    measure("custom", { type: "custom" }, { custom_event_name: "whatsapp_click" }),
};

export function track(
  event: AnalyticsEvent,
  params: Record<string, string | number | boolean> = {}
) {
  if (typeof window === "undefined") return;
  const w = window as GTMWindow;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ ...params, event });

  OPENAI_EVENTS[event]?.();
}
