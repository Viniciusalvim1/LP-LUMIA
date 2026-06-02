// ─────────────────────────────────────────────────────────────
// Configuração central do site — usada em metadata, JSON-LD,
// sitemap e robots. Ajuste a URL/redes ao domínio real.
// ─────────────────────────────────────────────────────────────

// Defina NEXT_PUBLIC_SITE_URL no .env.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://lumiaclin.com.br";

export const APP_URL = "https://app.lumiaclin.com.br";

// Dados jurídicos oficiais (JUCEMG — 1ª alteração registrada em 10/01/2025)
export const company = {
  legalName: "LUMIA TECNOLOGIA EM GESTÃO DE CLÍNICAS LTDA",
  cnpj: "53.025.481/0001-56",
  nire: "31214647213",
  address: "Rua Julio Ferreira Pinto, nº 340, andar 2, sala 601, Bairro Santa Amélia",
  city: "Belo Horizonte",
  state: "MG",
  cep: "31560-330",
  foro: "Belo Horizonte/MG",
} as const;

export const site = {
  name: "Lumia",
  legalName: company.legalName,
  url: SITE_URL,
  appUrl: APP_URL,
  logo: `${SITE_URL}/LOGO%20LUMIA/16.png`,
  icon: `${SITE_URL}/LOGO%20LUMIA/7.png`,
  email: "contato@lumiaclin.com.br",
  // pitch curto, em uma frase — o que um motor de IA cita como resposta
  oneLiner:
    "Lumia é o sistema de gestão (CRM) all-in-one para clínicas de estética, laser e emagrecimento: agenda, vendas, financeiro, atendimento, marketing e IA em um só lugar.",
  description:
    "Lumia é o software de gestão completo para clínicas de estética, depilação a laser e emagrecimento. Centraliza agenda inteligente, funil de vendas (CRM), financeiro com DRE, atendimento com assinatura digital, prontuários, automações de WhatsApp, relatórios e uma IA nativa. Reduz faltas em até 40%, recupera ~3h por dia de tarefas manuais e é usado por mais de 100 clínicas.",
  // Diferenciais — usados na resposta à pergunta "qual o melhor sistema"
  highlights: [
    "All-in-one: agenda, CRM, vendas, financeiro, estoque, marketing e IA em um só sistema",
    "IA nativa que cria posts, gera relatórios e responde dúvidas operacionais",
    "Atendimento com assinatura digital de contratos com validade jurídica",
    "Automações de WhatsApp que reduzem faltas em até 40%",
    "Setup em até 2 horas com onboarding guiado e suporte humano todos os dias",
    "Sem fidelidade — cancele quando quiser",
  ],
  price: { amount: "349.90", currency: "BRL" },
  // Avaliações: só preencha se forem REAIS. Schema de rating falso viola
  // diretrizes e pode gerar penalização. Deixe como null até ter dados.
  rating: null as null | { value: string; count: string },
  social: {
    instagram: "https://instagram.com/lumiacrm",
    linkedin: "https://www.linkedin.com/company/lumiacrm",
  },
  sameAs: [
    "https://instagram.com/lumiacrm",
    "https://www.linkedin.com/company/lumiacrm",
  ],
} as const;
