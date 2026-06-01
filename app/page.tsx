import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ClientLogos from "@/components/ClientLogos";
import FeaturesSection from "@/components/FeaturesSection";
import ForWhoSection from "@/components/ForWhoSection";
import AboutSection from "@/components/AboutSection";
import MetricsSection from "@/components/MetricsSection";
import OnboardingSection from "@/components/OnboardingSection";
import PainSection from "@/components/PainSection";
import BlogSection from "@/components/BlogSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTAFinalSection from "@/components/CTAFinalSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import Starfield from "@/components/Starfield";
import { getPosts } from "@/lib/blog";

// ISR: regenera a home a cada 5 min para refletir novos posts publicados
export const revalidate = 300;

export default async function Home() {
  const posts = await getPosts(3);

  return (
    <>
      <Navbar />

      <div data-navbar-theme="dark"><Hero /></div>
      <div data-navbar-theme="light"><ClientLogos /></div>
      <div data-navbar-theme="light"><FeaturesSection /></div>
      <div data-navbar-theme="light"><ForWhoSection /></div>
      <div data-navbar-theme="light"><AboutSection /></div>
      {/* Métricas + Onboarding compartilham um fundo escuro contínuo */}
      <div data-navbar-theme="dark" className="relative bg-[#183A51] overflow-hidden">
        <Starfield count={200} seed={2} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_15%,rgba(76,183,148,0.08)_0%,transparent_55%)] pointer-events-none" />
        <div className="relative z-10">
          <MetricsSection />
          <OnboardingSection />
        </div>
      </div>

      <div data-navbar-theme="light"><PainSection /></div>
      <div data-navbar-theme="light"><TestimonialsSection /></div>
      <div data-navbar-theme="dark"><PricingSection /></div>
      <div data-navbar-theme="light"><BlogSection posts={posts} /></div>
      <div data-navbar-theme="dark"><CTAFinalSection /></div>
      <div data-navbar-theme="light"><FAQSection /></div>
      <div data-navbar-theme="dark"><Footer /></div>
    </>
  );
}
