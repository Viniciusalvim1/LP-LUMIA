import Link from "next/link";

export default function PropostaNotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-5 text-center"
      style={{ backgroundColor: "#183A51" }}
    >
      <div
        className="w-16 h-16 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center mb-6"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4CB794" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </div>

      <h1
        className="text-[26px] font-bold text-white mb-3"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Proposta não encontrada
      </h1>
      <p
        className="text-[15px] text-white/55 max-w-[380px] leading-[1.6] mb-8"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Esta proposta pode ter expirado ou o link está incorreto. Entre em contato com a equipe Lumia para solicitar uma nova proposta.
      </p>

      <Link
        href="https://lumiaclin.com.br"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] text-[14px] font-semibold border border-white/20 text-white/70 hover:bg-white/10 transition-colors duration-200"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Conhecer o Lumia
      </Link>
    </div>
  );
}
