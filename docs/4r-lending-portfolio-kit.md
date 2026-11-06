# 4R Lending Inc. — Portfolio Screenshots

Images and copy for adding **4R Lending** as a project on the portfolio site
(https://portfolio-665c.vercel.app — Next.js). Use this file as the instructions:
copy the images, then build the project card and project page from the text below.

## What to do

1. Copy the PNGs in this folder into the portfolio repo, e.g. `public/projects/4r-lending/`.
   Rename them to web-safe names (lowercase, hyphens), e.g. `00-cover.png`, `02-admin-dashboard.png`.
2. Add **4R Lending** to the "Systems I've built" / Featured Projects list, next to NEXUS IDE,
   following the same card layout:
   - card image → `00 Portfolio cover.png`
   - badge, subtitle, title, summary and tech tags → from **Project card** below
3. On the project's detail page, use **Features**, **Tech stack** and the **Screenshots** table
   (in that order; captions and alt text are given).
4. Keep the images exactly as they are: client names, staff names, ID numbers, member codes
   and ID photos are **blurred on purpose** (real client data). Do not replace them with unblurred captures.

## Project card

- **Badge:** Client project · Private
- **Subtitle:** Web application · 4R Lending Company Inc. (Cebu, Region VII)
- **Title:** 4R Lending
- **Summary:** A microfinance loan and collection system for field centers in Cebu — client
  registration with National ID scanning, weekly collection sheets, loan releases with printed
  vouchers, PAR aging and daily cut-off reports. Runs offline on the office PC and is reached
  from other computers and phones on the same network.
- **Tech tags:** C# / .NET 10 · Blazor Server · MySQL / MariaDB · EF Core · Tailwind CSS ·
  QuestPDF · PaddleOCR · GitHub Actions

## Features

- **Weekly collection sheets** — encode and post a whole center's payments at once; rows lock
  when a week is already paid, and two computers can't post the same sheet twice.
- **Client registration with ID scanning** — reads the Philippine National ID QR code (and other
  ID barcodes) from the camera, offline; offline OCR reads the address from the front of the card
  and fills Province, City and Barangay.
- **Loan releases** — release desk with backdating approval, official voucher numbers, and a
  printable 4-page release packet (cash voucher, disclosure statement, amortization schedule).
- **Bulk printing** — print selected or all cash vouchers, and an ID Photo Book of every client's
  ID by center, with an in-app print preview.
- **Reports** — PAR aging (CGAP buckets), 17-column collection ledger, 24-hour cut-off and
  end-of-day remittance with admin review.
- **Maker–checker approvals** — encoder corrections, payment adjustments and refunds need admin
  approval; everything is written to an audit trail.
- **Live updates** — screens refresh when another computer posts or approves.
- **One-file Windows launcher** — self-updating from GitHub Releases, tray icon, built-in backup
  and database tools.

## Tech stack

| Area | Used |
|------|------|
| App | C# / .NET 10, Blazor Server (interactive), Tailwind CSS v4 |
| Data | MySQL / MariaDB (XAMPP), Entity Framework Core migrations |
| Documents | QuestPDF (vouchers, reports), ClosedXML (Excel) |
| ID scanning | zxing-wasm (QR / barcodes), PaddleOCR on ONNX Runtime Web — all offline |
| Delivery | Single self-contained launcher exe, GitHub Actions releases, auto-update |
| Tests | xUnit, bUnit, Moq |

## Screenshots

| File | Caption | Alt text |
|------|---------|----------|
| `00 Portfolio cover.png` | 4R Lending — microfinance loan & collection system | 4R Lending cover: logo, title, features and the app on a laptop and phone |
| `01 Sign-in page (desktop).png` | Branded sign-in page | 4R Lending sign-in page on desktop |
| `01 Sign-in page (phone).png` | Sign-in on a phone | 4R Lending sign-in page on a phone |
| `02 Admin - Executive dashboard.png` | Executive dashboard with daily cut-off | Admin dashboard with portfolio totals and the 24-hour cut-off sheet |
| `03 Admin - PAR aging risk report.png` | Portfolio-at-risk aging (CGAP buckets) | PAR aging report with charts |
| `04 Admin - Collection ledger.png` | 17-column collection ledger | Weekly collection ledger table |
| `05 Admin - Approvals and end-of-day.png` | Maker–checker approvals and EOD review | Approvals hub with request counts |
| `06 Admin - Centers and routes.png` | Centers and collection routes | List of collection centers by route day |
| `07 Admin - ID Photo Book.png` | ID Photo Book by center | Clients' ID photos grouped by center (names blurred) |
| `08 Admin - Print Vouchers.png` | Bulk voucher printing | Print Vouchers page with filters |
| `09 Encoder - Dashboard.png` | Encoder command center | Encoder dashboard with daily routine and totals |
| `10 Encoder - Client and loan desk.png` | Client & loan desk | Client registration and loan desk |
| `11 Encoder - Weekly collection sheet.png` | Weekly collection sheet | Batch payment entry for a center |
| `12 Encoder - Reports and cut-off.png` | Reports and daily cut-off | Encoder reports and end-of-day page |
| `13 Encoder - Dashboard (phone).png` | Works on phones | Encoder dashboard on a phone |

## Notes

- Cover: 1920 × 1080 (16:9), same shape as the NEXUS IDE card image. Colors are the 4R brand
  (maroon `#8B0D0D`, gold `#E3B341` on near-black) — keep them; don't recolor to the portfolio's green.
- Screenshots were taken from the live system at 2× resolution (desktop 1440 px wide, phone 390 px wide).
- The source code is private (client project): don't link a public repository.
