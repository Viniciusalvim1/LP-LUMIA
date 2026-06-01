import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTAFinalSection from "@/components/CTAFinalSection";
import Starfield from "@/components/Starfield";
import BlogList from "@/components/BlogList";
import { getPosts } from "@/lib/blog";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Blog Lumia — Conteúdo para sua clínica crescer",
  description:
    "Gestão, marketing, vendas e atendimento para clínicas de estética. Estratégias práticas para sua clínica crescer com organização.",
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section
        data-navbar-theme="dark"
        className="relative overflow-hidden pt-[140px] pb-16"
        style={{ backgroundColor: "#183A51" }}
      >
        <Starfield count={110} seed={6} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(76,183,148,0.10)_0%,transparent_55%)] pointer-events-none" />
        <div className="relative z-10 max-w-[760px] mx-auto px-5 lg:px-12 text-center">
          <span
            className="inline-block bg-[#4CB794]/20 text-[#4CB794] text-[14px] font-medium px-4 py-1.5 rounded-full mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Blog Lumia
          </span>
          <h1
            className="text-[34px] md:text-[46px] font-bold leading-[1.15] tracking-[-0.02em] text-white mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Conteúdo para sua{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #4CB794, #6ef5d0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              clínica crescer
            </span>
          </h1>
          <p
            className="text-[17px] leading-[1.7] text-white/60 max-w-[520px] mx-auto"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Gestão, marketing, vendas e atendimento — estratégias práticas para clínicas de estética que querem evoluir.
          </p>
        </div>
      </section>

      {/* Listagem */}
      <div data-navbar-theme="light" className="bg-[#F7F7F7] py-16">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-12">
          <BlogList posts={posts} />
        </div>
      </div>

      <div data-navbar-theme="dark"><CTAFinalSection /></div>
      <div data-navbar-theme="dark"><Footer /></div>
    </>
  );
}
