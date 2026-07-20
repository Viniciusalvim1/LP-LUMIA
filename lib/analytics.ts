// ─────────────────────────────────────────────────────────────
// Helper de tracking via dataLayer do Google Tag Manager.
// Uso: track("trial_click", { location: "hero" })
// ─────────────────────────────────────────────────────────────

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

export function track(
  event: AnalyticsEvent,
  params: Record<string, string | number | boolean> = {}
) {
  if (typeof window === "undefined") return;
  const w = window as GTMWindow;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ ...params, event });
}
