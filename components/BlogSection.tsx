"use client";

import { motion } from "framer-motion";
import { categoryColors, formatPostDate, type BlogPost } from "@/lib/blog";
import { track } from "@/lib/analytics";

function CategoryChip({ category }: { category: BlogPost["category"] }) {
  return (
    <span
      className="inline-block text-[12px] font-semibold px-3 py-1 rounded-full"
      style={{
        fontFamily: "var(--font-display)",
        background: categoryColors[category],
        color: "#fff",
      }}
    >
      {category}
    </span>
  );
}

function Meta({ post, light }: { post: BlogPost; light?: boolean }) {
  return (
    <div
      className="flex items-center gap-2 text-[13px]"
      style={{ fontFamily: "var(--font-display)", color: light ? "rgba(255,255,255,0.7)" : "#8a94a0" }}
    >
      <span>{formatPostDate(post.date)}</span>
      <span>·</span>
      <span>{post.readMinutes} min de leitura</span>
    </div>
  );
}

export default function BlogSection({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;
  const [featured, ...rest] = posts;

  return (
    <section id="blog" className="bg-[#F7F7F7] py-20">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span className="section-badge mb-4">Blog Lumia</span>
            <h2
              className="text-[32px] md:text-[38px] font-semibold leading-[1.2] text-[#183A51] mt-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Conteúdo para sua clínica crescer
            </h2>
          </div>
          <a
            href="/blog"
            className="hidden md:inline-flex items-center gap-2 text-[14px] font-semibold text-[#1673A3] hover:gap-3 transition-all duration-200 cursor-pointer shrink-0"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ver todos os artigos
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Editorial grid: destaque + 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Featured */}
          <motion.a
            href={`/blog/${featured.slug}`}
            onClick={() => track("select_blog_post", { slug: featured.slug, category: featured.category })}
            className="group block rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Capa */}
            <div className="relative aspect-[16/9] overflow-hidden" style={{ background: featured.gradient }}>
              {featured.cover && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={featured.cover}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              {/* lua decorativa */}
              <svg className="absolute right-6 top-6 w-16 h-16 text-white/10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C8.5 2 6 5 6 8.5c0 3 1.8 5.5 4.5 6.5L9 22h6l-1.5-7C16.2 14 18 11.5 18 8.5 18 5 15.5 2 12 2z" />
              </svg>
              <div className="absolute top-5 left-5">
                <CategoryChip category={featured.category} />
              </div>
            </div>
            {/* Texto */}
            <div className="p-7">
              <h3
                className="text-[24px] font-semibold leading-[1.25] text-[#183A51] mb-3 group-hover:text-[#1673A3] transition-colors duration-200"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {featured.title}
              </h3>
              <p
                className="text-[16px] leading-[1.65] text-[#69727D] mb-5"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {featured.excerpt}
              </p>
              <Meta post={featured} />
            </div>
          </motion.a>

          {/* 2 menores empilhados */}
          <div className="flex flex-col gap-6">
            {rest.map((post, i) => (
              <motion.a
                key={post.slug}
                href={`/blog/${post.slug}`}
                onClick={() => track("select_blog_post", { slug: post.slug, category: post.category })}
                className="group flex gap-5 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer p-4"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              >
                {/* Capa */}
                <div
                  className="relative w-[140px] sm:w-[180px] shrink-0 rounded-xl overflow-hidden self-stretch min-h-[130px]"
                  style={{ background: post.gradient }}
                >
                  {post.cover && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.cover}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <svg className="absolute right-3 bottom-3 w-8 h-8 text-white/15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2C8.5 2 6 5 6 8.5c0 3 1.8 5.5 4.5 6.5L9 22h6l-1.5-7C16.2 14 18 11.5 18 8.5 18 5 15.5 2 12 2z" />
                  </svg>
                </div>
                {/* Texto */}
                <div className="flex flex-col justify-center py-1 min-w-0">
                  <div className="mb-2">
                    <CategoryChip category={post.category} />
                  </div>
                  <h3
                    className="text-[17px] font-semibold leading-[1.3] text-[#183A51] mb-2 group-hover:text-[#1673A3] transition-colors duration-200"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {post.title}
                  </h3>
                  <Meta post={post} />
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Ver todos — mobile */}
        <div className="mt-8 md:hidden">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#1673A3] cursor-pointer"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ver todos os artigos
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
