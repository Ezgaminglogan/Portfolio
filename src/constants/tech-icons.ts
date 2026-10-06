/**
 * Unified tech-icon registry.
 * One place maps display names ("C#", "Prisma ORM") and slugs ("csharp", "prisma")
 * to the self-hosted SVGs in /public/icons (snapshotted from Devicon / Simple Icons).
 */
const NAME_TO_SLUG: Record<string, string> = {
  "ASP.NET MVC": "dotnetcore",
  "ASP.NET Web MVC": "dotnetcore",
  "Better Auth": "auth0",
  "Blazor Framework": "dot-net",
  "C#": "csharp",
  "EF Core": "dotnetcore",
  "Entity Framework": "dotnetcore",
  "Google reCAPTCHA v3": "google",
  "Google Sign-In": "google",
  JavaScript: "javascript",
  JWT: "jsonwebtokens",
  "JWT Auth": "jsonwebtokens",
  libSQL: "sqlite",
  MySQL: "mysql",
  "Next.js": "nextdotjs",
  ".NET": "dotnetcore",
  ".NET Framework": "dotnetcore",
  PHP: "php",
  PHPMailer: "php",
  Prisma: "prisma",
  "Prisma ORM": "prisma",
  React: "react",
  "ShadCN UI": "shadcnui",
  SignalR: "dot-net",
  SQLite: "sqlite",
  "SQL Server": "microsoftsqlserver",
  TailwindCSS: "tailwindcss",
  TanStack: "reactquery",
  TypeScript: "typescript",
  "Visual Basic WFA": "visualbasic",
};

/** Slug → file name in /public/icons when it differs from the slug. */
const SLUG_TO_FILE: Record<string, string> = {
  dotnet: "dotnetcore",
};

/** Slugs that actually have a file in /public/icons. */
const AVAILABLE_ICONS = new Set([
  "auth0",
  "csharp",
  "dot-net",
  "dotnetcore",
  "git",
  "google",
  "javascript",
  "jsonwebtokens",
  "microsoftsqlserver",
  "mysql",
  "nextdotjs",
  "php",
  "prisma",
  "react",
  "reactquery",
  "shadcnui",
  "sqlite",
  "tailwindcss",
  "typescript",
  "visualbasic",
]);

/**
 * Resolve a tech display name or slug to its icon path under /public/icons.
 * Returns null when no icon exists — callers must guard the render.
 */
export function techIconPath(nameOrSlug: string): string | null {
  const slug = NAME_TO_SLUG[nameOrSlug] ?? nameOrSlug;
  const file = SLUG_TO_FILE[slug] ?? slug;
  return AVAILABLE_ICONS.has(file) ? `/icons/${file}.svg` : null;
}

/** Brand accent colors keyed by icon slug (used for hover glows). */
export const TECH_BRAND_COLORS: Record<string, string> = {
  react: "#61DAFB",
  html5: "#E34F26",
  css3: "#1572B6",
  javascript: "#F7DF1E",
  nextdotjs: "#000000",
  dotnet: "#512BD4",
  php: "#777BB4",
  csharp: "#512BD4",
  mysql: "#4479A1",
  microsoftsqlserver: "#CC2927",
  typescript: "#3178C6",
  tailwindcss: "#06B6D4",
  reactquery: "#FF4154",
  prisma: "#2D3748",
  git: "#F05032",
};
