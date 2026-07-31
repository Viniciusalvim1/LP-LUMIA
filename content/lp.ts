// ─────────────────────────────────────────────────────────────
// Copy da landing page de tráfego pago (/sistema-para-clinica-de-estetica).
// Separado do restante do site: esta página tem objetivo único
// (trial self-serve) e o texto é otimizado para conversão paga,
// não para SEO.
// ─────────────────────────────────────────────────────────────

// Hero de tráfego pago: tudo tem que caber em uma tela, junto com o
// mockup. Cada linha a mais aqui empurra o CTA para fora da dobra,
// que é o erro mais caro que uma LP paga pode cometer.
export const lpHero = {
  badge: "Feito para clínicas de estética, laser e emagrecimento",
  proof: "+100 clínicas já usam a Lumia",
  headline: {
    before: "Sua clínica organizada, vendendo e funcionando ",
    highlight: "sem tudo depender de você",
    after: ".",
  },
  subheadline:
    "Agenda, pacientes, pacotes, vendas, financeiro, estoque e relatórios conectados em um único sistema feito para clínicas de estética.",
  microcopy: "14 dias grátis · Sem cartão · Implantação assistida · Cancele quando quiser",
};

// ── Prova em números ─────────────────────────────────────────
// Renderizados estáticos: o número final está no HTML desde o load
// (a animação de contagem é só enriquecimento). A prova principal
// da página não pode depender de JS nem de entrar em viewport.
// Cada um traz a origem embaixo — número sem fonte não convence.
export const lpMetrics = {
  headline: "Números que a Lumia entrega",
  items: [
    {
      value: "Até 40%",
      label: "menos faltas",
      source: "média das clínicas após ativar a confirmação automática por WhatsApp",
    },
    {
      value: "Até 3h",
      label: "recuperadas por dia",
      source: "tempo antes gasto em confirmação, remarcação e lançamento manual",
    },
    {
      value: "+100",
      label: "clínicas ativas",
      source: "de estética, laser e emagrecimento usando a Lumia hoje",
    },
  ],
};

// ── Diferenciais da operação de estética ─────────────────────
// Posicionamento central da página: não vender "software de clínica",
// e sim entendimento da operação específica. Todos os itens são
// capacidades reais que já aparecem nos módulos.
export const lpDifferentiators = {
  badge: "O que nos torna diferentes",
  headline: "A Lumia entende o que um sistema genérico não entende",
  // Deliberadamente NÃO nomeia concorrente: comparação direta citando
  // marca é publicidade comparativa e aumenta risco jurídico. A frase
  // ataca a categoria ("sistema genérico"), não uma empresa.
  sub: "Um sistema genérico sabe marcar horário. A operação de uma clínica de estética é outra coisa.",
  items: [
    {
      title: "Lumia AI: a inteligência que conhece os números da sua clínica",
      body: "Não é uma IA genérica: ela trabalha com os dados reais da sua clínica. Pergunte pelos seus números, encontre pacientes em atraso, analise o estoque ou gere um relatório em segundos.",
    },
    {
      title: "A venda se transforma automaticamente em operação",
      body: "Uma venda não termina no pagamento. Ela já gera as sessões, organiza o contrato, atualiza o financeiro e prepara a clínica para os próximos atendimentos.",
    },
    {
      title: "Atendimento, estoque e histórico totalmente conectados",
      body: "Cada atendimento deixa tudo organizado. Procedimentos, assinatura, produtos utilizados, evolução e histórico ficam registrados automaticamente no perfil do cliente.",
    },
    {
      title: "CRM que acompanha o cliente até a recompra",
      body: "Do primeiro contato à próxima venda. A Lumia ajuda sua equipe a não perder leads, acompanhar oportunidades e transformar relacionamentos em novos tratamentos.",
    },
    {
      title: "Perfil clínico e comercial 360º",
      body: "Toda a história do cliente em um só lugar. Sua equipe sabe o que já foi feito, o que está pendente, quais sessões restam e qual é o próximo passo do tratamento.",
    },
    {
      title: "Gestão baseada em lucro, não apenas faturamento",
      body: "Saiba quanto a clínica vende. E quanto realmente sobra. Tome decisões com dados de receita, despesas, margem, inadimplência e rentabilidade por procedimento.",
    },
  ],
  punch: "Um sistema genérico entende agenda. A Lumia entende a operação inteira de uma clínica de estética.",
};

// ── Estudos de caso ──────────────────────────────────────────
// ⚠️⚠️ ATENÇÃO CRÍTICA: os números de resultado abaixo são
// PLACEHOLDERS INVENTADOS e NÃO PODEM ir ao ar assim. Apresentar
// resultado de cliente que não aconteceu é depoimento falso — risco
// legal e de reputação. Antes de qualquer tráfego pago, substitua
// por dados REAIS e verificáveis de clínicas parceiras (de
// preferência com nome/autorização). Enquanto forem placeholders, a
// seção fica fora da página (não está importada na page.tsx).
export const lpCases = [
  {
    segment: "Clínica de emagrecimento",
    before: "Não sabia quais pacientes estavam abandonando o protocolo no meio.",
    after: "Criou uma rotina de acompanhamento e reativação automática pelo sistema.",
    metric: "00",
    metricLabel: "pacientes reativados em 3 meses", // ⚠️ placeholder
  },
  {
    segment: "Clínica de laser",
    before: "Pacotes e sessões eram controlados em planilha, com erro e retrabalho.",
    after: "Todo o histórico passou para o cadastro do paciente, com saldo automático.",
    metric: "00h",
    metricLabel: "economizadas por semana", // ⚠️ placeholder
  },
  {
    segment: "Clínica de estética avançada",
    before: "Recebia leads, mas não sabia quantos viravam avaliação de fato.",
    after: "Passou a acompanhar o funil comercial da entrada ao fechamento.",
    metric: "00%",
    metricLabel: "de aumento na conversão", // ⚠️ placeholder
  },
];

// ── Dor ──────────────────────────────────────────────────────
// Frases curtas e paralelas, cada uma com uma virada no fim. O
// reconhecimento vem da especificidade, não do volume — seis linhas
// que ele lê inteiras batem mais que dez que ele pula.
export interface LpPain {
  title: string;
  text: string;
}

export const lpPains: LpPain[] = [
  {
    title: "A manhã inteira confirmando agendamento",
    text: "A recepção vai uma por uma no WhatsApp — e o trabalho de verdade não sai do lugar.",
  },
  {
    title: "A falta que você só descobre na hora",
    text: "Ninguém avisou. A maca ficou vazia, e o custo daquele horário você já pagou.",
  },
  {
    title: "O orçamento que esfriou na fila",
    text: "Pediu na quinta, ninguém respondeu a tempo. Na segunda já fechou em outro lugar.",
  },
  {
    title: "O pacote que ninguém sabe onde parou",
    text: "Dez sessões vendidas. Quantas já foram feitas? A resposta está num caderno qualquer.",
  },
  {
    title: "A paciente que amou o resultado e sumiu",
    text: "Terminou o protocolo, elogiou e nunca mais voltou — porque ninguém foi atrás.",
  },
  {
    title: "O mês que fechou sem ninguém saber o lucro",
    text: "Entrou dinheiro. Mas qual procedimento deu lucro e qual só deu trabalho? Chute.",
  },
];

// A virada tira a culpa do leitor antes de oferecer qualquer coisa.
// A ordem importa: interromper → absolver → nomear o culpado real →
// imagem visceral → apelo à identidade → devolver a dignidade →
// só então falar do produto. Vender antes de absolver não funciona,
// porque enquanto ele se achar o problema, nenhuma ferramenta resolve.
export const lpTurn = {
  opener: "Mas calma.",
  headline: "O problema nunca foi você.",
  body: [
    "É que a informação da sua clínica mora em cinco lugares que não se falam — e tudo acaba dependendo de alguém lembrar.",
  ],
  punch:
    "Você não se especializou em estética para virar as noites conferindo planilha.",
  dignity: "Você já faz a sua parte. Falta o sistema fazer a dele.",
  closing:
    "A Lumia foi feita de dentro de uma clínica de estética — desenhada para ela desde a primeira tela.",
};

// ── Solução: módulos com vídeo real do produto ───────────────
// Agrupados em 4 frentes temáticas para a barra de progresso do
// carrossel (padrão Stripe: barra segmentada + cards com peek nas
// bordas). A ORDEM do array importa — precisa seguir a sequência dos
// grupos abaixo, senão a barra "pula" fora de ordem conforme rola.
export interface LpModule {
  id: string;
  videoKey: string;
  tab: string;
  eyebrow: string;
  headline: string;
  body: string;
  group: number; // índice em lpModuleGroups
  // Trecho exato do headline a destacar visualmente (precisa bater
  // caractere a caractere). Não é o nome do módulo — é a parte mais
  // forte da frase, a que carrega a promessa.
  highlight: string;
}

export interface LpModuleGroup {
  label: string;
  subtitle: string;
}

export const lpModuleGroups: LpModuleGroup[] = [
  { label: "Atendimento", subtitle: "Do agendamento à ficha" },
  { label: "Comercial", subtitle: "Do lead ao contrato assinado" },
  { label: "Inteligência", subtitle: "Automação e IA" },
  { label: "Gestão", subtitle: "Financeiro e resultado" },
];

export const lpModules: LpModule[] = [
  // ── Grupo 0: Atendimento ──
  {
    id: "agenda",
    videoKey: "agenda",
    tab: "Agenda",
    eyebrow: "Faltas e confirmação manual",
    headline: "A agenda confirma, lembra e remarca sem ninguém digitar nada.",
    body: "Confirmação automática por WhatsApp em cada agendamento, lembrete na véspera e remarcação com um clique. A recepção para de perseguir paciente por mensagem e volta a atender quem está na sua frente.",
    group: 0,
    highlight: "sem ninguém digitar nada",
  },
  {
    id: "contatos",
    videoKey: "contatos",
    tab: "Pacientes",
    eyebrow: "Paciente que some depois do protocolo",
    headline: "Todo o histórico da paciente em uma tela só.",
    body: "Procedimentos feitos, sessões restantes do pacote, fotos de evolução, anotações e cada conversa registrada. Quando ela liga, você sabe exatamente onde parou — sem procurar em três lugares.",
    group: 0,
    highlight: "em uma tela só",
  },
  {
    id: "pacotes",
    videoKey: "pacotes",
    tab: "Pacotes",
    eyebrow: "Pacote controlado no caderno",
    headline: "Monte o pacote e a Lumia cuida do saldo de sessões.",
    body: "Defina as sessões, o valor e as condições de pagamento. A cada atendimento o saldo baixa sozinho — você e a paciente sempre sabem quantas faltam, sem abrir planilha nem conferir na memória.",
    group: 0,
    highlight: "cuida do saldo de sessões",
  },
  {
    id: "fichas",
    videoKey: "fichas",
    tab: "Fichas",
    eyebrow: "Anamnese em papel que se perde",
    headline: "Ficha e anamnese digital, preenchida no perfil da paciente.",
    body: "Monte o template com os campos que a sua clínica usa, obrigatórios ou não. Cada preenchimento fica registrado com data e profissional — histórico clínico completo, sem papel para extraviar.",
    group: 0,
    highlight: "preenchida no perfil da paciente",
  },
  // ── Grupo 1: Comercial ──
  {
    id: "funil",
    videoKey: "crm",
    tab: "Funil",
    eyebrow: "Orçamento que esfria sem resposta",
    headline: "Um funil feito para avaliação de estética — não um CRM genérico adaptado.",
    body: "Cada oportunidade com o WhatsApp da paciente embutido no card — você vê a conversa e a etapa do orçamento sem trocar de tela. Arraste, acompanhe, feche.",
    group: 1,
    highlight: "avaliação de estética",
  },
  {
    id: "checkpoints",
    videoKey: "funil",
    tab: "Etapas do funil",
    eyebrow: "Funil genérico que não é do seu jeito",
    headline: "As etapas são suas — você desenha o funil, não o contrário.",
    body: "Crie quantos funis quiser, nomeie cada etapa do jeito que sua clínica atende (novo lead, avaliação, proposta) e ligue IA em qualquer uma delas. Cada clínica fecha venda de um jeito — a Lumia se adapta ao seu, não o inverso.",
    group: 1,
    highlight: "você desenha o funil",
  },
  {
    id: "contrato",
    videoKey: "contrato",
    tab: "Contratos",
    eyebrow: "Contrato impresso, escaneado e perdido",
    headline: "Fechou? O contrato sai pronto e a paciente assina pelo celular.",
    body: "Modelo com os dados da venda já preenchidos, enviado por link e assinado digitalmente com validade jurídica. Sem impressora, sem scanner, sem pasta que ninguém acha depois.",
    group: 1,
    highlight: "assina pelo celular",
  },
  // ── Grupo 2: Inteligência ──
  {
    id: "escutaativa",
    videoKey: "consulta",
    tab: "Escuta Ativa",
    eyebrow: "Anotar na consulta tira atenção da paciente",
    headline: "A Lumia ouve a consulta e escreve o relatório sozinha.",
    body: "Clique em gravar, converse livre com a paciente. A IA transcreve em tempo real e gera o relatório da consulta sozinha — fica no histórico dela, pronto, sem você digitar uma linha.",
    group: 2,
    highlight: "escreve o relatório sozinha",
  },
  {
    id: "ia",
    videoKey: "ia",
    tab: "IA nativa",
    eyebrow: "Tempo que some em tarefa repetitiva",
    headline: "Uma IA que trabalha com os dados da sua clínica.",
    body: "Peça o post da semana, um relatório cruzando faturamento por profissional ou a resposta de uma dúvida operacional. Ela responde com os seus números — não com texto genérico da internet.",
    group: 2,
    highlight: "dados da sua clínica",
  },
  {
    id: "marketing",
    videoKey: "marketing",
    tab: "Marketing",
    eyebrow: "Base parada sem ninguém acionar",
    headline: "Campanhas que reativam quem já é da casa.",
    body: "Segmente por procedimento, por tempo sem voltar ou por valor gasto e dispare campanha de WhatsApp para a lista certa. A paciente que sumiu há seis meses é o lead mais barato que você tem.",
    group: 2,
    highlight: "reativam quem já é da casa",
  },
  {
    id: "integracao",
    videoKey: "integracao",
    tab: "Integração Meta",
    eyebrow: "Lead do anúncio perdido na caixa de entrada",
    headline: "O lead do anúncio do Instagram cai direto no seu funil.",
    body: "Conecte Facebook e Instagram e cada formulário de anúncio vira um lead dentro da Lumia na hora, já na etapa certa do funil. Sem baixar planilha da Meta, sem lead esfriando enquanto ninguém viu.",
    group: 2,
    highlight: "cai direto no seu funil",
  },
  // ── Grupo 3: Gestão ──
  {
    id: "financeiro",
    videoKey: "financeiro",
    tab: "Financeiro",
    eyebrow: "Faturamento alto, lucro que não aparece",
    headline: "Quanto sobra — não só quanto entrou.",
    body: "Receitas, despesas, comissões e custo de insumo por procedimento. Você descobre qual protocolo sustenta a clínica e qual só dá trabalho, com número na tela em vez de sensação.",
    group: 3,
    highlight: "Quanto sobra",
  },
  {
    id: "estoque",
    videoKey: "estoque",
    tab: "Estoque",
    eyebrow: "Toxina que acaba no meio do procedimento",
    headline: "O estoque de insumos avisa antes de faltar.",
    body: "Toxina, preenchedor, agulha, anestésico — cada insumo com quantidade, mínimo e alerta de reposição. Você vê o que está acabando antes de a paciente já estar na cadeira.",
    group: 3,
    highlight: "avisa antes de faltar",
  },
  {
    id: "relatorios",
    videoKey: "relatorios",
    tab: "Relatórios",
    eyebrow: "Decisão no achismo",
    headline: "Os números que você precisa antes da reunião, não depois.",
    body: "Taxa de ocupação, ticket médio, conversão por vendedor, retorno de campanha e faturamento por procedimento. Tudo em tempo real, sem ninguém montar planilha no fim do mês.",
    group: 3,
    highlight: "antes da reunião",
  },
];

// ── Comparativo ──────────────────────────────────────────────
export const lpComparisonColumns = [
  "Planilha + agenda do Google",
  "Sistema genérico de clínica",
  "Lumia",
] as const;

// Cabeçalhos curtos para a tabela caber no mobile sem scroll lateral.
export const lpComparisonColumnsShort = ["Planilha", "Genérico", "Lumia"] as const;

// null = não tem · "parcial" = faz pela metade · true = faz completo
export type LpCompareCell = boolean | "parcial";

export interface LpCompareRow {
  label: string;
  values: [LpCompareCell, LpCompareCell, LpCompareCell];
}

export const lpComparisonRows: LpCompareRow[] = [
  { label: "Agenda com confirmação automática por WhatsApp", values: [false, "parcial", true] },
  { label: "Controle de pacotes e sessões restantes", values: [false, "parcial", true] },
  { label: "Funil de vendas para orçamentos", values: [false, false, true] },
  { label: "Contrato com assinatura digital", values: [false, false, true] },
  { label: "Lucro por procedimento (não só faturamento)", values: [false, "parcial", true] },
  { label: "Campanhas de reativação segmentadas", values: [false, false, true] },
  { label: "IA treinada nos dados da sua clínica", values: [false, false, true] },
  { label: "Implantação feita junto com um especialista", values: [false, "parcial", true] },
  { label: "Tudo em um sistema só, sem integração remendada", values: [false, false, true] },
];

// ── A conta que ninguém faz ──────────────────────────────────
// Uma conta só, com as premissas visíveis na própria frase, em vez
// de simulador com controles. O leitor não quer operar calculadora
// no meio de uma página de vendas — quer reconhecer o próprio
// prejuízo em três segundos.
// Os valores são conservadores de propósito: 3 pacientes/mês e
// pacote de R$ 1.200 cobrem a maior parte das clínicas de estética,
// laser e emagrecimento. Quem fatura mais faz a conta para cima
// sozinho; o contrário destruiria a credibilidade do número.
export const lpCost = {
  badge: "A conta que ninguém faz",
  headline: "Quanto a bagunça te custa todo mês?",
  lead: "São duas contas que ninguém soma:",
  money: {
    label: "Dinheiro",
    intro: "Cada paciente que some sem voltar leva dinheiro junto.",
    math: "Três por mês, com um pacote médio de R$ 1.200, são R$ 3.600.",
    amount: "R$ 43.200",
    after: "no ano. Dinheiro que já era seu.",
  },
  time: {
    label: "Tempo",
    intro: "E leva o seu tempo — aquele que era para ser seu:",
    items: [
      "A meia hora procurando a ficha da paciente, que era o seu café da manhã em paz.",
      "A confirmação respondida às onze da noite, na hora que era de dormir.",
      "O domingo inteiro fechando planilha, longe de quem você ama.",
      "A paciente que sumiu e ninguém chamou, porque nem para isso o tempo deu.",
    ],
  },
  closing:
    "Dinheiro e tempo que somem todo mês. A Lumia devolve os dois — e custa menos do que uma única paciente que não voltou.",
  footnote:
    "Exemplo com valores médios de mercado. Faça a conta com os números da sua clínica.",
};

// ── Origem do produto ────────────────────────────────────────
// "Idealizador" e não "fundador": Dr. Alexandre é cofundador de
// fato, sem participação societária na LUMIA TECNOLOGIA. O termo
// entrega a mesma autoridade sem afirmar algo que o contrato
// social não sustenta.
export const lpFounder = {
  // Se um dia esta foto sair do ar, o bloco cai num monograma —
  // melhor um monograma do que uma foto de banco de imagens, que
  // destrói justamente a credibilidade que a seção constrói.
  // Original 447×447 (quadrada); é convertida para preto e branco
  // via CSS, sem precisar de um segundo arquivo.
  photo: "/images/DrAlexandre/Dralexandre.jpeg" as string | null,
  name: "Dr. Alexandre",
  role: "Idealizador da Lumia",
  credentials: [
    "Médico há mais de 30 anos",
    "Especialista em estética",
    "Dono de consultório e de uma rede de clínicas",
  ],
  headline: "A Lumia não foi desenhada por quem nunca pisou numa clínica",
  quote:
    "Passei 30 anos atendendo e mais de uma década administrando clínica. Testei um sistema atrás do outro e todos tinham o mesmo defeito: foram feitos por gente de tecnologia olhando de fora. Nenhum sabia o que é um pacote de sessões, o que é um protocolo em andamento ou o que significa uma paciente sumir no meio do tratamento.",
  closing:
    "A Lumia nasceu da minha própria operação. Cada tela existe porque um problema meu não tinha solução — e continua sendo testada todo dia dentro de uma clínica de verdade, não só numa reunião de produto.",
};

// ── Bônus inclusos ───────────────────────────────────────────
// ⚠️ ATENÇÃO: os valores em R$ abaixo são o argumento central da
// seção e precisam ser confirmados pelo time comercial antes de ir
// para produção. Declarar valor de bônus é afirmação comercial —
// tem que bater com o que a Lumia cobraria por esses serviços
// avulsos. Mexer neles quebra também a frase de fechamento, que
// depende de 2.091 ÷ 349,90 ≈ 6 mensalidades.
export const lpBonus = {
  badge: "Já vem incluído",
  headline: "A implantação que ninguém faz de graça",
  sub: "O maior motivo de um sistema não pegar não é o sistema — é a implantação que ninguém fez. Por isso ela vem junto.",
  receiptLabel: "Serviços de implantação",
  items: [
    {
      title: "Implantação guiada",
      note: "Onboarding, configuração da plataforma e cadastro de serviços, pacotes e equipe",
      value: 897,
    },
    {
      title: "Migração dos seus dados",
      note: "Contatos, histórico de pacientes e agenda, feita junto com um especialista",
      value: 697,
    },
    {
      title: "Lumia Academy",
      note: "Treinamento em vídeo para a equipe inteira, sem cobrança por usuário",
      value: 497,
    },
  ],
  subtotalLabel: "Subtotal",
  discountLabel: "Desconto Lumia",
  totalLabel: "Você paga",
  closingStrong: "A implantação sozinha vale seis meses de Lumia.",
  closingRest: "Você não paga nenhum deles.",
};

// ── Garantia / reversão de risco ─────────────────────────────
export const lpGuaranteeItems = [
  {
    title: "14 dias grátis, sem cartão de crédito",
    body: "Você testa a plataforma inteira com os dados da sua clínica antes de informar qualquer meio de pagamento. Se não fizer sentido, é só não continuar.",
  },
  {
    title: "Sem fidelidade e sem multa",
    body: "Não existe contrato de 12 meses. Você fica enquanto a Lumia estiver entregando resultado, e cancela quando quiser sem penalidade.",
  },
  {
    title: "Sem taxa de setup e sem cobrança por usuário",
    body: "Implantação, migração e treinamento estão inclusos. Cadastre a equipe inteira sem que a mensalidade mude por causa disso.",
  },
  {
    title: "Os dados são seus, sempre",
    body: "Operamos em conformidade com a LGPD, com backup diário. Se um dia você sair, exporta a sua base — nada fica preso aqui dentro.",
  },
];

// ── FAQ (objeções de compra, não SEO) ────────────────────────
export const lpFaqs = [
  {
    q: "Minha clínica é pequena. A Lumia não é grande demais pra mim?",
    a: "Não. Boa parte das clínicas que entram na Lumia começa com um ou dois profissionais. Você ativa só os módulos que usa e liga o resto conforme cresce — a mensalidade é a mesma e não muda por quantidade de usuário.",
  },
  {
    q: "Já uso outro sistema. Vou perder meu histórico se trocar?",
    a: "Não. A migração está inclusa: importamos contatos, histórico de pacientes e agenda junto com um especialista, antes de você desligar o sistema atual. A troca é feita com os dois rodando em paralelo até você ter segurança.",
  },
  {
    q: "Quanto tempo até a clínica estar operando de verdade?",
    a: "O setup inicial leva cerca de 2 horas e a maioria das clínicas está operando por completo em menos de 48 horas. O onboarding é guiado — nossa equipe configura junto com você, não te entrega um login e some.",
  },
  {
    q: "Minha equipe é resistente a sistema novo. Como fica?",
    a: "É a objeção mais comum e a mais previsível. Por isso o acesso ao Lumia Academy vale para a equipe inteira, com treinamento em vídeo por módulo, e o suporte humano responde todos os dias. Na prática a recepção costuma ser a primeira a defender a mudança, porque é quem mais ganha tempo.",
  },
  {
    q: "Preciso de cartão de crédito para começar o teste?",
    a: "Não. Os 14 dias são liberados sem cartão. Você só informa pagamento se decidir continuar depois do período.",
  },
  {
    q: "Funciona no celular?",
    a: "Sim. A Lumia roda em nuvem e sincroniza entre celular, tablet e computador. Você consulta a agenda do dia ou o faturamento do mês de qualquer lugar.",
  },
  {
    q: "E se eu quiser cancelar?",
    a: "Cancela. Não há fidelidade, não há multa e não há retenção por telefone. Você exporta seus dados e encerra.",
  },
  {
    q: "Quanto custa?",
    a: "Os planos começam em R$ 349,90 por mês por unidade, com todos os módulos inclusos, implantação, migração e treinamento. Sem taxa de setup e sem cobrança por usuário adicional.",
  },
];
