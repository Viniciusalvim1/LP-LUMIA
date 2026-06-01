import type { Metadata } from "next";
import { Montserrat, Questrial } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

const questrial = Questrial({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-questrial",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumia — CRM para Clínicas de Estética",
  description:
    "Centralize agendamentos, prontuários, financeiro e marketing em um só lugar. A solução all-in-one desenvolvida para clínicas que querem crescer sem caos.",
  icons: {
    icon: "/LOGO LUMIA/9.png",
    apple: "/LOGO LUMIA/9.png",
  },
  openGraph: {
    title: "Lumia — CRM para Clínicas de Estética",
    description:
      "Do caos à excelência. Automatize atendimento, reduza faltas em 40% e recupere 3h por dia.",
    type: "website",
    images: [{ url: "/LOGO LUMIA/16.png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${questrial.variable}`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
