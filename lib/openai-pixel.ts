// ─────────────────────────────────────────────────────────────
// Pixel de conversão do ChatGPT Ads (OpenAI).
//
// O SDK (oaiq) é carregado no <head> pelo componente OpenAIPixel e
// expõe a fila global `oaiq`. Os eventos NÃO são disparados aqui:
// quem dispara é lib/analytics.ts, espelhando o que já vai para o
// dataLayer do GTM — assim existe um único ponto de instrumentação.
//
// Atribuição: ao inicializar, o SDK lê o parâmetro `oppref` da URL e
// grava um cookie first-party. Por isso `oppref` também é repassado
// para app.lumiaclin.com.br em lib/utm.ts (o cadastro do trial, que é
// a conversão de verdade, acontece no outro domínio).
//
// Docs: https://developers.openai.com/ads/measurement-pixel
// ─────────────────────────────────────────────────────────────

export const OPENAI_PIXEL_ID = "87qoxPh6WXN83VYQpT5PeX";

/** Snippet oficial de bootstrap do SDK. Injetado no <head>. */
export const OPENAI_PIXEL_SNIPPET =
  `!function(w,d,s,u){if(w.oaiq)return;var q=function(){q.q.push(arguments)};q.q=[];w.oaiq=q;` +
  `var j=d.createElement(s);j.async=1;j.src=u;var f=d.getElementsByTagName(s)[0];` +
  `f.parentNode.insertBefore(j,f)}(window,document,"script","https://bzrcdn.openai.com/sdk/oaiq.min.js");` +
  `oaiq("init",{pixelId:"${OPENAI_PIXEL_ID}"${process.env.NODE_ENV !== "production" ? ",debug:true" : ""}});`;

/** Eventos padrão do catálogo da OpenAI usados pela LP. */
type OpenAIEventName =
  | "lead_created"
  | "registration_completed"
  | "trial_started"
  | "custom";

type OpenAIEventData = {
  /** Formato do payload esperado pela OpenAI para esse evento. */
  type: "customer_action" | "contents" | "plan_enrollment" | "custom";
  amount?: number;
  currency?: string;
};

type OpenAIOptions = {
  /** Usado para deduplicar com a Conversions API, se um dia entrar. */
  event_id?: string;
  /** Obrigatório quando o evento é "custom". */
  custom_event_name?: string;
};

type OaiqWindow = Window & {
  oaiq?: (command: string, ...args: unknown[]) => void;
};

function newEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/**
 * Dispara um evento de conversão no pixel da OpenAI.
 * Silencioso se o SDK não carregou (bloqueador de anúncio, offline etc.) —
 * analytics nunca pode quebrar a página.
 */
export function measure(
  name: OpenAIEventName,
  data: OpenAIEventData,
  options: OpenAIOptions = {}
) {
  if (typeof window === "undefined") return;
  const w = window as OaiqWindow;
  if (typeof w.oaiq !== "function") return;

  w.oaiq("measure", name, data, { event_id: newEventId(), ...options });
}
