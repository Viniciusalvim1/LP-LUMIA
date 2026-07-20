import type { Metadata } from "next";
import LegalLayout, { type LegalSection } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Saiba como a Lumia coleta, usa, armazena e protege os seus dados pessoais.",
};

const sections: LegalSection[] = [
  {
    heading: "Quais dados coletamos",
    body: [
      "Coletamos os dados que você nos fornece diretamente ao preencher formulários no site (como nome, e-mail e telefone), ao criar uma conta ou ao entrar em contato conosco.",
      "Também coletamos automaticamente informações de navegação, como endereço IP, tipo de dispositivo, páginas visitadas e dados de cookies, com o objetivo de melhorar a experiência e medir o desempenho do site.",
    ],
  },
  {
    heading: "Como usamos os seus dados",
    body: [
      "Utilizamos os dados para responder às suas solicitações, fornecer e melhorar nossos serviços, enviar comunicações relevantes sobre a Lumia e cumprir obrigações legais.",
      "Não vendemos seus dados pessoais a terceiros. Compartilhamos informações apenas com prestadores de serviço necessários à operação (por exemplo, hospedagem e ferramentas de análise), sempre sob obrigações de confidencialidade.",
    ],
  },
  {
    heading: "Cookies e tecnologias semelhantes",
    body: [
      "Usamos cookies e ferramentas de análise (como o Google Analytics) para entender como os visitantes utilizam o site e aprimorar nossos conteúdos e funcionalidades.",
      "Você pode gerenciar ou desativar cookies nas configurações do seu navegador, ciente de que isso pode afetar algumas funcionalidades do site.",
    ],
  },
  {
    heading: "Integração com o Google Agenda",
    body: [
      "Se você é profissional de uma clínica cliente, pode conectar sua conta Google na Lumia. Essa conexão tem dois níveis de acesso independentes, e o segundo só é ativado se você escolher explicitamente ligá-lo.",
      "Nível padrão (ativado ao conectar): copiamos, para um calendário secundário criado especialmente para isso (chamado \"Lumia\"), os agendamentos em que você é a profissional responsável. É um sentido só — do sistema Lumia para o Google Agenda. O escopo usado (calendar.app.created) permite ao aplicativo criar e gerenciar apenas esse calendário que ele mesmo cria; não alcança seu calendário pessoal, outros calendários da sua conta, nem os compromissos que você já tinha antes de conectar. Também lemos seu endereço de e-mail do Google, só para identificar qual conta está conectada.",
      "Nível opcional (\"Importar meu calendário pessoal\", desligado por padrão): se você ativar essa opção em Configurações → Integrações, passamos a ler os eventos do seu calendário principal do Google. Cada evento encontrado bloqueia o horário correspondente na sua agenda da clínica, para evitar que um cliente seja marcado em cima de um compromisso que você já tinha — mas o evento nunca vira um agendamento com nome de cliente na Lumia, nem é compartilhado com a equipe além do horário estar indisponível. Ativar esse nível pede uma permissão adicional e mais ampla do Google (calendar.events), que só é solicitada no momento em que você liga a opção — nunca antes.",
      "Em nenhum dos dois níveis convidamos o paciente como participante do evento, nem compartilhamos o e-mail dele com o Google. Os dados usados nos eventos que a Lumia cria (nome do cliente, procedimento, horário, telefone) já existem no seu cadastro na clínica; não são usados para qualquer finalidade publicitária.",
      "Você pode desligar a importação ou revogar o acesso por completo a qualquer momento, diretamente na Lumia (Configurações → Integrações → Google Agenda) ou pela sua Conta Google, em myaccount.google.com/permissions. Ao desconectar, os dados de conexão são apagados do nosso banco; bloqueios já importados e eventos já criados no calendário \"Lumia\" permanecem até você removê-los manualmente, salvo se optar por excluir o calendário no momento da desconexão.",
    ],
  },
  {
    heading: "Armazenamento e segurança",
    body: [
      "Adotamos medidas técnicas e organizacionais razoáveis para proteger seus dados contra acesso não autorizado, perda ou alteração. Os dados são armazenados em servidores de provedores que seguem padrões reconhecidos de segurança.",
      "Mantemos os dados apenas pelo tempo necessário às finalidades descritas nesta política ou conforme exigido por lei.",
    ],
  },
  {
    heading: "Seus direitos (LGPD)",
    body: [
      "Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você pode solicitar a confirmação do tratamento, o acesso, a correção, a portabilidade, a anonimização ou a exclusão dos seus dados, bem como revogar consentimentos.",
      "Para exercer seus direitos, basta entrar em contato pelo e-mail informado ao final desta página.",
    ],
  },
  {
    heading: "Alterações nesta política",
    body: [
      "Esta Política de Privacidade pode ser atualizada periodicamente. A versão vigente estará sempre disponível nesta página, com a data da última atualização indicada no topo.",
    ],
  },
];

export default function PrivacidadePage() {
  return (
    <LegalLayout
      title="Política de Privacidade"
      updatedAt="20 de julho de 2026"
      intro="Esta Política de Privacidade descreve como a Lumia coleta, utiliza, armazena e protege as informações dos visitantes e usuários dos seus serviços. Ao utilizar nosso site, você concorda com as práticas aqui descritas."
      sections={sections}
    />
  );
}
