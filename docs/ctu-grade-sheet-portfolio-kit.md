# CTU Grade Sheet — portfolio kit

Instructions for adding **CTU Grade Sheet** to the portfolio at <https://portfolio-665c.vercel.app>.
Follow them in order. Everything you need is in this folder.

## What to do

1. **Copy the images** into the portfolio repo at `public/image/ctu-grade-sheet/`.
   Rename them to kebab-case like the other projects (for example `00 Portfolio cover.png` → `00-cover.png`,
   `03 Faculty - Grade sheet (lecture + laboratory) (desktop).png` → `03-grade-sheet-desktop.png`).
   The "Image" table below gives every file a suggested name.
2. **Add the project card** next to the other projects (same component and layout as the NEXUS IDE card:
   cover image on one side, text on the other). Use the text under "Project card" and `00-cover.png` as its image.
3. **Build the detail page** for the project, like the existing project detail pages: summary, the four features,
   the tech stack table, then the screenshots as a gallery with the captions and alt text below
   (desktop shots first, then the phone shots).

## Rules

- **Keep the blurred images exactly as they are.** Student names, ID numbers and staff names are blurred on purpose
  (real people). Do not re-capture, sharpen, crop out or replace them with unblurred versions.
- **Keep the brand colors** of this project: CTU maroon `#7a0000` (deep `#380202`) and gold `#d9a441`
  (light `#f1cf86`). Don't recolor the cover or project assets to the portfolio's palette.
- **Don't link a repository.** The source is private. A "Download" link to the public release page is fine
  only if the owner says so; otherwise show no code or repo link.
- Don't invent features or numbers that are not listed here.

## Project card

| Field | Text |
|---|---|
| Badge | `v1.0.17 released` |
| Subtitle | Desktop application · CTU Naga Extension Campus |
| Title | CTU Grade Sheet |
| Short summary | An offline faculty portal for Cebu Technological University: class records with lecture and laboratory GWA, official ROForm 15-B grade sheets, and course syllabi dated on the university calendar, all in one Windows app. |
| Tech tags | Laravel · PHP · Vue 3 · TypeScript · Inertia · Tailwind CSS · SQLite · Electron |

## Features

1. **Grade sheet matrix** — enter scores per activity and date; lecture, laboratory and consolidated final grades
   and a separate Lecture GWA and Laboratory GWA are computed live with the CTU transmutation table.
2. **Official exports** — fills the university's own templates: ROForm 15-B and GradeSheet Summary (Excel),
   class record (DOCX/PDF) and the INSForm 1a/1b course syllabus (DOCX).
3. **Syllabus generator** — the faculty enters topics and hours; the app places each topic on real class meetings
   using the course schedule and the university calendar (holidays, intramurals, exam weeks). Faculty can also
   upload their own Word syllabus, which fills the topics and details automatically, and view it in the app.
4. **Offline and safe** — a Windows desktop app with a local SQLite database, automatic daily snapshots,
   safety backups before risky actions, and one-click restore.

Also: class analytics dashboard (passing rate, grade distribution, category performance, attendance),
official signatories per course, a locked global grading policy, roster import from Excel, and semester rollover.

## Tech stack

| Layer | Technology |
|---|---|
| Backend | Laravel 13 (PHP 8.3) |
| Frontend | Vue 3 + TypeScript, Inertia.js v3 |
| Styling | Tailwind CSS 4 |
| Database | SQLite (local, one file, backed up automatically) |
| Desktop | Electron 39, Windows installer and portable build |
| Documents | Office Open XML filled in place (Excel and Word templates), docx-preview for viewing |
| Build and tests | Vite 8, Pest (274 tests) |

## Images

| File in this folder | Suggested name | Caption | Alt text |
|---|---|---|---|
| 00 Portfolio cover.png | 00-cover.png | CTU Grade Sheet on a laptop and a phone | CTU Grade Sheet cover: maroon and gold poster with the CTU seal, four features, the tech stack, and the app shown on a laptop and a phone |
| 01 Sign-in page (desktop).png | 01-sign-in-desktop.png | Sign in with the faculty password | CTU Grade Sheet sign-in page on desktop |
| 02 Faculty - My courses (desktop).png | 02-my-courses-desktop.png | All classes for the semester, grouped by year and section | My Courses page listing subjects grouped by year level and day or evening sections, with totals for subjects, sections, students and activities |
| 03 Faculty - Grade sheet (lecture + laboratory) (desktop).png | 03-grade-sheet-desktop.png | Laboratory grade sheet with its rubric | Grade sheet for a laboratory component with grading categories, activity columns and blurred student names |
| 04 Faculty - Grade sheet consolidated final (desktop).png | 04-consolidated-final-desktop.png | Consolidated final: lecture and laboratory grades side by side | Consolidated final view with midterm and final grades for lecture and laboratory and a separate lecture GWA, student names blurred |
| 05 Faculty - Class analytics and charts (desktop).png | 05-analytics-desktop.png | Class analytics at a glance | Analytics dashboard with passing rate, class average, enrollment, grade distribution chart and class standing |
| 06 Faculty - Course syllabus generator (desktop).png | 06-syllabus-generator-desktop.png | Topics placed on real class dates | Course syllabus page with topics, hours, computed weeks and dates, and warnings when hours do not fit |
| 07 Faculty - Own syllabus file viewer (desktop).png | 07-syllabus-viewer-desktop.png | The faculty's own Word syllabus, viewed in the app | An uploaded Word course syllabus displayed inside the app |
| 08 Faculty - Official signatories (desktop).png | 08-signatories-desktop.png | Signatories printed on every official form | Signature block settings with designations and a live print preview, names blurred |
| 09 Faculty - Global grading policy (desktop).png | 09-grading-policy-desktop.png | One locked grading policy for every course | Global grading policy page with lecture and laboratory category weights |
| 10 Faculty - Academic calendar (desktop).png | 10-academic-calendar-desktop.png | University calendar: holidays and exam weeks | Academic calendar settings with class period, no-class days and exam weeks |
| 11 Faculty - Backups and restore (desktop).png | 11-backups-desktop.png | Automatic snapshots and one-click restore | Backups and restore dialog listing daily and safety snapshots with download and restore buttons |
| 12 Sign-in page (phone).png | 12-sign-in-phone.png | Sign-in on a phone | CTU Grade Sheet sign-in page on a phone |
| 13 Faculty - My courses (phone).png | 13-my-courses-phone.png | Courses on a phone | My Courses page on a phone with semester totals |
| 14 Faculty - Grade sheet (phone).png | 14-grade-sheet-phone.png | Grade sheet on a phone | Grade sheet controls and component tabs on a phone |
| 15 Faculty - Class analytics (phone).png | 15-analytics-phone.png | Analytics on a phone | Class analytics dashboard on a phone |
| 16 Faculty - Course syllabus (phone).png | 16-syllabus-phone.png | Syllabus on a phone | Course syllabus page on a phone |

Desktop shots are 1440 px wide and phone shots 390 px wide, both captured at 2x (2880 px and 780 px files).
The cover is 1920 × 1080 (16:9).
