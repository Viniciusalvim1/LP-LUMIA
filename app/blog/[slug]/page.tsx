import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTAFinalSection from "@/components/CTAFinalSection";
import Starfield from "@/components/Starfield";
import { getPostBySlug, getAllSlugs, getPosts, categoryColors, formatPostDate } from "@/lib/blog";
import Image from "next/image";
import { site } from "@/lib/site";

function youtubeId(url: string): string | null {
  const m = url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}

// Extrai pares pergunta/resposta dos blocos <details>/<summary> do HTML
function extractFaqs(html: string): { q: string; a: string }[] {
  const faqs: { q: string; a: string }[] = [];
  const detailsRe = /<details[^>]*>([\s\S]*?)<\/details>/gi;
  let match;
  while ((match = detailsRe.exec(html)) !== null) {
    const inner = match[1];
    const summaryMatch = inner.match(/<summary[^>]*>([\s\S]*?)<\/summary>/i);
    const answerMatch = inner.match(/<\/summary>([\s\S]*?)$/i);
    if (!summaryMatch || !answerMatch) continue;
    const q = summaryMatch[1].replace(/<[^>]+>/g, "").trim();
    const a = answerMatch[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (q && a) faqs.push({ q, a });
  }
  return faqs;
}

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const slugs = await getAllSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post não encontrado — Lumia" };
  const url = `${site.url}/blog/${slug}`;
  const coverUrl = post.cover ? `${site.url}${post.cover}` : site.logo;
  return {
    title: `${post.title} — Blog Lumia`,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url,
      siteName: site.name,
      locale: "pt_BR",
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: coverUrl, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [coverUrl],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const all = await getPosts(24);
  const others = all.filter((p) => p.slug !== post.slug);
  // mesma categoria primeiro, depois outros — para os dois blocos
  const sameCategory = others.filter((p) => p.category === post.category);
  const different = others.filter((p) => p.category !== post.category);
  const internalLinks = [...sameCategory, ...different].slice(0, 4); // bloco "Leia também"
  const related = [...sameCategory, ...different].slice(0, 3);       // cards no rodapé

  const hasContent = !!post.content?.trim();
  const faqs = post.content ? extractFaqs(post.content) : [];
  const postUrl = `${site.url}/blog/${post.slug}`;
  const coverUrl = post.cover ? `${site.url}${post.cover}` : site.logo;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": postUrl,
    headline: post.title,
    description: post.excerpt,
    url: postUrl,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "pt-BR",
    image: { "@type": "ImageObject", url: coverUrl, width: 1200, height: 630 },
    author: {
      "@type": "Person",
      name: post.author,
      worksFor: { "@type": "Organization", name: site.name, url: site.url },
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      logo: { "@type": "ImageObject", url: site.logo },
    },
    isPartOf: { "@type": "Blog", "@id": `${site.url}/blog`, name: "Blog Lumia", url: `${site.url}/blog` },
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    articleSection: post.category,
    keywords: post.title.toLowerCase().split(" ").filter(w => w.length > 4).join(", "),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: site.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
    ],
  };

  const faqSchema = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <Navbar />

      {/* ── Hero do artigo ── */}
      <article>
        <div
          data-navbar-theme="dark"
          className="relative overflow-hidden pt-[140px] pb-16"
          style={{ background: post.cover ? "#0d1a28" : post.gradient }}
        >
          {post.cover && (
            <>
              <Image
                src={post.cover}
                alt={post.title}
                fill
                priority
                sizes="100vw"
                className="object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0d1a28]/70 to-[#0d1a28]/95" />
            </>
          )}
          {!post.cover && <Starfield count={90} seed={9} />}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(76,183,148,0.10)_0%,transparent_55%)] pointer-events-none" />

          <div className="relative z-10 max-w-[760px] mx-auto px-5 lg:px-8">
            {/* Breadcrumb visual */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-1.5 text-[13px] text-white/50" style={{ fontFamily: "var(--font-display)" }}>
                <li><a href="/" className="hover:text-white transition-colors">Início</a></li>
                <li aria-hidden="true" className="text-white/30">›</li>
                <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
                <li aria-hidden="true" className="text-white/30">›</li>
                <li className="text-white/80 truncate max-w-[200px] sm:max-w-xs">{post.category}</li>
              </ol>
            </nav>
            <a
              href="/blog"
              className="inline-flex items-center gap-2 text-[14px] text-white/60 hover:text-white transition-colors mb-7"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Voltar ao blog
            </a>

            <span
              className="inline-block text-[12px] font-semibold px-3 py-1 rounded-full mb-5"
              style={{ fontFamily: "var(--font-display)", background: categoryColors[post.category], color: "#fff" }}
            >
              {post.category}
            </span>

            <h1
              className="text-[30px] md:text-[42px] font-bold leading-[1.18] tracking-[-0.01em] text-white mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {post.title}
            </h1>

            <div
              className="flex items-center gap-3 text-[14px] text-white/55"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <div className="w-9 h-9 rounded-full bg-[#4CB794] flex items-center justify-center text-[13px] font-bold text-white">
                {post.author.charAt(0)}
              </div>
              <span className="text-white/80">{post.author}</span>
              <span>·</span>
              <span>{formatPostDate(post.date)}</span>
              <span>·</span>
              <span>{post.readMinutes} min de leitura</span>
            </div>
          </div>
        </div>

        {/* ── Corpo ── */}
        <div data-navbar-theme="light" className="bg-white py-14 md:py-20">
          <div className="max-w-[720px] mx-auto px-5 lg:px-8">
            {/* Lead = excerpt */}
            <p
              className="text-[19px] md:text-[21px] leading-[1.6] text-[#183A51] font-medium mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {post.excerpt}
            </p>

            {/* ── Leia também (links internos) ── */}
            {internalLinks.length > 0 && (
              <aside
                className="mb-10 rounded-2xl border border-[#e8f0eb] bg-[#f4fbf7] px-6 py-5"
                aria-label="Artigos relacionados"
              >
                <p
                  className="text-[12px] font-semibold uppercase tracking-widest text-[#4CB794] mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Leia também
                </p>
                <ul className="flex flex-col gap-2">
                  {internalLinks.map((p) => (
                    <li key={p.slug} className="flex items-start gap-2">
                      <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-[#4CB794] shrink-0" />
                      <a
                        href={`/blog/${p.slug}`}
                        className="text-[15px] text-[#183A51] hover:text-[#1673A3] transition-colors leading-snug"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {p.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </aside>
            )}

            {hasContent ? (
              <div
                className="blog-prose blog-post"
                dangerouslySetInnerHTML={{ __html: post.content! }}
              />
            ) : (
              <div className="rounded-xl bg-[#F7F7F7] border border-gray-100 p-8 text-center">
                <p className="text-[15px] text-[#69727D]" style={{ fontFamily: "var(--font-display)" }}>
                  ✍️ Conteúdo completo deste artigo em breve.
                </p>
              </div>
            )}

            {/* ── Veja na prática (vídeo tutorial) ── */}
            {post.videoUrl && (
              <div className="mt-14 pt-10 border-t border-gray-100">
                <p
                  className="text-[12px] font-semibold uppercase tracking-widest text-[#4CB794] mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Veja na prática
                </p>
                <h2
                  className="text-[20px] font-semibold text-[#183A51] mb-5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Tutorial em vídeo: como funciona no sistema
                </h2>
                {youtubeId(post.videoUrl) ? (
                  <div className="relative w-full rounded-2xl overflow-hidden shadow-lg" style={{ paddingBottom: "56.25%" }}>
                    <iframe
                      src={`https://www.youtube.com/embed/${youtubeId(post.videoUrl)}`}
                      title={`Tutorial: ${post.title}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                      className="absolute inset-0 w-full h-full border-0"
                    />
                  </div>
                ) : (
                  <video
                    controls
                    playsInline
                    preload="none"
                    className="w-full rounded-2xl shadow-lg"
                  >
                    <source src={post.videoUrl} type="video/mp4" />
                  </video>
                )}
              </div>
            )}

            {/* ── Continue lendo (cards rodapé) ── */}
            {related.length > 0 && (
              <nav className="mt-16 pt-10 border-t border-gray-100" aria-label="Continue lendo">
                <h2
                  className="text-[20px] font-semibold text-[#183A51] mb-6"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Continue lendo
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {related.map((r) => (
                    <a
                      key={r.slug}
                      href={`/blog/${r.slug}`}
                      title={r.title}
                      className="group rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="relative h-24" style={{ background: r.gradient }}>
                        {r.cover && (
                          <Image
                            src={r.cover}
                            alt={r.title}
                            fill
                            sizes="(max-width: 640px) 100vw, 33vw"
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="p-4">
                        <span
                          className="text-[11px] font-semibold uppercase tracking-wider"
                          style={{ fontFamily: "var(--font-display)", color: categoryColors[r.category] }}
                        >
                          {r.category}
                        </span>
                        <h3
                          className="text-[14px] font-semibold text-[#183A51] leading-[1.35] mt-1 group-hover:text-[#1673A3] transition-colors"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {r.title}
                        </h3>
                      </div>
                    </a>
                  ))}
                </div>
              </nav>
            )}
          </div>
        </div>
      </article>

      {/* CTA + Footer */}
      <div data-navbar-theme="dark"><CTAFinalSection /></div>
      <div data-navbar-theme="dark"><Footer /></div>
    </>
  );
}
