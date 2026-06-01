export interface StoryBeatData {
  id: string;
  eyebrow: string;
  headline: string;
  body: string;
  videoKey: string;
  flip?: boolean; // alternates layout left/right
}

export const chaosLines = [
  "Mensagens sem resposta.",
  "Pacientes que faltam sem aviso.",
  "Leads que somem no WhatsApp.",
  "Relatórios que não fecham.",
  "Horas gastas em tarefas manuais.",
  "E no fim do dia, a sensação de que deu pra menos.",
];

export const turnHeadline = "E se cada problema tivesse uma resposta?";
export const turnBody =
  "O Lumia foi construído para eliminar exatamente esses problemas — um módulo para cada dor da sua clínica.";

export const storyBeats: StoryBeatData[] = [
  {
    id: "contatos",
    eyebrow: "Leads perdidos no WhatsApp",
    headline: "Nunca mais perca um paciente por falta de acompanhamento.",
    body: "Centralize todos os contatos, histórico de mensagens e status de cada lead em um único painel. Filtre, segmente e aja antes que o paciente esfrie.",
    videoKey: "contatos",
    flip: false,
  },
  {
    id: "agenda",
    eyebrow: "Faltas e remarcações manuais",
    headline: "Agenda automática que confirma, lembra e remarca por você.",
    body: "Reduza faltas em até 40% com confirmações automáticas via WhatsApp. Visualize disponibilidade em tempo real e deixe os pacientes agendarem sozinhos.",
    videoKey: "agenda",
    flip: true,
  },
  {
    id: "ia",
    eyebrow: "Inteligência Artificial nativa",
    headline: "IA que cria, responde e analisa — tudo dentro do Lumia.",
    body: "Peça para a IA gerar imagens para campanhas, criar posts prontos para redes sociais, montar relatórios personalizados com os dados da sua clínica ou responder qualquer dúvida operacional em segundos. Um assistente completo que trabalha enquanto você atende.",
    videoKey: "ia",
    flip: false,
  },
  {
    id: "vendas",
    eyebrow: "Gestão de vendas e contratos",
    headline: "Crie vendas, feche negócios e envie contratos automaticamente.",
    body: "Registre uma venda em segundos, defina pacotes e condições de pagamento e dispare o contrato automaticamente para o paciente assinar digitalmente. Menos burocracia, mais conversão — do primeiro contato até o fechamento, tudo em um só lugar.",
    videoKey: "vendas",
    flip: true,
  },
  {
    id: "financeiro",
    eyebrow: "Cobrança e fluxo descontrolados",
    headline: "Financeiro claro, cobranças no prazo, fluxo de caixa em dia.",
    body: "Emita cobranças, controle receitas e despesas, visualize o fluxo de caixa e tome decisões com dados reais — não no achismo.",
    videoKey: "financeiro",
    flip: false,
  },
  {
    id: "marketing",
    eyebrow: "Não sabe como atrair mais pacientes",
    headline: "Campanhas que chegam para quem precisa, na hora certa.",
    body: "Dispare campanhas de WhatsApp, e-mail e SMS para listas segmentadas. Reative pacientes inativos e atraia novos com automações inteligentes.",
    videoKey: "marketing",
    flip: true,
  },
  {
    id: "relatorios",
    eyebrow: "Decisões no achismo",
    headline: "Relatórios que mostram onde sua clínica realmente está.",
    body: "Taxa de ocupação, faturamento por procedimento, retorno de campanhas — tudo em dashboards visuais, atualizados em tempo real.",
    videoKey: "relatorios",
    flip: false,
  },
];

export const metrics = [
  { value: 40, suffix: "%", label: "menos faltas", sublabel: "com confirmações automáticas" },
  { value: 3, suffix: "h", label: "recuperadas por dia", sublabel: "de tarefas manuais eliminadas" },
  { value: 100, suffix: "+", label: "clínicas ativas", sublabel: "crescendo com o Lumia" },
];
