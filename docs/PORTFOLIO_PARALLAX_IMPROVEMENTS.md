# Portfolio 2.1 — Parallax and Full-Width Improvements

- **Date:** 2026-10-11
- **Branch:** `portfolio-2.1-parallax`, created locally from `main` @ `92ef960` (your committed 2.0 work). Nothing is committed, pushed or deployed; `main` and production are unchanged.
- **Approach:** Ponytail ultra. No new dependencies, no JavaScript added. One CSS utility (`.parallax`) built on native scroll-driven animations, reusing the `.reveal` setup that already existed.

## Inspection summary (Phase 1)

| Item | Finding |
|---|---|
| Instructions | No `CLAUDE.md` or `AGENTS.md` in the repo. Read `docs/PORTFOLIO_FULL_AUDIT.md` and `docs/PORTFOLIO_IMPLEMENTATION_REPORT.md` |
| Stack | Next.js 15.5.27 (App Router, static `/`), React 19.1.9, Tailwind CSS **4.2.4** |
| Animation libraries | **None installed.** Motion/Framer Motion and Lenis were removed in 2.0; GSAP was never present. Existing motion is CSS only: `.anim-stamp`, `.reveal` (scroll-driven), `.card-lift`, dialog `@starting-style` |
| Width limit | One shared container (`.shell`, `max-w-6xl` = 1152 px). Sections themselves were already full-bleed |
| Working tree | Clean on `main` before this work, so no uncommitted changes needed preserving |

## 1. Updated sections

| File | Change |
|---|---|
| `src/app/globals.css` | Wider `.shell`; new `.parallax` utility (drift keyframes) inside the existing reduced-motion and `@supports` blocks; `.reveal` distance 32 px → 20 px; `.card-lift` hover limited to `(hover: hover)` devices; new `.dot-grid` accent |
| `src/components/sections/HeroSection.tsx` | Three-layer hero (decorative background, portrait accent, still content); `overflow-clip`; larger portrait at `xl` |
| `src/components/sections/ProjectCard.tsx` | Featured covers drift inside an `overflow-hidden` frame, scaled 110% so no edge shows; updated `sizes` for the wider grid |
| `src/components/sections/AboutSection.tsx` | Outline circle and dot-pattern accents behind About and Experience; prose width capped |

Skills, Certificates, Contact and Footer: **no parallax**, as requested. They keep the existing one-time reveal, hover-lift and press effects.

## 2. Full-width layout decisions

- **Full-bleed:** every `<section>` and the footer already span the viewport (block elements with background color, no `w-screen`). The hero and About now also use `relative w-full max-w-full overflow-clip`, so their decorative layers can extend past the edges without creating horizontal scroll. `overflow-clip` was chosen over `overflow-hidden` because it doesn't create a scroll container.
- **Constrained:** all content stays inside `.shell`, now `max-w-[1440px]` with `px-5 sm:px-8 lg:px-12` gutters (previously `max-w-6xl` with `px-4/6/8`). Measured container width: **1,440 px at a 1920 viewport (was 1,152 px)**, 1,426 at 1440, 1,010 at 1024, 754 at 768, 375 at 375.
- **Line length:** About paragraphs are capped at `max-w-prose` (about 65 characters) and the Experience column at `max-w-3xl`. Section intros (`max-w-2xl`) and the hero intro (`max-w-xl`) were already capped.
- No other nested `max-w-*` restrictions needed removing. Card grids keep their column counts; at wider widths the cards simply get larger.

## Follow-up: "I don't see any parallax" (fixed)

Two causes, both fixed and then **verified in real headless Chrome** (separate temporary profile) by reading each layer's computed `translate` at several scroll positions:

1. **Too subtle.** At 12–60 px over a full screen of scrolling, the effect was technically running but easy to miss. The drift is now 140–200 px for background layers. Two solid mint/white blocks get *negative* drift, so they move faster than the page; layers moving in opposite directions make the depth obvious. Featured images now drift ±26 px at 115% scale, and the About accents 150 / 90 px.
2. **A real bug on project images.** Their frame and card used `overflow: hidden`, which creates a scroll container. That scoped the image's `view()` timeline to its own frame, so it never moved (measured: always `0px`). Switched to `overflow: clip`, which clips the same but isn't a scroll container. It now measures −26 → +26 px across the scroll.

Measured at 1440×900 in Chrome (`translate` Y; the heading scrolls normally):

| scrollY | Grid (bg) | Big circle (bg) | Mint block (fg) | Featured image |
|---|---|---|---|---|
| 0 | 15 px | 40 px | +41 px | −26 px |
| 400 | 87 px | 169 px | −52 px | −17 px |
| 800 | 140 px | 200 px | −90 px | +2 px |
| 1,600 | 140 px | 200 px | −90 px | +26 px |

The tables below list the original values; the current values are given above.

## 3. Implemented parallax effects

All effects are **scroll-linked** (position follows scroll progress), not time-based. The one-time fade-ins (`.reveal`) are a separate entrance effect and are not counted as parallax.

| Where | Layer | Movement (`--drift`) |
|---|---|---|
| Hero | Mint grid (extended 48 px past the top and bottom so the drift never exposes a gap) | 40 px |
| Hero | Large mint outline circle (right) | 50 px |
| Hero | Small rotated outline square (bottom-left, md+) | 30 px |
| Hero | Small mint block (lg+) | 60 px |
| Hero | Dashed mint frame behind the portrait (the photo itself does not move) | 20 px |
| Featured projects (4 cards) | Cover image inside its frame (card and buttons stay still) | 12 px |
| About | Large emerald outline circle | 60 px |
| Experience | Ink dot pattern (lg+) | 30 px |

**How it works:** `.parallax` runs a `drift` keyframe on `animation-timeline: view()` across the `cover` range. A layer travels from `-drift` to `+drift` while it crosses the screen, so it lags slightly behind the page, which reads as depth. Text, headings, dates, buttons and form fields never receive `.parallax`. Separate CSS properties keep effects from colliding:

| Property | Used by |
|---|---|
| `translate` | `.parallax`, `.reveal` |
| `transform` | `.anim-stamp`, `.card-lift` |
| `scale` | cover images |

No element gets two animations of the same property.

## 4. Animation approach and dependencies

- **Dependencies added: none.** JavaScript added: none. React hooks added: none. All sections remain Server Components; the client components are unchanged (Navigation, ContactForm, SqliteGallery, CopyButton, Dialog).
- Why not Motion or GSAP: neither is installed, and a few transform-only effects don't justify about 30–60 kB of JavaScript, scroll listeners or React re-renders. Native scroll-driven animations run on the compositor with no main-thread work.
- **Browser support:** wrapped in `@supports (animation-timeline: view())`. Chromium and Safari 26 animate. Browsers without support get the static layout, with no broken state and no hidden content.
- No `will-change`, no `background-attachment: fixed`, no smooth-scrolling library. Native scrolling, anchors, history and keyboard scrolling are untouched.

## 5. Reduced-motion support

Every motion rule (`.anim-stamp`, `.reveal`, `.parallax`, `.card-lift`, dialog pop) is inside `@media (prefers-reduced-motion: no-preference)`. This was **verified through the CSS object model**: each rule's ancestors include that media query. With reduced motion turned on:
- there is no parallax, no entrance movement and no hover movement;
- all content is visible immediately, because without the animation nothing starts at opacity 0;
- navigation, dialogs, the gallery and the form work unchanged.

## 6. Mobile behavior

- `.parallax` only applies from **768 px (`md`) up**. Verified: `animation-name` is `none` at 375 px and `drift` at 768 px and above. Phones get only the light one-time reveal.
- The small hero shapes are also hidden below `md`/`lg`, and the dot pattern below `lg`, so nothing decorative sits behind text on small screens.
- Nothing interactive moves with scroll at any width.

## 7. Performance comparison

Same machine, `pnpm build` before (clean `main` @ `92ef960`) and after:

| Metric | Before | After |
|---|---|---|
| `/` route JS | 9.14 kB | 9.14 kB |
| `/` first-load JS | 123 kB | 123 kB |
| Shared JS (build output) | 122 kB | 123 kB (rounding; no JS was added) |
| CSS, raw | 49,708 B | 52,685 B (+3.0 KB) |
| CSS, gzipped | 8,400 B | 8,925 B (**+0.5 KB**) |
| Scroll handlers / RAF loops | 0 | 0 |
| Page height at 1440 px | 7,845 px* | 8,306 px (wider featured images are taller) |

*From the 2.0 report. Paint metrics (LCP, CLS, INP) and scroll frame rate could not be measured, because the in-app browser pane was hidden and browsers suspend rendering, paint timing and scroll timelines for hidden pages. **Run Lighthouse on the Vercel Preview.** By construction, the LCP image (hero photo) isn't delayed: no opacity animation, and `priority` is kept. Layout isn't shifted either: all motion is transform/translate, and the decorative layers are absolutely positioned.

## 8. Testing results

| Check | Result |
|---|---|
| `pnpm lint` | ✅ 0 problems |
| `pnpm exec tsc --noEmit` | ✅ |
| `pnpm test` | ✅ 8/8 (contact route) |
| `pnpm build` | ✅ |
| `pnpm audit` | Unchanged (no dependency changes); still the one dev-only `braces` advisory with no fix |
| No horizontal overflow at 375 / 768 / 1024 / 1440 / 1920 | ✅ (0 / −14 / −14 / −14 / −14 px; −14 is the reserved scrollbar gutter) |
| Portrait never overlaps the buttons, at all five widths | ✅ |
| Decorative layers stay inside their sections | ✅ (`overflow: clip` on the hero and About, verified) |
| Parallax off on mobile, on from 768 px | ✅ |
| Motion only under `prefers-reduced-motion: no-preference` | ✅ (CSSOM check) |
| Parallax attached to a `ViewTimeline` | ✅ |
| **Parallax moving while scrolling up and down** | ⚠️ **Not observed.** The pane was hidden, so the timelines were inactive. Please scroll the Preview yourself |
| Project dialogs, contact error handling, nav anchors | Unchanged code paths, verified in 2.0. Not re-run this round |

## 9. Remaining issues and limitations

1. The visual feel of the parallax (strength and smoothness) still needs a human check on a real screen. Each layer's strength is a single `--drift` value, so tuning is a one-number edit.
2. Firefox currently ships no scroll-driven animations, so Firefox users see the static layout. That's intentional and fully usable.
3. Lighthouse, LCP, INP and scroll FPS need the Vercel Preview (see §7).

## 10. Vercel Preview readiness

- **Ready for a Preview** once you approve a commit and push of `portfolio-2.1-parallax`. Pushing a non-production branch creates a Preview only; production keeps deploying from `main`.
- No dependency, environment variable or config changes, so nothing new to set in Vercel.
- Security headers and the dependency patches from 2.0 are untouched; this diff only changes CSS and markup in 4 files.
