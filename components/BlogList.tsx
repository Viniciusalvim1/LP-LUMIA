"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { categoryColors, formatPostDate, type BlogPost, type BlogCategory } from "@/lib/blog";
import { track } from "@/lib/analytics";

const CATEGORIES: (BlogCategory | "Todos")[] = ["Todos", "Gestão", "Marketing", "Vendas", "Atendimento"];

export default function BlogList({ posts, hideFilter }: { posts: BlogPost[]; hideFilter?: boolean }) {
  const [filter, setFilter] = useState<BlogCategory | "Todos">("Todos");
  const visible = hideFilter ? posts : (filter === "Todos" ? posts : posts.filter((p) => p.category === filter));

  return (
    <div>
      {/* Filtro */}
      {!hideFilter && <div className="flex flex-wrap gap-2 justify-center mb-12">
        {CATEGORIES.map((cat) => {
          const active = filter === cat;
          return (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="px-4 py-1.5 rounded-full border-2 text-[14px] font-medium cursor-pointer transition-all duration-200"
              style={{
                fontFamily: "var(--font-display)",
                borderColor: active ? "#4CB794" : "#E0E4E8",
                background: active ? "#4CB794" : "transparent",
                color: active ? "#fff" : "#69727D",
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>}


      {/* Grid */}
      {visible.length === 0 ? (
        <p className="text-center text-[#69727D]" style={{ fontFamily: "var(--font-display)" }}>
          Nenhum artigo nesta categoria ainda.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((post, i) => (
            <motion.a
              key={post.slug}
              href={`/blog/${post.slug}`}
              onClick={() => track("select_blog_post", { slug: post.slug, category: post.category })}
              className="group flex flex-col rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
            >
              {/* Capa */}
              <div className="relative aspect-[16/9] overflow-hidden" style={{ background: post.gradient }}>
                {post.cover && (
                  <Image
                    src={post.cover}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <svg className="absolute right-4 bottom-4 w-9 h-9 text-white/15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C8.5 2 6 5 6 8.5c0 3 1.8 5.5 4.5 6.5L9 22h6l-1.5-7C16.2 14 18 11.5 18 8.5 18 5 15.5 2 12 2z" />
                </svg>
                <div className="absolute top-4 left-4">
                  <span
                    className="inline-block text-[12px] font-semibold px-3 py-1 rounded-full"
                    style={{ fontFamily: "var(--font-display)", background: categoryColors[post.category], color: "#fff" }}
                  >
                    {post.category}
                  </span>
                </div>
              </div>
              {/* Texto */}
              <div className="p-6 flex flex-col flex-1">
                <h3
                  className="text-[18px] font-semibold leading-[1.3] text-[#183A51] mb-2 group-hover:text-[#1673A3] transition-colors duration-200"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {post.title}
                </h3>
                <p
                  className="text-[15px] leading-[1.6] text-[#69727D] mb-4 flex-1"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {post.excerpt}
                </p>
                <div
                  className="flex items-center gap-2 text-[13px] text-[#8a94a0]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  <span>{formatPostDate(post.date)}</span>
                  <span>·</span>
                  <span>{post.readMinutes} min</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      )}
    </div>
  );
}
