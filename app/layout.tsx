import type { Metadata } from "next";
import { Montserrat, Questrial } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Script from "next/script";

const GTM_ID = "GTM-KX3X5W3S";

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
  metadataBase: new URL(site.url),
  title: {
    default: "Lumia — O melhor sistema de gestão para clínicas de estética",
    template: "%s | Lumia",
  },
  description: site.description,
  applicationName: "Lumia",
  keywords: [
    "sistema de gestão para clínicas de estética",
    "software para clínica de estética",
    "CRM para clínica de estética",
    "sistema para depilação a laser",
    "software para clínica de emagrecimento",
    "gestão de clínica de estética",
    "agenda para clínica de estética",
    "prontuário eletrônico estética",
    "Lumia CRM",
  ],
  authors: [{ name: "Lumia" }],
  creator: "Lumia",
  publisher: "Lumia",
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-icon.png",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Lumia — O melhor sistema de gestão para clínicas de estética",
    description:
      "Agenda, vendas, financeiro, atendimento, marketing e IA em um só lugar. Reduza faltas em 40% e recupere 3h por dia. Setup em 2 horas, sem fidelidade.",
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: "Lumia",
    images: [{ url: "/opengraph-image.png", width: 1731, height: 909, alt: "Lumia" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumia — Sistema de gestão para clínicas de estética",
    description:
      "O CRM all-in-one para clínicas de estética, laser e emagrecimento. Agenda, vendas, financeiro, marketing e IA em um só lugar.",
    images: ["/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${questrial.variable}`}>
      <head>
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        <JsonLd />
      </head>
      <body className="min-h-full flex flex-col">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
