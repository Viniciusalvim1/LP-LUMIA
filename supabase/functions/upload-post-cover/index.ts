// ─────────────────────────────────────────────────────────────
// upload-post-cover — persiste a capa de um post no Storage
//
// Contrato (JSON, nunca multipart — o chamador é um agente):
//   POST  apikey: sb_secret_...   (chave nomeada "blog-agent")
//
//   Rota preferencial — bytes direto, sem depender de URL externa:
//   { "slug": "...", "image_base64": "...", "mime_type": "image/png", "alt_text": "..." }
//
//   Fallback — só para hosts na allowlist:
//   { "slug": "...", "image_url": "https://...", "alt_text": "..." }
//
//   → { "success": true, "slug": "...", "cover_url": "https://...", "reused": false }
//
// base64 é a rota principal de propósito: a API de imagens da OpenAI
// devolve `b64_json`, então não há URL temporária para expirar nem host
// externo para manter numa allowlist.
//
// A função é deliberadamente burra: recebe, valida, guarda, atualiza.
// A geração da imagem e o Brand System ficam no agente — assim mudar o
// estilo visual não exige redeploy.
//
// Requer no config.toml:  verify_jwt = false
// (o chamador autentica por secret key no header `apikey`, e a checagem
// de plataforma só aceita JWT de usuário — que não existe neste fluxo)
// ─────────────────────────────────────────────────────────────
import { withSupabase } from "npm:@supabase/server";

const BUCKET = "blog-covers";
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB — capa é ~440 KB

// Extensão sai do content-type validado, nunca do nome do arquivo nem de
// um valor fixo: gravar bytes PNG num arquivo .webp faz o nome mentir.
const TIPOS_ACEITOS: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
};

// Allowlist contra SSRF: sem ela, `fetch(image_url)` transforma esta
// função num proxy para qualquer endereço alcançável — incluindo IPs
// internos. Configurável por env var para adicionar host sem redeploy.
//
// Entrada iniciada por ponto casa subdomínio (".oaiusercontent.com" aceita
// "files.oaiusercontent.com"); qualquer outra exige host exato. O ponto à
// esquerda é o que impede "evil-oaiusercontent.com" de passar.
const HOSTS_PERMITIDOS = (Deno.env.get("COVER_ALLOWED_HOSTS") ?? "")
  .split(",")
  .map((h) => h.trim().toLowerCase())
  .filter(Boolean);

function hostAutorizado(hostname: string): boolean {
  const host = hostname.toLowerCase();
  return HOSTS_PERMITIDOS.some((permitido) =>
    permitido.startsWith(".") ? host.endsWith(permitido) : host === permitido
  );
}

/** Alt text vai para o HTML da página — tira tag e limita tamanho. */
function limparAlt(texto: string): string {
  return texto
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 200);
}

function erro(mensagem: string, status: number) {
  return Response.json({ success: false, error: mensagem }, { status });
}

/** Baixa a imagem de uma origem autorizada, validando antes e depois. */
async function baixarDaUrl(url: string): Promise<{ bytes: Uint8Array; tipo: string }> {
  let alvo: URL;
  try {
    alvo = new URL(url);
  } catch {
    throw new Error("image_url inválida");
  }
  if (alvo.protocol !== "https:") throw new Error("image_url precisa ser https");
  if (!hostAutorizado(alvo.hostname)) {
    throw new Error(`host não autorizado: ${alvo.hostname}`);
  }

  const resposta = await fetch(alvo, { redirect: "error" });
  if (!resposta.ok) throw new Error(`origem respondeu ${resposta.status}`);

  const tipo = (resposta.headers.get("content-type") ?? "").split(";")[0].trim();
  if (!TIPOS_ACEITOS[tipo]) throw new Error(`content-type não aceito: ${tipo || "ausente"}`);

  const declarado = Number(resposta.headers.get("content-length") ?? 0);
  if (declarado > MAX_BYTES) throw new Error("imagem acima de 5 MB");

  const bytes = new Uint8Array(await resposta.arrayBuffer());
  if (bytes.byteLength > MAX_BYTES) throw new Error("imagem acima de 5 MB");
  if (bytes.byteLength === 0) throw new Error("imagem vazia");

  return { bytes, tipo };
}

function decodificarBase64(b64: string, tipo: string): { bytes: Uint8Array; tipo: string } {
  if (!TIPOS_ACEITOS[tipo]) throw new Error(`mime_type não aceito: ${tipo}`);
  const limpo = b64.replace(/^data:[^;]+;base64,/, "");
  const bin = atob(limpo);
  if (bin.length > MAX_BYTES) throw new Error("imagem acima de 5 MB");
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return { bytes, tipo };
}

/** Hash do conteúdo → caminho único por versão da capa. */
async function hashCurto(bytes: Uint8Array): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest).slice(0, 4))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default {
  fetch: withSupabase({ auth: "secret:blog-agent" }, async (req: Request, ctx) => {
    if (req.method !== "POST") return erro("use POST", 405);

    let corpo: Record<string, unknown>;
    try {
      corpo = await req.json();
    } catch {
      return erro("corpo precisa ser JSON", 400);
    }

    const slug = typeof corpo.slug === "string" ? corpo.slug.trim() : "";
    // Slug entra em caminho de arquivo — restringir o alfabeto evita
    // travessia de diretório (../) e nomes que quebram a URL pública.
    if (!/^[a-z0-9-]{3,120}$/.test(slug)) {
      return erro("slug inválido (use a-z, 0-9 e hífen)", 400);
    }

    // base64 primeiro: é a rota preferencial e não depende de rede.
    let imagem: { bytes: Uint8Array; tipo: string };
    try {
      if (typeof corpo.image_base64 === "string" && corpo.image_base64) {
        imagem = decodificarBase64(corpo.image_base64, String(corpo.mime_type ?? ""));
      } else if (typeof corpo.image_url === "string" && corpo.image_url) {
        imagem = await baixarDaUrl(corpo.image_url);
      } else {
        return erro("informe image_base64 (preferencial) ou image_url", 400);
      }
    } catch (e) {
      return erro(e instanceof Error ? e.message : "falha ao obter a imagem", 400);
    }

    const supabase = ctx.supabaseAdmin;

    // O post precisa existir antes: sem esta checagem, um slug errado
    // deixaria um arquivo órfão no bucket e responderia sucesso.
    const { data: post, error: erroBusca } = await supabase
      .from("posts")
      .select("slug")
      .eq("slug", slug)
      .maybeSingle();
    if (erroBusca) return erro(`falha ao consultar o post: ${erroBusca.message}`, 500);
    if (!post) return erro(`post não encontrado: ${slug}`, 404);

    // Caminho único por versão. No plano Free não há Smart CDN nem API de
    // purge, então sobrescrever o mesmo caminho deixaria a capa antiga em
    // cache sem forma de forçar a troca.
    const arquivo = `cover-${await hashCurto(imagem.bytes)}.${TIPOS_ACEITOS[imagem.tipo]}`;
    const caminho = `${slug}/${arquivo}`;

    // Mesmo conteúdo → mesmo hash → mesmo caminho. Se o objeto já está lá,
    // pula o upload e segue para garantir cover_url/cover_alt: reenviar a
    // mesma capa vira no-op em vez de erro. Consultar antes é mais robusto
    // do que interpretar a mensagem de erro do upload.
    const { data: existentes } = await supabase.storage
      .from(BUCKET)
      .list(slug, { search: arquivo, limit: 1 });
    const jaExiste = (existentes ?? []).some((o) => o.name === arquivo);

    if (!jaExiste) {
      const { error: erroUpload } = await supabase.storage
        .from(BUCKET)
        .upload(caminho, imagem.bytes, {
          contentType: imagem.tipo,
          cacheControl: "31536000", // 1 ano: o caminho muda a cada versão
          upsert: false,
        });
      if (erroUpload) return erro(`falha no upload: ${erroUpload.message}`, 500);
    }

    const { data: publica } = supabase.storage.from(BUCKET).getPublicUrl(caminho);
    const coverUrl = publica.publicUrl;

    // Escrita restrita: o corpo da requisição nunca escolhe tabela nem
    // coluna. Só estas três mudam, sempre.
    const alteracoes: Record<string, string> = {
      cover_url: coverUrl,
      updated_at: new Date().toISOString(),
    };
    if (typeof corpo.alt_text === "string") {
      const alt = limparAlt(corpo.alt_text);
      if (alt) alteracoes.cover_alt = alt;
    }

    const { error: erroUpdate } = await supabase
      .from("posts")
      .update(alteracoes)
      .eq("slug", slug);
    if (erroUpdate) return erro(`falha ao atualizar o post: ${erroUpdate.message}`, 500);

    return Response.json({ success: true, slug, cover_url: coverUrl, reused: jaExiste });
  }),
};
