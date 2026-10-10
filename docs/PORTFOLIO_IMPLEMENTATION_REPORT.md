# Portfolio 2.0 — Implementation Report

- **Date:** 2026-10-10
- **Branch:** `portfolio-2.0` (local only; nothing committed, pushed or deployed)
- **Base:** `main` @ `c34cd16`, which is byte-identical to the live site (both serve a 205,461-byte home page)
- **Inputs:** `docs/PORTFOLIO_FULL_AUDIT.md` and the approved Emerald & Porcelain direction
- **Mode:** Ponytail **ultra**, used with `/ponytail-audit` findings, `/ponytail-review` on the final diff, and `/ponytail-debt` (§12)

---

## 1. Executive Summary

The existing portfolio was improved in place: same Next.js App Router architecture, same single page, same content sources and assets. The redesign was not started over from scratch.

- **Security:** all advisories in production dependencies are resolved. The audit total went from **76** (2 critical, 41 high) to **1** (high, dev-only lint tooling, no upstream fix exists). Security headers were added, `X-Powered-By` was removed, and the contact route gained an origin check, `Retry-After` and visitor-safe error messages. **8 regression tests** cover the route.
- **Design:** an Emerald & Porcelain token system is enforced by clearing Tailwind's default palette, so off-palette colors cannot slip in. The hero and footer are Deep Forest, content sits on Warm White, and cards are Pure White with Soft Sage borders. All text pairs used meet WCAG AA (§4).
- **Structure:** projects now come straight after the hero. On a 375 px phone, Projects start at **1,032 px** instead of **9,084 px**, and the name, role and all three CTAs are on the first screen.
- **Projects:** every project has a detail dialog with features, technologies and screenshots. One real GitHub link was verified (LibraSys). Supplify's client deployment is now documented from its signed certificates. No links were invented.
- **Simplification:** framer-motion and lenis were removed, client components went from 17 to 5, and source shrank from ~5,000 to 1,950 lines. First-load JS for `/` dropped from **200 kB to 123 kB**.

---

## 2. Completed Audit Findings

| Audit ID | Finding | Status | Where |
|---|---|---|---|
| P0-1 | Next.js 15.5.7: 2 critical and 13 high advisories | ✅ Fixed (15.5.27) | `package.json` |
| P1-1 | nodemailer 6.10.1: 5 high advisories | ✅ Fixed (10.0.16) | `package.json` |
| P1-2 | No project links | ⚠️ Partly fixed. 1 verified link (LibraSys); the rest need your URLs (§17) | `src/data.ts` |
| P1-3 | Contact error modal lost its message | ✅ Fixed. Inline persistent error, values kept | `ContactForm.tsx` |
| P1-4 | Mobile hero buried the name and CTAs | ✅ Fixed. Text first, CTAs end at y = 466 px | `HeroSection.tsx` |
| P1-5 | Projects buried, page too long | ✅ Fixed. New order, sections merged | `page.tsx` |
| P1-6 | Marquee, carousel and rotator moved without pause or reduced-motion handling | ✅ Fixed. All three removed; nothing animates continuously | — |
| P1-7 | Carousel controls hidden on touch | ✅ Fixed. Always-visible 44 px buttons plus native swipe | `SqliteGallery.tsx` |
| P2-1 | No security headers | ✅ Fixed | `next.config.ts` |
| P2-2 | Unused public assets | ⚠️ Partly. Scaffold and decorative files deleted; your originals kept for a decision (§17) | `public/` |
| P2-3 | JSON-LD pointed at the 13 MB `profile.jpg` | ✅ Fixed. Now uses `profile-hero.jpg` (72 KB, same photo) | `StructuredData.tsx` |
| P2-4 | Square 2252 px OG image | ✅ Fixed. Generated 1200×630 | `src/app/opengraph-image.tsx` |
| P2-5 | `div role="button"` cards | ✅ Fixed. Real `<button>`s and `<a>`s | `ProjectCard.tsx`, `CertificatesSection.tsx` |
| P2-6 | Heading skips | ✅ Fixed. h1 → h2 per section → h3 → h4 | all sections |
| P2-7 | No skip link or `aria-current` | ✅ Added | `layout.tsx`, `Navigation.tsx` |
| P2-8 | Nav wrapped at 1024 px | ✅ Fixed. 6 items, `whitespace-nowrap`; no wrap at 768 or 1024 (verified) | `Navigation.tsx` |
| P2-9 | Precise GPS coordinates published | ✅ Removed. Now "Cebu, Philippines" only | — |
| P2-10 | Fake telemetry ("LATENCY <18ms", "3D_LOCK") | ✅ Removed | — |
| P2-11 | Unsupported claims | ✅ Reworded (§7) | `src/data.ts` |
| P2-12 | Generic certificates | ✅ Real titles, issuers, dates, and a Udemy verify link | `src/data.ts` |
| P2-13 | MediaFire download | ⚠️ Kept (existing link), labeled as an external `.zip` host. GitHub Release recommended | `MoreWorkSection.tsx` |
| P2-14 | Stale README | ✅ Rewritten | `README.md` |
| P2-15 | Entrance animation on the LCP image | ✅ Removed. `priority` image with no animation | `HeroSection.tsx` |
| P2-16 | Every section was a Client Component | ✅ Fixed. 5 client islands remain | §12 |
| P3-1 | Wrong Google verification meta | ✅ Removed (HTML-file verification kept) | `layout.tsx` |
| P3-2 | Invalid `offers` and stale dates in JSON-LD | ✅ Fixed | `StructuredData.tsx` |
| P3-3 | Redundant robots group and `host` | ✅ Fixed | `robots.ts` |
| P3-4 | Clipboard call not awaited | ✅ Fixed. Shows "Copied" or "Copy failed" | `CopyButton.tsx` |
| P3-5 | Rate-limit map never pruned | ✅ Fixed | `route.ts` |
| P3-6 | 256-char description, `keywords` meta | ✅ Fixed (149 chars, keywords dropped) | `seo.ts` |
| P3-7 | Touch targets under 24 px | ✅ Fixed. Interactive targets are ≥ 36 px; buttons are 44 px | various |
| P3-8 | No `packageManager` field | ⏭️ Deliberately not added (§16) | — |
| P3-9 | Unverified Twitter handle | ✅ Removed | `layout.tsx` |
| P3-10 | No tests | ✅ 8 route tests | `tests/send-email.test.mts` |

---

## 3. Security Remediation

### Dependency upgrades (pnpm, no force, no framework migration)

| Package | Before | After | Why this version |
|---|---|---|---|
| `next` | 15.5.7 | **15.5.27** | Latest 15.5 patch. Clears all Next advisories, including GHSA-2xp9-vwfh-vxw4 (AVIF optimizer RCE) and GHSA-p293-qw3h-jr36. No migration to 16 |
| `eslint-config-next` | 15.5.7 | 15.5.27 | Lock-step with `next` |
| `react`, `react-dom` | 19.1.0 | 19.1.9 | Latest patch on the same minor |
| `nodemailer` | 6.10.1 | **~10.0.16** | ≥ 10.0.6 clears all 15 nodemailer advisories. **10.1.0 was published today and is blocked by pnpm's minimum-release-age policy**, so the 3-day-old 10.0.16 is pinned instead. Breaking changes v7–v10 (SES removal, the `NoAuth`→`ENOAUTH` code rename, Node ≥ 20, TLS validation on remote fetches) don't affect this route's Gmail SMTP usage |
| `@types/nodemailer` | 6.4.23 | 8.0.2 | Matches the API in use; tsc passes |

### Transitive fixes: `pnpm-workspace.yaml` `overrides`
Each override stays within the range its dependent accepts. `next@15.5.27` still pins `postcss@8.4.31`.

| Package | Locked before | Locked after | Path |
|---|---|---|---|
| postcss | 8.4.31 / 8.5.12 | 8.5.29 | next, @tailwindcss/postcss |
| sharp | 0.34.5 | 0.35.5 | next (accepts `^0.35.4`) |
| nanoid | 3.3.11 | 3.3.20 | postcss |
| source-map-js | 1.2.1 | 1.2.2 | postcss |
| js-yaml | 4.1.1 | 4.3.2 | eslint (dev) |
| brace-expansion | 1.1.14 / 5.0.5 | 1.1.21 / 5.0.12 | eslint (dev) |

### Configuration (`next.config.ts`)
- `poweredByHeader: false`. Verified: no `X-Powered-By` header.
- Headers on every route, verified with `curl -I` on the production build:
  - `Content-Security-Policy`: `default-src 'self'`, `frame-ancestors 'none'`, `object-src 'none'`, `base-uri 'self'` and `form-action 'self'`. `vercel.live` is allowed for the Vercel preview toolbar. Scripts need `'unsafe-inline'` because Next inlines its bootstrap scripts on static pages; nonces would force dynamic rendering. This is marked with a `ponytail:` note. `'unsafe-eval'` is allowed in development only.
  - `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, and a `Permissions-Policy` that disables the camera, microphone, geolocation and topics.
  - Vercel already adds HSTS (observed on production).
- **AVIF:** `images.formats` was removed, so the optimizer uses its WebP default. The RCE is patched in 15.5.27 regardless; this also removes the costlier AVIF encode path and its attack surface. No visible quality change is expected.

### Contact route (`src/app/api/send-email/route.ts`)
- **Origin check:** browser POSTs from other sites return 403.
- **Validation order:** body, types, presence, email format and lengths are checked **before** the env check, so invalid input never reaches SMTP code.
- **Error messages:** visitor-facing text is clear ("Please fill in every field.", "Please enter a valid email address.", "Too many messages…"). The 500 response is generic ("could not be sent right now"). SMTP errors are logged server-side only and never returned (tested).
- **429** responses include `Retry-After: 600`. Expired rate-limit entries are pruned.
- Uses the native `Response.json` instead of `NextResponse`, which is one fewer framework import and lets the route be unit-tested directly.
- **Serverless suitability:** stateless apart from the in-memory limiter, Node runtime, POST-only and dynamic. ✅
- **Rate limiter across Vercel instances:** **not reliable across instances.** Each warm instance keeps its own window, so it deters bursts but isn't global. This is documented in code with a `ponytail:` note naming the upgrade path (a shared store such as Upstash Redis). Together with the honeypot and origin check, this is proportionate for a portfolio. A shared store would add a service and a dependency with no evidence of spam yet.
- **Secrets:** only `EMAIL_USER` and `EMAIL_PASSWORD` (server-only) and `NEXT_PUBLIC_SITE_URL` (public by design) exist. No `.env*` files are in the repo or the working tree.

---

## 4. Emerald & Porcelain Design System

**Tokens** live in `src/app/globals.css` under `@theme`. Tailwind v4 exposes each one as a CSS variable *and* a utility:

| Token | Value | Utility examples |
|---|---|---|
| Primary Forest | `#063F33` | `bg-forest` (hero, nav, footer) |
| Primary Emerald | `#047857` | `bg-emerald`, `text-emerald`, focus ring |
| Emerald Hover | `#065F46` | `hover:bg-emerald-hover` |
| Mint Accent | `#10B981` | `text-mint` (on Forest only) |
| Warm White | `#F8FBF9` | `bg-porcelain` (page) |
| Pure White | `#FFFFFF` | `bg-white` (cards) |
| Dark Ink | `#142821` | `text-ink` |
| Secondary Text | `#52665C` | `text-muted` |
| Soft Sage | `#DDECE5` | `border-sage` |
| (Error) | `#B42318` | `text-danger`, for form errors only |

**Enforcement:** `--color-*: initial` removes Tailwind's default palette, so classes like `text-slate-500` or `bg-blue-600` produce nothing. A grep of `src` finds **no** non-token color classes and no raw hex values in components. The one exception is `themeColor` in `layout.tsx`, which a meta tag requires.

**Contrast** (WCAG 2.1, computed with a script):

| Pair | Ratio |
|---|---|
| Ink on Warm White | 14.87 |
| Secondary text on Warm White / White | 5.90 / 6.15 |
| Emerald on White (links, eyebrows) | 5.48 |
| White on Emerald (primary button) / on Hover | 5.48 / 7.68 |
| Mint on Forest | 4.69 |
| White on Forest | 11.89 |
| White at 70–80% on Forest | 6.63–8.20 |
| Error on White | 6.57 |

One pair fails, **Emerald on Sage (4.49)**, so it is not used anywhere: badges use ink text on Warm White.

**Shared building blocks:**
- In `@layer components`: `.shell` (max-w-6xl container and gutters), `.section` (vertical rhythm), `.eyebrow`, `.card` (white, sage border, soft shadow, `rounded-2xl`), `.btn` with `.btn-primary`, `.btn-outline` and `.btn-on-forest` (all 44 px tall, `rounded-full`), and `.badge`.
- One focus style: a 2 px Emerald outline, switched to Mint inside `.on-forest` surfaces.
- One reused decoration: `.tech-grid` (a faint Mint grid behind the hero), which the audit flagged as dead CSS.

**Style update: soft neo-brutalism (applied after the first pass, same palette).**
- Hard offset shadows are tokens in `@theme`: `shadow-hard-sm` (3 px ink), `shadow-hard` (5 px ink) and `shadow-hard-mint` (6 px mint, used on Forest, where ink is invisible at 1.30:1).
- Cards, badges, inputs, dialogs and image frames have 2 px ink borders and small radii (`rounded-md`/`rounded-lg`) instead of soft sage borders and pills.
- Buttons sit on a hard shadow and press into it on hover and active. The movement uses `motion-safe:` only; reduced-motion users get just the color change. New on-Forest variants: `.btn-mint` (mint with a white shadow) and `.btn-on-forest` (white border with a mint shadow).
- Labels (`.eyebrow`, status, honor and availability tags) are ink-on-mint mono tags (6.11:1). Headings are `font-black`; dates, labels and metadata use Geist Mono.
- Sections are separated by 2 px ink rules. The timeline uses square mint markers on an ink line. The active nav item is a bordered mint tab.
- Verified: no overflow at 375, 768, 1024 or 1440; the 768 px nav still fits; lint, tsc, 8/8 tests and the build pass (`/` first load still 123 kB, since the change is CSS only).

**Motion update (CSS only, `globals.css`, inside `@media (prefers-reduced-motion: no-preference)`):**
- `.anim-stamp`: a one-time hero entrance. The availability tag, buttons, photo and fact strip settle in with a slight overshoot while their hard shadows land, staggered via a `--delay` custom property. No opacity change, so first paint and LCP aren't delayed.
- `.reveal`: section headings, project, skill and certificate cards, timeline entries, the SQLite showcase and the contact form rise in as they scroll into view, using native scroll-driven animation (`animation-timeline: view()`) behind `@supports`. Unsupported browsers just show the content, and elements visible at load render fully.
- `.card-lift`: project and certificate cards lift 3 px off a deeper shadow on hover (`transform`, so it doesn't conflict with `.reveal`'s `translate`).
- Dialogs pop out of their shadow offset on open (`@starting-style`) and the backdrop fades. Closing is instant on purpose: an exit transition delayed the browser's focus return, which was caught in testing and reverted.
- Nothing loops. Verified: computed animations applied, the hero image stays at opacity 1, dialog focus return and scroll unlock still work, no overflow at 375 px, no console errors. The reveal motion itself couldn't be watched because the browser pane was hidden.

**Scrolling update:**
- **Double scrollbar in dialogs fixed.** The browser's default `dialog { overflow: auto }` plus the 2 px border made the dialog overflow by 4 px, while an inner wrapper scrolled as well. The dialog is now the only scroll container (`overflow-y-auto overscroll-contain`), with a sticky header so the title and Close stay visible. Backdrop-close now checks click coordinates, so using the dialog's scrollbar never closes it.
- `html { scrollbar-gutter: stable }` keeps the page from shifting sideways when a dialog locks scrolling.
- **Neo-brutalist scrollbars** for the page, dialogs and the SQLite gallery: a 14 px sage track with an ink edge, and a mint thumb with a 2 px ink border that turns emerald on hover and forest while dragging. Firefox gets mint on sage through `scrollbar-color`.
- Verified: one scroller, pinned header, page locked behind the dialog, inside clicks keep it open, backdrop click and Escape close it, focus returns to the trigger.

**Motion:** there are no continuous animations, no gradients, no glass and no particles. The only motion is hover color transitions, smooth anchor scrolling (`@media (prefers-reduced-motion: no-preference)` only) and gallery scrolling (`motion-safe:scroll-smooth`). Dark mode did not exist before and was not added.

---

## 5. Hero and Navigation Changes

**Hero** (`src/components/sections/HeroSection.tsx`, now a Server Component):
- Text first on every viewport: availability chip, `<h1>` name, role ("Full-Stack Developer · BSIT College Instructor"), a two-line intro, **View projects** (primary), **Contact me**, **Resume (PDF)**, and a core-stack list.
- Your real photo (`profile-hero.jpg`) with `priority` and correct `sizes`, no entrance animation, a Mint frame, and an Education / "Based in Cebu, PH" fact strip.
- Removed: the rotating role text, parallax, the fake terminal and its "Production Ready 🚀", "status: active", the "5+ Project Systems" badge (it undercounted), and the pinging dots.
- **375×812 (verified):** `<h1>` ends at 198 px, CTAs end at 466 px, the photo starts at 654 px, no overflow.

**Navigation** (`src/components/layout/Navigation.tsx`):
- Forest bar with 6 items (Projects, More Work, About, Skills, Certificates, Contact), plain `href="#id"` anchors with native scrolling, and `scroll-padding-top` for the fixed header.
- The active section is computed with `IntersectionObserver` and exposed as `aria-current="true"`. This replaces the per-scroll offset math and `pageTop()`.
- Mobile menu: `aria-expanded` and `aria-controls`, a 44 px toggle, closes on link click and on Escape (focus returns to the toggle). Verified.
- A skip link ("Skip to content" → `#main`) was added in `layout.tsx`.
- Footer (`Footer.tsx`): Forest, with GitHub, LinkedIn, Email and Resume links from shared constants, and a "Back to top" anchor that replaces the ScrollToTop widget.

---

## 6. Project Showcase Improvements

**Order:** Hero, then **Featured projects** (`#projects`), then **More work** (`#more-work`: other projects plus SQLite Portable), then About, Skills, Certificates and Contact.

**Cards** (`ProjectCard.tsx`, a server component reused for both groups): screenshot, kind · context (replacing the fake `name.app` domain labels, which were not real addresses), title, status (only where verified), summary, up to 5 tech badges with an "+N more" count, a **View details** button, and a **GitHub** button where a real repo exists.

**Detail dialog** (native `<dialog>` via `src/components/ui/Dialog.tsx`): summary, key features, my role and outcome (when known), technologies, every screenshot, and links. When there are none, it shows the non-clickable note "Source and demo not publicly linked". The content is server-rendered; only the open/close wiring is JavaScript.

**Content verification:**
- Repo data matched the live site exactly (same build, same HTML size).
- All 8 projects and SQLite Portable are preserved.
- **LibraSys:** linked to `github.com/Ezgaminglogan/LibraSys-CTU`. The repo's README confirms CTU Naga, TanStack, Prisma and MySQL. Its features (Excel student import, reports and so on) now come from that README.
- **Supplify:** the deployment certificates show it is "Supplify: A Cross-Platform Hardware Supply Management System", deployed for Dudz Hardware Store, Naga, Cebu, from Nov 24 to Dec 8, 2025, by a three-person team. Status, role and outcome now cite this. `Landing.png` (web) and `Landing2.png` (mobile, previously unused) are both Supplify screens and are now its screenshots.
- **CTU Faculty Grade Sheet** (replaced the CTU Faculty Grade Portal at your request): a Laravel + Electron desktop app. Features come from its sign-in screen (ROForm 15-B grading, attendance and class records stored on the faculty member's computer, password sign-in), and its screenshot is `public/image/Faculty Grade Sheet.jpg`. Laravel and Electron were added to Skills. The old `public/image/Grade Portal.jpeg` is no longer referenced but was kept.
- All alt text now describes what each screenshot shows.

**Not added (Ponytail):** category filters. With 4 + 4 projects already grouped into two sections, filters would add JavaScript without making browsing easier.

**SQLite Portable:** described with features taken from its screenshot names. The 22 screenshots are in a native scroll-snap strip with visible captions ("3 / 22 · SQL explorer"), keyboard focus and always-visible Previous/Next buttons. There is no autoplay. The download link is kept and labeled as an external MediaFire `.zip`.

---

## 7. Skills and Experience Changes

**Skills** (`SkillsSection.tsx`): one compact grid of five groups (Frontend, Backend, Databases, Desktop, Developer tools) with icon badges. It lists only technologies that appear in the projects, the experience entries or the old skills data. At 375 px it is **942 px** tall, down from **3,575 px**. Removed: the per-pill blur/scale/rotate entrance, mouse-driven glows, and the duplicated "Professional Competencies" cards (their substance is now in About → *What I work on*).

**About** (`AboutSection.tsx`): two short paragraphs, then *What I work on* (four focus areas that replace the Services section), an **Experience** timeline (all 3 roles kept), and the **Education** card (BSIT, Cum Laude, 2022–2026).

**Wording changes** (no new facts added):
- "Architected and deployed production-ready full-stack enterprise systems" became "Led development of capstone systems, including Supplify … deployed for Dudz Hardware Store". The deployment is now backed by the certificate.
- "high-performance", "enterprise-grade", "advanced" and "seamless" were dropped from project and service copy.
- Removed as unsupported: Services claims of "OS setup … hardening" and "Automated server backups and health checks", plus "Fast Response", "Mon–Sat Active", "Global Remote & On-Site" and "Seamless overlap with US, EMEA & APAC". **Restore any that are true** (§17).

---

## 8. Certificate Improvements

**Root cause of the repetition:** `CertificatesSection` rendered `[...certificates, ...certificates]` to make the marquee loop seamless. The data had no duplicates. The fix is a plain grid of the 5 real certificates, with no marquee and no continuous motion.

**Real metadata, read from each certificate image:**

| Title (on certificate) | Issuer | Date | Previously shown as |
|---|---|---|---|
| Certificate of Deployment: Supplify | Dudz Hardware Store, Naga, Cebu | Nov 24 – Dec 8, 2025 | "Certificate of Deployment" (generic) |
| Certificate of Deployment: Dudz Hardware Store system (team) | Dudz Hardware Store | Nov 24 – Dec 8, 2025 | same |
| Next.js App Router Fundamentals | Vercel | Dec 8, 2025 | "Official Next.js certification" |
| React Foundations for Next.js | Vercel | Nov 26, 2025 | **"Next.js Certification — professional certification"** (wrong title) |
| CSS, Bootstrap And JavaScript And Python Stack Course | Udemy · Proper Dot Institute (7.5 h) | Nov 30, 2025 | "Udemy Course Completion — advanced web development courses" |

- The heading is now "Certificates · Deployments and courses". Nothing is called "official" or "professional certification".
- A **Verify** link was added for the Udemy certificate (`ude.my/UC-964d…`). The URL is printed on the certificate and was confirmed to resolve to Udemy's certificate page.
- **View certificate** opens a native dialog with the full image. All controls are visible without hover. On phones each card uses a small thumbnail, bringing the section from **2,663 px to 1,526 px**.
- **PDFs not linked:** `certificates-nextjs.pdf` and `dashboard-app-certificate.pdf` (8 MB each) and `certificates-udemy.pdf` could not be rendered in this environment (no PDF renderer installed), so I couldn't check what they contain. They are unchanged and unlinked (§17).

---

## 9. Functional Bug Fixes

| Bug | Fix | Verified |
|---|---|---|
| Error modal reset to an empty "Sending Failed" after 3 s | Inline `role="alert"` message that stays until the next attempt; no modal | ✅ Browser |
| Server error text discarded | 400 and 429 messages are shown as written. 403, 5xx and network failures get specific generic messages | ✅ Browser: 500, 400 and 429 each produced distinct text |
| Values cleared on failure | Uncontrolled inputs plus `FormData`; reset only on success | ✅ All 4 fields kept after failure |
| Duplicate certificates | Marquee clone removed | ✅ 5 cards |
| Carousel controls invisible on touch | Visible buttons plus native swipe and scroll | ✅ The button scrolls the strip by one screenshot (359 px at 375 w) |
| Clipboard false "Copied" | Awaited, with a failure state | Source |
| Nav wrap at 1024 px | Fewer items, nowrap | ✅ No wrapping at 768 or 1024 |
| 1,277 px horizontal overflow (introduced in the first redesign pass) | `min-w-0` on the gallery grid item | ✅ 0 overflow at 375, 768, 1024 and 1440 |

---

## 10. Accessibility Improvements

- Semantic structure: one `<h1>`, an `<h2>` per section linked by `aria-labelledby`, `<h3>` for cards and subsections, `<h4>` for timeline entries (verified heading dump), `<article>`, `<ol>` timeline, `<dl>` for facts and skills, `<figure>`/`<figcaption>` in the gallery.
- Real controls only: card and certificate actions are `<button>`/`<a>`. Every repeated action has a unique accessible name ("View details about Supplify", "View certificate: …", "Source code for LibraSys (GitHub)").
- Native `<dialog>` with `showModal()` provides the focus trap, Escape and inert background natively. **Verified:** focus moves to Close, Escape closes, focus returns to "View details about Supplify", and the page behind is scroll-locked (CSS `html:has(dialog[open])`).
- Skip link, `aria-current` on nav, `aria-expanded`/`aria-controls` on the menu toggle, `aria-busy`/`role="status"`/`role="alert"` on the form.
- No hover-only essential content anywhere.
- Nothing moves on its own. Smooth scrolling is gated on `prefers-reduced-motion: no-preference`.
- A visible focus ring everywhere: Emerald on light surfaces, Mint on Forest.
- Targets: buttons are 44 px; nav links are 36 px. Nothing interactive is under 24 px except the visually hidden skip link (verified).
- Contrast: §4.
- **Not verified:** a screen reader pass, and the IntersectionObserver `aria-current` update (see §15).

---

## 11. Performance Results

Same machine, `next start` production build, same measurement script, warm cache. "Before" was measured on the `c34cd16` build, which matches the live site.

| Metric | Before | After | Change |
|---|---|---|---|
| `/` route JS (build output) | 79.8 kB | **9.09 kB** | −89% |
| `/` First Load JS (build output) | 200 kB | **123 kB** | −77 kB |
| Shared JS (build output) | 135 kB | 122 kB | −13 kB |
| JS decoded on load, 1440 px | 681 KB / 8 files | **416 KB / 7 files** | −39% |
| Requests on initial load, 1440 px | 21 | **12** | −9 |
| HTML gzipped | 28.9 KB | 34.4 KB | **+5.5 KB** (see note) |
| HTML uncompressed | 201 KB | 292 KB | +91 KB (see note) |
| DOM elements | 1,250 | 1,288 | +38 |
| Page height, 1440 px | 14,771 px | **7,845 px** | −47% |
| Page height, 375 px | 19,941 px | **13,418 px** | −33% |
| Projects offset, 375 px | 9,084 px | **1,032 px** | −89% |
| CTAs on first mobile screen | No (`<h1>` at 558 px, CTAs below the fold) | **Yes** (CTAs end at 466 px) | |
| Client Components | 17 | **5** | |
| Runtime dependencies | 7 | **5** | −framer-motion, −lenis |
| Perpetual timers, listeners and animations | 1 s clock, 3 s rotator, 5 s autoplay, RAF loop, mousemove, radar, marquee, 10+ pulses | **none** | |

**Note on HTML size:** the project and certificate dialog content (features, screenshots, alt text) is now server-rendered into the page, so it is crawlable and needs no JavaScript to build. That trades +5.5 KB gzipped HTML for −265 KB of decoded JavaScript. Dialog and gallery images still load lazily, only when shown.

**Images:** `next/image` everywhere. The hero photo is `profile-hero.jpg` (900×1350, 72 KB) with `priority` and `sizes`, and no animation now delays the LCP image. The 13 MB `profile.jpg` is no longer referenced.

**Fonts:** `next/font` Geist and Geist Mono, unchanged and self-hosted.

**Not measured:** LCP, INP and Lighthouse. The browser pane was hidden (`document.visibilityState === "hidden"`), and browsers don't report paint timings for hidden pages, so the old 3.3 s local LCP can't be re-compared. Run Lighthouse on the Vercel Preview URL (§18).

---

## 12. Ponytail Ultra Simplifications

| # | Audit item | Result |
|---|---|---|
| 1 | Delete GeoTelemetryCard (416 lines) | ✅ Deleted. Location is one line in the hero, contact section and footer |
| 2 | Reuse `.tech-grid` instead of TechnicalBlueprintBackground | ✅ Done. One `<div>`, no mousemove listener |
| 3 | Lenis → native scrolling | ✅ `lenis` removed. CSS `scroll-behavior` (motion-safe) and `scroll-padding-top` |
| 4 | Delete ViewportContext | ✅ Deleted, along with `useParallax` and the parallax itself |
| 5 | Native `<dialog>` | ✅ `useModal` (67 lines) and `Modal.tsx` (171 lines) became `Dialog.tsx` (~55 lines), shared by 13 dialogs |
| 6 | Dead CSS | ✅ `globals.css` went from 233 to 92 lines |
| 7 | Dead types, fields and props | ✅ `CodeHighlight`, `accent`, `dot`, `badge`, `canonicalUrl`, type re-exports and unused refs removed |
| 8 | No-op `memo`/`useCallback` | ✅ None left in the codebase |
| 9 | Duplicate social SVGs | ✅ One `icons.tsx`; Footer uses shared constants |
| 10 | JS hover state → CSS | ✅ SkillPill hover state removed; hover is CSS only |
| 11 | `contactApi` wrapper and `~features` alias | ✅ Inlined. `tsconfig` paths reduced to `@/*` |
| 12 | Modal style switch | ✅ Moot, since `Modal.tsx` was deleted |
| 13 | Double entrance animations | ✅ All entrance animations removed, and `framer-motion` with them |
| 15 | `~components` / `~types` aliases | ✅ Removed |
| 16 | Unused public assets | ⚠️ Partly (§13) |

**`/ponytail-review` on the final diff:** one finding (a repeated `compact ? 3 : 5` in `ProjectCard.tsx`), fixed. Nothing else to cut.

**`/ponytail-debt` ledger** (deliberate, documented ceilings):
1. `src/app/api/send-email/route.ts:6`: the rate limit is per instance. Upgrade to a shared store if spam gets through.
2. `next.config.ts:5`: CSP uses `'unsafe-inline'` scripts because the page is static. Upgrade to nonces if the site ever renders dynamically.

**`/ponytail-gain`:** that skill reports generic benchmark averages, not repo measurements, so §11 gives the real before/after figures instead.

**Size:** ~5,000 lines in 34 source files became **1,950 lines in 29 files** (+69 lines of tests). The working diff is 1,122 insertions and 5,184 deletions across tracked files.

---

## 13. Deleted and Reused Components

**Deleted** (each grepped for references first; none remained):
- `src/components/ui/GeoTelemetryCard.tsx`, `TechnicalBlueprintBackground.tsx`, `AnimatedSectionHeading.tsx`, `ScrollToTop.tsx`
- `src/components/SmoothScroll.tsx`, `Modal.tsx`, `ImageCarousel.tsx`
- `src/components/sections/ServicesSection.tsx` (merged into About), `SqlitePortableSection.tsx` (merged into More Work), `ExperienceSection.tsx` (merged into About)
- `src/context/ViewportContext.tsx`, `src/hooks/useAnimatedHeading.ts`, `useModal.ts`, `useParallax.ts`
- `src/features/contact/api/contactApi.ts`
- `src/app/data.tsx` (moved to `src/data.ts`; it had no JSX and didn't belong in the route folder)
- Public: `next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg` (create-next-app scaffold) and `image/background-tech.jpg` (unused decoration)

**New, small, reused:**
- `src/components/ui/Dialog.tsx`: 8 project dialogs and 5 certificate dialogs
- `ProjectCard.tsx`: featured and compact variants
- `TechBadge.tsx`: cards, dialogs and the skills grid
- `SectionHeading.tsx`: all 6 content sections
- `icons.tsx`: nav, footer, contact and project links
- `CopyButton.tsx`, `ContactForm.tsx`, `SqliteGallery.tsx` (client islands), `MoreWorkSection.tsx`, `src/app/opengraph-image.tsx`, `tests/send-email.test.mts`

**Reused as-is:** all project and certificate images, the `public/icons` SVGs, `Resume.pdf`, `app/icon.png`, the Google verification HTML file, `sitemap.ts`, `techIconPath` (simplified) and the route's validation and escaping logic.

---

## 14. Remaining Security Advisories

`pnpm audit` reports **1 vulnerability (1 high):**

| Package | Path | Patched version | Risk |
|---|---|---|---|
| `braces` ≤ 3.0.3 (GHSA-vfj7-8cjw-p6xm, stack-exhaustion DoS) | `eslint-config-next > @next/eslint-plugin-next > fast-glob > micromatch > braces` | **None published** | **Dev-only.** It runs only inside ESLint on your own glob patterns, never in the deployed app. Recheck when `eslint-config-next` or `fast-glob` ships an update |

All production-path advisories are resolved.

---

## 15. pnpm Build and Test Results

All results below are from the final working tree.

| Check | Command | Result |
|---|---|---|
| Lint | `pnpm lint` | ✅ 0 errors, 0 warnings |
| Types | `pnpm exec tsc --noEmit` | ✅ 0 errors |
| Tests | `pnpm test` (new script, `node:test`, no new dependencies) | ✅ **8/8 passed**: malformed JSON, missing fields, invalid email, over-length message, honeypot, cross-site origin (403), rate limit (429 + `Retry-After`), generic 500 without env |
| Build | `pnpm build` | ✅ 9 static routes plus the dynamic API route. `/` is 9.09 kB, first load 123 kB |
| Audit | `pnpm audit` | ⚠️ 1 high, dev-only, no patch (§14) |
| Headers | `curl -I` on `next start` | ✅ CSP, nosniff, X-Frame-Options, Referrer-Policy and Permissions-Policy present; no X-Powered-By |
| Metadata | HTML inspection | ✅ canonical `https://portfolio-665c.vercel.app`, `og:image` and `twitter:image` at 1200×630, description 149 chars, robots and sitemap correct |
| OG image | `GET /opengraph-image` | ✅ 200, PNG, 188 KB, visually checked |

**Browser checks** (built-in browser; production build unless noted):

| Check | 375 | 768 | 1024 | 1440 |
|---|---|---|---|---|
| Horizontal overflow | ✅ 0 | ✅ none | ✅ none | ✅ none |
| Layout and section order | ✅ | ✅ | ✅ | ✅ |
| Nav fits without wrapping | menu | ✅ | ✅ | ✅ |
| Console errors (production) | ✅ none | | | ✅ none |

| Behavior | Result |
|---|---|
| Mobile menu: open, Escape (focus returns), close on link, anchor navigation | ✅ |
| Project dialog: open, focus, Escape, focus restore, scroll lock | ✅ |
| Certificate dialog: open and close | ✅ |
| Gallery buttons | ✅ The strip moves by one screenshot |
| Contact error handling (dev server, **no `.env` present, so no email could be sent**) | ✅ 500, 400 and 429 messages shown; values kept; retry possible |
| Lazy images (certificate thumbnails) | ✅ load; dialog images load only when opened |

**Not run, with reasons:**
- **Lighthouse, LCP and INP:** the pane was hidden, so paint timing isn't reported.
- **The `aria-current` scroll highlight:** IntersectionObserver doesn't fire while the page is hidden. The code path is standard, but it was **not** visually verified.
- **The smooth-scroll animation itself:** paused in a hidden page. The scroll position change was verified.
- **A real email send:** needs your approval and SMTP credentials.
- **A screen reader pass:** not available here.

---

## 16. Vercel Deployment Readiness

| Item | Status |
|---|---|
| Production site | **Untouched.** Nothing pushed, deployed or merged; the domain is unchanged |
| Branch | `portfolio-2.0`, local. Pushing it creates a Vercel **Preview** if Git integration is enabled (production deploys from `main`) |
| Vercel config in repo | None (`.vercel/` and `vercel.json` absent), so Vercel's Next.js defaults apply: `pnpm install` then `next build` |
| Lockfile | `pnpm-lock.yaml` is still `lockfileVersion: '9.0'`, the same format the current production deploy already installs. Overrides are in `pnpm-workspace.yaml`, which pnpm 10+ reads |
| `packageManager` field | **Not added on purpose.** Your local pnpm is 12.9.1. Pinning it would only take effect on Vercel with Corepack enabled (`ENABLE_EXPERIMENTAL_COREPACK=1`) and could break installs if that pnpm isn't available there. Decide once you've checked the Vercel pnpm version |
| **Node.js version** | ⚠️ **Check Vercel → Project Settings → Node.js Version is 20.x or newer.** nodemailer 10 requires Node ≥ 20 (local is 24). I can't read the project setting from here |
| Env vars | `EMAIL_USER` and `EMAIL_PASSWORD` must exist for **Preview** as well as Production, or the preview contact form returns the generic error. Optional: `NEXT_PUBLIC_SITE_URL` |
| Contact API | Node runtime, stateless, POST only. ✅ |
| Image optimization | Default WebP; local images only; no remote patterns needed |
| Caching | `/` prerendered static (`s-maxage=31536000`, revalidated on each deploy); the API is dynamic |
| Preview toolbar | CSP allows `vercel.live`, so preview comments work |

**Verdict:** ready for a **Vercel Preview** once you approve a commit and push of `portfolio-2.0` and confirm the Node version.

---

## 17. Remaining Content or Link Requirements

**Needs your information (nothing was invented):**
1. **Project links:** GitHub and/or demo URLs for the Grade Portal, IMS-CTU, Supplify, Mom's Food Delicacies, Luto, the Ticket Support System and the School Management System. Possible matches on your public GitHub that I did **not** link because they aren't confirmed:
   - `DBMS-Project` (VB.NET, teacher and student dashboards) may be the School Management System.
   - `Food-Ordering-With-PHP-And-ADMIN` may be Mom's Food Delicacies.
2. ~~`Faculty Grade Sheet.jpg` project~~: resolved. It now powers the CTU Faculty Grade Sheet (Laravel + Electron) entry, which replaces the Grade Portal. A GitHub link and status can still be added if available.
3. **Per-project problem, role, contribution and outcome.** The dialog renders these fields when present. Only Supplify has them, backed by its certificates.
4. **The certificate PDFs** (`certificates-nextjs.pdf`, `dashboard-app-certificate.pdf`, `certificates-udemy.pdf`). Confirm their contents before linking. `dashboard-app-certificate.pdf` may be a third Vercel course that isn't on the site.
5. **Claims to confirm or restore:** PostgreSQL in the Lead Capstone Developer entry; the removed Services items (OS hardening, automated backups); availability phrasing ("Mon–Sat", "Global Remote & On-Site"); the wording "Lead capstone developer in a three-person team".
6. **The SQLite Portable source or release:** a GitHub Release with a checksum would replace the MediaFire link.

**Needs your decision (privacy and reputation):**
7. **Unreferenced originals still served publicly** from `public/`: `image/profile.jpg` (13 MB), `grad-pic.jpg`, `grad-pic-cropped.jpg`, `certificates/certificates-nextjs.jpg`, `certificates-1-nextjs.jpg`, `image/Capstone Project.png` (E-Industria), `image/Capstone Project 2.png` (ByteBuilder), `portfolio.png`, and the PDFs. Kept per your instruction to preserve originals; delete or move any you don't want downloadable.
8. **`public/image/mjeenterprises.png` contains a third party's photo and two phone numbers** and is publicly reachable even though no page links it. I recommend removing it from `public/`.
9. **Your public GitHub profile is linked from the portfolio.** It contains repos named `BunifuUICrack`, `MS-Office-Activation-Tool` and `FB-LogIn-Exist-Account`, which recruiters may view negatively. Consider archiving them or making them private. The profile README still says "4th Year BSIT student", and the `Portfolio` repo's homepage field points to `porfolio-ochre-chi.vercel.app` instead of `portfolio-665c.vercel.app`.
10. The LibraSys repo includes `sample_students_with_courses.xlsx`. If it contains real student data, remove it.

---

## 18. Recommended Next Steps

1. **Approve a commit and push of `portfolio-2.0`** so Vercel builds a Preview (production stays on `main`).
2. In Vercel, confirm Node.js ≥ 20 and that the email env vars exist for Preview.
3. On the Preview: send one real contact-form message, run **Lighthouse** (mobile and desktop), check social previews with a card validator, and confirm the nav highlight while scrolling.
4. Provide the links and content from §17 (items 1–6). Each is a one-line edit in `src/data.ts`.
5. Decide on the privacy and reputation items in §17 (items 7–10).
6. After review, merge to `main` to update production.
7. Later, only if needed: a shared rate-limit store (if spam appears), a CSP with nonces (if the site becomes dynamic), and removing the `overrides` once Next.js updates its pinned dependencies.
