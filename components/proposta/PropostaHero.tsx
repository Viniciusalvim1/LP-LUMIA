"use client";

import { useState } from "react";
import Image from "next/image";
import Starfield from "@/components/Starfield";
import ShootingStars from "@/components/ShootingStars";

interface Props {
  nomeClinica: string;
  nomeResponsavel?: string | null;
  expiresAt: string;
  observacoes?: string | null;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}


export default function PropostaHero({ nomeClinica, nomeResponsavel, expiresAt, observacoes }: Props) {
  const [videoOpen, setVideoOpen] = useState(false);
  const validade = formatDate(expiresAt);
  const primeiroNome = nomeResponsavel?.split(" ")[0] ?? null;

  return (
    <>
      <section
        className="relative min-h-[90vh] w-full flex flex-col items-center justify-center p-6 overflow-hidden"
        style={{ background: "#183A51", fontFamily: "var(--font-display)" }}
      >
        {/* Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none" style={{ background: "rgba(76,183,148,0.12)", filter: "blur(120px)" }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "rgba(22,115,163,0.12)", filter: "blur(100px)" }} />

        {/* Estrelas piscantes */}
        <Starfield count={130} seed={42} />

        {/* Estrelas cadentes */}
        <ShootingStars />

        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center mt-10">

          {/* Logo + badge */}
          <div className="flex flex-col items-center gap-5 mb-8">
            <div className="flex items-center gap-2">
              <Image
                src="/LOGO LUMIA/icon-teal.png"
                alt="Lumia"
                width={36}
                height={36}
                className="rounded-xl"
              />
              <span className="text-white font-bold text-xl tracking-tight">Lumia</span>
            </div>

            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.10)",
                color: "#5BEBD3",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Sparkle SVG */}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2l2.09 6.26L20 9.27l-4.91 4.77L16.18 21 12 17.77 7.82 21l1.09-6.96L4 9.27l5.91-.01z"/>
              </svg>
              Proposta Exclusiva
            </div>
          </div>

          {/* Título */}
          <h1
            className="font-extrabold text-white tracking-tight leading-[1.1] mb-8"
            style={{ fontSize: "clamp(32px,6vw,60px)" }}
          >
            Proposta Comercial<br className="hidden md:block" />{" "}
            <span style={{ background: "linear-gradient(90deg,#5BEBD3,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {nomeClinica}
            </span>.
          </h1>

          {/* Storytelling box */}
          <div
            className="w-full max-w-2xl rounded-[24px] p-8 mb-10 text-left relative overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.10)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
            }}
          >
            {/* brilho superior */}
            <div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(91,235,211,0.5),transparent)" }} />

            {/* Cabeçalho atenção */}
            {nomeResponsavel && (
              <div
                className="flex items-center gap-3 mb-6 pb-6"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.10)" }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "#1e293b", border: "1px solid #334155" }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5BEBD3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 uppercase tracking-widest font-bold">Atenção</p>
                  <p className="text-[16px] text-white font-semibold">{nomeResponsavel}</p>
                </div>
              </div>
            )}

            {/* Texto */}
            <div className="space-y-4 text-slate-300 leading-relaxed font-medium" style={{ fontSize: "15px" }}>
              {nomeResponsavel ? (
                <>
                  <p>
                    Olá{primeiroNome ? `, ${primeiroNome}` : ""}. Preparamos esta proposta exclusiva para a <strong className="text-white">{nomeClinica}</strong>.
                  </p>
                  <p>
                    Veja abaixo a apresentação completa do sistema — agenda, vendas, CRM, WhatsApp e automações — e a proposta de investimento que preparamos para vocês.
                  </p>
                </>
              ) : (
                <p>
                  Preparamos esta proposta exclusiva para a <strong className="text-white">{nomeClinica}</strong>. Veja abaixo a apresentação completa do sistema e a proposta de investimento.
                </p>
              )}
              <p className="text-white font-semibold pt-1">
                Role a página para conhecer tudo o que está incluso. 👇
              </p>
            </div>

            {/* Validade */}
            <div
              className="mt-8 flex items-center gap-2 text-[12px] text-slate-400 w-fit px-3 py-1.5 rounded-lg"
              style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              Válida até {validade}
            </div>

            {/* Observações (se houver) */}
            {observacoes && (
              <div
                className="mt-5 flex items-start gap-3 rounded-xl p-4"
                style={{ background: "rgba(91,235,211,0.06)", border: "1px solid rgba(91,235,211,0.15)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5BEBD3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <p className="text-[13px] text-slate-300 leading-[1.6]">{observacoes}</p>
              </div>
            )}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center max-w-md">
            <a
              href="#onboarding"
              className="w-full sm:w-auto flex items-center justify-center gap-2 font-bold text-[15px] tracking-wide transition-all"
              style={{
                height: "56px",
                padding: "0 32px",
                borderRadius: "20px",
                background: "linear-gradient(90deg,#5BEBD3,#0d9488)",
                color: "#042f2e",
                boxShadow: "0 8px 30px rgba(91,235,211,0.25)",
              }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 8px 40px rgba(91,235,211,0.45)")}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 8px 30px rgba(91,235,211,0.25)")}
            >
              {/* arrow down */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
              Ir para a proposta
            </a>

            <button
              onClick={() => setVideoOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 font-semibold text-[15px] tracking-wide text-white transition-all"
              style={{
                height: "56px",
                padding: "0 32px",
                borderRadius: "20px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.20)",
                backdropFilter: "blur(12px)",
              }}
              onMouseEnter={e => { (e.currentTarget.style.background = "rgba(255,255,255,0.10)"); (e.currentTarget.style.borderColor = "rgba(91,235,211,0.4)"); }}
              onMouseLeave={e => { (e.currentTarget.style.background = "rgba(255,255,255,0.05)"); (e.currentTarget.style.borderColor = "rgba(255,255,255,0.20)"); }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>
              </svg>
              Ver o sistema
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 opacity-60 text-[12px] text-slate-300 font-medium">
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Pagamento Seguro
            </span>
            <span className="hidden sm:block text-slate-700">•</span>
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
              Setup Assistido Incluído
            </span>
            <span className="hidden sm:block text-slate-700">•</span>
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
              Infraestrutura em Nuvem
            </span>
          </div>
        </div>

      </section>

      {/* Modal de vídeo */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          style={{ background: "rgba(5,7,20,0.92)", backdropFilter: "blur(12px)" }}
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl rounded-3xl overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.10)", boxShadow: "0 25px 60px rgba(0,0,0,0.6)", aspectRatio: "16/9", background: "#000" }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors"
              style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            {/* Vídeo de demonstração da landing */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              src="https://p5baoahwu1dipoiy.public.blob.vercel-storage.com/lumia-videos/dashboard.mp4"
            />
          </div>
        </div>
      )}
    </>
  );
}
