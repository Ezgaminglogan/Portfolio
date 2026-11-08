# LibraSys — Portfolio Kit

Everything needed to show **LibraSys** (library management system for CTU Naga Extension Campus) on
Logan M. Panucat's portfolio: <https://portfolio-665c.vercel.app>.

This file is written as instructions. Another AI or a developer should be able to follow it without
opening the LibraSys source code.

---

## 1. What to do

The portfolio **already has a LibraSys card** (it uses the single image `/image/LibraSys.png`).
Upgrade that card in place. Do not add a second LibraSys card.

1. **Copy the images.** Copy every `.png` in this folder into the portfolio repo at
   `public/image/librasys/`, renaming each file to the slug in the "Portfolio file name" column of the
   image table (section 6). This matches the other projects, e.g. `public/image/ims-ctu/00-portfolio-cover.png`.
2. **Update the project card.** Find the existing LibraSys entry in the portfolio's project data and
   update it with the card text in section 2. Change its image from `/image/LibraSys.png` to
   `/image/librasys/00-portfolio-cover.png`. Keep it in the same place in the "Featured projects" grid,
   next to CTU Document Tracking System and Inventory Management System (IMS-CTU).
   You can delete the old `/image/LibraSys.png` once nothing references it.
3. **Build the detail page.** Use the same detail-page layout as the other projects (IMS-CTU is the
   closest match: a CTU web app with desktop and phone shots). Fill it from sections 3–6:
   summary, features, tech stack, then the screenshot gallery in the order of the image table,
   using the captions and alt text given.
4. Run the portfolio locally, open the home page and the LibraSys detail page at desktop and phone
   widths, and check that every image loads and the card lines up with its neighbours.

## 2. Project card text

| Field | Text |
|---|---|
| Badge | `CTU NAGA · WEB APP` |
| Subtitle (eyebrow) | Web application · CTU Naga Extension Campus |
| Title | LibraSys |
| Short summary | A library management system for CTU Naga Extension Campus: catalog books and research manuscripts, keep student records, check books out and in with due dates, and see circulation in charts and Excel reports. |
| Tech tags | TanStack Start, React, TypeScript, Prisma, MySQL, Tailwind CSS, Recharts |
| Card image | `/image/librasys/00-portfolio-cover.png` |
| Card image alt | LibraSys cover: CTU seal, title, four features and the admin dashboard in a laptop and phone frame |
| Buttons | View details · GitHub → `https://github.com/Ezgaminglogan/LibraSys-CTU` (public repo) |

## 3. Detail page summary

LibraSys is the library system for the CTU Naga Extension Campus library. A librarian signs in to an
admin portal that holds the campus collection — mostly bound research manuscripts and theses, sorted by
department (Education, Technology), program and shelf — together with the student roster. From there
they check one or several books out to a student with a borrow date and due date, mark them returned,
and see overdue items flagged automatically. The dashboard charts the last week of borrowing and
returns, and the reports page breaks students down by department, ranks the most borrowed titles and
exports students, books and borrow records to Excel. Books and students can be bulk-imported from the
library's existing Excel records. It works on desktop and phone, in light or dark mode.

## 4. Features

- **Book and manuscript catalog** — title, multiple authors, ISBN/accession number, department,
  program, category, publication year, copies and shelf location; search and filter by category, year,
  department and program; live availability per title.
- **Excel import** — bulk-load books/research and students from `.xlsx`/`.xls` files using the
  library's existing record format.
- **Student records** — student ID, course, year level and research-title / bookbinding requirements,
  with active status and per-student detail view.
- **Borrowing and returns** — check out several books to a student at once with borrow and due
  date/time, one-click returns, overdue tracking, and counts of active, overdue and returned-today loans.
- **Dashboard** — totals for students, books, borrowed and overdue items, a 7-day borrowing/return
  activity chart, books by category, and a recent activity feed.
- **Reports and exports** — students by department and program, top 10 borrowed titles, and Excel
  exports of students, books and borrow records.
- **Secure admin sign-in** — bcrypt-hashed passwords and JWT sessions with "remember me".
- **Responsive with dark mode** — collapsible sidebar on phones; light/dark theme saved per browser.

## 5. Tech stack

| Layer | Technology |
|---|---|
| Framework | TanStack Start (full-stack React, server functions), TanStack Router, TanStack Query |
| UI | React 19, TypeScript, Tailwind CSS 4, shadcn/ui (Radix), Lucide icons, Sonner toasts |
| Charts | Recharts |
| Data | Prisma ORM 7 (MariaDB adapter), MySQL / MariaDB |
| Auth | bcryptjs password hashing, JSON Web Tokens |
| Excel | SheetJS (`xlsx`) for import and export |
| Tooling | Vite 7, Vitest, ESLint, Prettier, pnpm |

## 6. Images

All screenshots are 2× resolution: desktop at 1440 px wide (2880×1800 files), phone at 390 px wide
(780×1688 files). The cover is 1920×1080.

| # | File in this folder | Portfolio file name | Caption | Alt text |
|---|---|---|---|---|
| 00 | `00 Portfolio cover.png` | `00-portfolio-cover.png` | LibraSys for CTU Naga Extension Campus | LibraSys cover: CTU seal, title, four features and the admin dashboard in a laptop and phone frame |
| 01 | `01 Landing page (desktop).png` | `01-landing-page-desktop.png` | Landing page with live library counts | LibraSys landing page with the CTU seal, administrator login button and counts of books, students, borrowed and returned |
| 02 | `02 Administrator sign-in (desktop).png` | `02-administrator-sign-in-desktop.png` | Administrator sign-in | Administrator login dialog with email, password and remember-me fields |
| 03 | `03 Admin - Dashboard overview (desktop).png` | `03-admin-dashboard-overview-desktop.png` | Dashboard overview | Admin dashboard with totals for students, books, borrowed and overdue items, a 7-day borrowing chart and books by category |
| 04 | `04 Admin - Dashboard recent activity (desktop).png` | `04-admin-dashboard-recent-activity-desktop.png` | Recent borrow and return activity | Recent activity table of borrowed and returned books, with student names blurred |
| 05 | `05 Admin - Book catalog (desktop).png` | `05-admin-book-catalog-desktop.png` | Book and manuscript catalog | Book management table with title, ISBN, department, category, year, availability and status; author names blurred |
| 06 | `06 Admin - Add new book (desktop).png` | `06-admin-add-new-book-desktop.png` | Adding a book or manuscript | Add New Book form with title, department, author slots, ISBN, category, program, year, copies and shelf |
| 07 | `07 Admin - Import books from Excel (desktop).png` | `07-admin-import-books-from-excel-desktop.png` | Importing books from Excel | Import Books/Research from Excel dialog listing the expected columns and an upload area |
| 08 | `08 Admin - Student records (desktop).png` | `08-admin-student-records-desktop.png` | Student records | Student management table with course, year, requirements and status; names and student IDs blurred |
| 09 | `09 Admin - Student details (desktop).png` | `09-admin-student-details-desktop.png` | Student details | Student detail dialog with age, status, program and year level; name and ID blurred |
| 10 | `10 Admin - Add new student (desktop).png` | `10-admin-add-new-student-desktop.png` | Registering a student | Register New Student form with personal information and program choices grouped by department |
| 11 | `11 Admin - Import students from Excel (desktop).png` | `11-admin-import-students-from-excel-desktop.png` | Importing students from Excel | Import Students from Excel dialog listing the expected columns and an upload area |
| 12 | `12 Admin - Borrowing and returns (desktop).png` | `12-admin-borrowing-and-returns-desktop.png` | Borrowing and returns | Borrowing management with active, overdue and returned-today counts and a loan table with return buttons; borrower names blurred |
| 13 | `13 Admin - Check out a book (desktop).png` | `13-admin-check-out-a-book-desktop.png` | Checking out books | Check Out Books dialog with student search, multi-book selection and borrow/due date and time |
| 14 | `14 Admin - Reports and analytics (desktop).png` | `14-admin-reports-and-analytics-desktop.png` | Reports and analytics | Reports page with totals, Excel export buttons and charts of students by department and books by category |
| 15 | `15 Admin - Top borrowed books report (desktop).png` | `15-admin-top-borrowed-books-report-desktop.png` | Top borrowed titles and department breakdown | Top borrowed books list and student counts per program in each department; author names blurred |
| 16 | `16 Admin - Dashboard in dark mode (desktop).png` | `16-admin-dashboard-in-dark-mode-desktop.png` | Dark mode | Admin dashboard in dark mode |
| 17 | `17 Landing page (phone).png` | `17-landing-page-phone.png` | Landing page on a phone | LibraSys landing page on a phone |
| 18 | `18 Administrator sign-in (phone).png` | `18-administrator-sign-in-phone.png` | Sign-in on a phone | Administrator login dialog on a phone |
| 19 | `19 Admin - Dashboard overview (phone).png` | `19-admin-dashboard-overview-phone.png` | Dashboard on a phone | Admin dashboard summary cards stacked on a phone |
| 20 | `20 Admin - Navigation menu (phone).png` | `20-admin-navigation-menu-phone.png` | Navigation menu on a phone | Slide-out admin menu with Dashboard, Books, Students, Borrowing and Reports |
| 21 | `21 Admin - Dashboard recent activity (phone).png` | `21-admin-dashboard-recent-activity-phone.png` | Recent activity on a phone | Recent activity list on a phone, with student names blurred |
| 22 | `22 Admin - Book catalog (phone).png` | `22-admin-book-catalog-phone.png` | Book catalog on a phone | Book management totals and search on a phone |
| 23 | `23 Admin - Student records (phone).png` | `23-admin-student-records-phone.png` | Student records on a phone | Student management totals and search on a phone |
| 24 | `24 Admin - Borrowing and returns (phone).png` | `24-admin-borrowing-and-returns-phone.png` | Borrowing on a phone | Borrowing management with check-out button and loan counts on a phone |
| 25 | `25 Admin - Reports and analytics (phone).png` | `25-admin-reports-and-analytics-phone.png` | Reports on a phone | Reports and analytics totals on a phone |
| 26 | `26 Admin - Top borrowed books report (phone).png` | `26-admin-top-borrowed-books-report-phone.png` | Department breakdown on a phone | Student counts per program for the Education and Technology departments on a phone |

## 7. Rules

- **Keep the blurred images exactly as they are.** Student names, student IDs and thesis author names
  are real people and are blurred on purpose. Do not re-capture, sharpen, crop the blur away or
  replace these images with unblurred versions. The account shown (`System Administrator`,
  `admin@librasys.edu`) is the seed demo account, not a real person.
- **Keep the brand colors.** The cover uses the CTU seal's colors, not the portfolio's green theme:
  deep red `#5c0606` / `#8e0b0b` background, seal red `#b3080b`, gold `#d8af3b`, laurel green `#2e7d32`,
  cream card `#fdf8ec`. Don't recolor the cover or restyle it to the portfolio palette.
- **Repo link.** The LibraSys repo (`Ezgaminglogan/LibraSys-CTU`) is public, so the GitHub button is fine.
  Never link a private repository; if the repo is ever made private, remove the button.
- Borrowing numbers in the screenshots come from demo loan records added to a local copy of the
  database for these captures. Don't describe them as real library statistics.
- Use the alt text from the table; don't leave images without alt text.
