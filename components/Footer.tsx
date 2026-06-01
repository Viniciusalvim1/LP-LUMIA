import Image from "next/image";
import Starfield from "./Starfield";

const footerLinks = [
  {
    title: "Produto",
    links: [
      { label: "Funcionalidades", href: "#funcionalidades" },
      { label: "Planos", href: "#cta" },
      { label: "Integrações", href: "#" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre Nós", href: "#sobre" },
      { label: "Blog", href: "#" },
      { label: "Carreiras", href: "#" },
    ],
  },
  {
    title: "Suporte",
    links: [
      { label: "Central de Ajuda", href: "#" },
      { label: "Contato", href: "mailto:contato@lumiacrm.com.br" },
      { label: "Status", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#183A51] text-white overflow-hidden">
      <Starfield count={80} seed={4} />
      <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-12 pt-16 pb-8">
        {/* Top row */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-12">
          {/* Brand column */}
          <div className="lg:w-[280px] shrink-0">
            <div className="flex items-center mb-5">
              <Image
                src="/LOGO LUMIA/icon-teal.png"
                alt="Lumia"
                width={44}
                height={44}
                className="rounded-xl object-cover"
                style={{ width: 44, height: 44 }}
              />
            </div>
            <p
              className="text-[15px] leading-[1.7] text-white/60 mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              CRM all-in-one para clínicas de estética que querem crescer com organização e eficiência.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-[#4CB794] hover:text-[#4CB794] transition-colors duration-200 cursor-pointer"
                aria-label="Instagram"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-[#4CB794] hover:text-[#4CB794] transition-colors duration-200 cursor-pointer"
                aria-label="LinkedIn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {footerLinks.map((col) => (
              <div key={col.title}>
                <h4
                  className="text-[13px] font-semibold uppercase tracking-widest text-white/40 mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {col.title}
                </h4>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[15px] text-white/60 hover:text-white transition-colors duration-200"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-[14px] text-white/40"
            style={{ fontFamily: "var(--font-display)" }}
          >
            © {new Date().getFullYear()} Lumia. Todos os Direitos Reservados.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[13px] text-white/40 hover:text-white/60 transition-colors" style={{ fontFamily: "var(--font-display)" }}>
              Política de Privacidade
            </a>
            <a href="#" className="text-[13px] text-white/40 hover:text-white/60 transition-colors" style={{ fontFamily: "var(--font-display)" }}>
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
