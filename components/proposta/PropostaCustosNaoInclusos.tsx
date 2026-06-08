export default function PropostaCustosNaoInclusos() {
  const items = [
    {
      title: "Tokens de IA (OpenAI)",
      description:
        "O assistente Lumia AI usa a API da OpenAI. Os tokens são cobrados diretamente pela OpenAI conforme o volume de uso da sua clínica.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      ),
    },
    {
      title: "Número de WhatsApp via Z-API",
      description:
        "Para usar o WhatsApp integrado com Z-API, é necessário um plano Z-API ativo, contratado diretamente com eles. O Lumia cuida da integração.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.4a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.4a16 16 0 0 0 6 6l1.27-.9a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z"/>
        </svg>
      ),
    },
    {
      title: "Número de WhatsApp via Meta (API Oficial)",
      description:
        "Para usar a API Oficial do WhatsApp (Meta), é necessário uma conta Meta Business com o número habilitado. Os custos de conversas seguem a tabela de preços da Meta.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-[#F7F7F7] py-16">
      <div className="max-w-[860px] mx-auto px-5 lg:px-12">
        <div
          className="rounded-2xl border border-amber-200 bg-amber-50 p-8"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0 text-amber-600">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <div>
              <h2
                className="text-[18px] font-semibold text-[#183A51] mb-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                O que não está incluso no plano
              </h2>
              <p
                className="text-[14px] text-[#69727D] leading-[1.6]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Para manter a transparência, esses custos são de infraestrutura de terceiros e ficam fora do contrato Lumia. Eles variam conforme o volume de uso da sua clínica.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <div key={item.title} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-amber-100">
                <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0 text-amber-500 mt-0.5">
                  {item.icon}
                </div>
                <div>
                  <p
                    className="text-[14px] font-semibold text-[#183A51] mb-0.5"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.title}
                  </p>
                  <p
                    className="text-[13px] text-[#69727D] leading-[1.55]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
