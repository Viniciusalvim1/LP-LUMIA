import type { Metadata } from "next";
import LegalLayout, { type LegalSection } from "@/components/LegalLayout";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Condições gerais para utilização do site e dos serviços da Lumia.",
};

const sections: LegalSection[] = [
  {
    heading: "Aceitação dos termos",
    body: [
      "Ao acessar e utilizar o site e os serviços da Lumia, você concorda com estes Termos de Uso. Caso não concorde com qualquer condição, recomendamos que não utilize a plataforma.",
    ],
  },
  {
    heading: "Descrição do serviço",
    body: [
      "A Lumia é um software de gestão (CRM) para clínicas de estética, oferecido na modalidade de assinatura. As funcionalidades disponíveis podem variar conforme o plano contratado e podem ser atualizadas ao longo do tempo.",
    ],
  },
  {
    heading: "Cadastro e conta",
    body: [
      "Para utilizar determinados recursos, é necessário criar uma conta com informações verdadeiras, completas e atualizadas. Você é responsável por manter a confidencialidade das suas credenciais e por todas as atividades realizadas na sua conta.",
    ],
  },
  {
    heading: "Uso adequado",
    body: [
      "Você concorda em utilizar a plataforma de forma lícita, não praticando atividades que violem leis, direitos de terceiros ou que comprometam a segurança e o funcionamento do serviço.",
      "É vedado tentar acessar áreas restritas, realizar engenharia reversa ou utilizar o serviço para fins não autorizados.",
    ],
  },
  {
    heading: "Planos, pagamento e cancelamento",
    body: [
      "Os valores, formas de pagamento e condições do plano são apresentados no momento da contratação. A assinatura é sem fidelidade e pode ser cancelada a qualquer momento, conforme as condições vigentes.",
      "O não pagamento poderá resultar na suspensão ou no encerramento do acesso aos serviços.",
    ],
  },
  {
    heading: "Lumia Checkout (pagamentos)",
    body: [
      "O Lumia Checkout é uma funcionalidade da Lumia que permite à clínica cobrar seus pacientes por Pix, boleto e cartão: parcelas das vendas registradas no sistema, compras de pacotes e agendamentos pagos feitos pelo paciente na área do cliente e planos mensais com cobrança recorrente no cartão.",
      "Para usar o Lumia Checkout, a clínica tem uma conta de pagamento própria no Asaas, aberta em seu nome. Os valores pagos pelos pacientes são recebidos e mantidos nessa conta, sob responsabilidade do Asaas. A Lumia não recebe, não guarda e não movimenta os valores da clínica.",
    ],
  },
  {
    heading: "Prestação de Serviços Financeiros",
    body: [
      "Os serviços financeiros e de pagamentos disponibilizados por meio da presente plataforma, incluindo abertura e manutenção de conta de pagamento, processamento de transações, emissão de boletos, transferências, pagamentos e demais movimentações de valores, são prestados pelo ASAAS GESTÃO FINANCEIRA INSTITUIÇÃO DE PAGAMENTOS S.A., instituição de pagamento autorizada a funcionar pelo Banco Central do Brasil.",
      `A ${company.legalName} atua exclusivamente como integradora tecnológica e distribuidora da experiência do produto, não sendo instituição financeira ou de pagamento, nem realizando intermediação financeira em nome próprio.`,
      "O cliente declara ciência de que o relacionamento financeiro / de pagamentos e a responsabilidade regulatória pelos serviços acima descritos são do ASAAS GESTÃO FINANCEIRA S.A., nos termos da regulamentação vigente.",
    ],
  },
  {
    heading: "Remuneração de uso da plataforma",
    body: [
      "Pelo uso da plataforma, a Lumia recebe uma remuneração de uso da plataforma sobre as cobranças pagas por boleto e cartão, descontada automaticamente na liquidação. Cobranças pagas por Pix não têm remuneração de uso da plataforma. A remuneração não se confunde com as tarifas dos serviços financeiros, que são do Asaas. Se uma cobrança for estornada, a remuneração correspondente também é estornada.",
    ],
  },
  {
    heading: "Vendas da clínica aos pacientes",
    body: [
      "Nas vendas feitas pela área do cliente e nos planos mensais, a clínica é a vendedora: define preços, pacotes, planos e regras, responde pela prestação dos serviços e pelo atendimento ao paciente, inclusive pedidos de cancelamento e de devolução previstos no Código de Defesa do Consumidor.",
      "Os planos mensais não têm fidelidade: o paciente pode cancelar a qualquer momento pela área do cliente ou com a clínica, e as cobranças seguintes deixam de ser feitas. O que já foi pago continua valendo pelo prazo do plano.",
    ],
  },
  {
    heading: "Atendimento sobre pagamentos",
    body: [
      "Dúvidas e reclamações sobre os serviços financeiros podem ser feitas diretamente ao Asaas, pelo telefone 0800 009 0037 ou pelo e-mail contato@asaas.com.br. Reclamações recebidas pela Lumia sobre esses serviços serão encaminhadas ao Asaas.",
    ],
  },
  {
    heading: "Propriedade intelectual",
    body: [
      "Todo o conteúdo, marca, layout e software da Lumia são protegidos por direitos de propriedade intelectual e não podem ser copiados, reproduzidos ou utilizados sem autorização prévia.",
    ],
  },
  {
    heading: "Limitação de responsabilidade",
    body: [
      "A Lumia empenha-se em manter o serviço disponível e seguro, mas não garante funcionamento ininterrupto ou livre de erros. Na máxima extensão permitida em lei, a Lumia não se responsabiliza por danos indiretos decorrentes do uso ou da indisponibilidade do serviço.",
    ],
  },
  {
    heading: "Alterações dos termos",
    body: [
      "Estes Termos de Uso podem ser modificados a qualquer momento. A versão atualizada estará sempre disponível nesta página, e o uso contínuo do serviço após alterações implica concordância com os novos termos.",
    ],
  },
  {
    heading: "Foro",
    body: [
      "Estes Termos são regidos pelas leis brasileiras. Fica eleito o foro da comarca de Belo Horizonte/MG para dirimir eventuais controvérsias, com renúncia a qualquer outro, por mais privilegiado que seja.",
    ],
  },
];

export default function TermosPage() {
  return (
    <LegalLayout
      title="Termos de Uso"
      updatedAt="10 de outubro de 2026"
      intro="Estes Termos de Uso estabelecem as condições gerais para a utilização do site e dos serviços oferecidos pela Lumia. Leia com atenção antes de utilizar a plataforma."
      sections={sections}
    />
  );
}
