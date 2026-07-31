import Image from "next/image";
import { company, site } from "@/lib/site";

/**
 * Rodapé enxuto: só o que a página precisa por obrigação legal
 * (identificação da empresa, privacidade e termos — este último
 * exigido também pelas políticas do Google Ads). Sem menu de
 * navegação, que aqui seria só mais uma porta de saída.
 */
export default function LpFooter() {
  return (
    <footer className="bg-[#0f2637] py-12">
      <div className="max-w-[1000px] mx-auto px-5 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <Image
              src="/LOGO LUMIA/icon-teal.png"
              alt="Lumia"
              width={30}
              height={30}
              className="rounded-lg object-cover"
              style={{ width: 30, height: 30 }}
            />
            <span
              className="text-[19px] font-semibold lowercase text-white"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}
            >
              lumia
            </span>
          </div>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href="/privacidade"
              className="text-[13px] text-white/50 hover:text-white/80 transition-colors duration-200"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Política de privacidade
            </a>
            <a
              href="/termos"
              className="text-[13px] text-white/50 hover:text-white/80 transition-colors duration-200"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Termos de uso
            </a>
            <a
              href={`mailto:${site.email}`}
              className="text-[13px] text-white/50 hover:text-white/80 transition-colors duration-200"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {site.email}
            </a>
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10">
          <p
            className="text-[12px] leading-[1.7] text-white/30"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {company.legalName} · CNPJ {company.cnpj}
            <br />
            {company.address} — {company.city}/{company.state}, CEP {company.cep}
          </p>
          <p
            className="text-[12px] text-white/30 mt-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            © {new Date().getFullYear()} Lumia. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
