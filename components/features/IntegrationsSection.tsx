"use client";

import { motion } from "framer-motion";

const integrations = [
  { name: "Meta Ads",     desc: "Leads dos anúncios do Facebook e Instagram direto no funil" },
  { name: "WhatsApp",     desc: "Automações e comunicações via Z-API / Meta" },
  { name: "Assinafy",     desc: "Assinatura digital de contratos com validade jurídica" },
  { name: "Supabase",     desc: "Banco de dados, autenticação, armazenamento e real-time" },
  { name: "Google Sheets", desc: "Exportação de dados para planilhas" },
  { name: "Webhooks",     desc: "Integração com sistemas externos via HTTP POST" },
];

export default function IntegrationsSection() {
  return (
    <section id="integracoes" className="bg-[#F7F7F7] py-20 scroll-mt-24">
      <div className="max-w-[1100px] mx-auto px-5 lg:px-12">
        <div className="text-center mb-12">
          <span className="section-badge mb-4">Integrações</span>
          <h2
            className="text-[30px] md:text-[36px] font-semibold leading-[1.2] text-[#183A51] mt-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Conectado com as ferramentas que sua clínica já usa
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {integrations.map((it, i) => (
            <motion.div
              key={it.name}
              className="rounded-xl p-6 bg-white border border-gray-100 hover:shadow-md transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <div className="w-10 h-10 rounded-lg bg-[#183A51]/6 flex items-center justify-center mb-4">
                <span
                  className="text-[15px] font-bold text-[#183A51]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {it.name.charAt(0)}
                </span>
              </div>
              <h3
                className="text-[16px] font-semibold text-[#183A51] mb-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {it.name}
              </h3>
              <p
                className="text-[14px] leading-[1.55] text-[#69727D]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {it.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
