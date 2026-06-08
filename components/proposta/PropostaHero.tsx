import Starfield from "@/components/Starfield";

interface Props {
  nomeClinica: string;
  nomeResponsavel?: string | null;
  expiresAt: string; // ISO string
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function PropostaHero({ nomeClinica, nomeResponsavel, expiresAt }: Props) {
  const validade = formatDate(expiresAt);

  return (
    <section
      className="relative overflow-hidden pt-[120px] pb-20"
      style={{ backgroundColor: "#183A51" }}
    >
      <Starfield count={100} seed={7} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(76,183,148,0.14)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-[820px] mx-auto px-5 lg:px-12 text-center">
        {/* Logo Lumia */}
        <div className="flex justify-center mb-10">
          <span
            className="text-[22px] font-bold tracking-tight"
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
        </div>

        <span
          className="inline-block bg-[#4CB794]/20 text-[#4CB794] text-[13px] font-medium px-4 py-1.5 rounded-full mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Proposta Comercial Exclusiva
        </span>

        <h1
          className="text-[30px] sm:text-[38px] md:text-[48px] font-bold leading-[1.15] tracking-[-0.02em] text-white mb-5"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Preparada para{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #4CB794, #1673A3)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {nomeClinica}
          </span>
        </h1>

        {nomeResponsavel && (
          <p
            className="text-[16px] text-white/60 mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Atenção: <strong className="text-white/80">{nomeResponsavel}</strong>
          </p>
        )}

        {/* Validade */}
        <div
          className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/10 rounded-full px-4 py-2 mb-10"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4CB794" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          <span
            className="text-[13px] text-white/70"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Válida até <strong className="text-white/90">{validade}</strong>
          </span>
        </div>

        {/* CTA scroll */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#funcionalidades"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[10px] text-[15px] font-semibold transition-all duration-200"
            style={{
              fontFamily: "var(--font-display)",
              background: "#4CB794",
              color: "#fff",
              boxShadow: "0 4px 20px rgba(76,183,148,0.4)",
            }}
          >
            Ver o sistema
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </a>
          <a
            href="#proposta"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[10px] text-[15px] font-semibold border border-white/20 text-white/80 hover:bg-white/10 transition-all duration-200"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ver a proposta
          </a>
        </div>
      </div>
    </section>
  );
}
