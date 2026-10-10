# Logan M. Panucat — Portfolio

Personal portfolio of Logan M. Panucat, full-stack developer and BSIT college instructor at
Cebu Technological University – Naga Extension Campus.

**Live:** https://portfolio-665c.vercel.app/

## Stack

- Next.js 15 (App Router, statically rendered) and React 19
- TypeScript
- Tailwind CSS v4 with an Emerald & Porcelain token palette (`src/app/globals.css`)
- Nodemailer (Gmail SMTP) for the contact form API route
- pnpm, deployed on Vercel

## Project structure

```
src/
  app/
    api/send-email/route.ts   Contact form endpoint (validation, rate limit, honeypot)
    layout.tsx, page.tsx      Root layout and single-page composition
    opengraph-image.tsx       1200×630 social preview, generated at build time
    robots.ts, sitemap.ts     Crawling metadata
  components/
    layout/                   Navigation, Footer
    sections/                 Hero, Projects, More Work, About, Skills, Certificates, Contact
    ui/                       Dialog (native <dialog>), TechBadge, SectionHeading, icons
  constants/seo.ts            Site URL, author links and SEO text (single source of truth)
  data.ts                     Projects, experience, skills and certificates content
tests/                        Contact route regression tests (node:test)
```

## Getting started

Requires Node.js 20 or newer and pnpm.

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

### Environment variables

Create `.env.local` (never commit it):

```env
EMAIL_USER=your-gmail-address
EMAIL_PASSWORD=your-gmail-app-password
# Optional: set when a custom domain is added
NEXT_PUBLIC_SITE_URL=https://portfolio-665c.vercel.app
```

Gmail requires an [App Password](https://support.google.com/accounts/answer/185833).
Without these variables the contact form returns a generic error instead of sending.

## Scripts

```bash
pnpm dev     # development server
pnpm lint    # ESLint
pnpm test    # contact route regression tests
pnpm build   # production build
pnpm start   # serve the production build
```

## Updating content

- Projects, experience, education, skills and certificates: `src/data.ts`
- Name, links, resume path and SEO text: `src/constants/seo.ts`
- Colors: the `@theme` block in `src/app/globals.css`
