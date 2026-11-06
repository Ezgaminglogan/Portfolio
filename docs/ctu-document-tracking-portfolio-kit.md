# CTU Document Tracking System — portfolio kit

Instructions for adding this project to Logan M. Panucat's portfolio
(https://portfolio-665c.vercel.app). Written so another developer or AI can follow it
without asking questions.

## What to do

1. **Copy the images** in this folder into the portfolio repo, next to the other project
   images (the portfolio serves them from `public/image/`). Use a project subfolder, e.g.
   `public/image/ctu-document-tracking/`. You may rename files to kebab-case
   (`00-portfolio-cover.png`, …), but do not edit, crop or re-compress the pixels.
2. **Add the project card** in the *Featured projects* section, next to the other
   CTU Naga Extension Campus projects (right after **CTU Faculty Grade Sheet**, the other
   desktop app). Copy the structure of the existing cards exactly: image on top (16:9),
   mono meta line, title, badge, summary, tech chips, "View details" button.
   Use `00 Portfolio cover.png` as the card image.
3. **Build the detail page** the same way the other projects' detail pages are built:
   hero with the cover, summary, the features list, the tech stack table, then the
   screenshot gallery in the order of the image table below, each with its caption and alt text.

## Project card text

| Field | Text |
|---|---|
| Subtitle (mono meta line) | `Desktop application · CTU Naga Extension Campus` |
| Title | `CTU Document Tracking System` |
| Badge | `Windows installer (setup.exe)` |
| Short summary | A desktop logbook for CTU Naga Extension Campus offices to record incoming and outgoing communications, search them instantly, and print official PDF reports and routing slips. |
| Tech tags | `Electron` · `TypeScript` · `Vite` · `TailwindCSS` · `jsPDF` · `Lucide` |

For the tag icons, use the same icon source the portfolio already uses for its chips
(Simple Icons for Electron, TypeScript, Vite, TailwindCSS and Lucide; jsPDF has no brand
icon, so use Lucide `file-text`).

## Features

- **Incoming & outgoing communications log**: every document received or released is logged with
  type, date and time, bearer (who handed it over or claimed it), target office, subject and classification.
- **Dashboard with live counters**: total, incoming, outgoing and internal-campus counts; each card is
  a one-click filter.
- **Search and scope filters**: instant search across subject, bearer, office, date and classification,
  plus tabs for Incoming/Outgoing and scope pills (Within CTU Naga, Across Campuses, External).
- **Official PDF exports**: a landscape communications log report and a portrait Document Transmittal &
  Routing Slip, both on the CTU letterhead with the campus seals and page numbering.
- **Office profiles**: each office (Dean of Instruction, Campus Director, Registrar, Accounting,
  Research & Extension, College of Technology, or custom) sets its own letterhead title and default staff.
- **Offline and crash-safe storage**: local JSON files written atomically (temp file, then rename) with a
  rolling `.bak` backup that is used automatically if the main file is ever corrupted.
- **Desktop polish**: CTU-branded splash screen, keyboard shortcuts (Ctrl+N new record, Ctrl+P export,
  `/` search, Esc close), single-instance lock, and a Windows `setup.exe` installer that adds Desktop and
  Start Menu shortcuts.
- **CTU visual identity**: crimson and gold from the university seal, laurel green for incoming,
  campus-building royal blue for outgoing, frosted-glass panels over the Naga campus photo.

## Tech stack

| Layer | Technology | Used for |
|---|---|---|
| Desktop shell | Electron | Windows desktop app, main/renderer processes, secure preload bridge (context isolation) |
| Language | TypeScript | Main process, preload and renderer code |
| Build | Vite + Electron Forge | Dev server, bundling, packaging |
| Installer | electron-builder (NSIS) | `setup.exe` install wizard and portable `.exe` |
| Styling | Tailwind CSS v4 | CTU theme tokens (crimson, gold, green, blue), glass UI |
| PDF | jsPDF + jsPDF-AutoTable | Log reports and transmittal routing slips |
| Icons | Lucide | Interface icons |
| Storage | Local JSON (Node `fs`) | Atomic writes with rolling backups, no server or internet needed |

## Images

All screenshots are 2x resolution. Desktop app only, so there are no phone screenshots.
The app shots are 2880×1800 (1440×900 window); the splash is 1280×800; the PDFs are rendered pages.

| File | Caption | Alt text |
|---|---|---|
| `00 Portfolio cover.png` | CTU Document Tracking System: a Windows desktop logbook for CTU Naga Extension Campus. | Cover showing the CTU seal, project title, four key features and tech chips beside the app's dashboard in a laptop frame and a printed routing slip. |
| `01 Splash screen (desktop).png` | Branded splash screen shown while the app starts. | CTU splash screen with the university seal, campus name and a loading bar at 100%. |
| `02 Dashboard - All communications (desktop).png` | Dashboard with live counters and the full communications log. | Dashboard with total, incoming, outgoing and internal counters above a table of logged communications; people's names are blurred. |
| `03 Incoming communications log (desktop).png` | Incoming tab: documents received by the office. | Communications table filtered to incoming records; people's names are blurred. |
| `04 Outgoing communications log (desktop).png` | Outgoing tab: documents released by the office. | Communications table filtered to outgoing records; people's names are blurred. |
| `05 Search and scope filter (desktop).png` | Search combined with the External scope filter. | Search box containing "request" with the External scope selected, showing one matching record. |
| `06 New communication entry form (desktop).png` | Logging a new incoming communication. | Communication entry form with type, date, time, bearer, receiving office, subject and classification fields; the bearer's name is blurred. |
| `07 Edit outgoing record (desktop).png` | Editing a record; labels switch for outgoing documents. | Edit form for an outgoing record with "Released To / Claimed By" and "Originating Office" fields; the name is blurred. |
| `08 Delete confirmation (desktop).png` | Delete confirmation with a record preview. | Confirmation dialog showing the record's tracking ID, type, subject and date before deletion; the bearer's name is blurred. |
| `09 Office profile settings (desktop).png` | Office profile: letterhead and default staff per office. | Office settings form with preset office, name, acronym, default staff, PDF letterhead title and campus. |
| `10 PDF export - Communications log report.png` | Exported PDF log report on the official CTU letterhead. | Landscape PDF report with CTU and Bagong Pilipinas logos, office letterhead and a table of 12 communications; names are blurred. |
| `11 PDF export - Transmittal routing slip.png` | Exported Document Transmittal & Routing Slip. | Portrait routing slip with record details, action directive checkboxes, remarks box and signature lines; names are blurred. |
| `12 Developer information (desktop).png` | About the developer. | Developer card with Logan M. Panucat's photo, system details, keyboard shortcuts and links. |

## Rules

- **Keep the blurred images exactly as they are.** Names of bearers and recipients are blurred on purpose.
  Do not replace them with unblurred versions, re-capture them, or "clean up" the blur.
- **Keep the brand colors.** This project uses CTU's colors (crimson `#7a1217`, gold `#f0b92f`,
  green `#348f38`, blue `#2549e0`), not the portfolio's green. The card frame and layout follow the
  portfolio; the images keep CTU's colors.
- **Don't link the source repository.** Link only to the portfolio detail page.
- The records in the screenshots are sample data created for these captures; describe them as
  "sample records" if asked, never as real office data.
- Don't commit this folder to the CTU Document Tracking System repo. It's only a hand-off to the portfolio repo.
