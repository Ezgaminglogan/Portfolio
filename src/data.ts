import type {
  Certificate,
  EducationItem,
  ExperienceItem,
  Project,
  Screenshot,
  SkillGroup,
} from "@/types";

/*
 * Content rules: only facts that already appeared on the site, in a linked repo,
 * in a screenshot, or on a certificate. Leave optional fields empty rather than
 * guessing (see docs/PORTFOLIO_IMPLEMENTATION_REPORT.md for what still needs input).
 */

const shots =
  (dir: string) =>
  (file: string, alt: string, caption: string, width: number, height: number): Screenshot => ({
    src: `/image/${dir}/${file}`,
    alt,
    caption,
    width,
    height,
  });
const nexus = shots("nexus-ide");
const lending = shots("4r-lending");
const gradeSheet = shots("ctu-grade-sheet");
const docTracking = shots("ctu-document-tracking");
const ims = shots("ims-ctu");
const librasys = shots("librasys");

export const projects: Project[] = [
  {
    // Source: docs/nexus-ide-portfolio-kit.md and the public repo (9 releases verified on GitHub).
    title: "NEXUS IDE",
    featured: true,
    flagship: true,
    label: "Open source · MIT",
    summary:
      "An offline coding classroom for phones and lab PCs: write, run and learn C, Python, Java, C#, Web, PHP, SQL, Arduino and Raspberry Pi on Android or Windows, with no internet needed.",
    description: [
      "Many students at CTU Naga Extension Campus learn to program on shared lab PCs or their own phones, often without a reliable internet connection. NEXUS IDE puts a complete coding classroom into one free app that works offline on Android and Windows.",
      "Students pick a workspace, write code in a syntax-highlighted editor and press Run. The compilers are bundled inside the app, so C, Python, Java, C#, PHP with MariaDB, and Arduino (uploaded to a real board over USB OTG) all run on the device.",
      "Learn & Practice turns the IDE into a classroom: 75 lessons across nine tracks, 90 quiz questions and 27 exercises that NEXUS checks by actually running the student's code against test cases.",
    ],
    features: [
      "9 workspaces: C, Python, Java, C#, Web, PHP + MySQL, Database (SQLite or MySQL), Arduino and Raspberry Pi",
      "Fully offline: compilers and runtimes bundled for Android and Windows",
      "Code editor with syntax highlighting, auto-indent, autocomplete, Format and a coding key bar for phones",
      "Full-screen terminal on phones with an input bar for interactive programs",
      "XAMPP-style htdocs projects at localhost/<project>/ with offline tech-stack templates",
      "Arduino compile and upload over USB OTG with a Serial Monitor",
      "Raspberry Pi GPIO simulator on an interactive 3D Raspberry Pi 3",
      "Learn & Practice: 75 lessons, 90 quiz questions, 27 auto-checked exercises",
      "Self-updating from GitHub Releases with SHA-256 checksum verification",
    ],
    tech: ["Flutter", "Dart", "Android", "Windows", "Python", "PHP", "SQLite"],
    stats: [
      { value: "9", label: "workspaces" },
      { value: "75", label: "lessons" },
      { value: "27", label: "auto-checked exercises" },
      { value: "9", label: "releases" },
    ],
    images: [
      nexus("00-cover.png", "NEXUS IDE running on a Windows PC and an Android phone", "NEXUS IDE on Windows and Android: one offline coding classroom.", 1920, 1080),
      nexus("01-home-desktop.png", "NEXUS IDE home screen on a PC with nine workspace tiles", "Home on a lab PC: nine workspaces, each with what you can build and where it runs.", 1440, 1240),
      nexus("02-editor-and-terminal-desktop.png", "Python program in the editor with a docked terminal on Windows", "Python running on Windows: the editor with a file explorer and a docked terminal showing the program's output and exit status.", 1600, 900),
      nexus("03-home-phone.png", "NEXUS IDE home screen on an Android phone", "The same home screen on an Android phone.", 1072, 2379),
      nexus("04-full-screen-terminal-phone.png", "Full-screen terminal with an input bar on a phone", "On phones, Run opens a full-screen terminal. Interactive programs read input from the bar above the keyboard.", 1072, 2379),
      nexus("05-learn-lesson.png", "Learn & Practice lesson with highlighted syntax", "Learn & Practice: a lesson with search, topics, highlighted syntax and runnable examples.", 1600, 1000),
      nexus("06-learn-databases-track.png", "Databases learning track with a SQLite or MySQL choice", "The Databases track: pick SQLite or MySQL and every lesson adapts. The runtime badge shows what runs your code.", 1400, 1000),
      nexus("07-htdocs-projects.png", "List of PHP and Web projects in htdocs", "PHP and Web projects the XAMPP way: folders in htdocs, opened at localhost/project/.", 1400, 900),
      nexus("08-tech-stacks.png", "New project dialog with tech stack templates", "Start a project from a tech stack: Bootstrap, PHP + MySQL, PHP + SQLite, or a full CRUD app.", 1400, 1000),
      nexus("09-sql-on-sqlite-phone.png", "SQL query results shown as a table on a phone", "SQL on a phone: SQLite runs offline and prints results as tables.", 1072, 2379),
      nexus("10-raspberry-pi-3d.png", "Raspberry Pi simulator on a 3D Raspberry Pi 3 model", "The Raspberry Pi simulator on a 3D Raspberry Pi 3 you can turn, with live GPIO pins. 3D model: “Raspberry Pi 3” by JoSaCo (Sketchfab), CC BY 4.0.", 900, 420),
      nexus("11-new-file-starter-code.png", "New file dialog with starter code preview", "New files start with the right starter code for their type and role, with a preview.", 1400, 900),
      nexus("12-checked-exercise.png", "Exercise result checked against test cases", "Exercises are checked by running the student's code against real test cases.", 1600, 1000),
    ],
    kind: "Cross-platform application",
    context: "CTU Naga Extension Campus",
    status: "v1.1.7 released",
    role: "Sole developer: product idea, UI/UX, the Flutter app, packaging offline toolchains for Android and Windows, the Learn & Practice curriculum and its automatic checking, testing, and nine public releases (v1.0.0 to v1.1.7).",
    githubUrl: "https://github.com/Ezgaminglogan/nexus-ide",
    downloadUrl: "https://github.com/Ezgaminglogan/nexus-ide/releases/latest",
    matte: "linear-gradient(#0f1424, #192137)",
  },
  {
    // Source: docs/4r-lending-portfolio-kit.md. Client project: private source, no repo link;
    // client names, IDs and photos in the screenshots are blurred on purpose.
    title: "4R Lending",
    featured: true,
    flagship: true,
    label: "Client project · Private",
    summary:
      "A microfinance loan and collection system for field centers in Cebu: client registration with National ID scanning, weekly collection sheets, loan releases with printed vouchers, PAR aging and daily cut-off reports. Runs offline on the office PC and is reached from other computers and phones on the same network.",
    features: [
      "Weekly collection sheets: post a whole center's payments at once; paid weeks lock, and two computers can't post the same sheet twice",
      "Client registration with offline ID scanning: reads the Philippine National ID QR code and other ID barcodes, and offline OCR fills the address",
      "Loan releases with backdating approval, official voucher numbers and a printable 4-page release packet",
      "Bulk printing of cash vouchers and an ID Photo Book by center, with print preview",
      "Reports: PAR aging (CGAP buckets), 17-column collection ledger, 24-hour cut-off and end-of-day remittance",
      "Maker–checker approvals for corrections, adjustments and refunds, with an audit trail",
      "Live updates when another computer posts or approves",
      "One-file Windows launcher: self-updating from GitHub Releases, tray icon, backup and database tools",
    ],
    tech: ["C#", ".NET", "Blazor Server", "MySQL", "EF Core", "TailwindCSS", "QuestPDF", "PaddleOCR", "GitHub Actions"],
    images: [
      lending("00-portfolio-cover.png", "4R Lending cover: logo, title, features and the app on a laptop and phone", "4R Lending: microfinance loan & collection system.", 1920, 1080),
      lending("01-sign-in-page-desktop.png", "4R Lending sign-in page on desktop", "Branded sign-in page.", 2880, 1800),
      lending("01-sign-in-page-phone.png", "4R Lending sign-in page on a phone", "Sign-in on a phone.", 1170, 2532),
      lending("02-admin-executive-dashboard.png", "Admin dashboard with portfolio totals and the 24-hour cut-off sheet", "Executive dashboard with daily cut-off.", 2880, 1800),
      lending("03-admin-par-aging-risk-report.png", "PAR aging report with charts", "Portfolio-at-risk aging (CGAP buckets).", 2880, 1800),
      lending("04-admin-collection-ledger.png", "Weekly collection ledger table", "17-column collection ledger.", 2880, 1800),
      lending("05-admin-approvals-and-end-of-day.png", "Approvals hub with request counts", "Maker–checker approvals and end-of-day review.", 2880, 1800),
      lending("06-admin-centers-and-routes.png", "List of collection centers by route day", "Centers and collection routes.", 2880, 1800),
      lending("07-admin-id-photo-book.png", "Clients' ID photos grouped by center (names blurred)", "ID Photo Book by center.", 2880, 1800),
      lending("08-admin-print-vouchers.png", "Print Vouchers page with filters", "Bulk voucher printing.", 2880, 1800),
      lending("09-encoder-dashboard.png", "Encoder dashboard with daily routine and totals", "Encoder command center.", 2860, 2544),
      lending("10-encoder-client-and-loan-desk.png", "Client registration and loan desk", "Client & loan desk.", 2880, 1800),
      lending("11-encoder-weekly-collection-sheet.png", "Batch payment entry for a center", "Weekly collection sheet.", 2880, 1800),
      lending("12-encoder-reports-and-cut-off.png", "Encoder reports and end-of-day page", "Reports and daily cut-off.", 2880, 1800),
      lending("13-encoder-dashboard-phone.png", "Encoder dashboard on a phone", "Works on phones.", 1170, 2532),
    ],
    kind: "Web application",
    context: "4R Lending Company Inc. (Cebu, Region VII)",
    matte: "#0f0a0a",
  },
  {
    // Source: docs/ctu-grade-sheet-portfolio-kit.md. Private source: no repo or download link;
    // student and staff names are blurred on purpose.
    title: "CTU Grade Sheet",
    featured: true,
    flagship: true,
    summary:
      "An offline faculty portal for Cebu Technological University: class records with lecture and laboratory GWA, official ROForm 15-B grade sheets, and course syllabi dated on the university calendar, all in one Windows app.",
    features: [
      "Grade sheet matrix: lecture, laboratory and consolidated final grades, plus separate Lecture and Laboratory GWA, computed live with the CTU transmutation table",
      "Official exports that fill the university's own templates: ROForm 15-B and GradeSheet Summary (Excel), class record (DOCX/PDF) and the INSForm 1a/1b course syllabus (DOCX)",
      "Syllabus generator that places topics on real class meetings using the course schedule and university calendar; faculty can also upload and view their own Word syllabus",
      "Offline and safe: local SQLite database, automatic daily snapshots, safety backups before risky actions and one-click restore",
      "Also: class analytics, official signatories per course, a locked global grading policy, roster import from Excel and semester rollover",
    ],
    tech: ["Laravel", "PHP", "Vue 3", "TypeScript", "Inertia", "TailwindCSS", "SQLite", "Electron"],
    images: [
      gradeSheet("00-cover.png", "CTU Grade Sheet cover: maroon and gold poster with the CTU seal, four features, the tech stack, and the app shown on a laptop and a phone", "CTU Grade Sheet on a laptop and a phone.", 1920, 1080),
      gradeSheet("01-sign-in-desktop.png", "CTU Grade Sheet sign-in page on desktop", "Sign in with the faculty password.", 2880, 1800),
      gradeSheet("02-my-courses-desktop.png", "My Courses page listing subjects grouped by year level and day or evening sections, with totals for subjects, sections, students and activities", "All classes for the semester, grouped by year and section.", 2880, 1800),
      gradeSheet("03-grade-sheet-desktop.png", "Grade sheet for a laboratory component with grading categories, activity columns and blurred student names", "Laboratory grade sheet with its rubric.", 2880, 1800),
      gradeSheet("04-consolidated-final-desktop.png", "Consolidated final view with midterm and final grades for lecture and laboratory and a separate lecture GWA, student names blurred", "Consolidated final: lecture and laboratory grades side by side.", 2880, 1800),
      gradeSheet("05-analytics-desktop.png", "Analytics dashboard with passing rate, class average, enrollment, grade distribution chart and class standing", "Class analytics at a glance.", 2880, 1800),
      gradeSheet("06-syllabus-generator-desktop.png", "Course syllabus page with topics, hours, computed weeks and dates, and warnings when hours do not fit", "Topics placed on real class dates.", 2880, 1800),
      gradeSheet("07-syllabus-viewer-desktop.png", "An uploaded Word course syllabus displayed inside the app", "The faculty's own Word syllabus, viewed in the app.", 2880, 1800),
      gradeSheet("08-signatories-desktop.png", "Signature block settings with designations and a live print preview, names blurred", "Signatories printed on every official form.", 2880, 1800),
      gradeSheet("09-grading-policy-desktop.png", "Global grading policy page with lecture and laboratory category weights", "One locked grading policy for every course.", 2880, 1800),
      gradeSheet("10-academic-calendar-desktop.png", "Academic calendar settings with class period, no-class days and exam weeks", "University calendar: holidays and exam weeks.", 2880, 1800),
      gradeSheet("11-backups-desktop.png", "Backups and restore dialog listing daily and safety snapshots with download and restore buttons", "Automatic snapshots and one-click restore.", 2880, 1800),
      gradeSheet("12-sign-in-phone.png", "CTU Grade Sheet sign-in page on a phone", "Sign-in on a phone.", 780, 1688),
      gradeSheet("13-my-courses-phone.png", "My Courses page on a phone with semester totals", "Courses on a phone.", 780, 1688),
      gradeSheet("14-grade-sheet-phone.png", "Grade sheet controls and component tabs on a phone", "Grade sheet on a phone.", 780, 1688),
      gradeSheet("15-analytics-phone.png", "Class analytics dashboard on a phone", "Analytics on a phone.", 780, 1688),
      gradeSheet("16-syllabus-phone.png", "Course syllabus page on a phone", "Syllabus on a phone.", 780, 1688),
    ],
    kind: "Desktop application",
    context: "CTU Naga Extension Campus",
    status: "v1.0.17 released",
    matte: "linear-gradient(#3b0f0f, #220202)",
  },
  {
    // Source: docs/ctu-document-tracking-portfolio-kit.md. No repo link; screenshot
    // records are sample data and bearer/recipient names are blurred on purpose.
    title: "CTU Document Tracking System",
    featured: true,
    summary:
      "A desktop logbook for CTU Naga Extension Campus offices to record incoming and outgoing communications, search them instantly, and print official PDF reports and routing slips.",
    features: [
      "Incoming and outgoing communications log with type, date and time, bearer, target office, subject and classification",
      "Dashboard with live counters; each card is a one-click filter",
      "Instant search plus Incoming/Outgoing tabs and scope filters (Within CTU Naga, Across Campuses, External)",
      "Official PDF exports on the CTU letterhead: a communications log report and a Document Transmittal & Routing Slip",
      "Office profiles with their own letterhead title and default staff",
      "Offline, crash-safe storage: atomic JSON writes with a rolling backup used automatically if the main file is corrupted",
      "Desktop polish: branded splash screen, keyboard shortcuts, single-instance lock and a Windows setup.exe installer",
    ],
    tech: ["Electron", "TypeScript", "Vite", "TailwindCSS", "jsPDF", "Lucide"],
    images: [
      docTracking("00-portfolio-cover.png", "Cover showing the CTU seal, project title, four key features and tech chips beside the app's dashboard in a laptop frame and a printed routing slip", "CTU Document Tracking System: a Windows desktop logbook for CTU Naga Extension Campus.", 1920, 1080),
      docTracking("01-splash-screen-desktop.png", "CTU splash screen with the university seal, campus name and a loading bar at 100%", "Branded splash screen shown while the app starts.", 1280, 800),
      docTracking("02-dashboard-all-communications-desktop.png", "Dashboard with total, incoming, outgoing and internal counters above a table of logged communications; people's names are blurred", "Dashboard with live counters and the full communications log.", 2880, 1800),
      docTracking("03-incoming-communications-log-desktop.png", "Communications table filtered to incoming records; people's names are blurred", "Incoming tab: documents received by the office.", 2880, 1800),
      docTracking("04-outgoing-communications-log-desktop.png", "Communications table filtered to outgoing records; people's names are blurred", "Outgoing tab: documents released by the office.", 2880, 1800),
      docTracking("05-search-and-scope-filter-desktop.png", "Search box containing \"request\" with the External scope selected, showing one matching record", "Search combined with the External scope filter.", 2880, 1800),
      docTracking("06-new-communication-entry-form-desktop.png", "Communication entry form with type, date, time, bearer, receiving office, subject and classification fields; the bearer's name is blurred", "Logging a new incoming communication.", 2880, 1800),
      docTracking("07-edit-outgoing-record-desktop.png", "Edit form for an outgoing record with \"Released To / Claimed By\" and \"Originating Office\" fields; the name is blurred", "Editing a record; labels switch for outgoing documents.", 2880, 1800),
      docTracking("08-delete-confirmation-desktop.png", "Confirmation dialog showing the record's tracking ID, type, subject and date before deletion; the bearer's name is blurred", "Delete confirmation with a record preview.", 2880, 1800),
      docTracking("09-office-profile-settings-desktop.png", "Office settings form with preset office, name, acronym, default staff, PDF letterhead title and campus", "Office profile: letterhead and default staff per office.", 2880, 1800),
      docTracking("10-pdf-export-communications-log-report.png", "Landscape PDF report with CTU and Bagong Pilipinas logos, office letterhead and a table of 12 communications; names are blurred", "Exported PDF log report on the official CTU letterhead.", 2188, 1547),
      docTracking("11-pdf-export-transmittal-routing-slip.png", "Portrait routing slip with record details, action directive checkboxes, remarks box and signature lines; names are blurred", "Exported Document Transmittal & Routing Slip.", 1547, 2188),
      docTracking("12-developer-information-desktop.png", "Developer card with Logan M. Panucat's photo, system details, keyboard shortcuts and links", "About the developer.", 2880, 1800),
    ],
    kind: "Desktop application",
    context: "CTU Naga Extension Campus",
    status: "Windows installer (setup.exe)",
    matte: "linear-gradient(#f2c343, #4c0b0e)",
  },
  {
    // Source: docs/librasys-portfolio-kit.md. Public repo (verified). Student names, IDs
    // and thesis authors are blurred on purpose; loan counts in screenshots are demo data.
    title: "LibraSys",
    label: "CTU Naga · Web App",
    summary:
      "A library management system for CTU Naga Extension Campus: catalog books and research manuscripts, keep student records, check books out and in with due dates, and see circulation in charts and Excel reports.",
    description: [
      "LibraSys is the library system for the CTU Naga Extension Campus library. A librarian signs in to an admin portal that holds the campus collection, mostly bound research manuscripts and theses sorted by department, program and shelf, together with the student roster.",
      "From there they check one or several books out to a student with a borrow date and due date, mark them returned, and see overdue items flagged automatically. The dashboard charts the last week of borrowing and returns, and the reports page breaks students down by department, ranks the most borrowed titles and exports students, books and borrow records to Excel.",
      "Books and students can be bulk-imported from the library's existing Excel records. It works on desktop and phone, in light or dark mode.",
    ],
    features: [
      "Book and manuscript catalog: multiple authors, ISBN/accession number, department, program, category, year, copies and shelf location, with search, filters and live availability",
      "Excel import of books, research and students from the library's existing records",
      "Student records with course, year level, research-title and bookbinding requirements, and a detail view",
      "Borrowing and returns: check out several books at once with borrow and due date/time, one-click returns and overdue tracking",
      "Dashboard with totals, a 7-day borrowing/return chart, books by category and a recent activity feed",
      "Reports: students by department and program, top 10 borrowed titles, and Excel exports",
      "Secure admin sign-in with bcrypt-hashed passwords and JWT sessions with \"remember me\"",
      "Responsive with dark mode: collapsible sidebar on phones and a saved light/dark theme",
    ],
    tech: ["TanStack", "React", "TypeScript", "Prisma", "MySQL", "TailwindCSS", "Recharts"],
    images: [
      librasys("00-portfolio-cover.png", "LibraSys cover: CTU seal, title, four features and the admin dashboard in a laptop and phone frame", "LibraSys for CTU Naga Extension Campus.", 1920, 1080),
      librasys("01-landing-page-desktop.png", "LibraSys landing page with the CTU seal, administrator login button and counts of books, students, borrowed and returned", "Landing page with live library counts.", 2880, 1800),
      librasys("02-administrator-sign-in-desktop.png", "Administrator login dialog with email, password and remember-me fields", "Administrator sign-in.", 2880, 1800),
      librasys("03-admin-dashboard-overview-desktop.png", "Admin dashboard with totals for students, books, borrowed and overdue items, a 7-day borrowing chart and books by category", "Dashboard overview.", 2880, 1800),
      librasys("04-admin-dashboard-recent-activity-desktop.png", "Recent activity table of borrowed and returned books, with student names blurred", "Recent borrow and return activity.", 2880, 1800),
      librasys("05-admin-book-catalog-desktop.png", "Book management table with title, ISBN, department, category, year, availability and status; author names blurred", "Book and manuscript catalog.", 2880, 1800),
      librasys("06-admin-add-new-book-desktop.png", "Add New Book form with title, department, author slots, ISBN, category, program, year, copies and shelf", "Adding a book or manuscript.", 2880, 1800),
      librasys("07-admin-import-books-from-excel-desktop.png", "Import Books/Research from Excel dialog listing the expected columns and an upload area", "Importing books from Excel.", 2880, 1800),
      librasys("08-admin-student-records-desktop.png", "Student management table with course, year, requirements and status; names and student IDs blurred", "Student records.", 2880, 1800),
      librasys("09-admin-student-details-desktop.png", "Student detail dialog with age, status, program and year level; name and ID blurred", "Student details.", 2880, 1800),
      librasys("10-admin-add-new-student-desktop.png", "Register New Student form with personal information and program choices grouped by department", "Registering a student.", 2880, 1800),
      librasys("11-admin-import-students-from-excel-desktop.png", "Import Students from Excel dialog listing the expected columns and an upload area", "Importing students from Excel.", 2880, 1800),
      librasys("12-admin-borrowing-and-returns-desktop.png", "Borrowing management with active, overdue and returned-today counts and a loan table with return buttons; borrower names blurred", "Borrowing and returns.", 2880, 1800),
      librasys("13-admin-check-out-a-book-desktop.png", "Check Out Books dialog with student search, multi-book selection and borrow/due date and time", "Checking out books.", 2880, 1800),
      librasys("14-admin-reports-and-analytics-desktop.png", "Reports page with totals, Excel export buttons and charts of students by department and books by category", "Reports and analytics.", 2880, 1800),
      librasys("15-admin-top-borrowed-books-report-desktop.png", "Top borrowed books list and student counts per program in each department; author names blurred", "Top borrowed titles and department breakdown.", 2880, 1800),
      librasys("16-admin-dashboard-in-dark-mode-desktop.png", "Admin dashboard in dark mode", "Dark mode.", 2880, 1800),
      librasys("17-landing-page-phone.png", "LibraSys landing page on a phone", "Landing page on a phone.", 780, 1688),
      librasys("18-administrator-sign-in-phone.png", "Administrator login dialog on a phone", "Sign-in on a phone.", 780, 1688),
      librasys("19-admin-dashboard-overview-phone.png", "Admin dashboard summary cards stacked on a phone", "Dashboard on a phone.", 780, 1688),
      librasys("20-admin-navigation-menu-phone.png", "Slide-out admin menu with Dashboard, Books, Students, Borrowing and Reports", "Navigation menu on a phone.", 780, 1688),
      librasys("21-admin-dashboard-recent-activity-phone.png", "Recent activity list on a phone, with student names blurred", "Recent activity on a phone.", 780, 1688),
      librasys("22-admin-book-catalog-phone.png", "Book management totals and search on a phone", "Book catalog on a phone.", 780, 1688),
      librasys("23-admin-student-records-phone.png", "Student management totals and search on a phone", "Student records on a phone.", 780, 1688),
      librasys("24-admin-borrowing-and-returns-phone.png", "Borrowing management with check-out button and loan counts on a phone", "Borrowing on a phone.", 780, 1688),
      librasys("25-admin-reports-and-analytics-phone.png", "Reports and analytics totals on a phone", "Reports on a phone.", 780, 1688),
      librasys("26-admin-top-borrowed-books-report-phone.png", "Student counts per program for the Education and Technology departments on a phone", "Department breakdown on a phone.", 780, 1688),
    ],
    kind: "Web application",
    context: "CTU Naga Extension Campus",
    featured: true,
    githubUrl: "https://github.com/Ezgaminglogan/LibraSys-CTU",
    matte: "#5c0606",
  },
  {
    // Source: docs/ims-ctu-portfolio-kit.md. Private repo: no GitHub link. Names, ID
    // numbers and borrower photos in the screenshots are blurred on purpose.
    title: "Inventory Management System (IMS-CTU)",
    label: "CTU Naga · Web + Desktop",
    summary:
      "An inventory system for the CTU Naga Property & Supply Office: register assets with barcodes and custodians, lend items to students and faculty, print official PAR receipts and reports, and track condemned assets.",
    features: [
      "Asset registry: SKU, barcode, serial number, unit price, location, custodian and condition status for every item, with printable barcode property labels",
      "Dashboard with total items, categories, inventory value, low-stock and overdue alerts, a category chart and inventory trend",
      "Borrowing and returns for students and faculty, with due dates, purpose, return condition and an official borrow receipt",
      "Distribution and transfers to offices or people, with a full history",
      "Official CTU documents: Property Transfer Acknowledgement Receipt (PAR) with live letterhead preview, plus reports as PDF, Word, Excel and CSV",
      "Stock transactions: stock-in, stock-out and adjustments with before/after quantities",
      "Condemned assets: SRN-tracked records, batch acknowledgement and printable forms",
      "Audit trail and system logs of every change, with who did it and when",
      "Backup and maintenance: one-click SQL/JSON backups, import, weekly scheduled backups and live system metrics",
      "Downloadable templates: maintenance cards, maintenance request forms and a master inventory template",
      "Windows desktop build with Electron and an automated GitHub Actions release pipeline",
    ],
    tech: ["TanStack", "React", "TypeScript", "Prisma", "MySQL", "TailwindCSS", "Electron"],
    images: [
      ims("00-portfolio-cover.png", "Cover for the CTU Inventory Management System showing the app on a laptop and a phone, its four key features and its tech stack", "IMS-CTU: inventory management for CTU Naga Extension Campus.", 1920, 1080),
      ims("01-landing-page-desktop.png", "IMS landing page with the CTU seal, \"Inventory Management\" title and a button to enter the administrative console", "Landing page for the Property & Supply Office system.", 2880, 1800),
      ims("02-sign-in-page-desktop.png", "Administrative login form with institutional email and password fields", "Administrator sign-in.", 2880, 1800),
      ims("03-admin-dashboard-overview-desktop.png", "Admin dashboard showing total items, categories, total value, low stock, overdue items and a category distribution chart", "Dashboard with inventory totals, value and alerts.", 2880, 1800),
      ims("04-admin-inventory-items-desktop.png", "Inventory table with SKUs, categories, quantities, prices and condition status tabs; custodian names are blurred", "Master inventory with condition tabs and filters.", 2880, 1800),
      ims("05-admin-item-specifications-desktop.png", "Asset specification modal showing the item photo, description, barcode, price, location and serial number", "Item details with a printable barcode label.", 2880, 1800),
      ims("06-admin-add-inventory-item-desktop.png", "Three-step \"Add New Inventory Asset\" form with item name, category, unit, condition and description", "Step-by-step item registration.", 2880, 1800),
      ims("07-admin-issue-and-distribute-items-desktop.png", "Distribute form with product, quantity, recipient, department, destination and purpose", "Issuing items to an office or person.", 2880, 1800),
      ims("08-admin-property-acknowledgement-receipt-par-desktop.png", "Property Transfer Acknowledgement Receipt form next to a live preview of the CTU letterhead document; names are blurred", "Official PAR form with live letterhead preview.", 2880, 1800),
      ims("09-admin-export-inventory-reports-desktop.png", "Export dialog with report title, signatories and PDF, DOCX, XLSX and CSV options", "Export to PDF, Word, Excel or CSV.", 2880, 1800),
      ims("10-admin-categories-desktop.png", "Category list with icons, descriptions and item counts", "Inventory categories.", 2880, 1800),
      ims("11-admin-borrowers-desktop.png", "Borrower table with role and department; names, ID numbers and photos are blurred", "Borrower directory for students and faculty.", 2880, 1800),
      ims("12-admin-borrow-records-desktop.png", "Borrow records table with items, check-out and return times and status; borrower names are blurred", "Borrow records with due and return dates.", 2880, 1800),
      ims("13-admin-check-out-item-desktop.png", "Check-out form with borrower search, item checkout list, return date and purpose", "Checking items out to a borrower.", 2880, 1800),
      ims("14-admin-borrow-transaction-details-desktop.png", "Transaction details showing the product, borrowed/due/returned timeline, return condition and a print receipt button", "Borrow transaction with timeline and receipt.", 2880, 1800),
      ims("15-admin-stock-transactions-desktop.png", "Stock transactions table with reference, quantity change and before/after stock", "Stock-in, stock-out and adjustments.", 2880, 1800),
      ims("16-admin-condemned-assets-desktop.png", "Condemned assets list with category, quantity, original SRN, date and acknowledgement status", "Condemned assets with SRN tracking.", 2880, 1800),
      ims("17-admin-audit-logs-and-history-desktop.png", "Audit history timeline of created and updated items with timestamps", "Audit log of every inventory change.", 2880, 1800),
      ims("18-admin-backup-and-maintenance-desktop.png", "Maintenance page with backup status, live CPU/memory chart, storage distribution and weekly activity", "Backups and live system metrics.", 2880, 1800),
      ims("19-admin-download-templates-desktop.png", "Download cards for the maintenance card, maintenance request form and master inventory template", "Official form templates.", 2880, 1800),
      ims("20-admin-system-logs-desktop.png", "System log table with timestamp, action, item, admin and details", "System logs.", 2880, 1800),
      ims("21-sign-in-page-phone.png", "Mobile administrative login form", "Sign-in on a phone.", 780, 1688),
      ims("22-admin-dashboard-phone.png", "Mobile dashboard with stacked stat cards for items, categories, value, low stock and overdue", "Dashboard on a phone.", 780, 1688),
      ims("23-admin-navigation-menu-phone.png", "Mobile sidebar menu grouped into Overview, Inventory, Borrowing, Asset Status and System", "Mobile navigation menu.", 780, 1688),
      ims("24-admin-inventory-items-phone.png", "Mobile inventory page with stat cards, filters and action buttons", "Inventory on a phone.", 780, 1688),
      ims("25-admin-borrow-records-phone.png", "Mobile borrow records page with status cards and a New Borrowing button", "Borrow records on a phone.", 780, 1688),
      ims("26-admin-condemned-assets-phone.png", "Mobile condemned assets page with totals and filters", "Condemned assets on a phone.", 780, 1688),
    ],
    kind: "Web & desktop application",
    context: "CTU Naga Extension Campus",
    featured: true,
    matte: "#0b192c",
  },
  {
    title: "Supplify",
    summary:
      "A cross-platform hardware supply management system, built as a capstone and deployed for Dudz Hardware Store in Naga, Cebu.",
    features: [
      "Inventory tracking and order management",
      "Analytics for store operations",
      "Customer sign-in with email, phone or Google",
      "Mobile app with categories, cart, orders and account screens",
    ],
    tech: ["Blazor Framework", "TailwindCSS", "C#", ".NET"],
    images: [
      {
        src: "/image/Landing.png",
        alt: "Supplify web sign-in page for Dud Hardware & Construction Supply",
      },
      {
        src: "/image/Landing2.png",
        alt: "Supplify mobile app sign-in screen with email, phone and Google options",
      },
    ],
    kind: "Cross-platform application",
    context: "Capstone project · Client deployment",
    featured: true,
    status: "Deployed for a client",
    role: "Lead capstone developer in a three-person team",
    outcome:
      "Deployed for Dudz Hardware Store, Naga, Cebu, from November 24 to December 8, 2025, as recorded in the store owner's certificates of deployment.",
  },
  {
    title: "Mom's Food Delicacies",
    summary:
      "An online store for home-cooked Filipino delicacies with email verification and OTP sign-in.",
    features: [
      "Menu with prices and stock availability",
      "Email verification with PHPMailer",
      "OTP authentication and user management",
    ],
    tech: ["PHP", "TailwindCSS", "PHPMailer", "MySQL"],
    images: [
      {
        src: "/image/Project 3.png",
        alt: "Mom's Food Delicacies menu showing Bingka, Banana Chips, Bocarillo and Puto Cheese with prices",
      },
    ],
    kind: "Web application",
    context: "School project",
  },
  {
    title: "Luto",
    summary:
      "A Blazor web app for Mom's Food Delicacies with Entity Framework Core and Google Sign-In.",
    features: [
      "Featured dishes and menu browsing",
      "Google Sign-In authentication",
      "Data management with Entity Framework Core",
    ],
    tech: ["Blazor Framework", "EF Core", "Google Sign-In", "C#", ".NET", "TailwindCSS"],
    images: [
      {
        src: "/image/Luto-System.png",
        alt: "Luto home page welcoming visitors to Mom's Food Delicacies with a featured adobo dish",
      },
    ],
    kind: "Web application",
    context: "School project",
  },
  {
    title: "Ticket Support System",
    summary:
      "A support ticketing system with real-time messaging, Google Sign-In and reCAPTCHA-protected login.",
    features: [
      "Real-time messaging with SignalR",
      "Google Sign-In and Google reCAPTCHA v3",
      "Entity Framework data access",
    ],
    tech: ["ASP.NET Web MVC", "SignalR", "Entity Framework", "C#", "Google reCAPTCHA v3", "TailwindCSS"],
    images: [
      {
        src: "/image/Ticket-Support.png",
        alt: "Tech Support Ticketing System sign-in page with Google sign-in and reCAPTCHA",
      },
    ],
    kind: "Web application",
    context: "School project",
  },
  {
    title: "School Management System",
    summary:
      "A Windows desktop application for student records, grade tracking and administrative tasks.",
    features: ["Student records", "Grade tracking", "Administrative functions"],
    tech: ["Visual Basic WFA", "MySQL"],
    images: [
      {
        src: "/image/School-Project.png",
        alt: "School Management System desktop login window",
      },
    ],
    kind: "Desktop application",
    context: "School project",
  },
];

export const sqlitePortable = {
  downloadUrl:
    "https://www.mediafire.com/file/2pu0bqxgr979uam/SQLitePortableSetup.zip/file",
  features: [
    "Create databases and tables, including relationships",
    "Visual schema designer",
    "SQL explorer and console",
    "Insert, edit and inspect table records",
    "Connection-ready snippets for PHP, Python, C#, JavaScript, TypeScript and SQL",
    "Light and dark mode",
  ],
  screenshots: (
    [
      ["Picture 1 - Landing Page Light Mode.png", "Landing page in light mode"],
      ["Picture 1 - Landing Page Dark Mode.png", "Landing page in dark mode"],
      ["Picture 2 - SQL Explorer.png", "SQL explorer"],
      ["Picture 3 - Create Database.png", "Create database dialog"],
      ["Picture 4 - Connection Online.png", "Connection status: online"],
      ["Picture 5 - Connection Offline.png", "Connection status: offline"],
      ["Picture 6 - Integration PHP.png", "PHP integration snippet"],
      ["Picture 7 - Integration Python.png", "Python integration snippet"],
      ["Picture 8 - Integration C%23.png", "C# integration snippet"],
      ["Picture 9 - Integration Javascript.png", "JavaScript integration snippet"],
      ["Picture 10 - Integration Typescript.png", "TypeScript integration snippet"],
      ["Picture 11 - Integration SQL.png", "SQL integration snippet"],
      ["Picture 12 - System Status.png", "System status panel"],
      ["Picture 13 - Database Selected Landing Page.png", "Selected database overview"],
      ["Picture 14 - Create New Table.png", "Create new table form"],
      ["Picture 15 - Create Table - Relationships.png", "Table relationships setup"],
      ["Picture 16 - Schema Designer.png", "Schema designer"],
      ["Picture 17 - SQL Explorer Console.png", "SQL explorer console"],
      ["Picture 18 - Selected Table.png", "Selected table records"],
      ["Picture 19 - Selected Table Insights.png", "Table insights"],
      ["Picture 20 - Selected Table Insert New Record.png", "Insert new record form"],
      ["Picture 21 - Selected Table Edit New Record.png", "Edit record form"],
    ] as const
  ).map(
    ([file, alt]): Screenshot => ({
      src: `/image/sqlite-portables/${file}`,
      alt: `SQLite Portable: ${alt}`,
    }),
  ),
};

export const focusAreas = [
  {
    title: "Full-stack web applications",
    text: "Dashboards, portals, a microfinance loan system and online stores with Next.js, React, TanStack, ASP.NET MVC, Blazor and PHP.",
  },
  {
    title: "Database design",
    text: "Relational schemas and ORM models with MySQL, SQL Server, SQLite, Prisma and Entity Framework.",
  },
  {
    title: "Authentication and integrations",
    text: "JWT sessions, Google Sign-In, OTP email verification, reCAPTCHA and real-time messaging with SignalR.",
  },
  {
    title: "Desktop and mobile apps",
    text: "NEXUS IDE, an offline coding IDE for Android and Windows (Flutter), plus a faculty grade sheet and a document tracking system (Electron), SQLite Portable and a school management system.",
  },
];

export const experiences: ExperienceItem[] = [
  {
    role: "College Instructor (BSIT)",
    organization: "Cebu Technological University – Naga Extension Campus",
    period: "2026 – Present",
    description:
      "Teaches and mentors students in the BSIT program, delivering hands-on courses in software development, web and database technologies, and system architecture.",
    skills: ["BSIT Program", "Web Development", "Database Systems", "Software Architecture", "Programming"],
  },
  {
    role: "Full-Stack Web Developer",
    organization: "Independent & client projects",
    period: "2023 – Present",
    description:
      "Builds full-stack web applications, databases and client solutions with PHP, MySQL, .NET, React and Next.js.",
    skills: ["PHP", "MySQL", "C#", "ASP.NET MVC", "React", "Next.js", "TailwindCSS"],
  },
  {
    role: "Lead Capstone Developer",
    organization: "CTU Naga Extension Campus",
    period: "2025",
    description:
      "Led development of capstone systems, including Supplify, a cross-platform hardware supply management system deployed for Dudz Hardware Store, and institutional resource platforms.",
    skills: ["TanStack", "Prisma ORM", "PostgreSQL", "Blazor Framework", "C#"],
  },
];

export const education: EducationItem[] = [
  {
    degree: "Bachelor of Science in Information Technology",
    institution: "Cebu Technological University – Naga Extension Campus",
    period: "2022 – 2026",
    honor: "Cum Laude",
    description:
      "Graduated Cum Laude with a focus on web development, database management and software architecture, completing several capstone projects.",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    items: ["React", "Next.js", "Vue 3", "TypeScript", "TailwindCSS", "TanStack", "ShadCN UI"],
  },
  {
    title: "Backend",
    items: ["C#", "ASP.NET MVC", "Blazor Framework", "PHP", "Laravel", "SignalR", "JWT", "Google Sign-In", "PHPMailer"],
  },
  {
    title: "Databases",
    items: ["MySQL", "SQL Server", "SQLite", "Prisma", "EF Core"],
  },
  {
    title: "Desktop & mobile",
    items: ["Flutter", "Dart", "Electron", "Visual Basic WFA", ".NET"],
  },
  {
    title: "Developer tools",
    items: ["Git", "GitHub", "GitHub Actions", "Vite", "Vercel"],
  },
];

export const certificates: Certificate[] = [
  {
    title: "Certificate of Deployment: Supplify",
    issuer: "Dudz Hardware Store, Naga, Cebu",
    date: "Nov 24 – Dec 8, 2025",
    kind: "Client deployment",
    image: "/certificates/certificates-deployment.jpg",
    alt: "Certificate of Deployment issued to Logan M. Panucat for Supplify, a cross-platform hardware supply management system, signed by the store owner",
    note: "Issued to Logan M. Panucat for completing the system requirements of Supplify during its deployment period.",
  },
  {
    title: "Certificate of Deployment: Dudz Hardware Store system",
    issuer: "Dudz Hardware Store, Naga, Cebu",
    date: "Nov 24 – Dec 8, 2025",
    kind: "Client deployment · Team",
    image: "/certificates/certificates-deployment1.jpg",
    alt: "Team Certificate of Deployment recognizing Mary Claire D. Quiros, Logan M. Panucat and Junry C. Lapiña as developers of the Dudz Hardware Store system",
    note: "Team certificate recognizing the three developers who deployed the store's system.",
  },
  {
    title: "Next.js App Router Fundamentals",
    issuer: "Vercel",
    date: "Dec 8, 2025",
    kind: "Course completion",
    image: "/certificates/certificates-1-nextjs-web.jpg",
    alt: "Vercel certificate of completion for the Next.js App Router Fundamentals course, dated December 8, 2025",
  },
  {
    title: "React Foundations for Next.js",
    issuer: "Vercel",
    date: "Nov 26, 2025",
    kind: "Course completion",
    image: "/certificates/certificates-nextjs-web.jpg",
    alt: "Vercel certificate of completion for the React Foundations for Next.js course, dated November 26, 2025",
  },
  {
    title: "CSS, Bootstrap And JavaScript And Python Stack Course",
    issuer: "Udemy · Proper Dot Institute",
    date: "Nov 30, 2025",
    kind: "Course completion · 7.5 hours",
    image: "/certificates/certificates-udemy.jpg",
    alt: "Udemy certificate of completion for the CSS, Bootstrap And JavaScript And Python Stack Course, dated November 30, 2025",
    verifyUrl: "https://ude.my/UC-964d557e-1a29-451d-8cd4-5e6d16faff1c",
  },
];
