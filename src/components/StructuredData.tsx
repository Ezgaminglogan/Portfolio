export default function StructuredData() {
  const SITE_URL = "https://portfolio-665c.vercel.app";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: "Logan M. Panucat",
    givenName: "Logan",
    familyName: "Panucat",
    additionalName: "M.",
    alternateName: ["Logan Panucat", "Ezgaminglogan", "ezgaminglogan"],
    url: SITE_URL,
    image: {
      "@type": "ImageObject",
      url: `${SITE_URL}/image/profile.jpg`,
      caption: "Logan M. Panucat — Full Stack Developer",
    },
    sameAs: [
      "https://github.com/Ezgaminglogan",
      "https://www.linkedin.com/in/logan-panucat-b319562a9/",
    ],
    jobTitle: "Full Stack Developer",
    description:
      "Full Stack Developer from Carcar City, Cebu, Philippines. Specializing in PHP, MySQL, C#, ASP.NET MVC, .NET Framework, React, Next.js, and TypeScript. BSIT student at Cebu Technological University — Naga Extension Campus.",
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
    address: {
      "@type": "PostalAddress",
      streetAddress: "P. Vasquez St., Poblacion I",
      addressLocality: "Carcar City",
      addressRegion: "Cebu",
      addressCountry: "PH",
    },
    email: "logan.panucat2@gmail.com",
    telephone: "+639915519424",
    birthDate: "2002-09-08",
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
    name: "Logan M. Panucat — Portfolio",
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
    name: "Logan M. Panucat — Full Stack Developer Portfolio",
    url: SITE_URL,
    mainEntity: { "@id": `${SITE_URL}/#person` },
    description:
      "Portfolio showcasing projects, skills, and experience of Logan M. Panucat, a Full Stack Developer specializing in PHP, C#, React, Next.js, and TypeScript.",
    dateCreated: "2025-01-01",
    dateModified: new Date().toISOString().split("T")[0],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(profilePageSchema),
        }}
      />
    </>
  );
}
