import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTAFinalSection from "@/components/CTAFinalSection";
import FeaturesSidebar from "@/components/features/FeaturesSidebar";
import FeatureBlock from "@/components/features/FeatureBlock";
import TrustSection from "@/components/features/TrustSection";
import IntegrationsSection from "@/components/features/IntegrationsSection";
import Starfield from "@/components/Starfield";
import { featureCategories, allFeatures } from "@/content/features";

export const metadata: Metadata = {
  title: "Funcionalidades — Lumia CRM para Clínicas de Estética",
  description:
    "Conheça em detalhe tudo que o Lumia faz: agenda, funil de vendas, vendas, financeiro, clientes 360º, atendimento com assinatura digital, automações e relatórios.",
};

export default function FuncionalidadesPage() {
  return (
    <>
      <Navbar />

      {/* ── Hero da página ── */}
      <section
        data-navbar-theme="dark"
        className="relative overflow-hidden pt-[140px] pb-20"
        style={{ backgroundColor: "#183A51" }}
      >
        <Starfield count={120} seed={5} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(76,183,148,0.12)_0%,transparent_60%)] pointer-events-none" />

        <div className="relative z-10 max-w-[900px] mx-auto px-5 lg:px-12 text-center">
          <span
            className="inline-block bg-[#4CB794]/20 text-[#4CB794] text-[14px] font-medium px-4 py-1.5 rounded-full mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Funcionalidades completas
          </span>
          <h1
            className="text-[32px] sm:text-[40px] md:text-[52px] font-bold leading-[1.12] tracking-[-0.02em] text-white mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Tudo que o Lumia faz{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #4CB794, #1673A3)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              pela sua clínica
            </span>
          </h1>
          <p
            className="text-[17px] leading-[1.7] text-white/65 max-w-[620px] mx-auto mb-10"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Da captação do lead ao pós-atendimento — agenda, vendas, financeiro, clientes e automações em um só sistema. Explore cada módulo em detalhe.
          </p>

          {/* Chips de categoria — âncora */}
          <div className="flex flex-wrap gap-2 justify-center">
            {featureCategories.map((c) => (
              <a
                key={c.id}
                href={`#${c.features[0].id}`}
                className="px-4 py-2 rounded-full text-[14px] font-medium border border-white/15 text-white/80 hover:bg-white/10 hover:text-white transition-colors duration-200"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {c.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Corpo: sidebar + features ── */}
      <div data-navbar-theme="light" className="bg-white">
        <div className="max-w-[1340px] mx-auto px-5 lg:pl-8 lg:pr-12 py-8 lg:py-14">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 xl:gap-16">
            <FeaturesSidebar />

            <div className="flex-1 min-w-0 max-w-[860px]">
              {featureCategories.map((cat) => (
                <div key={cat.id}>
                  {/* Divisor de categoria */}
                  <div className="flex items-center gap-4 py-8 first:pt-0">
                    <h2
                      className="text-[14px] font-semibold uppercase tracking-widest text-[#4CB794] shrink-0"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {cat.label}
                    </h2>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>

                  {cat.features.map((feature) => (
                    <FeatureBlock
                      key={feature.id}
                      feature={feature}
                      index={allFeatures.indexOf(feature)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Confiança ── */}
      <div data-navbar-theme="dark">
        <TrustSection />
      </div>

      {/* ── Integrações ── */}
      <div data-navbar-theme="light">
        <IntegrationsSection />
      </div>

      {/* ── CTA final ── */}
      <div data-navbar-theme="dark">
        <CTAFinalSection />
      </div>

      {/* ── Footer ── */}
      <div data-navbar-theme="dark">
        <Footer />
      </div>
    </>
  );
}
