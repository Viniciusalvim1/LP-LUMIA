export interface FeatureContent {
  id: string;
  name: string;
  tagline: string;        // "O que é" resumido em 1 frase
  description: string;    // parágrafo "O que é"
  canDo: string[];        // O que o usuário pode fazer
  automatic?: string[];   // O que acontece automaticamente
  whyMatters: string;     // Por que isso importa
  dataManaged?: string[]; // Dados gerenciados (recolhível)
  videoKey?: string;      // chave do vídeo em /videos/ (se houver)
  videoUrl?: string;      // URL direta (Blob, CDN) — sobrescreve videoKey
}

export interface FeatureCategory {
  id: string;
  label: string;
  features: FeatureContent[];
}

export const featureCategories: FeatureCategory[] = [
  {
    id: "operacao",
    label: "Operação",
    features: [
      {
        id: "cadastro",
        name: "Configuração Inicial",
        tagline: "A clínica pronta para operar, sem precisar de suporte técnico.",
        description:
          "Assistente de configuração inicial que guia o cadastro dos dados da clínica, serviços, profissionais e horários no primeiro acesso à Lumia.",
        canDo: [
          "Cadastrar os dados da clínica (nome, endereço, contato)",
          "Cadastrar profissionais, serviços e horários de funcionamento",
          "Seguir um passo a passo guiado até a clínica ficar pronta para o primeiro agendamento",
        ],
        whyMatters:
          "A maioria dos sistemas entrega uma tela vazia e um manual de 40 páginas. Na Lumia, o próprio produto guia a configuração inicial — a clínica sai do zero para operando sem depender de um técnico ao lado.",
        videoKey: "cadastro",
      },
      {
        id: "painel",
        name: "Painel Operacional",
        tagline: "O dia da clínica inteiro em uma tela, sempre atualizado.",
        description:
          "Painel com a lista de atendimentos e vendas recentes, atualizado em tempo real conforme a equipe usa o sistema.",
        canDo: [
          "Ver os últimos atendimentos e vendas registrados, com cliente, procedimento, sala e valor",
          "Acessar rapidamente a assinatura ou o contrato de cada atendimento",
          "Acompanhar o movimento da clínica sem abrir relatório nenhum",
        ],
        whyMatters:
          "Dá pra sentir o pulso da clínica batendo o olho numa tela só — sem esperar o fechamento do mês pra saber se o dia foi bom.",
        videoKey: "geral",
      },
      {
        id: "agenda",
        name: "Agenda",
        tagline: "Agendamento completo para clínicas com múltiplos profissionais.",
        description:
          "Sistema completo de agendamento para clínicas com múltiplos profissionais, serviços e horários. Gerencie toda a agenda da clínica em um único lugar, com validações automáticas que evitam conflitos e sobreposições.",
        canDo: [
          "Visualizar a agenda em três modos: diário, semanal e mensal",
          "Criar agendamentos arrastando e soltando (drag & drop) no calendário",
          "Reagendar atendimentos movendo-os para outro horário ou profissional",
          "Bloquear períodos da agenda (férias, intervalo, indisponibilidade) com motivo",
          "Rastrear presença: agendado → confirmado → realizado / faltou / cancelado / reagendado",
          "Configurar horários de trabalho por profissional e dia da semana, com pausa",
          "Definir intervalo mínimo entre sessões do mesmo procedimento (ex.: 30 dias entre sessões de laser)",
          "Receber e enviar lembretes automáticos de agendamento",
        ],
        whyMatters:
          "Sem controle de agenda, a clínica perde atendimentos por sobreposição de horários, não rastreia faltas e não tem visão do dia/semana. A Lumia bloqueia automaticamente horários indisponíveis, impede agendamento fora do horário de trabalho do profissional e registra cada mudança de status — gerando dados para o relatório de no-show.",
        dataManaged: [
          "Agendamentos com data, hora, duração, profissional, cliente, serviço, status e observações",
          "Bloqueios de agenda com período e motivo",
          "Horários de trabalho por dia da semana com início, fim e pausa",
          "Histórico de status de cada agendamento",
        ],
        videoKey: "agenda",
      },
      {
        id: "atendimento",
        name: "Atendimento",
        tagline: "Registro do atendimento com assinatura digital na hora.",
        description:
          "Fluxo estruturado para registrar cada atendimento: quais procedimentos foram feitos, quais produtos foram usados, observações clínicas e coleta da assinatura digital do cliente no momento do atendimento.",
        canDo: [
          "Iniciar atendimento selecionando o cliente e a data",
          "Registrar procedimentos realizados com quantidade (campos especiais para laser: potência e frequência)",
          "Registrar produtos usados e quantidade consumida (descontando do estoque)",
          "Adicionar observações clínicas",
          "Capturar assinatura digital: na tela (canvas com o dedo) ou por foto/upload",
          "Revisar todos os dados antes de finalizar",
          "Enviar o contrato com os dados do atendimento para assinatura via Assinafy",
          "Baixar o contrato assinado em PDF",
        ],
        automatic: [
          "O status da sessão é atualizado para “realizada”",
          "O estoque dos produtos usados é baixado automaticamente",
          "O atendimento aparece na timeline do cliente",
        ],
        whyMatters:
          "Elimina o papel e garante validade jurídica. O cliente assina na hora, o contrato fica arquivado digitalmente e o profissional não gerencia arquivos físicos. Se o atendimento vier agendado, os dados do cliente e do procedimento já vêm pré-preenchidos.",
        videoKey: "contrato",
      },
      {
        id: "escutaativa",
        name: "Escuta Ativa Lumia",
        tagline: "Grava a consulta, transcreve e gera o relatório sozinha.",
        description:
          "IA que grava o áudio da consulta direto no perfil do paciente, transcreve em tempo real e gera um relatório da conversa — sem ninguém digitar nada durante o atendimento.",
        canDo: [
          "Iniciar a gravação com um clique, direto na aba Consultas do perfil do paciente",
          "Ver a transcrição em tempo real enquanto a consulta acontece",
          "Consultar o histórico completo de consultas gravadas, com duração e responsável",
          "Gerar relatório da consulta a partir da transcrição, com um clique",
        ],
        whyMatters:
          "Anotar durante a consulta tira atenção do paciente, e depois ninguém lembra os detalhes exatos do que foi combinado. Com a Lumia ouvindo e transcrevendo, o profissional conversa livre — e o relatório sai pronto sozinho.",
        videoKey: "consulta",
      },
      {
        id: "estoque",
        name: "Estoque",
        tagline: "Controle de produtos e insumos com alertas automáticos.",
        description:
          "Controle de produtos e insumos usados nos atendimentos, com alertas de nível crítico e rastreamento de entrada e saída.",
        canDo: [
          "Ver dashboard com KPIs: Total de Produtos, Em Nível Normal, Em Alerta, Zerados",
          "Ver alertas de produtos com estoque crítico (barra de progresso visual)",
          "Ver top produtos por volume de uso",
          "Registrar entrada de produtos com quantidade e data",
          "Ver extrato de movimentação completo com filtros por produto e tipo",
          "Ver histórico de saídas por mês",
        ],
        automatic: [
          "Cada produto registrado em um atendimento é descontado automaticamente do estoque",
          "Alertas aparecem no dashboard quando o estoque cai abaixo do nível mínimo",
        ],
        whyMatters:
          "Sem controle de estoque, a clínica fica sem insumos no meio do atendimento ou compra mais do que precisa. A Lumia conecta o que foi usado em cada atendimento com o saldo de estoque, sem lançamento manual.",
        videoKey: "estoque",
      },
      {
        id: "pacotes",
        name: "Pacotes",
        tagline: "Pacotes pré-configurados para padronizar a venda.",
        description:
          "Cadastro de pacotes de serviços pré-configurados para facilitar e padronizar o processo de venda.",
        canDo: [
          "Criar pacotes com nome, descrição, preço sugerido e validade em dias",
          "Adicionar múltiplos procedimentos a cada pacote com quantidade",
          "Editar e reorganizar itens do pacote",
          "Ativar e desativar pacotes",
          "Selecionar pacotes durante o fluxo de venda",
        ],
        whyMatters:
          "Pacotes padronizados agilizam a venda — em vez de selecionar cada procedimento individualmente, o atendente escolhe o pacote e todos os itens já entram com as quantidades certas. O preço sugerido serve de referência, mas pode ser ajustado na venda.",
        videoKey: "pacotes",
      },
    ],
  },
  {
    id: "comercial",
    label: "Comercial",
    features: [
      {
        id: "funil",
        name: "Funil de Vendas (CRM)",
        tagline: "Kanban de leads do primeiro contato à conversão.",
        description:
          "Kanban board de gestão de leads e oportunidades comerciais. Acompanhe cada lead desde o primeiro contato até a conversão em venda, com visibilidade total do pipeline.",
        canDo: [
          "Criar funis customizáveis com nome, cor e descrição (ex.: “Captação Instagram”)",
          "Criar etapas com cor e tipo: normal, ganha ou perdida",
          "Reordenar etapas livremente",
          "Criar oportunidades com telefone, email, procedimento, valor, responsável, origem e tags",
          "Arrastar oportunidades entre etapas com drag & drop",
          "Registrar notas e eventos na linha do tempo de cada oportunidade",
          "Criar orçamentos vinculados à oportunidade",
          "Converter oportunidade “ganha” diretamente em venda",
          "Arquivar oportunidades sem excluí-las",
          "Filtrar por funil, etapa, responsável e tags",
          "Rastrear a última interação com cada lead (identificar quem está parado)",
        ],
        whyMatters:
          "Lead que entra pelo Instagram, WhatsApp ou site some sem acompanhamento. O funil centraliza todos os leads, distribui responsabilidades entre os atendentes e mostra visualmente onde cada oportunidade está. Quando fecha a venda, a oportunidade já tem os dados do cliente e do procedimento — a venda é gerada com um clique.",
        dataManaged: [
          "Funis (pipelines) com etapas configuráveis",
          "Oportunidades com histórico completo de eventos",
          "Origens das oportunidades para análise de canal",
          "Data de última interação para identificar leads frios",
        ],
        videoKey: "crm",
      },
      {
        id: "checkpoints",
        name: "Etapas do Funil",
        tagline: "Cada funil com as etapas do jeito que a sua clínica vende.",
        description:
          "Editor de etapas (checkpoints) do funil: crie, nomeie, coloria e reordene as fases do pipeline comercial, com IA disponível em qualquer etapa.",
        canDo: [
          "Criar múltiplos funis para processos diferentes (ex.: Comercial, Captação Instagram)",
          "Adicionar, renomear e reordenar etapas livremente",
          "Definir o tipo de cada etapa: em andamento, venda ganha ou venda perdida",
          "Ativar IA em uma etapa específica para qualificar ou responder automaticamente",
        ],
        whyMatters:
          "Cada clínica fecha venda de um jeito — funil engessado força a operação a se adaptar ao sistema. Na Lumia é o contrário: você desenha as etapas do seu processo comercial, e o funil segue o seu fluxo.",
        videoKey: "funil",
      },
      {
        id: "conversas",
        name: "Conversas",
        tagline: "O WhatsApp de cada lead, dentro da própria oportunidade.",
        description:
          "Caixa de entrada unificada que conecta o WhatsApp da clínica a cada oportunidade do funil, sem precisar sair do CRM para responder.",
        canDo: [
          "Ver e responder a conversa de WhatsApp dentro do card da oportunidade",
          "Acompanhar a linha do tempo completa: notas, mudanças de etapa e mensagens no mesmo lugar",
          "Ver a caixa de entrada com todas as conversas ativas em um painel único",
          "Identificar de qual origem (Google Ads, Instagram, indicação) veio cada conversa",
        ],
        whyMatters:
          "Sem isso, o atendente responde no celular pessoal ou no WhatsApp Web, e a conversa não fica ligada à oportunidade nem visível para o resto da equipe. Com o CRM e o WhatsApp no mesmo lugar, qualquer pessoa assume a conversa com o histórico completo à vista.",
        videoKey: "crm",
      },
      {
        id: "vendas",
        name: "Vendas",
        tagline: "Venda em 3 passos, com contrato e sessões gerados sozinhos.",
        description:
          "Módulo completo para registrar vendas de pacotes e serviços, com controle de parcelamento, desconto, antecipação e geração automática de sessões e contrato.",
        canDo: [
          "Criar venda em wizard de 3 passos: cliente → pacote/serviço → pagamento",
          "Aplicar desconto (percentual ou valor fixo)",
          "Configurar parcelamento com vencimentos automáticos",
          "Antecipar parcelas com cálculo de taxa de maquininha e antecipação",
          "Ver dashboard com KPIs: Total Vendido, Nº de Vendas, Ticket Médio",
          "Filtrar vendas por período e por status (Liquidado, A Receber, Vencido)",
          "Comparar desempenho com o período anterior",
          "Ver tendência, top origens e top procedimentos",
          "Cancelar venda (se nenhuma sessão já tiver sido realizada)",
        ],
        automatic: [
          "Ao fechar a venda, as sessões correspondentes são geradas automaticamente",
          "O contrato é gerado com os dados da venda",
          "Taxas de antecipação viram despesas financeiras automaticamente",
        ],
        whyMatters:
          "O profissional não anota na planilha, não cria sessões na mão nem lembra de gerar o contrato — a Lumia faz tudo ao finalizar a venda. O dashboard mostra em tempo real quanto a clínica vendeu e qual é a tendência.",
        videoKey: "vendas",
      },
      {
        id: "contratos",
        name: "Contratos Digitais",
        tagline: "Templates com variáveis e assinatura eletrônica.",
        description:
          "Gerador e gerenciador de contratos digitais com templates customizáveis, variáveis automáticas e integração com serviço de assinatura eletrônica.",
        canDo: [
          "Criar templates de contrato em HTML com variáveis dinâmicas ({{cliente.nome}}, {{procedimentos}}, {{data}})",
          "Ativar/desativar templates",
          "Enviar contrato para assinatura digital (integração com Assinafy)",
          "Baixar contrato assinado em PDF",
          "Ver status de cada contrato (pendente, assinado)",
        ],
        whyMatters:
          "Contratos físicos somem, não têm validade jurídica robusta e exigem impressora. Com a Lumia, o contrato é gerado automaticamente com os dados da venda, enviado por link e assinado digitalmente com validade legal.",
        videoKey: "contrato",
      },
    ],
  },
  {
    id: "clientes",
    label: "Clientes",
    features: [
      {
        id: "clientes360",
        name: "Clientes 360º",
        tagline: "Perfil centralizado com todo o histórico do cliente.",
        description:
          "Cadastro completo e perfil centralizado de cada cliente, com todas as informações clínicas, financeiras e de relacionamento em um único lugar.",
        canDo: [
          "Cadastrar clientes com dados pessoais, CPF, endereço (autopreenchido por CEP) e observações",
          "Organizar clientes em grupos com cor (VIP, Inativos, Indicações)",
          "Buscar e filtrar clientes por nome, grupo ou critérios",
          "Acessar perfil 360º com 8 abas: Dados, Timeline, Fichas, Anamneses, Galeria, Sessões, Compras, Protocolos",
          "Ver a galeria de fotos antes/durante/depois dos tratamentos",
          "Controlar sessões consumidas por pacote comprado",
          "Acompanhar protocolos contínuos (ex.: Tirzepatida com dosagem e datas)",
          "Gerenciar colaboradores e fornecedores nas mesmas abas de contatos",
        ],
        whyMatters:
          "Sem perfil centralizado, a clínica perde informações espalhadas em WhatsApp, planilhas e papéis. Com a Lumia, qualquer profissional acessa o histórico completo antes do atendimento: quantas sessões já fez, quais procedimentos realizou, contraindicações na anamnese, fotos de comparação e crédito restante em pacotes.",
        dataManaged: [
          "Cadastro completo com dados pessoais, documentos e localização",
          "Grupos de clientes com membros",
          "Galeria de fotos por cliente",
          "Histórico de fichas e anamneses (com quem preencheu e quando)",
          "Sessões com status por venda/pacote",
          "Protocolos de tratamento com dosagem e evolução",
        ],
        videoKey: "contatos",
      },
      {
        id: "fichas",
        name: "Fichas e Anamneses",
        tagline: "Formulários clínicos customizáveis e digitais.",
        description:
          "Sistema de formulários clínicos customizáveis para coleta de informações dos clientes antes ou durante os atendimentos.",
        canDo: [
          "Criar templates de fichas e anamneses com campos personalizados (texto, número, data, sim/não, seleção)",
          "Definir quais campos são obrigatórios",
          "Ativar/desativar templates",
          "Preencher fichas no perfil do cliente (registrando profissional e data)",
          "Ver todo o histórico de preenchimentos (cada um registrado separadamente)",
          "Editar respostas preenchidas",
          "Filtrar fichas por tipo (ficha geral ou anamnese)",
        ],
        whyMatters:
          "Anamneses em papel são perdidas e difíceis de consultar. Com a Lumia, o histórico clínico está no perfil digital, acessível por qualquer profissional autorizado antes do atendimento. Templates reutilizáveis evitam recriar formulários toda vez.",
        videoKey: "fichas",
      },
    ],
  },
  {
    id: "gestao",
    label: "Gestão",
    features: [
      {
        id: "financeiro",
        name: "Financeiro",
        tagline: "Receitas, despesas, DRE e comissões em um só lugar.",
        description:
          "Controle financeiro completo da clínica: receitas, despesas, DRE (Demonstração de Resultado do Exercício), comissões e projeções.",
        canDo: [
          "Ver dashboard com 4 KPIs: Recebido, A Receber, Resultado Realizado, Despesas Pendentes",
          "Ver gráfico histórico dos últimos 6 meses e projeção do mês atual",
          "Lançar despesas com categoria, fornecedor, forma de pagamento, vencimento e tipo (única/recorrente/parcelada)",
          "Marcar despesas como pagas com data de pagamento",
          "Gerenciar categorias financeiras hierárquicas (com subcategorias)",
          "Ver receitas (parcelas de vendas) por período",
          "Antecipar recebimento de parcelas com cálculo de taxa",
          "Visualizar DRE completo com receitas e despesas por categoria",
          "Consultar comissões por procedimento e por profissional",
        ],
        whyMatters:
          "Muitas clínicas faturam bem mas não sabem o lucro real porque não controlam despesas. Com a Lumia, receitas entram automaticamente das vendas, as despesas são categorizadas e o DRE mostra exatamente o resultado do mês. Comissões são calculadas automaticamente, eliminando planilhas.",
        dataManaged: [
          "Despesas por categoria com status e histórico de pagamento",
          "Receitas (parcelas de vendas) com vencimento e recebimento",
          "Categorias financeiras hierárquicas",
          "Antecipações com taxas discriminadas",
          "DRE consolidado por período",
        ],
        videoKey: "financeiro",
      },
      {
        id: "relatorios",
        name: "Relatórios",
        tagline: "CAC, LTV, RFM, no-show, margem, DRE e mais.",
        description:
          "Central de relatórios gerenciais que transforma os dados da clínica em indicadores de negócio para tomada de decisão. Organizados em Growth, Operação e Saúde Financeira.",
        canDo: [
          "Growth — CAC (custo de aquisição), RFM (segmentação por engajamento) e LTV (valor no tempo)",
          "Operação — No-Show por profissional/procedimento, Produtividade e Atendimentos",
          "Saúde Financeira — Margem por procedimento, DRE, Caixa (realizado e projetado) e Aging",
          "Filtrar por período e comparar com períodos anteriores",
          "Acessar indicadores sempre atualizados, sem montar planilha",
        ],
        whyMatters:
          "A maioria das clínicas não sabe seu LTV, não mede CAC e descobre o resultado só no fim do mês. Com a Lumia, esses dados estão sempre atualizados e acessíveis.",
        videoKey: "relatorios",
      },
      {
        id: "marketing",
        name: "Marketing e Automações",
        tagline: "Mensagens automáticas por e-mail e WhatsApp.",
        description:
          "Hub de automações de comunicação que dispara mensagens automáticas para clientes em momentos estratégicos — por e-mail ou WhatsApp — sem ação manual.",
        canDo: [
          "Confirmação de Agendamento — reduz no-show antes do atendimento",
          "Aniversário do Cliente — parabéns com oferta personalizada no dia",
          "NPS Pós-Atendimento — pesquisa de satisfação N horas após o atendimento",
          "Pacote Acabando — alerta quando as sessões restantes ficam abaixo do limite",
          "Configurar cada automação: toggle, parâmetros, template de e-mail e WhatsApp, janela de horário",
          "Monitorar a fila de envios com status (aguardando, enviado, falha, cancelado)",
          "Cancelar envios específicos antes do disparo",
        ],
        whyMatters:
          "Comunicação manual não escala. Com automações, a clínica confirma agendamentos, parabeniza clientes, coleta NPS e avisa sobre pacotes perto do vencimento — tudo sem intervenção humana. O sistema evita duplicatas (cada cliente recebe cada mensagem uma única vez por evento).",
        videoKey: "marketing",
      },
      {
        id: "integracoes",
        name: "Integração com Meta Ads",
        tagline: "Lead do anúncio do Facebook e Instagram direto no funil.",
        description:
          "Conexão com a Página do Facebook para capturar automaticamente os leads gerados por anúncios de formulário (lead ads) no Facebook e Instagram.",
        canDo: [
          "Conectar a Página do Facebook da clínica em poucos passos",
          "Escolher em qual funil e etapa cada formulário de anúncio deve entrar",
          "Ver os leads chegando no CRM assim que preenchem o formulário do anúncio",
        ],
        whyMatters:
          "Sem integração, o lead do anúncio fica preso no gerenciador de anúncios ou numa planilha exportada manualmente — e esfria antes de alguém ver. Conectado, o lead vira oportunidade no funil no mesmo instante em que o formulário é enviado.",
        videoKey: "integracao",
      },
    ],
  },
];

// Lista achatada — útil para iterar
export const allFeatures = featureCategories.flatMap((c) => c.features);
