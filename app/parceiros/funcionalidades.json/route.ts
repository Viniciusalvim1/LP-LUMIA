import { featureCategories, FEATURES_PLANO_CRM } from "@/content/features";
import { site } from "@/lib/site";

/**
 * Funcionalidades para o portal do parceiro (app.lumiaclin.com.br/parceiro).
 * Fonte única: content/features.ts — editar aqui atualiza a LP, a proposta e o portal.
 * Vídeos com URL absoluta (Blob em produção, /videos na falta dele).
 */
export const dynamic = "force-static";

const BLOB = process.env.NEXT_PUBLIC_BLOB_BASE_URL ?? "";

function video(key?: string, url?: string) {
  if (url) return { mp4: url, webm: null, poster: null };
  if (!key) return null;
  const base = BLOB || `${site.url.replace(/\/$/, "")}/videos`;
  return { mp4: `${base}/${key}.mp4`, webm: `${base}/${key}.webm`, poster: `${base}/${key}-poster.jpg` };
}

export function GET() {
  const categorias = featureCategories.map((c) => ({
    id: c.id,
    label: c.label,
    features: c.features.map((f) => ({
      id: f.id,
      nome: f.name,
      resumo: f.tagline,
      descricao: f.description,
      faz: f.canDo,
      automatico: f.automatic ?? [],
      porQueImporta: f.whyMatters,
      planoCrm: FEATURES_PLANO_CRM.has(f.id),
      video: video(f.videoKey, f.videoUrl),
      pagina: `${site.url.replace(/\/$/, "")}/funcionalidades#${f.id}`,
    })),
  }));
  return Response.json(
    { categorias },
    { headers: { "Access-Control-Allow-Origin": "*", "Cache-Control": "public, max-age=3600" } }
  );
}
