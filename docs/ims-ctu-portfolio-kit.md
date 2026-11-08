# IMS-CTU: portfolio kit

Assets and copy for the **Inventory Management System (IMS-CTU)** project on the portfolio site
<https://portfolio-665c.vercel.app>. This file is written as instructions: follow it step by step.

- **Project:** Inventory Management System (IMS-CTU)
- **Client / brand:** Cebu Technological University, Naga Extension Campus (Property & Supply Office)
- **Built by:** Logan M. Panucat
- **Type:** Web application, also shipped as a Windows desktop app (Electron installer `IMS-CTU-Setup-<version>.exe`)

---

## 1. What to do

1. **Copy the images.** Copy every `.png` in this folder into the portfolio repo at
   `public/image/ims-ctu/`. Rename each file to the lowercase kebab-case name in the
   **Portfolio file name** column of the image table (section 6), for example
   `04 Admin - Inventory items (desktop).png` → `04-admin-inventory-items-desktop.png`.
   This matches the existing folders `public/image/4r-lending/` and `public/image/ctu-document-tracking/`.
2. **Update the project card, don't add a second one.** The portfolio already has an
   "Inventory Management System (IMS-CTU)" card under *Systems I've built*. It currently uses
   `/image/IMS-CTU.png` and a one-line summary. Replace its image with
   `/image/ims-ctu/00-portfolio-cover.png` and its text with the card copy in section 2.
   Keep it in the same position, next to the other CTU projects (CTU Grade Sheet,
   CTU Document Tracking System, LibraSys).
3. **Build the detail page.** Copy the structure of an existing detail page/section
   (4R Lending or CTU Document Tracking System): *Key features*, *Technologies*, *Screenshots*.
   Use sections 3–6 below. Show the screenshots in the numbered order, desktop first,
   then the phone set. Use the caption and alt text from the table.
4. **Buttons.** Only the "View details" button. There is no GitHub button (see the rules in section 7).
5. Run the portfolio locally, check the card and the detail page on desktop and at 390 px wide,
   then commit in the portfolio repo.

## 2. Project card copy

| Field | Text |
|---|---|
| Badge | `CTU NAGA · WEB + DESKTOP` |
| Subtitle (mono line) | `Web & desktop application · CTU Naga Extension Campus` |
| Title | `Inventory Management System (IMS-CTU)` |
| Short summary | An inventory system for the CTU Naga Property & Supply Office: register assets with barcodes and custodians, lend items to students and faculty, print official PAR receipts and reports, and track condemned assets. |
| Tech tags | TanStack Start, React, TypeScript, Prisma, MySQL, Tailwind CSS, Electron |
| Cover image | `/image/ims-ctu/00-portfolio-cover.png` (1920×1080, 16:9) |
| Cover alt | Cover for the CTU Inventory Management System: the app on a laptop and a phone, with its key features and tech stack. |

Tech tag icons: reuse the icons the portfolio already ships (`/icons/reactquery.svg` for TanStack,
`/icons/prisma.svg`, `/icons/tailwindcss.svg`, …). Add any missing ones from Simple Icons.

## 3. Key features

- **Asset registry:** every item has a SKU, barcode, serial number, unit price, location/shelf, custodian and a condition status (Good for use, Used, Distributed, Defective, Under Maintenance, Lost, Disposed). Printable barcode property labels.
- **Dashboard:** total items, categories, total inventory value, low-stock and overdue alerts, category distribution chart and inventory trend.
- **Borrowing & returns:** check-out and check-in for students and faculty, with due dates, purpose, return condition and an official borrow receipt.
- **Distribution & transfers:** issue items to offices or people and move items between conditions, with a full history.
- **Official CTU documents:** Property Transfer Acknowledgement Receipt (PAR) with live letterhead preview, plus inventory reports as PDF, Word (DOCX), Excel and CSV.
- **Stock transactions:** stock-in, stock-out and adjustments, with before/after quantities.
- **Condemned assets:** SRN-tracked condemnation records, batch acknowledgement and printable forms.
- **Audit trail & system logs:** every create, update and stock change, with who did it and when.
- **Backup & maintenance:** one-click SQL/JSON backups, import, weekly scheduled backups and live system metrics.
- **Downloadable templates:** maintenance cards, maintenance request forms and a master inventory template.
- **Desktop build:** packaged as a Windows installer with Electron, with an automated GitHub Actions release pipeline.

## 4. Tech stack

| Layer | Technology |
|---|---|
| Framework | TanStack Start (React 19, TanStack Router, server functions), Vite, Nitro |
| Language | TypeScript |
| Database | MySQL / MariaDB via Prisma ORM (MariaDB adapter) |
| Auth | JWT sessions in an HTTP-only cookie (`jose`), bcrypt password hashing |
| UI | Tailwind CSS 4, Lucide icons, Recharts |
| Documents | html2pdf.js / html2canvas-pro (PDF), docx (Word), ExcelJS (Excel), react-barcode |
| Validation | Zod |
| Desktop | Electron + electron-builder (Windows installer), GitHub Actions release workflow |
| Testing | Vitest, Testing Library, jsdom |

## 5. Brand

Use the project's colors, not the portfolio's default green.

| Token | Hex | Where it comes from |
|---|---|---|
| Navy (base) | `#0b192c` | App sidebar / `--ctu-navy-900` |
| Navy (light) | `#1e3e62` | `--ctu-navy-800` |
| Gold | `#cea44d` | CTU seal |
| Light gold | `#e1c57e` | CTU seal |
| Amber (accent) | `#d97706` | `--ctu-gold-500` |
| Red (accent) | `#bc2b19` | CTU seal |

Logo: the CTU seal (`public/CTU Logo.png` in the IMS repo). The cover's background pattern is the seal, tiled and tinted gold, plus the sunburst rays from the seal.

## 6. Images

All screenshots are 2x. Desktop is 1440 px wide (2880×1800 file), phone is 390 px wide (780×1688 file).

| # | File in this folder | Portfolio file name | Caption | Alt text |
|---|---|---|---|---|
| 00 | `00 Portfolio cover.png` | `00-portfolio-cover.png` | IMS-CTU: inventory management for CTU Naga Extension Campus | Cover for the CTU Inventory Management System showing the app on a laptop and a phone, its four key features and its tech stack |
| 01 | `01 Landing page (desktop).png` | `01-landing-page-desktop.png` | Landing page for the Property & Supply Office system | IMS landing page with the CTU seal, "Inventory Management" title and a button to enter the administrative console |
| 02 | `02 Sign-in page (desktop).png` | `02-sign-in-page-desktop.png` | Administrator sign-in | Administrative login form with institutional email and password fields |
| 03 | `03 Admin - Dashboard overview (desktop).png` | `03-admin-dashboard-overview-desktop.png` | Dashboard with inventory totals, value and alerts | Admin dashboard showing total items, categories, total value, low stock, overdue items and a category distribution chart |
| 04 | `04 Admin - Inventory items (desktop).png` | `04-admin-inventory-items-desktop.png` | Master inventory with condition tabs and filters | Inventory table with SKUs, categories, quantities, prices and condition status tabs; custodian names are blurred |
| 05 | `05 Admin - Item specifications (desktop).png` | `05-admin-item-specifications-desktop.png` | Item details with a printable barcode label | Asset specification modal showing the item photo, description, barcode, price, location and serial number |
| 06 | `06 Admin - Add inventory item (desktop).png` | `06-admin-add-inventory-item-desktop.png` | Step-by-step item registration | Three-step "Add New Inventory Asset" form with item name, category, unit, condition and description |
| 07 | `07 Admin - Issue and distribute items (desktop).png` | `07-admin-issue-and-distribute-items-desktop.png` | Issuing items to an office or person | Distribute form with product, quantity, recipient, department, destination and purpose |
| 08 | `08 Admin - Property acknowledgement receipt (PAR) (desktop).png` | `08-admin-property-acknowledgement-receipt-par-desktop.png` | Official PAR form with live letterhead preview | Property Transfer Acknowledgement Receipt form next to a live preview of the CTU letterhead document; names are blurred |
| 09 | `09 Admin - Export inventory reports (desktop).png` | `09-admin-export-inventory-reports-desktop.png` | Export to PDF, Word, Excel or CSV | Export dialog with report title, signatories and PDF, DOCX, XLSX and CSV options |
| 10 | `10 Admin - Categories (desktop).png` | `10-admin-categories-desktop.png` | Inventory categories | Category list with icons, descriptions and item counts |
| 11 | `11 Admin - Borrowers (desktop).png` | `11-admin-borrowers-desktop.png` | Borrower directory for students and faculty | Borrower table with role and department; names, ID numbers and photos are blurred |
| 12 | `12 Admin - Borrow records (desktop).png` | `12-admin-borrow-records-desktop.png` | Borrow records with due and return dates | Borrow records table with items, check-out and return times and status; borrower names are blurred |
| 13 | `13 Admin - Check-out item (desktop).png` | `13-admin-check-out-item-desktop.png` | Checking items out to a borrower | Check-out form with borrower search, item checkout list, return date and purpose |
| 14 | `14 Admin - Borrow transaction details (desktop).png` | `14-admin-borrow-transaction-details-desktop.png` | Borrow transaction with timeline and receipt | Transaction details showing the product, borrowed/due/returned timeline, return condition and a print receipt button |
| 15 | `15 Admin - Stock transactions (desktop).png` | `15-admin-stock-transactions-desktop.png` | Stock-in, stock-out and adjustments | Stock transactions table with reference, quantity change and before/after stock |
| 16 | `16 Admin - Condemned assets (desktop).png` | `16-admin-condemned-assets-desktop.png` | Condemned assets with SRN tracking | Condemned assets list with category, quantity, original SRN, date and acknowledgement status |
| 17 | `17 Admin - Audit logs and history (desktop).png` | `17-admin-audit-logs-and-history-desktop.png` | Audit log of every inventory change | Audit history timeline of created and updated items with timestamps |
| 18 | `18 Admin - Backup and maintenance (desktop).png` | `18-admin-backup-and-maintenance-desktop.png` | Backups and live system metrics | Maintenance page with backup status, live CPU/memory chart, storage distribution and weekly activity |
| 19 | `19 Admin - Download templates (desktop).png` | `19-admin-download-templates-desktop.png` | Official form templates | Download cards for the maintenance card, maintenance request form and master inventory template |
| 20 | `20 Admin - System logs (desktop).png` | `20-admin-system-logs-desktop.png` | System logs | System log table with timestamp, action, item, admin and details |
| 21 | `21 Sign-in page (phone).png` | `21-sign-in-page-phone.png` | Sign-in on a phone | Mobile administrative login form |
| 22 | `22 Admin - Dashboard (phone).png` | `22-admin-dashboard-phone.png` | Dashboard on a phone | Mobile dashboard with stacked stat cards for items, categories, value, low stock and overdue |
| 23 | `23 Admin - Navigation menu (phone).png` | `23-admin-navigation-menu-phone.png` | Mobile navigation menu | Mobile sidebar menu grouped into Overview, Inventory, Borrowing, Asset Status and System |
| 24 | `24 Admin - Inventory items (phone).png` | `24-admin-inventory-items-phone.png` | Inventory on a phone | Mobile inventory page with stat cards, filters and action buttons |
| 25 | `25 Admin - Borrow records (phone).png` | `25-admin-borrow-records-phone.png` | Borrow records on a phone | Mobile borrow records page with status cards and a New Borrowing button |
| 26 | `26 Admin - Condemned assets (phone).png` | `26-admin-condemned-assets-phone.png` | Condemned assets on a phone | Mobile condemned assets page with totals and filters |

## 7. Rules

- **Keep the blurred images as they are.** People's names (borrowers, custodians, signatories), ID numbers and borrower photos are blurred on purpose. Don't replace them with unblurred captures, don't sharpen them, and don't crop in a way that hides the blur and shows names somewhere else. Totals, charts and layout are meant to be sharp.
- **Keep the brand colors** in section 5 for this project's cover and any accent on its detail page. Don't recolor it to the portfolio's green.
- **Don't link the repository.** `Ezgaminglogan/Inventory-Management-System-CTU-Office` is private. No GitHub button, no repo URL, no "source code" link.
- Don't put the demo sign-in credentials on the portfolio.
- "IMS Administrator" in the screenshots is the system account, not a person, so it isn't blurred.
