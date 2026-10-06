/**
 * Single source of truth for site identity and SEO.
 * Every metadata field, sitemap/robots entry, and JSON-LD value reads from here —
 * never hardcode the domain or site description elsewhere.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-665c.vercel.app";

export const SITE_NAME = "Logan M. Panucat — Portfolio";
export const SITE_LOCALE = "en_US";

export const SITE_TITLE_DEFAULT =
  "Logan M. Panucat | Full Stack Developer Portfolio";
export const SITE_TITLE_TEMPLATE = "%s | Logan M. Panucat";

export const SITE_DESCRIPTION =
  "Logan M. Panucat (Ezgaminglogan) — Full Stack Developer from Carcar City, Cebu, Philippines. Specializing in PHP, MySQL, C#, ASP.NET MVC, .NET Framework, React, Next.js, and TypeScript. BSIT graduate from CTU Naga. View my projects, skills, and experience.";

export const SITE_DESCRIPTION_SHORT =
  "Full Stack Developer from Cebu, Philippines. PHP, C#, React, Next.js, TypeScript. View my portfolio and projects.";

export const SITE_KEYWORDS = [
  "Logan Panucat",
  "Logan M. Panucat",
  "Ezgaminglogan",
  "ezgaminglogan",
  "Full Stack Developer",
  "Web Developer",
  "PHP Developer",
  "C# Developer",
  "React Developer",
  "Next.js Developer",
  "TypeScript Developer",
  "ASP.NET MVC",
  ".NET Framework",
  "MySQL",
  "Cebu Developer",
  "Filipino Developer",
  "Carcar City",
  "CTU Naga",
  "BSIT",
  "Portfolio",
  "Frontend Developer",
  "Backend Developer",
  "Node.js",
  "JavaScript",
  "TailwindCSS",
  "Blazor Framework",
];

export const AUTHOR_NAME = "Logan M. Panucat";
export const AUTHOR_EMAIL = "logan.panucat2@gmail.com";
export const AUTHOR_GITHUB = "https://github.com/Ezgaminglogan";
export const AUTHOR_LINKEDIN =
  "https://www.linkedin.com/in/logan-panucat-b319562a9/";
export const SITE_TWITTER_HANDLE = "@ezgaminglogan";

/** Square profile photo — actual intrinsic size 2252×2252. */
export const OG_IMAGE_PATH = "/grad-pic-cropped.jpg";
export const OG_IMAGE_WIDTH = 2252;
export const OG_IMAGE_HEIGHT = 2252;

export const GOOGLE_SITE_VERIFICATION = "googlebae7fa9d71fe05c7";

/** Turns a site path into an absolute canonical URL (no trailing slash). */
export function canonicalUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return SITE_URL;
  return `${SITE_URL}${normalized.endsWith("/") ? normalized.slice(0, -1) : normalized}`;
}
