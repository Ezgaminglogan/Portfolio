/**
 * Tech display name → self-hosted SVG in /public/icons
 * (snapshotted from Devicon / Simple Icons). Names without an entry render text-only.
 */
const ICONS: Record<string, string> = {
  ".NET": "dotnetcore",
  "ASP.NET MVC": "dotnetcore",
  "ASP.NET Web MVC": "dotnetcore",
  "Better Auth": "auth0",
  "Blazor Framework": "dot-net",
  "C#": "csharp",
  "EF Core": "dotnetcore",
  "Entity Framework": "dotnetcore",
  Git: "git",
  "Google reCAPTCHA v3": "google",
  "Google Sign-In": "google",
  JWT: "jsonwebtokens",
  libSQL: "sqlite",
  MySQL: "mysql",
  "Next.js": "nextdotjs",
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

export function techIconPath(name: string): string | null {
  return ICONS[name] ? `/icons/${ICONS[name]}.svg` : null;
}
