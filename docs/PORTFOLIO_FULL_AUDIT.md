# Portfolio Full Audit

- **Audit date:** 2026-10-10
- **Commit audited:** `c34cd16` (branch `main`, clean working tree)
- **Mode:** Audit only. No application code, dependency, lockfile or environment file was changed. The only file created is this report.
- **Tooling:** Claude Code (Opus 5.5) with Ponytail **ultra**, `pnpm lint`, `tsc --noEmit`, `pnpm build`, `pnpm audit`, `pnpm outdated`, a local production server (`next start`) and the built-in browser at 1440×900, 1024×768 and 375×812.

**Evidence labels used below**

| Label | Meaning |
|---|---|
| **[Verified-Browser]** | Observed in the rendered production build in the browser. |
| **[Verified-Tool]** | Output of lint, tsc, build, audit, curl or a grep over the tree. |
| **[Source]** | Found by reading source code. Not executed. |
| **[Suggestion]** | An optional improvement, not a defect. |

---

## 1. Executive Summary

The portfolio is a single-page Next.js 15 App Router site. It builds cleanly, lints cleanly and type-checks cleanly. It has a careful, consistent light "technical blueprint" visual identity. The contact API is hardened better than most portfolios: it has validation, HTML escaping, a honeypot, a rate limit and generic error responses. Modals handle focus correctly.

Three things stand between this and an employer-ready portfolio:

1. **Security patching (P0).** The installed `next@15.5.7` has **2 critical** advisories, including RCE in the Image Optimization API when AVIF is used, and this site enables AVIF. It also has 13 high advisories. `nodemailer@6.10.1` has 5 high advisories. All of them are fixed by patch or major bumps. No code migration is needed for Next.
2. **No proof of work (P1).** None of the 8 projects has a live demo or source link. The modal already supports both, but the data never supplies them. A recruiter cannot inspect any code from the site.
3. **Content ordering and density on mobile (P1).** On a phone the name and CTAs sit below a decorative terminal graphic. Projects start about **9,100 px** down a **~19,900 px** page, behind About, a 416-line "geo-telemetry radar", Services and a 3,575 px Skills section.

Ponytail ultra identifies roughly **900 deletable lines and one removable dependency** (`lenis`) with no loss of user-facing function. Most of it is decorative code (the radar card, the mouse-coordinate HUD), duplicated CSS and dead types and props.

**Bottom line:** the site is good enough to show after the P0 security update and the P1 content fixes, which are about a day of work. It is not ready as-is, mainly because of the framework CVEs and the missing project links.

---

## 2. Repository and Technology Overview

| Item | Detected value | Source |
|---|---|---|
| Framework | Next.js **15.5.7** (Turbopack for dev and build) | `package.json`, build output |
| React | **19.1.0** | `package.json` |
| Language | TypeScript 5.9.3, `strict: true` | `tsconfig.json` |
| Router | **App Router only** (`src/app`), no `pages/` | tree |
| Styling | **Tailwind CSS v4** via `@tailwindcss/postcss`, CSS-first config (no `tailwind.config.*`) | `postcss.config.mjs`, `globals.css` |
| Animation | `framer-motion` 12.38, `lenis` 1.3.23 (smooth scroll) | `package.json` |
| Icons | `@heroicons/react` 2.2.0 plus self-hosted SVGs in `public/icons` | lockfile, `constants/tech-icons.ts` |
| Email | `nodemailer` 6.10.1 over Gmail SMTP | `api/send-email/route.ts` |
| Fonts | `next/font/google` Geist and Geist Mono | `layout.tsx` |
| Package manager | pnpm (local 12.9.1). **No `packageManager` field** in `package.json` | |
| Node | v24.21.0 locally | |
| Lint | ESLint 9 flat config via `FlatCompat` (`next/core-web-vitals`, `next/typescript`) | `eslint.config.mjs` |
| Tests | **None** (no test runner, no test files, no e2e) | |
| Hosting | Vercel (inferred from the `https://portfolio-665c.vercel.app` fallback and the README deploy button) | `constants/seo.ts:7` |
| Middleware / proxy | None | |
| Auth | None (not needed) | |
| Agent instructions | No `CLAUDE.md` or `AGENTS.md` present | |

**Routes (from the build):**

| Route | Type | Size / First Load JS |
|---|---|---|
| `/` | Static (○) | 79.7 kB / **200 kB** |
| `/_not-found` | Static | 0 B / 120 kB |
| `/api/send-email` | Dynamic (ƒ) | POST, Node runtime |
| `/icon.png`, `/robots.txt`, `/sitemap.xml` | Static metadata routes | |

Shared first-load JS is 135 kB (chunks of 75.4 kB and 20.4 kB, plus 15.4 kB of CSS).

**Source size:** 35 files and about 5,000 lines. The largest are `GeoTelemetryCard.tsx` (416), `data.tsx` (410), `HeroSection.tsx` (407), `ContactSection.tsx` (406) and `ProjectsSection.tsx` (405).

**Page composition** (`src/app/page.tsx`): Navigation, Hero, About (with GeoTelemetryCard), Services, Skills (with Professional Competencies), Projects, SQLite Portable, Experience (with Education), Certificates, Contact, Footer and ScrollToTop. Every section component except Footer is a Client Component.

---

## 3. Overall Assessment

### Category scores

Scoring criteria: **10** means no findings above P3. **8–9** means only P2 or P3 findings. **6–7** means at least one P1 finding, or several P2 findings with a real user or recruiter impact. **4–5** means multiple P1 findings or a P0 finding in the category. **<4** means broken. Scores reflect only the evidence in this report.

| Category | Score | Basis |
|---|---|---|
| Build health (lint, types, build) | **10** | All three pass with zero warnings [Verified-Tool]. |
| Security | **5** | App code is strong. The framework has 2 critical and 13 high advisories. There are no security headers (P2). |
| Accessibility | **6.5** | Good modal focus management, labels, focus ring and reduced-motion config. Gaps: auto-moving content without a pause, `role="button"` cards, heading skips, no skip link and no `aria-current`. |
| Responsiveness | **7** | No horizontal overflow at 375, 1024 or 1440. The mobile hero order and 1024 px nav wrapping are weak. |
| Performance | **6.5** | CLS 0, static rendering and `next/image`. JS is 200 kB first-load for a static page. Many perpetual animations. Lighthouse and INP were not measured. |
| Code quality / simplicity | **6.5** | Consistent and typed, but heavy decorative code, dead CSS, types and props, and no-op memoization. |
| SEO / metadata | **7.5** | Complete Metadata API, sitemap, robots and JSON-LD. Minor correctness issues. |
| Recruiter value / content | **5.5** | Clear identity and stack. No links to inspect work, generic certificates and unsupported claims. |

**Overall: about 6.5/10.** The foundation is solid and the presentation polished, held back by unpatched dependencies and missing proof of work.

### What is already implemented correctly

- **Static prerendering** of the home page. `x-nextjs-prerender: 1` is served and the build marks it ○ [Verified-Tool].
- **Metadata API**: title template, description, canonical, Open Graph, Twitter, robots and `metadataBase` (`layout.tsx:34-92`). Plus `app/sitemap.ts`, `app/robots.ts` and `app/icon.png` conventions.
- **Contact API hardening** (`route.ts`): environment check, per-IP rate limit, safe JSON parse, type and length validation, honeypot, HTML escaping of every interpolated field, `replyTo` instead of a spoofed `from`, and generic error responses.
- **Secrets**: only `EMAIL_USER` and `EMAIL_PASSWORD` (server-only) and `NEXT_PUBLIC_SITE_URL` (public by design). `.env*` is gitignored. No secrets appear in the repo [Verified-Tool grep].
- **Modals**: focus moves in, Tab is trapped, Escape closes, focus is restored and scroll is locked [Verified-Browser on the project modal at 375 px].
- **Reduced motion**: `<MotionConfig reducedMotion="user">` (`SmoothScroll.tsx:71`), Lenis is skipped under reduced motion, and CSS entrance animations are disabled (`globals.css:208-214`).
- **Form a11y**: labels tied to inputs, `aria-invalid` and `aria-describedby` on the email field, an `aria-live` status region, and `aria-busy`.
- **Fonts** via `next/font`. Hero image uses `priority` and correct `sizes`.
- **CLS = 0.0000** on desktop load [Verified-Browser]. **No console errors** [Verified-Browser].
- **No horizontal overflow** at 375, 1024 or 1440 px [Verified-Browser].
- **External links** use `rel="noreferrer"`, which implies `noopener`.
- **Mobile menu** works, with `aria-expanded`, `aria-controls` and Escape to close [Verified-Browser].

---

## 4. Confirmed Issues Ranked by Priority

Difficulty: **S** (<1 h), **M** (1–4 h), **L** (>4 h).

### P0 — Critical

| # | Issue | Evidence | Files | Recommendation | Diff. | Expected result |
|---|---|---|---|---|---|---|
| P0-1 | `next@15.5.7` has **2 critical** advisories: "Unauthenticated RCE in Image Optimization API when AVIF files are used" (GHSA-2xp9-vwfh-vxw4) and "Unauthenticated RCE on windows-hosted servers" (GHSA-p293-qw3h-jr36). It also has **13 high** (RSC DoS, SSRF, proxy bypass) and 15 moderate. This site **enables AVIF** (`next.config.ts:5`) and uses the optimizer for every `<Image>`. | `pnpm audit` [Verified-Tool] | `package.json`, `next.config.ts:5` | Bump `next` **and** `eslint-config-next` to the latest **15.5.x** (≥ 15.5.27 clears every listed Next advisory). This is a patch release on the same minor, so no migration is needed. Re-run `pnpm audit` and `pnpm build`. As a stop-gap until the bump ships, removing `"image/avif"` from `images.formats` narrows the critical one. | S | Removes both critical and all high Next advisories. |

### P1 — High

| # | Issue | Evidence | Files | Recommendation | Diff. | Expected result |
|---|---|---|---|---|---|---|
| P1-1 | `nodemailer@6.10.1` has **5 high** advisories, three of them DoS in `addressparser`. The user-supplied `email` reaches `addressparser` through `replyTo` (`route.ts:125`). This is mitigated by the regex and 254-char cap at `route.ts:88`, but still exposed. | `pnpm audit` [Verified-Tool] | `package.json`, `route.ts` | Upgrade to nodemailer ≥ 10.0.6 together with `@types/nodemailer`. The `createTransport({service:'gmail'})` and `sendMail` API used here is unchanged across those majors, but **verify by sending one real test message** after upgrading. | S | Clears all nodemailer advisories. |
| P1-2 | **No project links.** `liveUrl` and `githubUrl` exist on the `Project` type and are rendered by the modal and flagship card, but **none of the 8 projects sets either**. A recruiter cannot inspect any code or demo. | `data.tsx:91-179`. Project modal shows only screenshot, text and badges [Verified-Browser] | `src/app/data.tsx` | Add real GitHub repo and/or demo URLs where they exist. Where code is private (institutional systems), say so explicitly, for example "Private — CTU internal system", and consider a short code-sample gist. Do not invent links. | S (data) | The single biggest credibility gain for employers. |
| P1-3 | **Contact error modal loses its message.** On failure, `formStatus` returns to `"idle"` after 3 s (`ContactSection.tsx:88`) while the modal stays open. The modal then renders title "Sending Failed" with an **empty message**, because `statusMessage` is `""` for idle (`:43-50`). The server's specific error, such as the 429 "Too many requests", is also discarded (`:85-87`). | [Source]. Not executed, because submitting the form needs your approval. | `ContactSection.tsx:43-92, 385-403` | Keep `"error"` until the modal is closed, so drop the `setTimeout` on error. Show `error.message` from `contactApi` in the modal. | S | Users see why sending failed. |
| P1-4 | **Mobile hero buries the name and CTAs.** `flex-col-reverse` puts the decorative terminal and portrait first. At 375×812 the `<h1>` starts at y = 558 px and all three CTAs are below the fold. | [Verified-Browser] | `HeroSection.tsx:79` | Use `flex-col` on mobile so the text comes first, or shrink or hide the terminal backplate below `sm`. Keep the portrait small. | S | Name, role and CTAs visible on first paint on phones. |
| P1-5 | **Projects are too far down and the page is very long.** Mobile document height is about 19,941 px. Projects start at about 9,084 px. Section heights at 375 px: Skills 3,575, Projects 4,801, Experience 2,400, About 2,339 and Services 2,089. Services comes *before* Projects. | [Verified-Browser] | `page.tsx:24-32`, `SkillsSection.tsx`, `AboutSection.tsx` | Reorder to Hero → Projects → Experience → Skills → Contact. Collapse Services into About or Skills. Render Skills as a compact icon grid, not 11 large cards plus 3 more cards. Remove the GeoTelemetryCard (see Ponytail #1). | M | Work is reachable in 1–3 screens instead of about 11. |
| P1-6 | **Auto-moving content without pause or reduced-motion handling (WCAG 2.2.2).** (a) The certificates marquee (`globals.css:216-233`) is **not** in the `prefers-reduced-motion` block and only pauses on mouse hover. (b) The SQLite carousel autoplays every 5 s forever, with no pause on hover or focus, and ignores reduced motion (`ImageCarousel.tsx:61-66`). (c) The role rotator cycles every 3 s (`HeroSection.tsx:37-42`) and still animates `filter: blur`, which `reducedMotion="user"` does not disable. | [Source] | `globals.css`, `ImageCarousel.tsx`, `HeroSection.tsx` | Add `.animate-marquee` to the reduced-motion block and pause it on `:focus-within`. Stop carousel autoplay on hover, focus or reduced motion, or remove autoplay. Show a static role under reduced motion. | S | WCAG 2.2.2 and 2.3.3 conformance. |
| P1-7 | **Carousel controls are invisible on touch devices.** Prev and next use `opacity-0 group-hover:opacity-100`. With no hover on phones, users get only swipe, which is undiscoverable, and the captions are hover-only too. | [Source], `ImageCarousel.tsx:108, 119, 127` | `ImageCarousel.tsx` | Show the controls by default and reserve the hover effect for `@media (hover:hover)`, or use `sm:opacity-0 sm:group-hover:opacity-100`. | S | Usable gallery on mobile. |

### P2 — Medium

| # | Issue | Evidence | Files | Recommendation | Diff. |
|---|---|---|---|---|---|
| P2-1 | **No security headers.** There is no CSP, `X-Frame-Options`/`frame-ancestors`, `Referrer-Policy`, `X-Content-Type-Options` or `Permissions-Policy`, and `X-Powered-By: Next.js` is exposed. | `curl -I` on the production server [Verified-Tool] | `next.config.ts` | Add `async headers()` with those headers and `poweredByHeader: false`. Start the CSP in report-only mode, since Next inlines scripts. | S |
| P2-2 | **About 24.7 MB of unreferenced public assets** are shipped with every deploy, and the repo carries them: `certificates-nextjs.pdf` (8.0 MB), `dashboard-app-certificate.pdf` (8.0 MB), `certificates-nextjs.jpg` (2.9 MB), `mjeenterprises.png` (1.9 MB), `certificates-1-nextjs.jpg` (1.0 MB), `background-tech.jpg`, `Capstone Project*.png`, `Landing2.png`, `grad-pic.jpg`, `portfolio.png`, plus the create-next-app leftovers `next.svg`, `vercel.svg`, `file.svg`, `globe.svg` and `window.svg`. | grep of every `public/` file name across `src/` [Verified-Tool]. Icons are excluded because they resolve dynamically. | `public/` | Delete them, or **link** the certificate PDFs from the certificate modal, which is useful evidence. | S |
| P2-3 | **`public/image/profile.jpg` is 13 MB** and is referenced only by JSON-LD (`StructuredData.tsx:24`) and the README, so crawlers fetch 13 MB. | [Verified-Tool] | `StructuredData.tsx:24`, `README.md:5` | Point both to `profile-hero.jpg` (72 KB) or a resized copy. | S |
| P2-4 | **The OG image is a 2252×2252, 840 KB square JPEG** used with `summary_large_image` (1.91:1), so previews get cropped. | `seo.ts:58-61`, `layout.tsx:60-75` | `seo.ts`, `layout.tsx` | Add a 1200×630 `src/app/opengraph-image.(png\|jpg)`, a native file convention that auto-wires OG and Twitter, and drop the manual `images` arrays. | S |
| P2-5 | **Project and certificate cards use `<div role="button">` wrapping headings, paragraphs and badges.** The accessible name becomes the entire card text, and button children are presentational, so the `<h3>` headings drop out of heading navigation for many screen readers. | `ProjectsSection.tsx:255-258, 352-355`, `CertificatesSection.tsx:63-73`. Card text dump confirmed [Verified-Browser] | same | Make the title a real `<button>` (or link) and stretch its hit area with a `::after` overlay, keeping the card as a plain container. This also deletes the custom `activateOnKey` handler (`ProjectsSection.tsx:53-60`). | M |
| P2-6 | **Heading hierarchy.** "Professional Competencies" is an `<h2>` whose cards are `<h4>`, so `<h3>` is skipped (`SkillsSection.tsx:226`). Eleven tech names are `<h4>` headings (`:187`), which adds heading noise. | Heading dump [Verified-Browser] | `SkillsSection.tsx` | Use `<h3>` for competency titles and plain `<p>` or `<span>` for tech names. | S |
| P2-7 | **No skip link and no `aria-current` on the active nav item.** | [Verified-Browser]: 0 `[aria-current]`, no skip link | `layout.tsx`, `Navigation.tsx:156-167, 193-204` | Add `<a href="#main" class="sr-only focus:not-sr-only">` plus `id="main"`, and `aria-current={active ? "true" : undefined}`. | S |
| P2-8 | **The desktop nav cramps at 1024 px**: the logo text and "SQLite Portable" wrap onto two lines. | Screenshot at 1024×768 [Verified-Browser] | `Navigation.tsx:154` | Fewer items (see P1-5), `whitespace-nowrap`, or switch to the full nav at `xl`. | S |
| P2-9 | **Precise coordinates are published** in three places: "10.2090° N, 123.7569° E" (`GeoTelemetryCard.tsx:44, 88`, `TechnicalBlueprintBackground.tsx:83`) and a Google Maps link (`GeoTelemetryCard.tsx:45`). This conflicts with the stated intent in `StructuredData.tsx:53-54` to publish only city and region. | [Source] | same | **Your call.** If those coordinates point at a home, remove them. "Cebu, PH · GMT+8" already conveys location and timezone. | S |
| P2-10 | **Decorative "telemetry" claims read as fake data**: "LATENCY: <18ms", "3D_LOCK: VERIFIED", "BEACON ACTIVE", "Seamless overlap with US, EMEA, & APAC" (`GeoTelemetryCard.tsx:329-340, 408`), and "REF_ID // 0x4C50_PANUCAT • STABLE" (`TechnicalBlueprintBackground.tsx:100`). | [Source] | same | Remove. Technical reviewers may read invented metrics as padding. | S |
| P2-11 | **Unsupported or inconsistent content claims.** "5+ Project Systems" (`HeroSection.tsx:380`, `AboutSection.tsx:49`) undercounts the 8 projects plus SQLite Portable. The experience entry lists PostgreSQL (`data.tsx:222`) but no project uses it. "Production-ready", "enterprise-grade" and "high-performance" are not backed by links or metrics. Supplify is "cross-platform … mobile and web" with only a Blazor stack. Services list "OS setup … hardening" and "Automated server backups" (`data.tsx:403-405`) with no project evidence. | [Source] | `data.tsx`, Hero, About | Replace adjectives with checkable facts, such as who uses it, how many users, or what was deployed where. Remove claims you can't back with a project. *(Nothing here is invented: these are flags for you to confirm or correct.)* | S |
| P2-12 | **Certificates are generic.** "Udemy Course Completion — advanced web development courses" does not name the course, and no certificate has a verification URL. The PDFs exist but are not linked (P2-2). | `data.tsx:317-363` | `data.tsx` | Name the issuer and course, add the credential URL or ID, and link the PDF. | S |
| P2-13 | **SQLite Portable downloads an unsigned `.zip` from MediaFire** (`SqlitePortableSection.tsx:40`). File hosts with ads are a trust red flag for executables. | [Source] | same | Publish it as a GitHub Release with a SHA-256 checksum and link the repo. This also gives recruiters code to read. | S |
| P2-14 | **The README is stale.** It says npm, an "emerald green" theme and "4th year IT student"; uses a different email (`mrorange09123@…`) than the site constant; describes a wrong project structure; claims an MIT license with **no LICENSE file**; and says "vibe coder". The GitHub repo is itself part of the portfolio. | `README.md` | `README.md` | Rewrite briefly: what it is, the stack (pnpm, Tailwind v4), `pnpm dev`, env vars, deploy. Add LICENSE or remove the claim. | S |
| P2-15 | **The LCP element sits inside an entrance animation that starts at `opacity: 0`** (`HeroSection.tsx:189-198`, `.animate-enter` with a 0.1 s delay and 0.7 s duration). Measured local LCP was 3,324 ms on the hero portrait. That run hit a cold image optimizer on localhost, **so it is not a production number**, but the animation adds about 0.8 s on any device. | PerformanceObserver [Verified-Browser, local] | `HeroSection.tsx` | Don't fade or scale the LCP image. Animate only the floating badges. | S |
| P2-16 | **All 9 sections are Client Components** solely because their outer wrapper is `motion.section` with a whileInView fade, and most children fade again (double animation). Static content (About text, Services, Experience) ships as hydrated JS. | [Source] | `components/sections/*` | See Next.js findings (§5). Optional, but it is the main lever on the 200 kB first-load JS. | M–L |

### P3 — Low

| # | Issue | Files | Recommendation |
|---|---|---|---|
| P3-1 | The Google verification **meta** content is the HTML-file token `googlebae7fa9d71fe05c7` (`seo.ts:63`), which is not a valid meta token. The HTML file method (`public/googlebae7fa9d71fe05c7.html`) already verifies. | `seo.ts:63`, `layout.tsx:89-91` | Delete the `verification` block, or replace it with the real meta token. |
| P3-2 | JSON-LD uses `offers` on a `Person`, which is not a valid schema.org property (`StructuredData.tsx:88-92`). `dateModified: "2026-06-13"` is hardcoded and stale (`:119`). | `StructuredData.tsx` | Remove `offers`. Drop `dateCreated` and `dateModified`, or derive them. |
| P3-3 | `robots.ts:12-15` adds a `Googlebot-Image` group. Bots that match a specific group ignore `*`, so `/api/` is no longer disallowed for that bot, and `allow: /image/` is already the default. `host` is a Yandex-only directive. | `robots.ts` | Delete the second group and `host`. |
| P3-4 | `navigator.clipboard.writeText` is not awaited, so the UI shows "Copied" even when it fails, for example on an insecure context or with permission denied. | `ContactSection.tsx:38`, `GeoTelemetryCard.tsx:64` | `await` it in `try/catch`. |
| P3-5 | The rate-limit `Map` is never pruned. This is negligible on serverless, but unbounded on a long-lived server. | `route.ts:11` | Delete expired entries inside `isRateLimited`. |
| P3-6 | The meta description is 256 characters, and Google truncates at about 155–160. The `keywords` meta is ignored by Google. | `seo.ts:16-49` | Shorten the description and drop `keywords`. |
| P3-7 | Touch targets under 24 px: the terminal tabs are 99×23 and 87×22, and the footer GitHub and LinkedIn links are 20 px tall. | Hero, Footer | Add padding to reach 24 px or more (WCAG 2.5.8). |
| P3-8 | There is no `packageManager` field, and the README documents npm. | `package.json` | Add `"packageManager": "pnpm@<version>"`. |
| P3-9 | `SITE_TWITTER_HANDLE = "@ezgaminglogan"` is unverified. Remove it if the account doesn't exist. | `seo.ts:56` | Confirm. |
| P3-10 | There are no tests. | — | One small route-handler validation test is enough (see §17). |

---

## 5. Next.js Architecture Findings

| Topic | Finding | Verdict |
|---|---|---|
| Router | App Router only, a single `page.tsx` plus one route handler and metadata routes. | ✅ Appropriate |
| Rendering | `/` is fully static (○). The route handler is dynamic. There is no data fetching, caching or revalidation, and none is needed. | ✅ |
| Server Actions | Not used. The route handler is fine for a JSON form, and switching would bring no measurable benefit. | ✅ Leave as-is |
| `"use client"` | 17 files. `page.tsx`, `layout.tsx`, `Footer.tsx` and `StructuredData.tsx` are server components. Every section is client-side only because of the `motion.*` fade-in wrappers. | ⚠️ See P2-16 |
| Hydration | `GeoTelemetryCard` correctly avoids a time mismatch with `mounted`. The separate `mounted` state is redundant because `timeStr` is `""` until mounted. No hydration warnings appeared in the console [Verified-Browser]. | ✅ / shrink |
| Context | `ViewportContext` adds a root-level provider with an unthrottled `resize` listener, used **only** by `useParallax` to disable parallax under 768 px. | ⚠️ yagni (Ponytail #3) |
| Error / loading / not-found | No `error.tsx`, `loading.tsx` or `not-found.tsx`. On a static single page, the default `/_not-found` is acceptable. | ✅ Optional |
| Env vars | `NEXT_PUBLIC_SITE_URL` (public, correct) and `EMAIL_*` (server-only, correct). | ✅ |
| Serialization | Static data only. `ProfessionalSkill.icon` passes component references client-side, which is fine because both sides are client modules. | ✅ |
| `data.tsx` | It lives in `src/app/` (the route segment folder) and has a `.tsx` extension with **no JSX**. It also re-exports types nobody imports from it (`data.tsx:17`). | ⚠️ Minor: move to `src/data.ts` |
| Path aliases | `@/*` plus `~types`, `~types/*`, `~components/*` (0 uses) and `~features/*` (1 use). | ⚠️ Collapse to `@/*` |
| Native features not yet used | `opengraph-image` file convention (P2-4); `headers()` in `next.config` (P2-1); `poweredByHeader:false`. | Recommend |
| Migration to Next 16 | **Not recommended now.** Patch to the latest 15.5.x first. A major upgrade gives no measured benefit for this site. | — |

**Optional, measured-benefit path for P2-16.** Replace the section-level `motion.section` and `whileInView` fades with a server-rendered `<section>`. CSS `animation-timeline: view()` or no entrance animation at all will do. Then Services, Experience and About become Server Components. Keep Framer only where interaction needs it: the role rotator, carousel and modals. Measure first-load JS before and after with `pnpm build`. The current baseline is **200 kB**. No improvement figure is claimed here.

---

## 6. UI/UX Assessment

**Strengths**
- The visual system is distinctive and consistent: the white and cobalt "technical blueprint" theme, Geist and Geist Mono, consistent card radii and borders, and a clear H1.
- The hero communicates name, role, stack and three CTAs (Featured Work, Contact, Resume PDF) on desktop [Verified-Browser at 1440].
- The project modal is well built: a large screenshot, readable text and good focus behaviour.
- The contact section offers three channels (email with copy, GitHub, LinkedIn) plus a form.

**Weaknesses (evidence-based)**
- **Decoration outweighs content.** Separate decorative systems run at once: a blueprint grid with a live mouse-coordinate HUD, ambient glows, a rotating-terminal hero, pulsing status dots (`animate-pulse` on 10+ elements), a spinning radar, a live clock, a marquee and an autoplay carousel. Every section heading also scales, fades and lifts on scroll (`useAnimatedHeading`), and each section fades in, then its cards fade in, then (in Skills) each pill fades in with blur.
- **Repetition.** "Cum Laude / BSIT Instructor" appears in the hero pill, the hero code mock, the hero floating badge, the About paragraph, the About stat card, the Education card and the JSON-LD. "Cebu / GMT+8" appears in the About stat, the telemetry card, the background HUD and the Contact footer.
- **Section headings are oversized** (`text-9xl` at xl, `AnimatedSectionHeading.tsx:57`) for single words like "Stacks.", which adds vertical length without information.
- **Services overlaps Skills and Competencies**: three sections describe the same capabilities three ways.
- **Project cards all look identical.** Every card is a dark browser mockup with an `object-contain` screenshot, so screenshots render small. Card descriptions are clamped to 2 lines with no outcome or role statement.

**Recommendations (no full redesign needed: the design language is good)**
1. Reorder the page and cut sections (P1-5).
2. Give each project **problem → your role → outcome → links** (P1-2, P2-11).
3. Keep the hero terminal on desktop and drop it on mobile.
4. Pick **one** ambient effect (the grid) and remove the HUD, radar, clock and most `animate-pulse` dots.
5. Reduce heading size to `text-5xl`/`text-6xl` max.

---

## 7. Responsive Design Findings

| Viewport | Result | Evidence |
|---|---|---|
| 1440×900 | Layout correct, no overflow, CLS 0. | [Verified-Browser] |
| 1024×768 | No overflow. **Nav wraps** the logo text and "SQLite Portable" onto two lines (P2-8). | [Verified-Browser] |
| 375×812 | No document-level overflow. Wide glow divs are clipped by a `fixed overflow-hidden` parent, which is fine. **Hero text sits below the visual** (P1-4). Page is about 19,941 px tall (P1-5). The mobile menu works. Project modal fits, scrolls, and its close button is reachable. | [Verified-Browser] |
| 768 (tablet) | Not separately captured. Code review shows the same `flex-col-reverse` hero up to `lg`. | [Source] |

`body { overflow-x: hidden }` (`globals.css:27`) hides overflow globally. It masks problems rather than preventing them. No current overflow was found without it, so keep it or remove it after a visual check.

---

## 8. Accessibility Findings

| Finding | Severity | Evidence |
|---|---|---|
| Auto-moving content (marquee, carousel, role rotator) without pause or reduced-motion handling | P1-6 | [Source] |
| Carousel controls hidden on touch | P1-7 | [Source] |
| `role="button"` cards flatten headings and get very long accessible names | P2-5 | [Verified-Browser] |
| Heading skip h2→h4, plus tech names as headings | P2-6 | [Verified-Browser] |
| No skip link, no `aria-current` | P2-7 | [Verified-Browser] |
| Touch targets under 24 px | P3-7 | [Verified-Browser] |
| Decorative images use `alt=""` correctly; content images have alt text (the project title) | ✅ | [Verified-Browser] |
| Global `:focus-visible` outline (unlayered, so it beats Tailwind's `focus:outline-none`) | ✅ | [Source] |
| Landmarks: one `<main>`, `<nav>` and `<footer>` | ✅ | [Verified-Browser] |
| Form labels and `aria-live` status | ✅ | [Source] |
| Modal dialog semantics and focus | ✅ | [Verified-Browser] |
| Colour contrast | Not measured with a tool. By inspection, body text is `slate-600` on white (≈7:1) and labels are `slate-500` (≈4.8:1). The background HUD text is `slate-400/80` at 9 px, but it is decorative. | Unverified |
| Screen reader pass | **Not performed** (no SR available). | — |

---

## 9. Performance Findings

**Measured (local production server, desktop 1440×900, cold load)**

| Metric | Value | Note |
|---|---|---|
| CLS | **0.0000** | Good |
| LCP | 3,324 ms on the hero portrait | Local and a cold optimizer. **Not representative of production.** See P2-15 for the real contributor. |
| INP | **Not measured** | Requires real interaction tracing |
| Lighthouse | **Not run** | Not available in this environment |
| First-load JS | 200 kB (build output) | 135 kB shared. Largest chunk 247 KB decoded |
| CSS | 15.4 kB (93 KB decoded) | |
| HTML | 205 KB uncompressed | Includes duplicated marquee cards and inline SVG |

**Findings**
1. **The JS weight is mostly animation.** Framer Motion is imported by 14 client files, and Lenis runs a permanent `requestAnimationFrame` loop even when idle (`SmoothScroll.tsx:56-61`). An exact per-library split was not measured because no bundle analyzer is installed, and adding one was out of scope.
2. **Many perpetual animations.** There is a 1 s `setInterval` that re-renders GeoTelemetryCard, a 3 s role rotator, 5 s carousel autoplay, an infinite radar spin, an infinite marquee, a global `mousemove` handler and 10+ `animate-ping`/`animate-pulse` elements. Each is cheap alone. Together they keep the main thread and compositor busy on low-end phones.
3. **`filter: blur()` is animated** in `SkillPill` (11 instances, `SkillsSection.tsx:133-134`) and `RoleRotator` (`HeroSection.tsx:49-51`). Animating a filter is more expensive than animating opacity or transform.
4. **`memo` and `useCallback` are ineffective.** Memoized cards receive a new inline `onOpen={() => …}` closure on every render (`ProjectsSection.tsx:96, 109`), so `memo` never skips. No-prop components (`GeoTelemetryCard`, `TechnicalBlueprintBackground`) are wrapped in `memo` with nothing to compare. This adds complexity with no measured benefit, so delete it.
5. **Images**: `next/image` is used for all raster images, with AVIF and WebP output, correct `sizes`, and lazy-loading below the fold. ✅ The 150×150 SVG icons are drawn at 12–24 px, which is fine for vectors.
6. **Third-party scripts**: none. ✅

Recommendation: don't add memoization or dynamic imports. **Delete** the animation and decorative code (Ponytail list), then re-measure with Lighthouse on the deployed URL.

---

## 10. Security Findings

| Area | Status |
|---|---|
| Framework vulnerabilities | **P0-1**: 2 critical and 13 high advisories in `next` |
| `nodemailer` vulnerabilities | **P1-1**: 5 high advisories |
| Transitive (prod) | `sharp` (3 high), `postcss`/`nanoid`/`source-map-js` (via `next`), all fixed by the Next bump |
| Transitive (dev only) | `brace-expansion`, `js-yaml` and `braces` via `eslint-config-next`. These are build-time tools only, with low real risk. Fixed by bumping `eslint-config-next` with `next` |
| Audit total | 76 advisories: 2 critical, 41 high, 30 moderate, 3 low [Verified-Tool] |
| Secrets in repo | None found. `.env*` is gitignored ✅ |
| `NEXT_PUBLIC_*` | Only `NEXT_PUBLIC_SITE_URL`, which is a public value ✅ |
| `dangerouslySetInnerHTML` | Only `JSON.stringify` of static constants in JSON-LD, with no user data ✅ |
| XSS in email | All fields are HTML-escaped (`route.ts:24-32, 107-110`) ✅ |
| Header injection | `subject` and `replyTo` are passed to nodemailer, which sanitises header newlines. The email regex rejects whitespace ✅ |
| Input validation | Type, presence, length and format checks ✅ |
| Rate limiting | In-memory per instance, best-effort and documented in a comment. Uses `x-forwarded-for[0]`, which is spoofable unless a trusted proxy (such as Vercel) sets it. Acceptable for a portfolio ✅ |
| Error exposure | Generic messages to clients, details logged server-side ✅ |
| Security headers | **Missing** (P2-1) |
| Redirects | None ✅ |
| External links | `rel="noreferrer"` ✅ |
| Downloads | Unsigned zip via MediaFire (P2-13) |
| Privacy | Precise coordinates published (P2-9) |

No secret values appear in this report.

---

## 11. pnpm Dependency Audit

| Package | Installed | Latest | Used? | Recommendation |
|---|---|---|---|---|
| `next` | 15.5.7 | 16.4.0 | Yes | **Bump to latest 15.5.x now (P0).** Treat 16 as a separate, later decision. |
| `eslint-config-next` (dev) | 15.5.7 | 16.4.0 | Yes | Keep in lock-step with `next` |
| `react`, `react-dom` | 19.1.0 | 19.3.0 | Yes | Bump with Next (minor) |
| `nodemailer` | 6.10.1 | 10.0.16 | Yes | **Bump ≥ 10.0.6 (P1)**, then test-send |
| `@types/nodemailer` (dev) | 6.4.23 | 8.0.2 | Yes | Bump with nodemailer |
| `framer-motion` | 12.38.0 | 14.0.0 | Yes (14 files) | Keep 12.x. Reduce usage (§12) before considering a major |
| `lenis` | 1.3.23 | 1.3.26 | Yes | **Removal candidate** (native smooth scroll, Ponytail #2) |
| `@heroicons/react` | 2.2.0 | — | Yes | Keep. Imports are tree-shaken per icon |
| `tailwindcss`, `@tailwindcss/postcss` (dev) | 4.2.4 | 4.3.3 | Yes | Minor bump optional |
| `typescript` (dev) | 5.9.3 | 7.0.2 | Yes | Stay on 5.x for now |
| `eslint` (dev) | 9.39.4 | 10.12.0 | Yes | Stay on 9 with `eslint-config-next@15` |
| `@types/node` (dev) | 20.x | 26.x | Yes | Align with the Node version you deploy on |
| `@eslint/eslintrc` (dev) | ^3 | — | Yes (`FlatCompat`) | Keep |

- **Unused dependencies:** none. Every listed dependency is imported [Verified-Tool grep].
- **Duplicate functionality:** `lenis` overlaps native CSS `scroll-behavior`. Framer Motion's `whileInView` fades overlap the existing CSS `.animate-enter` keyframes in `globals.css:193-206`.
- **Dependency placement:** correct. Type packages and the toolchain are in devDependencies.
- **Scripts:** `dev`, `build`, `start` and `lint` all exist, and `lint` and `build` were verified working. There is no `test` or `typecheck` script.
- `pnpm-workspace.yaml` contains only `allowBuilds` for `sharp` and `unrs-resolver`, which is fine.
- Nothing was installed, upgraded or re-locked during this audit.

---

## 12. Ponytail Ultra Audit Results

Skills used: **`/ponytail ultra`** (active) and **`/ponytail-audit`** (this section).
- **`/ponytail-review`** was **not applicable**: the working tree is clean, so there is no diff to review.
- **`/ponytail-debt`** found zero `ponytail:` markers in the tree (§13).
- **`/ponytail-gain`** was **not run as a measurement**. It reports generic benchmark averages, not repo-specific numbers, and there is no before/after baseline yet. The baseline for later comparison is: 35 source files, about 5,032 lines, 7 runtime deps, 200 kB first-load JS.

Ranked, biggest cut first. Every `delete:` was grepped across `src/` first, including dynamic references.

1. **delete:** the `GeoTelemetryCard` radar, clock and fake stats. Replacement: nothing. The About stat card already says "Cebu · Philippines (GMT+8)" (`AboutSection.tsx:54-56`). This also removes a 1 s interval and fixes P2-9 and P2-10. **[src/components/ui/GeoTelemetryCard.tsx, −416]**
2. **reuse:** replace `TechnicalBlueprintBackground` with the **already-defined, currently unused** `.tech-grid` class (`globals.css:31-54`) on one `<div aria-hidden>`. This drops the mouse-tracking HUD, the `mousemove` listener and the fake labels. **[src/components/ui/TechnicalBlueprintBackground.tsx, −100]**
3. **native:** replace `lenis` with CSS `html { scroll-behavior: smooth }` inside `@media (prefers-reduced-motion: no-preference)`. `scroll-padding-top: 5rem` already exists (`globals.css:88`). Plain `href="#id"` anchors then scroll natively. This deletes the Lenis instance, the RAF loop, the Lenis CSS (`globals.css:91-107`), `data-lenis-prevent`, the `pageTop()` and `handleNavClick` scroll math (`Navigation.tsx:23-34, 100-126`), and `scrollToY`. `lockScroll` becomes `body.style.overflow`. **[SmoothScroll.tsx, Navigation.tsx, globals.css, useModal.ts; −1 dep, about −90]**
   *Risk:* native anchor scrolling targets the transformed box while a section's 40 px entrance transform is still active. That is a cosmetic offset; verify in the browser.
4. **delete:** `ViewportContext` and its provider. Its only consumer is `useParallax`. Either drop the hero parallax entirely (recommended: three spring-driven layers on the hero for a ≤25 px drift), or check `matchMedia('(max-width:767px)')` inside the hook. **[src/context/ViewportContext.tsx, src/hooks/useParallax.ts, layout.tsx; −29 to −105]**
5. **native:** use `<dialog>` with `showModal()` for the three modals. It provides the focus trap, Escape, the top layer and inert background natively, so `useModal` shrinks to opening, closing and the scroll lock. **[src/hooks/useModal.ts, Modal.tsx, ProjectsSection.tsx, CertificatesSection.tsx; about −50]**
6. **delete:** dead CSS: `.tech-grid` (unless reused in #2), `.noise-overlay`, `@keyframes glowPulse`/`.glow-pulse` and `@keyframes blink`/`.animate-blink`. Each has 0 uses. **[src/app/globals.css:30-84, 179-191; about −55]**
7. **delete:** dead types, fields and helpers: `CodeHighlight` and `Project.codeHighlight` (`types/index.ts:18-23, 33`); `ProfessionalSkill.accent`/`.dot` and their data values (`data.tsx:68-69, 76-77, 86-87`); `ServiceItem.accent` and its data values (`data.tsx:375, 386, 397, 408`); `canonicalUrl()` (`seo.ts:65-70`); the type re-export (`data.tsx:17`); `AnimatedSectionHeading`'s `containerRef` prop (`:9-10`); `useAnimatedHeading`'s returned `scrollYProgress`; `useParallax`'s `stiffness`/`damping` options; the unused `cardRef` refs (`ExperienceSection.tsx:87, 147`); and the unused `TECH_BRAND_COLORS` keys `html5`/`css3`. **[about −45]**
8. **delete:** no-op `memo` and `useCallback`. `memo` is defeated by inline closures (`ProjectsSection.tsx:96, 109`) and has no props to compare on `GeoTelemetryCard` and `TechnicalBlueprintBackground`. `useCallback` wraps single-use handlers in `ContactSection`, `ProjectsSection`, `CertificatesSection` and `Navigation`. **[about −30]**
9. **reuse:** the GitHub SVG path is copied 3 times (`ContactSection.tsx:177-183`, `ProjectsSection.tsx:208-218`, `Footer.tsx:11-22`) and the LinkedIn path twice. Extract one `icons.tsx`. `Footer.tsx:6, 26` should use `AUTHOR_GITHUB` and `AUTHOR_LINKEDIN` from `constants/seo.ts` instead of hardcoded URLs. **[about −30]**
10. **native:** move `SkillPill`'s `isHovered` state, Framer hover, rotate and scale to CSS `group-hover:` transitions, which already exist on the same element. Drop the blur entrance. **[src/components/sections/SkillsSection.tsx:122-198; about −25]**
11. **yagni:** the `contactApi` object in `features/contact/api/` has one caller and one method. Inline the `fetch` in `ContactSection` and drop the `~features` alias. **[src/features/contact/api/contactApi.ts; −33 file, +8 inline]**
12. **shrink:** turn the `Modal.getModalStyles()` switch, with its unreachable `default`, into a `const STYLES = {loading, success, error}` lookup. **[src/components/Modal.tsx:27-92; about −30]**
13. **delete:** double entrance animations. Each section is `motion.section` with a whileInView fade, and its heading, cards and pills fade again. Keep one level. **[components/sections/*; about −60]**
14. **shrink:** `GeoTelemetryCard`'s `mounted` state is redundant with `timeStr === ""`. This is moot if #1 is applied.
15. **delete:** the `~components/*` alias (0 uses). Merge `~types` into `@/types`. **[tsconfig.json:24-28]**
16. **delete:** about 24.7 MB of unreferenced `public/` assets (P2-2). This removes no lines, only repo and deploy weight.

**net: about −900 lines, −1 dep possible** (`lenis`). Framer Motion stays. Removing it entirely is possible only with a broader motion redesign and is **not** recommended here.

Not cut, deliberately:
- The contact API validation, escaping, honeypot and rate limit are trust-boundary code.
- The modal focus management is accessibility code.
- `tech-icons.ts` maps names to self-hosted icons, which is reasonable.
- The scroll-spy implementation is already efficient. IntersectionObserver would be an equivalent rewrite, not a cut.

---

## 13. Technical Debt

- **`/ponytail-debt` result:** zero `ponytail:` markers. No deliberately deferred shortcuts are recorded in code.
- **Implicit debt found during the audit**
  - Dependencies are 7+ months behind their security patches (§11).
  - There are no tests, no `test` script and no CI config in the repo.
  - The README and docs are out of date (P2-14).
  - About 24.7 MB of orphaned assets (P2-2).
  - Hardcoded dates: JSON-LD `dateModified` (P3-2) and a 2025 copyright line in the README.
  - The rate limiter is per instance and best-effort. It is documented in code (`route.ts:7-8`) and is an acceptable ceiling for a portfolio.
  - Two path-alias systems (`@/` and `~`) coexist.

---

## 14. SEO and Portfolio Content Assessment

### Metadata and technical SEO

| Check | Result |
|---|---|
| Title / template | ✅ "Logan M. Panucat \| Full Stack Developer Portfolio" |
| Description | ⚠️ 256 characters, truncated in SERPs (P3-6) |
| Canonical | ✅ `https://portfolio-665c.vercel.app/` (from `NEXT_PUBLIC_SITE_URL` or the fallback). Ensure the env var matches the production domain if you add a custom one |
| Open Graph / Twitter | ⚠️ Present, but with a square 2252 px image (P2-4) |
| Sitemap | ✅ Single canonical URL |
| robots.txt | ⚠️ Redundant image-bot group and `host` (P3-3) [Verified-Tool] |
| JSON-LD | ✅ Person, WebSite and ProfilePage. ⚠️ Invalid `offers`, stale date, 13 MB image (P3-2, P2-3) |
| Google verification | ⚠️ Meta token wrong, HTML file OK (P3-1) |
| Heading hierarchy | ⚠️ One H1 ✅, H2 per section ✅, skips in Skills (P2-6) |
| Alt text | ✅ Present. Project alt text could describe the screen rather than repeat the title |

### Recruiter perspective

| Question | Can a recruiter answer it quickly? |
|---|---|
| Who am I? | ✅ Yes. Name, BSIT Cum Laude, CTU instructor and developer are in the hero |
| What can I build? | ⚠️ Partly. Projects are listed but buried (P1-5) and described in adjectives (P2-11) |
| Which technologies? | ✅ Yes, almost too much: hero ribbon, Skills, Competencies, Services and badges |
| What projects are complete? | ⚠️ The types say "Ongoing", "Capstone" and "School Project", but there is no status or outcome |
| What problems do they solve? | ⚠️ Partly. The descriptions state features, not outcomes or users |
| How to contact? | ✅ Yes. Email (copy button), GitHub, LinkedIn, form and resume PDF |
| Where to inspect work? | ❌ **No.** There are no repo or demo links on any project (P1-2). The SQLite download is a MediaFire zip (P2-13). |

**Missing evidence of skill:** source links, a live demo, a role statement per project ("I built X; team of N"), outcomes or usage, and a code sample. **Generic content:** the certificate descriptions and the Services copy, which reads like agency boilerplate.

---

## 15. Missing Features

Each item is ranked by value to a recruiter. Only the first four are recommended.

1. **GitHub and live links per project** (P1-2). This is the type and UI already built, just unused.
2. **Per-project role and outcome line** (content only).
3. **Certificate verification links and PDF links** (P2-12).
4. **A skip link and `aria-current`** (P2-7).
5. *Optional:* a dedicated `/projects/[slug]` page for 2–3 flagship projects (static, `generateStaticParams`). Add it only once there is enough case-study content to fill it. Today the modal is enough.

Not recommended: a blog, a dark-mode toggle, CMS integration or analytics dashboards. There is no evidence they are needed.

---

## 16. Unnecessary Features

| Feature | Why it's unnecessary | Action |
|---|---|---|
| GeoTelemetryCard (radar, live clock, fake latency) | Decorative, 416 lines, 1 s re-render, privacy and credibility concerns | Delete |
| Background mouse-coordinate HUD and fake REF_ID labels | Decorative, global `mousemove` handler | Delete. Keep the grid |
| Lenis smooth scroll | Native CSS covers it, and it adds an RAF loop | Remove |
| ViewportContext | One consumer | Delete |
| Services section | Duplicates Skills and Competencies | Merge or remove |
| Per-section double fades and per-pill blur entrances | Visual noise and runtime cost | Keep at most one level |
| Hero "schema.sql" tab toggle | A novelty interaction on a decorative element | Optional: keep one static code panel |

---

## 17. Testing and Build Results

| Check | Command | Result |
|---|---|---|
| Lint | `pnpm lint` | ✅ **Passed**, 0 errors and 0 warnings |
| Type check | `pnpm exec tsc --noEmit` | ✅ **Passed**, 0 errors |
| Production build | `pnpm build` (`next build --turbopack`) | ✅ **Passed**. 8 static pages, `/` static at 200 kB first-load JS |
| Dependency audit | `pnpm audit` | ❌ **76 advisories**: 2 critical, 41 high, 30 moderate, 3 low |
| Outdated | `pnpm outdated` | ⚠️ 16 packages behind (§11) |
| Unit tests | — | ⏭️ **Not executed.** No test runner or tests exist |
| E2E tests | — | ⏭️ **Not executed.** None exist |
| Production server smoke | `next start` plus `curl` | ✅ `/` 200 and prerendered. `robots.txt` correct. URL-encoded `C%23` image resolves (200). `POST /api/send-email {}` returns 500 "Server misconfigured", **expected locally** because `.env.local` is absent |
| Browser | 1440, 1024 and 375 px | ✅ No console errors, no horizontal overflow, CLS 0, nav anchors, mobile menu and project modal (focus, Escape, restore) all work. Issues are listed above |
| Contact form submit | — | ⏭️ **Not executed.** It would send real email in production, and form submission needs your approval |
| Lighthouse / INP | — | ⏭️ **Not available** in this environment |
| Screen reader | — | ⏭️ **Not available** |

**Suggested minimal test (Ponytail: one check, no framework sprawl):** a single `node --test` file that imports the route's `POST` and asserts 400 for an empty body, 400 for a bad email, 400 for an over-length message and 200 for a filled honeypot. That covers the only trust-boundary logic in the repo.

---

## 18. Recommended Implementation Roadmap

1. **Fix critical issues (≈30 min).** Bump `next` and `eslint-config-next` to the latest 15.5.x, `react`/`react-dom` to the latest 19.x patch, and `nodemailer` and `@types/nodemailer` to ≥ 10.0.6. Then run `pnpm audit`, `pnpm build` and send one real contact message. (P0-1, P1-1)
2. **Correct broken functionality (≈1 h).** Fix the contact error modal state and message (P1-3), touch-visible carousel controls (P1-7) and the awaited clipboard call (P3-4).
3. **Improve responsiveness and accessibility (≈2–3 h).** Mobile hero order (P1-4); reduced-motion and pause handling for the marquee, carousel and rotator (P1-6); stretched-link cards (P2-5); heading levels (P2-6); skip link and `aria-current` (P2-7); 1024 px nav (P2-8); touch targets (P3-7).
4. **Optimize real bottlenecks (≈1–2 h).** Remove the LCP entrance animation (P2-15). Apply Ponytail #1–#4 and #10 and #13, which remove the decorative timers, listeners, RAF loop and blur animations. Re-measure first-load JS against the **200 kB** baseline and run Lighthouse on the deployed URL.
5. **Simplify and remove duplication (≈2 h).** Ponytail #5–#9, #11, #12, #15 and #16, plus the asset cleanup (P2-2, P2-3).
6. **Improve presentation and SEO (≈half a day, mostly writing).** Project links, role and outcome (P1-2, P2-11); page reorder and section merge (P1-5); certificates (P2-12); SQLite release on GitHub (P2-13); OG image (P2-4); README (P2-14); P3 metadata fixes; security headers (P2-1).
7. **Final production readiness.** `pnpm lint && pnpm exec tsc --noEmit && pnpm build`, the one route test, `pnpm audit` (target: 0 critical or high in prod deps), a manual pass at 375, 768, 1024 and 1440 with keyboard only, Lighthouse on production, and a real contact-form send.

---

## 19. Risks and Expected Improvements

| Change | Risk | Mitigation | Expected improvement |
|---|---|---|---|
| Next 15.5.x patch bump | Low (same minor) | Build plus a browser smoke test | Clears 2 critical and 13 high advisories |
| nodemailer major bump | Low–medium (major) | Send a real test email | Clears 5 high advisories |
| Remove Lenis | Feel of scrolling changes (less "floaty"); small anchor offset while sections are mid-entrance | Browser check of every nav link | −1 dep, no idle RAF loop, simpler modal scroll lock |
| `<dialog>` modals | Styling of `::backdrop`; older Safari quirks | Test on iOS Safari | Native focus trap and inert background, less custom code |
| Delete decorative components | Visual identity becomes calmer | Keep the grid, colours and type | Shorter page, fewer timers and listeners, fewer credibility questions |
| Section reorder and merge | Content decisions are yours | Review the copy before cutting | Projects reachable in 1–3 screens on mobile |
| Security headers / CSP | A strict CSP can break inline scripts | Ship CSP as report-only first | Clickjacking and MIME-sniffing protection |

No performance improvement figures are claimed. Re-measure after each step against the baselines in §9.

---

## 20. Final Production Readiness Assessment

**Not ready to present as-is. Ready after roadmap steps 1–3 plus the project links in step 6.**

- **Blocking:** the framework security advisories (P0-1), and the absence of any way to inspect your work (P1-2).
- **Strongly recommended before sharing:** the mobile hero order, page reordering, the contact error fix, and reduced-motion and pause handling.
- **The base is sound:** a clean build, clean types and lint, a static page, a hardened contact endpoint, good modal accessibility, zero layout shift, and a coherent visual design. The remaining work is mostly **subtraction**: removing decoration, dead code and duplicate sections. That is followed by **evidence**: links, roles and outcomes.
