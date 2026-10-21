import { featureCategories, FEATURES_PLANO_CRM } from "@/content/features";
import { site } from "@/lib/site";

/**
 * Funcionalidades para o portal do parceiro (app.lumiaclin.com.br/parceiro).
 * Fonte única: content/features.ts — editar aqui atualiza a LP, a proposta e o portal.
 * Vídeos com URL absoluta em /videos — o mesmo caminho que a página /funcionalidades
 * usa (FeatureBlock). NEXT_PUBLIC_BLOB_BASE_URL aponta para um Blob sem os arquivos (404).
 */
export const dynamic = "force-static";


function video(key?: string, url?: string) {
  if (url) return { mp4: url, webm: null, poster: null };
  if (!key) return null;
  const base = `${site.url.replace(/\/$/, "")}/videos`;
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
