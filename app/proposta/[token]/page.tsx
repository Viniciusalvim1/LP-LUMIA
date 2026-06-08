import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSupabase } from "@/lib/supabase";
import Starfield from "@/components/Starfield";
import PropostaHero from "@/components/proposta/PropostaHero";
import PropostaCustosNaoInclusos from "@/components/proposta/PropostaCustosNaoInclusos";
import PropostaPricing from "@/components/proposta/PropostaPricing";
import FeaturesSidebar from "@/components/features/FeaturesSidebar";
import FeatureBlock from "@/components/features/FeatureBlock";
import { featureCategories, allFeatures } from "@/content/features";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ token: string }>;
}

async function getProposta(token: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase.rpc("get_proposta_by_token", {
    p_token: token,
  });
  if (error || !data || data.length === 0) return null;
  return data[0] as {
    id: string;
    token: string;
    nome_clinica: string;
    nome_responsavel: string | null;
    email_responsavel: string | null;
    plano_nome: string;
    valor_mensal: number;
    desconto_pct: number;
    meses_gratis: number;
    trial_dias: number;
    validade_dias: number;
    observacoes: string | null;
    expires_at: string;
    aceita_em: string | null;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { token } = await params;
  const proposta = await getProposta(token);
  if (!proposta) {
    return { title: "Proposta não encontrada — Lumia" };
  }
  return {
    title: `Proposta Lumia para ${proposta.nome_clinica}`,
    description: `Conheça o sistema Lumia CRM e a proposta exclusiva preparada para ${proposta.nome_clinica}.`,
    robots: { index: false, follow: false },
  };
}

export default async function PropostaPage({ params }: PageProps) {
  const { token } = await params;
  const proposta = await getProposta(token);

  if (!proposta) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Hero personalizado */}
      <PropostaHero
        nomeClinica={proposta.nome_clinica}
        nomeResponsavel={proposta.nome_responsavel}
        expiresAt={proposta.expires_at}
      />

      {/* Observações personalizadas (se houver) */}
      {proposta.observacoes && (
        <div className="bg-[#EBF8FF] border-b border-[#BEE3F8]">
          <div className="max-w-[860px] mx-auto px-5 lg:px-12 py-5">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#1673A3]/20 flex items-center justify-center shrink-0 mt-0.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1673A3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <p
                className="text-[14px] text-[#1a3a5c] leading-[1.6]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {proposta.observacoes}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Seção de funcionalidades — idêntica à /funcionalidades */}
      <div id="funcionalidades" className="bg-white">
        <div className="max-w-[1340px] mx-auto px-5 lg:pl-8 lg:pr-12 py-8 lg:py-14">

          {/* Cabeçalho da seção */}
          <div className="max-w-[860px] mx-auto mb-12 text-center lg:text-left">
            <span
              className="inline-block bg-[#4CB794]/15 text-[#4CB794] text-[13px] font-medium px-4 py-1.5 rounded-full mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              O que está incluso
            </span>
            <h2
              className="text-[26px] md:text-[34px] font-bold text-[#183A51] leading-[1.2]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Tudo que o Lumia faz pela sua clínica
            </h2>
            <p
              className="text-[16px] text-[#69727D] leading-[1.7] mt-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Da captação do lead ao pós-atendimento — agenda, vendas, financeiro, clientes e automações em um só sistema.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 xl:gap-16">
            <FeaturesSidebar />

            <div className="flex-1 min-w-0 max-w-[860px]">
              {featureCategories.map((cat) => (
                <div key={cat.id}>
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

      {/* Custos não inclusos */}
      <PropostaCustosNaoInclusos />

      {/* Card de preço */}
      <PropostaPricing
        planoNome={proposta.plano_nome}
        valorMensal={Number(proposta.valor_mensal)}
        descontoPct={proposta.desconto_pct}
        mesesGratis={proposta.meses_gratis}
        trialDias={proposta.trial_dias}
        token={proposta.token}
      />

      {/* Rodapé mínimo */}
      <footer className="bg-[#183A51] border-t border-white/[0.06] py-8">
        <div className="max-w-[860px] mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span
            className="text-[18px] font-bold"
            style={{
              fontFamily: "var(--font-display)",
              background: "linear-gradient(90deg, #4CB794, #6ef5d0)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Lumia
          </span>
          <p className="text-[13px] text-white/35" style={{ fontFamily: "var(--font-display)" }}>
            lumiaclin.com.br · contato@lumiaclin.com.br
          </p>
        </div>
      </footer>
    </div>
  );
}
