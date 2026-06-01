"use client";

import { motion } from "framer-motion";

const cards = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 3h18v18H3z" rx="2" />
        <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
        <path d="M12 18V6" />
      </svg>
    ),
    title: "Procura crescimento escalável",
    body: "Nossas integrações e automações eliminam gargalos operacionais para que sua clínica cresça sem precisar contratar mais pessoas para tarefas repetitivas.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Perde tempo com tarefas manuais",
    body: "Se você ainda confirma agendamentos por mensagem, lança cobranças na mão ou perde horas com relatórios — o Lumia foi feito para você recuperar esse tempo.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Quer encantar mais pacientes",
    body: "Clínicas que usam o Lumia oferecem uma experiência muito mais profissional: lembretes automáticos, atendimento ágil e comunicação personalizada em cada etapa.",
  },
];

export default function ForWhoSection() {
  return (
    <section className="bg-[#F7F7F7] py-20">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-badge mb-4">Para quem é</span>
          <h2
            className="text-[32px] md:text-[38px] font-semibold leading-[1.2] text-[#183A51] mt-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            A plataforma ideal para clínicas que querem evoluir
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              className="bg-white rounded-xl p-8 flex flex-col hover:shadow-md transition-shadow duration-300 cursor-default"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
            >
              <div className="text-[#4CB794] mb-5">{card.icon}</div>
              <h3
                className="text-[20px] font-semibold text-[#183A51] leading-[1.3] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {card.title}
              </h3>
              <p
                className="text-[16px] leading-[1.6] text-[#69727D]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {card.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
