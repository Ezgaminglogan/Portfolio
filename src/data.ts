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

const nexus = (file: string, alt: string, caption: string, width: number, height: number): Screenshot => ({
  src: `/image/nexus-ide/${file}`,
  alt,
  caption,
  width,
  height,
});

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
  },
  {
    title: "CTU Faculty Grade Sheet",
    summary:
      "A desktop app for CTU Naga Extension Campus faculty that keeps official ROForm 15-B grading, attendance and class records on their own computer.",
    features: [
      "ROForm 15-B grading records",
      "Attendance and class records",
      "Data stored locally on the faculty member's computer",
      "Password-protected faculty sign-in with “keep me signed in”",
    ],
    tech: ["Laravel", "Electron"],
    images: [
      {
        src: "/image/Faculty Grade Sheet.jpg",
        alt: "CTU Faculty Grade Sheet desktop app sign-in screen for CTU Naga Extension Campus faculty",
      },
    ],
    kind: "Desktop application",
    context: "CTU Naga Extension Campus",
    featured: true,
  },
  {
    title: "LibraSys",
    summary:
      "A library management system for CTU Naga Extension Campus covering the book catalog, students, borrowing and reports.",
    features: [
      "Dashboard with borrowing trends and activity insights",
      "Book catalog management with ISBN support",
      "Student management with Excel import",
      "Borrowing and return tracking",
      "Reports module for administrators",
    ],
    tech: ["React", "TanStack", "TypeScript", "Prisma", "MySQL", "TailwindCSS", "ShadCN UI"],
    images: [
      {
        src: "/image/LibraSys.png",
        alt: "LibraSys landing page with administrator login and counts of books, students, borrowed and returned items",
      },
    ],
    kind: "Web application",
    context: "CTU Naga Extension Campus",
    featured: true,
    githubUrl: "https://github.com/Ezgaminglogan/LibraSys-CTU",
  },
  {
    title: "Inventory Management System (IMS-CTU)",
    summary:
      "An administrative platform for tracking institutional resources at CTU Naga Extension Campus.",
    features: [
      "Institutional resource and inventory tracking",
      "JWT-based authentication",
      "Server data fetching and synchronization with TanStack",
      "Prisma ORM data layer",
    ],
    tech: ["TanStack", "Prisma", "JWT", "TailwindCSS"],
    images: [
      {
        src: "/image/IMS-CTU.png",
        alt: "IMS-CTU welcome screen with the CTU seal and a Get Started button",
      },
    ],
    kind: "Web application",
    context: "CTU Naga Extension Campus",
    featured: true,
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
    text: "Dashboards, portals and online stores with Next.js, React, TanStack, ASP.NET MVC, Blazor and PHP.",
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
    text: "NEXUS IDE, an offline coding IDE for Android and Windows (Flutter), plus a faculty grade sheet (Laravel and Electron), SQLite Portable and a school management system.",
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
    items: ["React", "Next.js", "TypeScript", "TailwindCSS", "TanStack", "ShadCN UI"],
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
    items: ["Git", "GitHub", "Vercel"],
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
