interface JsonLdProps {
  type: "Organization" | "Book" | "Article" | "BlogPosting" | "WebSite";
  data: any;
}

export function JsonLd({ type, data }: JsonLdProps) {
  const generateSchema = () => {
    const baseSchema = {
      "@context": "https://schema.org",
      "@type": type,
    };

    switch (type) {
      case "Organization":
        return {
          ...baseSchema,
          name: "MALOLA",
          description: "Global Cultural & Spiritual Intelligence",
          url: "https://" + (process.env.NEXT_PUBLIC_SITE_URL || "malola.com"),
          logo: "https://" + (process.env.NEXT_PUBLIC_SITE_URL || "malola.com") + "/icons/icon-512.svg",
          ...data,
        };

      case "Book":
        return {
          ...baseSchema,
          name: data.title,
          author: data.author,
          description: data.description,
          inLanguage: data.language || ["sa", "en"],
          datePublished: data.datePublished,
          publisher: {
            "@type": "Organization",
            name: "MALOLA",
          },
          ...data,
        };

      case "Article":
      case "BlogPosting":
        return {
          ...baseSchema,
          headline: data.headline,
          description: data.description,
          author: {
            "@type": "Person",
            name: data.authorName || "MALOLA Team",
          },
          datePublished: data.datePublished,
          dateModified: data.dateModified || data.datePublished,
          publisher: {
            "@type": "Organization",
            name: "MALOLA",
            logo: {
              "@type": "ImageObject",
              url: "https://" + (process.env.NEXT_PUBLIC_SITE_URL || "malola.com") + "/icons/icon-512.svg",
            },
          },
          ...data,
        };

      case "WebSite":
        return {
          ...baseSchema,
          name: "MALOLA",
          url: "https://" + (process.env.NEXT_PUBLIC_SITE_URL || "malola.com"),
          description: "Navigate the vast universe of ancient scriptures with an interactive guide",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://" + (process.env.NEXT_PUBLIC_SITE_URL || "malola.com") + "/search?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
          ...data,
        };

      default:
        return { ...baseSchema, ...data };
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSchema()) }}
    />
  );
}
