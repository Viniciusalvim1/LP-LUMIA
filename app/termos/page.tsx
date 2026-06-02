import type { Metadata } from "next";
import LegalLayout, { type LegalSection } from "@/components/LegalLayout";

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
      updatedAt="01 de junho de 2026"
      intro="Estes Termos de Uso estabelecem as condições gerais para a utilização do site e dos serviços oferecidos pela Lumia. Leia com atenção antes de utilizar a plataforma."
      sections={sections}
    />
  );
}
