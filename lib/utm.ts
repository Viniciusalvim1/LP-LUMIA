// ─────────────────────────────────────────────────────────────
// Preserva os parâmetros de campanha ao enviar o visitante da LP
// para o cadastro em app.lumiaclin.com.br. Sem isso a atribuição
// do trial se perde no salto entre domínios e o Ads/Meta não
// consegue amarrar o cadastro ao anúncio que o gerou.
// ─────────────────────────────────────────────────────────────

const FORWARDED_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "ttclid",
  "msclkid",
];

/**
 * Copia os parâmetros de campanha da URL atual para a URL de destino.
 * No servidor devolve a URL base intacta — o upgrade acontece na
 * hidratação, então o link continua funcionando sem JS.
 */
export function withCampaignParams(baseUrl: string): string {
  if (typeof window === "undefined") return baseUrl;

  const incoming = new URLSearchParams(window.location.search);
  const forwarded = new URLSearchParams();

  for (const key of FORWARDED_PARAMS) {
    const value = incoming.get(key);
    if (value) forwarded.set(key, value);
  }

  const query = forwarded.toString();
  if (!query) return baseUrl;

  // O app usa fragmento (#signup) — a query precisa vir antes dele.
  const [path, hash] = baseUrl.split("#");
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}${query}${hash ? `#${hash}` : ""}`;
}
