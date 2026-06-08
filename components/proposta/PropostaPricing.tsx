"use client";

import { useState } from "react";

interface Props {
  planoNome: string;
  valorMensal: number;
  descontoPct: number;
  mesesGratis: number;
  trialDias: number;
  token: string;
}

const FEATURES = [
  "Agenda, CRM, vendas e financeiro",
  "Atendimento com assinatura digital",
  "Marketing e automações de WhatsApp",
  "IA nativa: cria, responde e analisa",
  "Relatórios e indicadores em tempo real",
  "Suporte humano todos os dias",
];

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function PropostaPricing({
  planoNome,
  valorMensal,
  descontoPct,
  mesesGratis,
  trialDias,
  token,
}: Props) {
  const [accepting, setAccepting] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const valorFinal =
    descontoPct > 0 ? valorMensal * (1 - descontoPct / 100) : valorMensal;
  const temDesconto = descontoPct > 0;

  async function handleAceitar() {
    setAccepting(true);
    try {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      await supabase.rpc("aceitar_proposta", { p_token: token });
      setAccepted(true);
      setTimeout(() => {
        window.location.href = "https://app.lumiaclin.com.br/#signup";
      }, 1500);
    } catch {
      setAccepting(false);
    }
  }

  return (
    <section id="proposta" className="relative bg-[#183A51] py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(76,183,148,0.07)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-[460px] mx-auto px-5">
        <div className="text-center mb-10">
          <span
            className="inline-block bg-[#4CB794]/20 text-[#4CB794] text-[13px] font-medium px-4 py-1.5 rounded-full mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Investimento
          </span>
          <h2
            className="text-[28px] md:text-[36px] font-bold text-white leading-[1.2]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Sua proposta exclusiva
          </h2>
        </div>

        {/* Card */}
        <div className="relative">
          <div className="absolute -inset-6 bg-[radial-gradient(ellipse_at_center,rgba(76,183,148,0.18)_0%,transparent_70%)] blur-xl pointer-events-none" />

          <div
            className="relative rounded-3xl overflow-hidden border border-white/12"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            <div className="relative z-10 p-8 flex flex-col items-center text-center">
              <span
                className="inline-block bg-[#4CB794]/20 text-[#4CB794] text-[13px] font-medium px-4 py-1.5 rounded-full mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {planoNome}
              </span>

              {mesesGratis > 0 && (
                <span
                  className="inline-block bg-[#1673A3]/30 text-[#6ef5d0] text-[12px] font-semibold px-3 py-1 rounded-full mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {mesesGratis} {mesesGratis === 1 ? "mês grátis incluso" : "meses grátis inclusos"}
                </span>
              )}

              {/* Preço */}
              {temDesconto && (
                <p
                  className="text-[15px] text-white/40 line-through mb-1"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  R$ {formatCurrency(valorMensal)}/mês
                </p>
              )}

              <div className="flex items-end justify-center gap-1 mb-1">
                <span className="text-[20px] text-white/60 mb-2" style={{ fontFamily: "var(--font-display)" }}>R$</span>
                <span
                  className="text-[52px] font-bold leading-none"
                  style={{
                    fontFamily: "var(--font-display)",
                    background: "linear-gradient(90deg, #4CB794, #6ef5d0)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {formatCurrency(valorFinal)}
                </span>
                <span className="text-[16px] text-white/60 mb-2" style={{ fontFamily: "var(--font-display)" }}>/mês</span>
              </div>

              {temDesconto && (
                <p className="text-[13px] text-[#4CB794] font-semibold mb-1" style={{ fontFamily: "var(--font-display)" }}>
                  {descontoPct}% de desconto aplicado
                </p>
              )}

              <p className="text-[13px] text-white/40 mb-7" style={{ fontFamily: "var(--font-display)" }}>
                por unidade · sem fidelidade
              </p>

              <ul className="flex flex-col gap-3 w-full mb-8 text-left">
                {FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-[#4CB794] flex items-center justify-center shrink-0">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="text-[15px] text-white/75 leading-snug" style={{ fontFamily: "var(--font-display)" }}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA aceitar */}
              {accepted ? (
                <div
                  className="w-full text-center text-[15px] font-semibold py-4 rounded-[10px]"
                  style={{ fontFamily: "var(--font-display)", background: "#065F46", color: "#6ef5d0" }}
                >
                  Proposta aceita! Redirecionando...
                </div>
              ) : (
                <button
                  onClick={handleAceitar}
                  disabled={accepting}
                  className="w-full text-center text-[15px] font-semibold py-4 rounded-[10px] cursor-pointer transition-all duration-200 disabled:opacity-60"
                  style={{
                    fontFamily: "var(--font-display)",
                    background: "#4CB794",
                    color: "#fff",
                    boxShadow: "0 4px 20px rgba(76,183,148,0.4)",
                    border: "none",
                  }}
                >
                  {accepting ? "Processando..." : "Aceitar esta proposta →"}
                </button>
              )}

              <p className="text-[12px] text-white/30 mt-4" style={{ fontFamily: "var(--font-display)" }}>
                {trialDias} dias de trial gratuito inclusos · Sem cartão de crédito
              </p>

              {/* Falar com consultor */}
              <a
                href="https://wa.me/5531995671853?text=Ol%C3%A1!%20Tenho%20interesse%20na%20proposta%20do%20Lumia."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 text-[13px] text-white/50 hover:text-white/80 transition-colors duration-200"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.4a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.4a16 16 0 0 0 6 6l1.27-.9a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z"/>
                </svg>
                Falar com consultor
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
