import { site, company } from "@/lib/site";
import { faqs } from "@/content/faq";

// Structured data (Schema.org) — ajuda motores de busca e de IA
// (Google, Perplexity, ChatGPT, Gemini) a entenderem o que é a Lumia.
export default function JsonLd() {
  const organization = {
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.legalName,
    url: site.url,
    logo: site.logo,
    email: site.email,
    description: site.oneLiner,
    taxID: company.cnpj,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address,
      addressLocality: company.city,
      addressRegion: company.state,
      postalCode: company.cep,
      addressCountry: "BR",
    },
    sameAs: site.sameAs,
  };

  const website = {
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    inLanguage: "pt-BR",
    publisher: { "@id": `${site.url}/#organization` },
  };

  const software = {
    "@type": "SoftwareApplication",
    "@id": `${site.url}/#software`,
    name: "Lumia",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "CRM e gestão para clínicas de estética",
    operatingSystem: "Web, iOS, Android",
    inLanguage: "pt-BR",
    description: site.description,
    url: site.url,
    publisher: { "@id": `${site.url}/#organization` },
    featureList: site.highlights,
    audience: {
      "@type": "Audience",
      audienceType:
        "Clínicas de estética, depilação a laser, emagrecimento e estética avançada",
    },
    offers: {
      "@type": "Offer",
      price: site.price.amount,
      priceCurrency: site.price.currency,
      availability: "https://schema.org/InStock",
      url: `${site.url}/#planos`,
    },
    // aggregateRating só é incluído quando houver avaliações reais
    ...(site.rating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: site.rating.value,
            reviewCount: site.rating.count,
          },
        }
      : {}),
  };

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${site.url}/#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const localBusiness = {
    "@type": ["LocalBusiness", "SoftwareApplication"],
    "@id": `${site.url}/#local`,
    name: "Lumia",
    alternateName: "Lumia CRM",
    description: "Sistema de gestão all-in-one para clínicas de estética, laser e emagrecimento. Agenda, CRM, financeiro, marketing e IA em um só lugar.",
    url: site.url,
    telephone: "+5531983165920",
    email: site.email,
    logo: site.logo,
    image: site.logo,
    priceRange: "R$ 349,90/mês",
    currenciesAccepted: "BRL",
    paymentAccepted: "Cartão de crédito, boleto, PIX",
    areaServed: {
      "@type": "Country",
      name: "Brasil",
      "@id": "https://www.wikidata.org/wiki/Q155",
    },
    serviceArea: {
      "@type": "Country",
      name: "Brasil",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    sameAs: site.sameAs,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Planos Lumia",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Lumia Completo",
          description: "Agenda, CRM, vendas, financeiro, marketing e IA em um só sistema",
          price: "349.90",
          priceCurrency: "BRL",
          availability: "https://schema.org/InStock",
          url: `${site.url}/#planos`,
        },
      ],
    },
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [organization, website, software, faqPage, localBusiness],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}
