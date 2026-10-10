import { certificates } from "@/data";
import {
  AUTHOR_EMAIL,
  AUTHOR_GITHUB,
  AUTHOR_LINKEDIN,
  AUTHOR_NAME,
  PROFILE_PHOTO,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/constants/seo";

const CTU = {
  "@type": "CollegeOrUniversity",
  name: "Cebu Technological University – Naga Extension Campus",
  url: "https://www.ctu.edu.ph/",
};

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: AUTHOR_NAME,
      alternateName: ["Logan Panucat", "Ezgaminglogan"],
      url: SITE_URL,
      image: `${SITE_URL}${PROFILE_PHOTO}`,
      email: AUTHOR_EMAIL,
      jobTitle: "Full-Stack Developer and BSIT College Instructor",
      worksFor: CTU,
      alumniOf: CTU,
      address: { "@type": "PostalAddress", addressRegion: "Cebu", addressCountry: "PH" },
      sameAs: [AUTHOR_GITHUB, AUTHOR_LINKEDIN],
      description: SITE_DESCRIPTION,
      knowsAbout: ["Next.js", "React", "TypeScript", "C#", "ASP.NET MVC", "Blazor", "PHP", "Laravel", "Electron", "MySQL", "SQL Server", "Prisma"],
      hasCredential: certificates
        .filter((c) => c.kind.startsWith("Course"))
        .map((c) => ({
          "@type": "EducationalOccupationalCredential",
          name: c.title,
          credentialCategory: "certificate",
          recognizedBy: { "@type": "Organization", name: c.issuer.split(" · ")[0] },
        })),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: SITE_NAME,
      mainEntity: { "@id": `${SITE_URL}/#person` },
    },
  ],
};

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      // Static, build-time constants only; "<" escaped so content can't close the tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}
