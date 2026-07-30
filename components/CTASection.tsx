"use client";

import { motion } from "framer-motion";
import Button from "./Button";

export default function CTASection() {
  return (
    <section id="cta" className="relative py-32 overflow-hidden">
      {/* Big central glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,201,167,0.18)_0%,transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(59,130,246,0.12)_0%,transparent_55%)]" />

      <div className="relative z-10 max-w-[800px] mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[13px] font-medium tracking-[0.1em] uppercase text-[#00C9A7] mb-6">
            Pronto para começar?
          </p>

          <h2 className="font-display font-black text-4xl md:text-6xl leading-[1.08] tracking-[-0.02em] text-white mb-6">
            Transforme sua clínica{" "}
            <span className="gradient-text">hoje mesmo.</span>
          </h2>

          <p className="text-lg text-white/55 leading-relaxed mb-10 max-w-[520px] mx-auto">
            Acesse nosso sistema e agende uma demonstração sem compromisso.
            Sem cartão de crédito. Sem complicação.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="https://app.lumiaclin.com.br/#login" size="lg">
              Experimente grátis
            </Button>
            <Button href="https://api.whatsapp.com/send/?phone=5531983165920&text=Quero%20saber%20mais%20sobre%20o%20sistema%20lumia&type=phone_number&app_absent=0" variant="ghost" size="lg">
              Falar no WhatsApp
            </Button>
          </div>

          <p className="mt-6 text-sm text-white/30">
            Sem taxa de setup · Suporte incluso · Cancele quando quiser
          </p>
        </motion.div>
      </div>
    </section>
  );
}
