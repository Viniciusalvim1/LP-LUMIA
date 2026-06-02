import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Starfield from "@/components/Starfield";
import { company } from "@/lib/site";

export interface LegalSection {
  heading: string;
  body: string[];
}

export default function LegalLayout({
  title,
  updatedAt,
  intro,
  sections,
}: {
  title: string;
  updatedAt: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section
        data-navbar-theme="dark"
        className="relative overflow-hidden pt-[140px] pb-14"
        style={{ backgroundColor: "#183A51" }}
      >
        <Starfield count={90} seed={12} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(76,183,148,0.10)_0%,transparent_55%)] pointer-events-none" />
        <div className="relative z-10 max-w-[760px] mx-auto px-5 lg:px-8">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-[14px] text-white/60 hover:text-white transition-colors mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Voltar para a home
          </a>
          <h1
            className="text-[32px] md:text-[42px] font-bold leading-[1.15] text-white mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h1>
          <p className="text-[14px] text-white/45" style={{ fontFamily: "var(--font-display)" }}>
            Última atualização: {updatedAt}
          </p>
        </div>
      </section>

      {/* Conteúdo */}
      <div data-navbar-theme="light" className="bg-white py-14 md:py-20">
        <div className="max-w-[760px] mx-auto px-5 lg:px-8">
          <p
            className="text-[17px] md:text-[18px] leading-[1.7] text-[#3a4754] mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {intro}
          </p>

          {/* Identificação da empresa */}
          <div
            className="rounded-xl bg-[#F7F7F7] border border-gray-100 p-5 mb-10 text-[14px] leading-[1.7] text-[#69727D]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <p className="font-semibold text-[#183A51] mb-1">{company.legalName}</p>
            <p>CNPJ: {company.cnpj} · NIRE: {company.nire}</p>
            <p>
              {company.address} — {company.city}/{company.state}, CEP {company.cep}
            </p>
          </div>

          <div className="flex flex-col gap-9">
            {sections.map((s, i) => (
              <section key={i}>
                <h2
                  className="text-[20px] font-semibold text-[#183A51] mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {i + 1}. {s.heading}
                </h2>
                <div className="flex flex-col gap-3">
                  {s.body.map((p, j) => (
                    <p
                      key={j}
                      className="text-[16px] leading-[1.75] text-[#69727D]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <p
            className="mt-12 text-[14px] leading-[1.7] text-[#8a94a0] border-t border-gray-100 pt-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Em caso de dúvidas, entre em contato pelo e-mail{" "}
            <a href="mailto:contato@lumiaclin.com.br" className="text-[#1673A3] underline underline-offset-2">
              contato@lumiaclin.com.br
            </a>.
          </p>
        </div>
      </div>

      <div data-navbar-theme="dark"><Footer /></div>
    </>
  );
}
