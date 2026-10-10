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

export const projects: Project[] = [
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
    title: "Desktop tools",
    text: "Desktop apps such as a faculty grade sheet (Laravel and Electron), SQLite Portable and a school management system.",
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
    title: "Desktop",
    items: ["Electron", "Visual Basic WFA", ".NET"],
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
