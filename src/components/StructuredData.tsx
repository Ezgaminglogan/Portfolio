export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Logan",
    url: "https://porfolio-665c.vercel.app",
    sameAs: [],
    jobTitle: "Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, TypeScript",
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Web Development",
      "Frontend Development",
      "Backend Development",
    ],
    offers: {
      "@type": "Offer",
      description: "Available for freelance and full-time opportunities",
    },
    image: "https://porfolio-665c.vercel.app/portfolio.png",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}
