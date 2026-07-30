import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Starfield from "@/components/Starfield";
import { site } from "@/lib/site";

const WHATSAPP_URL =
  "https://wa.me/5531983165920?text=Ol%C3%A1%21%20Quero%20participar%20do%20Programa%20de%20Afiliados%20Lumia.";

const platformCapabilities = [
  "Organizar a agenda dos profissionais",
  "Acompanhar leads e oportunidades de venda",
  "Controlar o funil comercial",
  "Cadastrar clientes e histórico de atendimentos",
  "Gerenciar contratos e vendas",
  "Controlar receitas e despesas",
  "Acompanhar relatórios da clínica",
  "Entender quais campanhas e canais trazem mais clientes",
  "Melhorar o atendimento com IA e automações",
  "Ter mais clareza para tomar decisões",
] as const;

const idealFor = [
  {
    title: "Clínicas de estética",
    description: "Operações com vários atendimentos, profissionais e necessidade de controle centralizado.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3c1.8 2.7 3.3 4 6 5-1.2 5.4-3.9 9.4-6 13-2.1-3.6-4.8-7.6-6-13 2.7-1 4.2-2.3 6-5z" />
      </svg>
    ),
  },
  {
    title: "Clínicas de laser",
    description: "Rotinas que exigem agenda precisa, recorrência e acompanhamento comercial constante.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
      </svg>
    ),
  },
  {
    title: "Clínicas de emagrecimento",
    description: "Negócios com jornada comercial mais longa, contratos e acompanhamento de resultados.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 21c4.4-2.6 7-6.2 7-10.4A4.6 4.6 0 0 0 14.4 6c-1 0-1.9.3-2.7.9A4.7 4.7 0 0 0 9 6a4.6 4.6 0 0 0-4.6 4.6C4.4 14.8 7 18.4 12 21z" />
      </svg>
    ),
  },
  {
    title: "Harmonização facial",
    description: "Atendimentos consultivos que dependem de histórico do cliente e processo comercial claro.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3c3.3 0 6 2.7 6 6v3c0 5-2.7 8.2-6 9-3.3-.8-6-4-6-9V9c0-3.3 2.7-6 6-6z" />
        <path d="M9.5 10.5h.01" />
        <path d="M14.5 10.5h.01" />
        <path d="M10 14c.7.7 1.3 1 2 1s1.3-.3 2-1" />
      </svg>
    ),
  },
  {
    title: "Clínicas com equipe comercial",
    description: "Times que precisam controlar leads, oportunidades, follow-ups e conversão de vendas.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="10" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.9" />
        <path d="M16 3.1a4 4 0 0 1 0 7.8" />
      </svg>
    ),
  },
  {
    title: "Leads de Instagram e tráfego pago",
    description: "Operações que recebem volume e precisam responder rápido sem perder oportunidades.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 9h8" />
        <path d="M8 13h5" />
      </svg>
    ),
  },
  {
    title: "Dentistas e clínicas odontológicas",
    description: "Estruturas que também precisam integrar agenda, relacionamento, financeiro e gestão.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M7.5 4.5c1.4 0 2.2.7 4.5.7s3.1-.7 4.5-.7A2.5 2.5 0 0 1 19 7c0 5.2-1.6 12-4 12-1.2 0-1.4-2.2-3-2.2S10.2 19 9 19c-2.4 0-4-6.8-4-12a2.5 2.5 0 0 1 2.5-2.5z" />
      </svg>
    ),
  },
  {
    title: "Quem ainda usa planilha e papel",
    description: "Negócios que querem sair da operação manual e ganhar previsibilidade para crescer.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M8 13h8" />
        <path d="M8 17h5" />
      </svg>
    ),
  },
] as const;

const affiliateSteps = [
  {
    step: "1",
    title: "Você indica a clínica",
    description:
      "Compartilhe a Lumia com clínicas que já precisam organizar melhor comercial, agenda, financeiro e operação.",
  },
  {
    step: "2",
    title: "Nosso time faz a apresentação",
    description:
      "A equipe Lumia entra em contato, demonstra o sistema e conduz toda a negociação comercial.",
  },
  {
    step: "3",
    title: "Você recebe pela indicação fechada",
    description:
      "Se a clínica fechar com a Lumia, você recebe R$ 349,90 por aquela indicação.",
  },
] as const;

const opportunityPoints = [
  "Muitas clínicas crescem sem processo e acabam perdendo leads, retornos e visibilidade sobre os números.",
  "A Lumia resolve isso centralizando agenda, CRM, financeiro, contratos, relatórios e automações em um só lugar.",
  "Sua parte é simples: indicar clínicas boas e qualificadas.",
  "Nossa parte é vender, implantar e dar suporte para a operação continuar rodando.",
] as const;

export const metadata: Metadata = {
  title: "Programa de Afiliados",
  description:
    "Indique clínicas para a Lumia e receba R$ 349,90 por indicação fechada. Veja como funciona o programa de afiliados.",
  alternates: {
    canonical: "/afiliados",
  },
  openGraph: {
    title: "Programa de Afiliados Lumia",
    description:
      "Indique clínicas para a Lumia. Se fechar, você recebe R$ 349,90 por indicação fechada.",
    url: `${site.url}/afiliados`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Programa de Afiliados Lumia",
    description:
      "Indique clínicas para a Lumia e receba R$ 349,90 por indicação fechada.",
  },
};

function SectionTitle({
  badge,
  title,
  description,
  centered = false,
}: {
  badge: string;
  title: string;
  description?: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "text-center max-w-[820px] mx-auto" : "max-w-[820px]"}>
      <span className="section-badge mb-4">{badge}</span>
      <h2
        className="text-[30px] md:text-[38px] font-semibold leading-[1.15] text-[#183A51] mt-4"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h2>
      {description ? (
        <p
          className="text-[16px] md:text-[17px] leading-[1.75] text-[#69727D] mt-5"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default function AfiliadosPage() {
  return (
    <>
      <Navbar />

      <section
        data-navbar-theme="dark"
        className="relative overflow-hidden pt-[140px] pb-24"
        style={{ backgroundColor: "#183A51" }}
      >
        <Starfield count={120} seed={8} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(76,183,148,0.16)_0%,transparent_58%)] pointer-events-none" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-10 items-center">
            <div className="max-w-[760px]">
              <span
                className="inline-block bg-[#4CB794]/20 text-[#4CB794] text-[14px] font-medium px-4 py-1.5 rounded-full mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Programa de Afiliados Lumia
              </span>

              <h1
                className="text-[36px] sm:text-[46px] md:text-[58px] font-bold leading-[1.06] tracking-[-0.03em] text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Indique clínicas para a Lumia e receba{" "}
                <span className="headline-highlight">R$ 349,90 por contrato fechado</span>
              </h1>

              <p
                className="text-[17px] md:text-[19px] leading-[1.8] text-white/72 mt-6 max-w-[680px]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Você conecta a Lumia com clínicas que precisam organizar melhor a operação. Nosso time apresenta o sistema, faz a demonstração e conduz a negociação.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-9">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full px-7 py-4 text-[15px] font-semibold text-white bg-[#4CB794] hover:bg-[#3da882] transition-colors"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Quero participar do programa
                </a>
                <a
                  href="#como-funciona"
                  className="inline-flex items-center justify-center rounded-full px-7 py-4 text-[15px] font-semibold text-white border border-white/18 hover:bg-white/8 transition-colors"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Ver como funciona
                </a>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/12 bg-white/8 backdrop-blur-sm p-7 lg:p-8">
              <p
                className="text-[13px] uppercase tracking-[0.22em] text-[#4CB794]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Resumo rápido
              </p>
              <div className="mt-5 space-y-5">
                {[
                  ["Indicação fechada", "R$ 349,90 para você"],
                  ["Sua função", "Indicar clínicas qualificadas"],
                  ["Nossa função", "Apresentar, vender, implantar e dar suporte"],
                ].map(([label, value]) => (
                  <div key={label} className="border-b border-white/10 pb-5 last:border-b-0 last:pb-0">
                    <p
                      className="text-[14px] text-white/55 mb-1"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {label}
                    </p>
                    <p
                      className="text-[21px] leading-[1.35] font-semibold text-white"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section data-navbar-theme="light" className="bg-white py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-12">
          <SectionTitle
            badge="Sobre a Lumia"
            title="O que é a Lumia?"
            description="A Lumia é um sistema completo para clínicas de estética que querem organizar melhor sua operação, vender mais e ter mais controle sobre o negócio. Em vez de usar uma ferramenta para agenda, outra para financeiro, outra para CRM e ainda depender de planilhas, a clínica centraliza tudo em uma única plataforma."
          />

          <div className="mt-8">
            <a
              href="/funcionalidades"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-[15px] font-semibold text-white bg-[#183A51] hover:bg-[#102a3b] transition-colors"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Ver funcionalidades
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
            {platformCapabilities.map((item) => (
              <div
                key={item}
                className="rounded-[22px] border border-[#E7EDF2] bg-[#F7FAFC] px-6 py-5"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 w-5 h-5 rounded-full bg-[#4CB794] flex items-center justify-center shrink-0">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p
                    className="text-[16px] leading-[1.65] text-[#183A51]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-navbar-theme="light" className="bg-[#F7F7F7] py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-12">
          <SectionTitle
            badge="Perfil ideal"
            title="Para quem a Lumia é indicada?"
            description="O programa funciona melhor quando você indica operações que já sentem dor de agenda, vendas, atendimento ou controle financeiro."
            centered
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {idealFor.map((item) => (
              <div
                key={item.title}
                className="rounded-[24px] bg-white border border-[#E8EEF3] p-6 min-h-[220px] flex flex-col shadow-[0_16px_50px_rgba(24,58,81,0.06)] hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(24,58,81,0.10)] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#183A51] text-[#4CB794] flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <p
                  className="text-[18px] leading-[1.35] font-semibold text-[#183A51] mt-6"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.title}
                </p>
                <p
                  className="text-[15px] leading-[1.65] text-[#69727D] mt-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.description}
                </p>
                <div className="mt-auto pt-5">
                  <span
                    className="inline-flex items-center gap-2 text-[13px] font-medium text-[#1673A3]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Perfil com potencial
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="como-funciona"
        data-navbar-theme="dark"
        className="relative overflow-hidden py-20 md:py-24"
        style={{ backgroundColor: "#183A51" }}
      >
        <Starfield count={90} seed={9} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(22,115,163,0.12)_0%,transparent_65%)] pointer-events-none" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-12">
          <div className="max-w-[760px]">
            <span
              className="inline-block bg-white/10 text-[#4CB794] text-[14px] font-medium px-4 py-1.5 rounded-full mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Como funciona
            </span>
            <h2
              className="text-[32px] md:text-[42px] font-semibold leading-[1.12] text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Um processo simples para você indicar e ganhar
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-12">
            {affiliateSteps.map((item) => (
              <div
                key={item.step}
                className="rounded-[28px] border border-white/10 bg-white/6 backdrop-blur-sm p-7"
              >
                <div className="w-12 h-12 rounded-full bg-[#4CB794] text-[#183A51] flex items-center justify-center text-[18px] font-bold">
                  {item.step}
                </div>
                <h3
                  className="text-[24px] font-semibold text-white mt-6"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-[16px] leading-[1.75] text-white/68 mt-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-navbar-theme="light" className="bg-white py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-10 items-start">
            <SectionTitle
              badge="Oportunidade"
              title="Por que essa é uma boa oportunidade?"
              description="Muitas clínicas estão crescendo, mas ainda operam com gestão desorganizada. Perdem leads, esquecem retornos, não acompanham os números e acabam dependendo demais de WhatsApp, papel e planilha."
            />

            <div className="space-y-4">
              {opportunityPoints.map((item) => (
                <div
                  key={item}
                  className="rounded-[24px] bg-[#F7FAFC] border border-[#E7EDF2] px-6 py-5"
                >
                  <p
                    className="text-[16px] leading-[1.75] text-[#183A51]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section data-navbar-theme="dark" className="bg-[#0F2E42] py-20 md:py-24">
        <div className="max-w-[1080px] mx-auto px-5 lg:px-12">
          <div className="rounded-[32px] bg-[#183A51] border border-white/10 px-7 py-10 md:px-12 md:py-12 text-center">
            <p
              className="text-[13px] uppercase tracking-[0.22em] text-[#4CB794]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Resumo rápido
            </p>
            <h2
              className="text-[32px] md:text-[44px] font-semibold leading-[1.12] text-white mt-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Indicação fechada = R$ 349,90 para você
            </h2>
            <p
              className="text-[17px] leading-[1.8] text-white/70 mt-5 max-w-[720px] mx-auto"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Quanto mais clínicas qualificadas você indicar, maior pode ser seu ganho. Se você já conversa com donos, gestores ou times comerciais de clínicas, essa é uma oferta simples de apresentar.
            </p>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full px-8 py-4 text-[15px] font-semibold text-white bg-[#4CB794] hover:bg-[#3da882] transition-colors mt-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Falar no WhatsApp para entrar no programa
            </a>
          </div>
        </div>
      </section>

      <div data-navbar-theme="dark">
        <Footer />
      </div>
    </>
  );
}
