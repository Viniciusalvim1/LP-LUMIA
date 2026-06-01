import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTAFinalSection from "@/components/CTAFinalSection";
import Starfield from "@/components/Starfield";
import { getPostBySlug, getAllSlugs, getPosts, categoryColors, formatPostDate } from "@/lib/blog";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post não encontrado — Lumia" };
  return {
    title: `${post.title} — Blog Lumia`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: post.cover ? [{ url: post.cover }] : undefined,
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

  // posts relacionados (mesma categoria ou recentes), exceto o atual
  const all = await getPosts(6);
  const related = all.filter((p) => p.slug !== post.slug).slice(0, 2);

  const paragraphs = (post.content ?? "")
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.cover}
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0d1a28]/70 to-[#0d1a28]/95" />
            </>
          )}
          {!post.cover && <Starfield count={90} seed={9} />}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(76,183,148,0.10)_0%,transparent_55%)] pointer-events-none" />

          <div className="relative z-10 max-w-[760px] mx-auto px-5 lg:px-8">
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

            {paragraphs.length > 0 ? (
              <div className="flex flex-col gap-5">
                {paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-[17px] leading-[1.8] text-[#3a4754]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {p}
                  </p>
                ))}
              </div>
            ) : (
              <div className="rounded-xl bg-[#F7F7F7] border border-gray-100 p-8 text-center">
                <p className="text-[15px] text-[#69727D]" style={{ fontFamily: "var(--font-display)" }}>
                  ✍️ Conteúdo completo deste artigo em breve.
                </p>
              </div>
            )}

            {/* Posts relacionados */}
            {related.length > 0 && (
              <div className="mt-16 pt-10 border-t border-gray-100">
                <h2
                  className="text-[20px] font-semibold text-[#183A51] mb-6"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Continue lendo
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {related.map((r) => (
                    <a
                      key={r.slug}
                      href={`/blog/${r.slug}`}
                      className="group rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="relative h-28" style={{ background: r.gradient }}>
                        {r.cover && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={r.cover} alt="" className="absolute inset-0 w-full h-full object-cover" />
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
                          className="text-[15px] font-semibold text-[#183A51] leading-[1.35] mt-1 group-hover:text-[#1673A3] transition-colors"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {r.title}
                        </h3>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
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
