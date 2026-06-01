"use client";

import { motion } from "framer-motion";
import Starfield from "../Starfield";

const pillars = [
  {
    title: "Isolamento total entre clínicas",
    body: "Cada clínica opera em ambiente completamente isolado (multi-tenancy). Dados de uma clínica nunca aparecem para outra, e o isolamento é aplicado automaticamente em todas as operações.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: "Segurança no banco (RLS)",
    body: "As regras de segurança são aplicadas no banco de dados (PostgreSQL + Supabase), não só na interface. Mesmo via API, as permissões do banco bloqueiam acesso não autorizado.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Permissões por perfil",
    body: "Cada usuário tem permissões específicas. Um colaborador pode ver só a agenda; o gestor tem acesso completo ao financeiro. O acesso é bloqueado no menu e no banco.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="m22 11-2 2-2-2" />
      </svg>
    ),
  },
  {
    title: "Histórico e rastreabilidade",
    body: "Operações críticas — cancelamentos, mudanças de status, movimentações financeiras — são registradas com usuário, data e hora. A clínica sempre sabe quem fez o quê e quando.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

export default function TrustSection() {
  return (
    <section className="relative bg-[#183A51] py-20 overflow-hidden">
      <Starfield count={90} seed={7} />
      <div className="relative z-10 max-w-[1100px] mx-auto px-5 lg:px-12">
        <div className="text-center mb-12">
          <span
            className="inline-block bg-[#4CB794]/20 text-[#4CB794] text-[14px] font-medium px-4 py-1.5 rounded-full mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Arquitetura e confiabilidade
          </span>
          <h2
            className="text-[30px] md:text-[36px] font-semibold leading-[1.2] text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Seus dados protegidos em cada camada
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              className="rounded-xl p-6 bg-white/[0.04] border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="w-11 h-11 rounded-xl bg-[#4CB794]/15 flex items-center justify-center text-[#4CB794] mb-4">
                <span className="w-6 h-6">{p.icon}</span>
              </div>
              <h3
                className="text-[18px] font-semibold text-white mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {p.title}
              </h3>
              <p
                className="text-[15px] leading-[1.65] text-white/55"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
