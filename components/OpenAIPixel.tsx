import { OPENAI_PIXEL_SNIPPET } from "@/lib/openai-pixel";

/**
 * Carrega o SDK do pixel do ChatGPT Ads.
 *
 * Usa <script> cru em vez de next/script de propósito: com
 * `beforeInteractive` o Next injeta o snippet só no bootstrap do
 * cliente, e a OpenAI pede o script no HTML inicial — o SDK precisa
 * ler o `oppref` da URL o quanto antes para gravar o cookie de
 * atribuição. Assim o snippet sai no HTML servido e roda durante o
 * parse, antes de qualquer conteúdo da página (o React acaba
 * posicionando-o no início do <body>, não no <head>, mas ainda é o
 * primeiro script da página a executar).
 *
 * O snippet em si é minúsculo e cria a tag do SDK com async, então
 * não bloqueia o carregamento.
 */
export default function OpenAIPixel() {
  return (
    <script
      id="openai-pixel"
      dangerouslySetInnerHTML={{ __html: OPENAI_PIXEL_SNIPPET }}
    />
  );
}
