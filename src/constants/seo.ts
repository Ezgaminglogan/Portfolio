/**
 * Single source of truth for site identity and SEO. Set NEXT_PUBLIC_SITE_URL in
 * Vercel when a custom domain is added; everything else derives from it.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-665c.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "Logan M. Panucat — Portfolio";
export const SITE_LOCALE = "en_US";

export const SITE_TITLE_DEFAULT = "Logan M. Panucat | Full-Stack Developer";
export const SITE_TITLE_TEMPLATE = "%s | Logan M. Panucat";

export const SITE_DESCRIPTION =
  "Full-stack developer and BSIT college instructor in Cebu, Philippines, building web and desktop systems with Next.js, C#/.NET, PHP and MySQL.";

export const AUTHOR_NAME = "Logan M. Panucat";
export const AUTHOR_EMAIL = "logan.panucat2@gmail.com";
export const AUTHOR_GITHUB = "https://github.com/Ezgaminglogan";
export const AUTHOR_LINKEDIN =
  "https://www.linkedin.com/in/logan-panucat-b319562a9/";
export const RESUME_PATH = "/CV_Portfolio/Resume.pdf";
export const PROFILE_PHOTO = "/image/profile-hero.jpg";
