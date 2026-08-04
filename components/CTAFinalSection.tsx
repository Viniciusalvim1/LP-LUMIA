"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Starfield from "./Starfield";
import { getSupabase } from "@/lib/supabase";
import { track } from "@/lib/analytics";

export default function CTAFinalSection() {
  const [form, setForm] = useState({ nome: "", sobrenome: "", email: "", telefone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError(null);

    const { error } = await getSupabase().from("leads").insert({
      nome: form.nome,
      sobrenome: form.sobrenome || null,
      email: form.email,
      telefone: form.telefone || null,
      origem: "cta-final",
    });

    setSending(false);
    if (error) {
      setError("Não foi possível enviar. Tente novamente.");
      return;
    }
    setSubmitted(true);
    track("generate_lead", { origem: "cta-final", form_location: "cta-final" });
    // Direciona para o cadastro do trial após confirmar o envio
    setTimeout(() => {
      window.location.href = "https://app.lumiaclin.com.br/#signup";
    }, 1500);
  }

  return (
    <section
      id="cta"
      className="relative py-24 overflow-hidden"
      style={{ backgroundColor: "#183A51" }}
    >
      <Starfield count={120} seed={3} />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Texto */}
          <motion.div
            className="flex-1 text-white"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-[32px] md:text-[40px] font-semibold leading-[1.2] mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Pronto para transformar a gestão da sua clínica?
            </h2>
            <p
              className="text-[17px] leading-[1.7] text-white/70 mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Crie sua conta e comece o trial gratuito de 14 dias. Em 2 horas sua clínica está rodando no Lumia — sem cartão de crédito, sem fidelidade.
            </p>

            <ul className="flex flex-col gap-4">
              {[
                "Trial gratuito de 14 dias",
                "Sem necessidade de cartão de crédito",
                "Suporte completo na implantação",
                "Resultados visíveis no primeiro mês",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#4CB794] flex items-center justify-center shrink-0">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-[15px] text-white/80" style={{ fontFamily: "var(--font-display)" }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Formulário */}
          <motion.div
            className="w-full lg:w-[420px] shrink-0"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="bg-white rounded-xl p-8 shadow-xl">
              <h3
                className="text-[20px] font-semibold text-[#183A51] mb-6 text-center"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Criar minha conta grátis
              </h3>

              {submitted ? (
                <motion.div
                  className="text-center py-8"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-16 h-16 rounded-full bg-[#4CB794] flex items-center justify-center mx-auto mb-4">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-[#183A51] font-semibold text-lg" style={{ fontFamily: "var(--font-display)" }}>
                    Mensagem enviada!
                  </p>
                  <p className="text-[#69727D] text-sm mt-2" style={{ fontFamily: "var(--font-display)" }}>
                    Redirecionando você para criar sua conta...
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Nome"
                      required
                      value={form.nome}
                      onChange={(e) => setForm({ ...form, nome: e.target.value })}
                      className="form-input flex-1"
                      style={{ fontFamily: "var(--font-display)" }}
                    />
                    <input
                      type="text"
                      placeholder="Sobrenome"
                      value={form.sobrenome}
                      onChange={(e) => setForm({ ...form, sobrenome: e.target.value })}
                      className="form-input flex-1"
                      style={{ fontFamily: "var(--font-display)" }}
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="E-mail profissional"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="form-input"
                    style={{ fontFamily: "var(--font-display)" }}
                  />
                  <input
                    type="tel"
                    placeholder="WhatsApp: (11) 99999-9999"
                    required
                    value={form.telefone}
                    onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                    className="form-input"
                    style={{ fontFamily: "var(--font-display)" }}
                  />
                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-primary text-[16px] font-semibold py-4 mt-1 w-full disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {sending ? "Enviando..." : "Começar trial gratuito →"}
                  </button>
                  {error && (
                    <p className="text-center text-red-500 text-[13px]" style={{ fontFamily: "var(--font-display)" }}>
                      {error}
                    </p>
                  )}
                  <p className="text-center text-[#69727D] text-[12px]" style={{ fontFamily: "var(--font-display)" }}>
                    Gratuito. Sem compromisso.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
