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

  const graph = {
    "@context": "https://schema.org",
    "@graph": [organization, website, software, faqPage],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
