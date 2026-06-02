// ─────────────────────────────────────────────────────────────
// Helper de tracking do GA4 (gtag via @next/third-parties).
// Uso: track("trial_click", { location: "hero" })
// ─────────────────────────────────────────────────────────────

type GtagWindow = Window & {
  gtag?: (...args: unknown[]) => void;
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
  const w = window as GtagWindow;
  if (typeof w.gtag !== "function") return;
  w.gtag("event", event, params);
}
