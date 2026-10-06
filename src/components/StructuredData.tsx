import {
  AUTHOR_EMAIL,
  AUTHOR_GITHUB,
  AUTHOR_LINKEDIN,
  AUTHOR_NAME,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/constants/seo";

export default function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: AUTHOR_NAME,
    givenName: "Logan",
    familyName: "Panucat",
    additionalName: "M.",
    alternateName: ["Logan Panucat", "Ezgaminglogan", "ezgaminglogan"],
    url: SITE_URL,
    image: {
      "@type": "ImageObject",
      url: `${SITE_URL}/image/profile.jpg`,
      caption: `${AUTHOR_NAME} — Full Stack Developer`,
    },
    sameAs: [AUTHOR_GITHUB, AUTHOR_LINKEDIN],
    jobTitle: "BSIT College Instructor & Full Stack Developer",
    description: SITE_DESCRIPTION,
    knowsAbout: [
      "PHP",
      "MySQL",
      "C#",
      "ASP.NET MVC",
      ".NET Framework",
      "Blazor Framework",
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "TailwindCSS",
      "Bootstrap",
      "Web Development",
      "Full Stack Development",
      "Frontend Development",
      "Backend Development",
      "REST APIs",
      "Prisma",
      "Git",
      "Responsive Design",
    ],
    // City/region/country only — street address, phone, and birth date are
    // intentionally omitted rather than published to every crawler.
    address: {
      "@type": "PostalAddress",
      addressLocality: "Carcar City",
      addressRegion: "Cebu",
      addressCountry: "PH",
    },
    email: AUTHOR_EMAIL,
    nationality: {
      "@type": "Country",
      name: "Philippines",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Cebu Technological University — Naga Extension Campus",
      url: "https://www.ctu.edu.ph/",
    },
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "Next.js Certification",
        credentialCategory: "certificate",
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "Next.js App Router Fundamentals",
        credentialCategory: "certificate",
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "Udemy Web Development Certificate",
        credentialCategory: "certificate",
      },
    ],
    offers: {
      "@type": "Offer",
      description:
        "Available for freelance web development projects and full-time opportunities",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    alternateName: "Ezgaminglogan Portfolio",
    url: SITE_URL,
    description:
      "Personal portfolio of Logan M. Panucat, a Full Stack Developer from Cebu, Philippines.",
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
  };

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/#profilepage`,
    name: `${AUTHOR_NAME} — Full Stack Developer Portfolio`,
    url: SITE_URL,
    mainEntity: { "@id": `${SITE_URL}/#person` },
    description:
      "Portfolio showcasing projects, skills, and experience of Logan M. Panucat, a Full Stack Developer specializing in PHP, C#, React, Next.js, and TypeScript.",
    dateCreated: "2025-01-01",
    dateModified: "2026-06-13",
  };

  return (
    <>
      <script
        id="jsonld-person"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
      <script
        id="jsonld-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        id="jsonld-profile"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(profilePageSchema),
        }}
      />
    </>
  );
}
