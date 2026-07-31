"use client";

import LpModuleShowcase from "./LpModuleShowcase";
import LpCta from "./LpCta";

export default function LpModules() {
  // scroll-mt compensa o pill flutuante da navbar (~76px), senão a
  // âncora para com o título escondido atrás dele.
  return (
    <section id="funcionalidades" className="bg-[#F7F7F7] py-20 md:py-24 scroll-mt-[92px]">
      <div className="max-w-[1100px] mx-auto px-5 lg:px-12">
        <div className="text-center mb-10 md:mb-12">
          <span className="section-badge mb-4">Como fica com a Lumia</span>
          <h2
            className="text-[30px] md:text-[38px] font-semibold leading-[1.2] text-[#183A51] mt-4 max-w-[720px] mx-auto"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Sete peças que resolvem o dia da sua clínica — e conversam entre si
          </h2>
          <p
            className="text-[16px] md:text-[17px] leading-[1.7] text-[#69727D] mt-4 max-w-[620px] mx-auto"
            style={{ fontFamily: "var(--font-display)" }}
          >
            O que você vê abaixo é o produto real rodando. Arraste ou use as setas.
          </p>
        </div>

        <LpModuleShowcase />

        <div className="text-center mt-10">
          <LpCta location="modulos" size="lg" />
        </div>
      </div>
    </section>
  );
}
