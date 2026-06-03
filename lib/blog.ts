import { getSupabase } from "./supabase";

// ─────────────────────────────────────────────────────────────
// Blog Lumia — leitura dos posts publicados no Supabase
// Tabela: public.posts (RLS: anon lê apenas status = 'published')
// ─────────────────────────────────────────────────────────────

export type BlogCategory = "Gestão" | "Marketing" | "Vendas" | "Atendimento";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  readMinutes: number;
  date: string;        // ISO (published_at)
  cover?: string;      // cover_url
  gradient: string;    // capa-fallback derivada da categoria
  author: string;
  videoUrl?: string;   // video_url (YouTube)
}

export const categoryColors: Record<BlogCategory, string> = {
  "Gestão":      "#183A51",
  "Marketing":   "#1673A3",
  "Vendas":      "#4CB794",
  "Atendimento": "#6E54C8",
};

// Capa-fallback por categoria (usada quando o post não tem cover_url)
const categoryGradients: Record<BlogCategory, string> = {
  "Gestão":      "linear-gradient(135deg, #0a1e2e 0%, #183A51 55%, #1a6a8a 100%)",
  "Marketing":   "linear-gradient(135deg, #0a1a2e 0%, #1673A3 100%)",
  "Vendas":      "linear-gradient(135deg, #0f2a1a 0%, #2ea882 100%)",
  "Atendimento": "linear-gradient(135deg, #1a0a2e 0%, #6E54C8 100%)",
};

// Linha crua vinda do banco (snake_case)
interface PostRow {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  read_minutes: number;
  published_at: string | null;
  cover_url: string | null;
  author_name: string;
  video_url: string | null;
}

function mapRow(row: PostRow): BlogPost {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    readMinutes: row.read_minutes,
    date: row.published_at ?? "",
    cover: row.cover_url ?? undefined,
    gradient: categoryGradients[row.category],
    author: row.author_name,
    videoUrl: row.video_url ?? undefined,
  };
}

/** Posts publicados, mais recentes primeiro. `limit` opcional. */
export async function getPosts(limit?: number): Promise<BlogPost[]> {
  let query = getSupabase()
    .from("posts")
    .select("slug, title, excerpt, category, read_minutes, published_at, cover_url, author_name, video_url")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) {
    console.error("[blog] erro ao buscar posts:", error.message);
    return [];
  }
  return (data as PostRow[]).map(mapRow);
}

export interface BlogPostFull extends BlogPost {
  content?: string;
}

/** Post único (publicado) por slug, com o corpo (content). */
export async function getPostBySlug(slug: string): Promise<BlogPostFull | null> {
  const { data, error } = await getSupabase()
    .from("posts")
    .select("slug, title, excerpt, content, category, read_minutes, published_at, cover_url, author_name, video_url")
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) return null;
  const row = data as PostRow & { content: string | null };
  return { ...mapRow(row), content: row.content ?? undefined };
}

// Mapa de slug de URL → nome real da categoria
export const CATEGORY_SLUG: Record<string, BlogCategory> = {
  gestao:      "Gestão",
  marketing:   "Marketing",
  vendas:      "Vendas",
  atendimento: "Atendimento",
};

export const CATEGORY_URL_SLUG: Record<BlogCategory, string> = {
  "Gestão":      "gestao",
  "Marketing":   "marketing",
  "Vendas":      "vendas",
  "Atendimento": "atendimento",
};

export const CATEGORY_DESCRIPTION: Record<BlogCategory, string> = {
  "Gestão":      "Organização, processos e ferramentas para clínicas de estética crescerem com eficiência.",
  "Marketing":   "Estratégias práticas de marketing digital para atrair e converter mais pacientes.",
  "Vendas":      "Funil de vendas, conversão e técnicas para vender mais serviços na sua clínica.",
  "Atendimento": "Como melhorar a experiência do paciente e fidelizar quem já passou pela sua clínica.",
};

/** Posts de uma categoria específica. */
export async function getPostsByCategory(category: BlogCategory): Promise<BlogPost[]> {
  const { data, error } = await getSupabase()
    .from("posts")
    .select("slug, title, excerpt, category, read_minutes, published_at, cover_url, author_name, video_url")
    .eq("status", "published")
    .eq("category", category)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("[blog] erro ao buscar posts por categoria:", error.message);
    return [];
  }
  return (data as PostRow[]).map(mapRow);
}

/** Slugs de todos os posts publicados — para generateStaticParams. */
export async function getAllSlugs(): Promise<string[]> {
  const { data } = await getSupabase()
    .from("posts")
    .select("slug")
    .eq("status", "published");
  return (data ?? []).map((r) => (r as { slug: string }).slug);
}

/** Slug + data real de publicação — para o sitemap. */
export async function getAllPostsMeta(): Promise<{ slug: string; publishedAt: Date }[]> {
  const { data } = await getSupabase()
    .from("posts")
    .select("slug, published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  return (data ?? []).map((r) => ({
    slug: (r as { slug: string; published_at: string | null }).slug,
    publishedAt: new Date((r as { slug: string; published_at: string | null }).published_at ?? Date.now()),
  }));
}

export function formatPostDate(iso: string): string {
  if (!iso) return "";
  const meses = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, "0")} ${meses[d.getMonth()]} ${d.getFullYear()}`;
}
