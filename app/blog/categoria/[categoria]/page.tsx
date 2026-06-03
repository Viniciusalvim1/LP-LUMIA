import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Starfield from "@/components/Starfield";
import BlogList from "@/components/BlogList";
import {
  getPostsByCategory,
  categoryColors,
  CATEGORY_SLUG,
  CATEGORY_URL_SLUG,
  CATEGORY_DESCRIPTION,
  type BlogCategory,
} from "@/lib/blog";
import { site } from "@/lib/site";

export const revalidate = 300;

export function generateStaticParams() {
  return Object.keys(CATEGORY_SLUG).map((categoria) => ({ categoria }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoria: string }>;
}): Promise<Metadata> {
  const { categoria } = await params;
  const category = CATEGORY_SLUG[categoria];
  if (!category) return { title: "Categoria não encontrada — Blog Lumia" };

  const url = `${site.url}/blog/categoria/${categoria}`;
  return {
    title: `${category} para Clínicas de Estética — Blog Lumia`,
    description: CATEGORY_DESCRIPTION[category],
    alternates: { canonical: url },
    openGraph: {
      title: `${category} para Clínicas de Estética — Blog Lumia`,
      description: CATEGORY_DESCRIPTION[category],
      type: "website",
      url,
      siteName: site.name,
      locale: "pt_BR",
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categoria: string }>;
}) {
  const { categoria } = await params;
  const category = CATEGORY_SLUG[categoria] as BlogCategory;
  if (!category) notFound();

  const posts = await getPostsByCategory(category);
  const categoryUrl = `${site.url}/blog/categoria/${categoria}`;

  // Schema: ItemList + BreadcrumbList
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${category} para Clínicas de Estética — Blog Lumia`,
    description: CATEGORY_DESCRIPTION[category],
    url: categoryUrl,
    numberOfItems: posts.length,
    itemListElement: posts.map((post, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${site.url}/blog/${post.slug}`,
      name: post.title,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: site.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
      { "@type": "ListItem", position: 3, name: category, item: categoryUrl },
    ],
  };

  const color = categoryColors[category];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />

      {/* Hero */}
      <section
        data-navbar-theme="dark"
        className="relative overflow-hidden pt-[140px] pb-16"
        style={{ backgroundColor: "#183A51" }}
      >
        <Starfield count={100} seed={7} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(76,183,148,0.12)_0%,transparent_60%)] pointer-events-none" />

        <div className="relative z-10 max-w-[860px] mx-auto px-5 lg:px-12 text-center">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center justify-center gap-1.5 text-[13px] text-white/50" style={{ fontFamily: "var(--font-display)" }}>
              <li><a href="/" className="hover:text-white transition-colors">Início</a></li>
              <li aria-hidden="true" className="text-white/30">›</li>
              <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
              <li aria-hidden="true" className="text-white/30">›</li>
              <li className="text-white/80">{category}</li>
            </ol>
          </nav>

          <span
            className="inline-block text-[12px] font-semibold px-4 py-1.5 rounded-full mb-5"
            style={{ fontFamily: "var(--font-display)", background: color, color: "#fff" }}
          >
            {category}
          </span>

          <h1
            className="text-[32px] md:text-[44px] font-bold leading-[1.15] tracking-[-0.02em] text-white mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {category} para clínicas de estética
          </h1>

          <p
            className="text-[16px] leading-[1.7] text-white/60 max-w-[560px] mx-auto"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {CATEGORY_DESCRIPTION[category]}
          </p>

          <p className="mt-4 text-[14px] text-white/40" style={{ fontFamily: "var(--font-display)" }}>
            {posts.length} {posts.length === 1 ? "artigo" : "artigos"}
          </p>
        </div>
      </section>

      {/* Links para outras categorias */}
      <div className="bg-white border-b border-gray-100 py-4">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-12 flex flex-wrap gap-2 justify-center">
          <a
            href="/blog"
            className="px-4 py-1.5 rounded-full border-2 text-[14px] font-medium transition-all duration-200"
            style={{ fontFamily: "var(--font-display)", borderColor: "#E0E4E8", color: "#69727D" }}
          >
            Todos
          </a>
          {(Object.entries(CATEGORY_SLUG) as [string, BlogCategory][]).map(([slug, cat]) => {
            const isActive = cat === category;
            return (
              <a
                key={slug}
                href={`/blog/categoria/${slug}`}
                className="px-4 py-1.5 rounded-full border-2 text-[14px] font-medium transition-all duration-200"
                style={{
                  fontFamily: "var(--font-display)",
                  borderColor: isActive ? categoryColors[cat] : "#E0E4E8",
                  background: isActive ? categoryColors[cat] : "transparent",
                  color: isActive ? "#fff" : "#69727D",
                }}
                aria-current={isActive ? "page" : undefined}
              >
                {cat}
              </a>
            );
          })}
        </div>
      </div>

      {/* Listagem */}
      <section data-navbar-theme="light" className="bg-[#F7F7F7] py-16">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-12">
          {posts.length > 0 ? (
            <BlogList posts={posts} hideFilter />
          ) : (
            <p className="text-center text-[#69727D] py-20" style={{ fontFamily: "var(--font-display)" }}>
              Nenhum artigo nesta categoria ainda.
            </p>
          )}
        </div>
      </section>

      <div data-navbar-theme="dark">
        <Footer />
      </div>
    </>
  );
}
