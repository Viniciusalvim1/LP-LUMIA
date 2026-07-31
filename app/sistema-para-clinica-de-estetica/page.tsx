import type { Metadata } from "next";

import LpHero from "@/components/lp/LpHero";
import LpEntryReset from "@/components/lp/LpEntryReset";
import LpPain from "@/components/lp/LpPain";
import LpModules from "@/components/lp/LpModules";
import LpComparison from "@/components/lp/LpComparison";
import LpDifferentiators from "@/components/lp/LpDifferentiators";
import LpProof from "@/components/lp/LpProof";
import LpFounder from "@/components/lp/LpFounder";
import LpCost from "@/components/lp/LpCost";
import LpBonus from "@/components/lp/LpBonus";
import LpPricing from "@/components/lp/LpPricing";
import LpGuarantee from "@/components/lp/LpGuarantee";
import LpFaq from "@/components/lp/LpFaq";
import LpFinalCta from "@/components/lp/LpFinalCta";
import LpFooter from "@/components/lp/LpFooter";
import StickyCta from "@/components/lp/StickyCta";

import Navbar from "@/components/Navbar";
import ClientLogos from "@/components/ClientLogos";
import TestimonialsSection from "@/components/TestimonialsSection";

export const metadata: Metadata = {
  // O root layout já aplica o template "%s | Lumia" — não repetir aqui.
  title: "Sistema de gestão para clínicas de estética",
  description:
    "Agenda que confirma sozinha, contrato assinado pelo celular e o lucro real de cada procedimento na tela. Teste a Lumia por 14 dias, sem cartão de crédito.",
  alternates: { canonical: "/sistema-para-clinica-de-estetica" },
  // Página de tráfego pago: fora do índice para não competir com a home
  // pelas mesmas palavras-chave nem canibalizar o orgânico.
  robots: { index: false, follow: true },
  openGraph: {
    title: "O sistema que faz a sua clínica funcionar sem você apagar incêndio",
    description:
      "Agenda, pacientes, vendas, financeiro e IA em um lugar só. 14 dias grátis, sem cartão de crédito.",
    type: "website",
    locale: "pt_BR",
    siteName: "Lumia",
    images: [{ url: "/opengraph-image.png", width: 1731, height: 909, alt: "Lumia" }],
  },
};

const NAV_LINKS = [
  { label: "Funcionalidades", href: "#funcionalidades" },
  { label: "Sobre Nós", href: "#fundador" },
  { label: "Planos", href: "#planos" },
];

export default function LandingPage() {
  return (
    <>
      <LpEntryReset />

      {/* Navbar padrão do site, mas com âncoras internas: os links
          default apontam para a home (/#planos, /funcionalidades) e
          levariam o visitante para fora de um clique pago.
          Ela troca de tema lendo o data-navbar-theme da seção sob o
          pill, então cada bloco abaixo declara se é claro ou escuro. */}
      <Navbar links={NAV_LINKS} logoHref="#topo" morphFromHero />

      <main>
        <div id="topo" data-navbar-theme="dark"><LpHero /></div>
        <div data-navbar-theme="light"><ClientLogos /></div>

        {/* Dor → virada */}
        <div data-navbar-theme="light"><LpPain /></div>

        {/* Posicionamento: o que a Lumia entende que um genérico não */}
        <div data-navbar-theme="dark"><LpDifferentiators /></div>

        {/* Solução, com o produto real rodando */}
        <div data-navbar-theme="light"><LpModules /></div>

        {/* Por que trocar o que já existe */}
        <div data-navbar-theme="light"><LpComparison /></div>

        {/* Quem desenhou o produto e por quê */}
        <div data-navbar-theme="light"><LpFounder /></div>

        {/* Prova: números primeiro, rostos depois */}
        <div data-navbar-theme="dark"><LpProof /></div>
        <div data-navbar-theme="light"><TestimonialsSection /></div>

        {/* Ancoragem de valor antes do preço */}
        <div data-navbar-theme="dark"><LpCost /></div>
        <div data-navbar-theme="light"><LpBonus /></div>
        <div data-navbar-theme="dark"><LpPricing /></div>

        {/* Reversão de risco e objeções finais */}
        <div data-navbar-theme="light"><LpGuarantee /></div>
        <div data-navbar-theme="light"><LpFaq /></div>

        <div data-navbar-theme="dark"><LpFinalCta /></div>
      </main>

      <div data-navbar-theme="dark"><LpFooter /></div>
      <StickyCta />
    </>
  );
}
