import {
  CpuChipIcon,
  ShieldCheckIcon,
  ServerIcon,
} from "@heroicons/react/24/outline";
import type {
  SkillItem,
  ProfessionalSkill,
  Project,
  EducationItem,
  ExperienceItem,
  SqliteImageItem,
  CertificateItem,
  ServiceItem,
  TechIconMap,
} from "~types";

export type { SkillItem, ProfessionalSkill, Project, EducationItem, ExperienceItem, SqliteImageItem, CertificateItem, ServiceItem };

export const TECH_ICONS: TechIconMap = {
  PHP: "php",
  MySQL: "mysql",
  "C#": "csharp",
  JavaScript: "javascript",
  TypeScript: "typescript",
  React: "react",
  "Next.js": "nextdotjs",
  TailwindCSS: "tailwindcss",
  Bootstrap: "bootstrap",
  HTML: "html5",
  CSS: "css3",
  "Prisma ORM": "prisma",
  ".NET Framework": "dotnet",
  "ASP.NET MVC": "dotnet",
  Blazor: "blazor",
  Git: "git",
  Vercel: "vercel",
  "Entity Framework": "dotnet",
  "SQL Server": "microsoftsqlserver",
  "JWT Auth": "jsonwebtokens",
  SignalR: "dotnet",
  "ShadCN UI": "shadcnui",
  "Better Auth": "betterauth",
  libSQL: "sqlite",
  TanStack: "reactquery",
};

export const stacks: SkillItem[] = [
  { name: "React", icon: "react", role: "UI Library" },
  { name: "Next.js", icon: "nextdotjs", role: "React Framework" },
  { name: "TailwindCSS", icon: "tailwindcss", role: "Utility Styling" },
  { name: "TanStack", icon: "reactquery", role: "Async State / Query" },
  { name: "C#", icon: "csharp", role: ".NET Ecosystem" },
  { name: "PHP", icon: "php", role: "Server-Side Core" },
  { name: "MySQL", icon: "mysql", role: "Relational Database" },
  { name: "SQL Server", icon: "microsoftsqlserver", role: "Enterprise Engine" },
  { name: "Prisma", icon: "prisma", role: "Type-Safe ORM" },
  { name: "EF Core", icon: "dotnet", role: ".NET ORM" },
  { name: "Git", icon: "git", role: "Distributed VCS" },
];

export const stackCategories: { title: string; badge: string; description: string; items: SkillItem[] }[] = [
  {
    title: "Frontend & Web Ecosystem",
    badge: "UI & State Architecture",
    description: "Component-driven design systems, server-side rendering, and instant client caching.",
    items: [
      { name: "React", icon: "react", role: "UI Library" },
      { name: "Next.js", icon: "nextdotjs", role: "React Framework" },
      { name: "TailwindCSS", icon: "tailwindcss", role: "Utility Styling" },
      { name: "TanStack", icon: "reactquery", role: "Query & Async State" },
    ],
  },
  {
    title: "Backend & Systems",
    badge: "Backend Architecture",
    description: "Multi-paradigm compiled languages and high-performance server architectures.",
    items: [
      { name: "C#", icon: "csharp", role: ".NET Ecosystem" },
      { name: "PHP", icon: "php", role: "Server-Side Architecture" },
    ],
  },
  {
    title: "Databases & Data Layer",
    badge: "Persistence & ORM",
    description: "Structured ACID data stores, schema migrations, and typesafe query modeling.",
    items: [
      { name: "MySQL", icon: "mysql", role: "Relational Database" },
      { name: "SQL Server", icon: "microsoftsqlserver", role: "Enterprise Engine" },
      { name: "Prisma", icon: "prisma", role: "Type-Safe ORM" },
      { name: "EF Core", icon: "dotnet", role: ".NET ORM" },
    ],
  },
  {
    title: "DevOps & Tooling",
    badge: "Version Control",
    description: "Source code collaboration, branching workflows, and production pipeline deployment.",
    items: [
      { name: "Git", icon: "git", role: "Distributed VCS" },
    ],
  },
];

export const professionalSkills: ProfessionalSkill[] = [
  {
    icon: ServerIcon,
    title: "Database Architecture & ORM",
    description:
      "Designing resilient relational schemas, indexing strategies, and high-performance transactional pipelines using MySQL, SQLite, and Prisma ORM.",
    highlights: ["ACID Compliance", "Schema Design", "ORM Modeling"],
    accent: "from-blue-600 to-indigo-600",
    dot: "bg-blue-600",
  },
  {
    icon: ShieldCheckIcon,
    title: "Authentication & Security",
    description:
      "Architecting enterprise-grade RBAC, session integrity, OTP flows, and token-based authentication models.",
    highlights: ["JWT / OAuth / 2FA", "RBAC Architecture", "Endpoint Hardening"],
    accent: "from-indigo-600 to-violet-600",
    dot: "bg-indigo-600",
  },
  {
    icon: CpuChipIcon,
    title: "Systems & Full-Stack Architecture",
    description:
      "Bridging compiled desktop applications (C# .NET, WinForms, Blazor) with modern web stacks (Next.js, React, Tailwind).",
    highlights: [".NET Ecosystem", "Next.js SSR/SSG", "API Contract Design"],
    accent: "from-sky-600 to-blue-600",
    dot: "bg-sky-600",
  },
];

export const projects: Project[] = [
  {
    title: "CTU Faculty Grade Portal",
    description:
      "An automated grading and transmutation portal built for CTU Naga Extension Campus instructors. It streamlines score encoding, calculates lecture and laboratory unit distributions, and automatically applies official CTU 1.0 to 5.0 grade transmutations.",
    tech: [
      "TanStack",
      "ShadCN UI",
      "Better Auth",
      "Prisma",
      "libSQL",
      "TailwindCSS",
    ],
    gradient: "from-amber-500 to-orange-600",
    image: "/image/Grade Portal.jpeg",
    type: "Ongoing CTU Naga Extension Campus Project"
  },
  {
    title: "LibraSys - Library Management System",
    description:
      "A comprehensive library management system developed for Cebu Technological University - Naga Extension Campus. It streamlines student borrowing records, book inventory tracking with ISBN support, and provides real-time analytics using TanStack and Prisma ORM.",
    tech: ["TanStack", "Prisma", "MySQL", "TailwindCSS"],
    gradient: "from-indigo-600 to-purple-600",
    image: "/image/LibraSys.png",
    type: "CTU Naga Extension Campus Project"
  },
  {
    title: "Inventory Management System (IMS-CTU)",
    description:
      "A specialized administrative platform for Cebu Technological University - Naga Extension Campus. This high-performance system streamlines institutional resource tracking using Prisma ORM, secure JWT authentication, and TanStack for real-time data synchronization.",
    tech: ["TanStack", "Prisma", "JWT", "TailwindCSS"],
    gradient: "from-blue-600 to-cyan-500",
    image: "/image/IMS-CTU.png",
    type: "CTU Naga Extension Campus Project"
  },

  {
    title: "Supplify",
    description:
      "Cross-platform supply chain management solution for mobile and web applications. Streamlined inventory tracking, order management, and real-time analytics.",
    tech: ["Blazor Framework", "TailwindCSS", "C#", ".NET"],
    gradient: "from-blue-500 to-purple-600",
    image: "/image/Landing.png",
    type: "Cross-Platform Capstone Project"
  },

  {
    title: "Mom's Food Delicacies",
    description:
      "E-commerce platform for home-cooked food delicacies featuring email verification with PHPMailer, OTP authentication, and secure user management.",
    tech: ["PHP", "TailwindCSS", "PHPMailer", "MySQL"],
    gradient: "from-teal-500 to-cyan-600",
    image: "/image/Project 3.png",
    type: "School Project"
  },
  {
    title: "School Management System",
    description:
      "Desktop application for school management with student records, grade tracking, and administrative functions. Built with Windows Forms Architecture for efficient data management.",
    tech: ["Visual Basic WFA", "MySQL"],
    gradient: "from-purple-500 to-indigo-600",
    image: "/image/School-Project.png",
    type: "School Project"
  },
  {
    title: "Ticket Support System",
    description:
      "Advanced ticket support system with Google reCAPTCHA v3, Google Sign-In integration, and real-time messaging using SignalR. Features Entity Framework for efficient data management and modern authentication.",
    tech: [
      "ASP.NET Web MVC",
      "SignalR",
      "Entity Framework",
      "C#",
      "Google reCAPTCHA v3",
      "TailwindCSS",
    ],
    gradient: "from-red-500 to-orange-600",
    image: "/image/Ticket-Support.png",
    type: "School Project"
  },
  {
    title: "Luto",
    description:
      "Modern Blazor web application with Entity Framework Core for data management and Google Sign-In authentication. Demonstrates advanced component-based development and seamless user experience.",
    tech: [
      "Blazor Framework",
      "EF Core",
      "Google Sign-In",
      "C#",
      ".NET",
      "TailwindCSS",
    ],
    gradient: "from-yellow-500 to-amber-600",
    image: "/image/Luto-System.png",
    type: "School Project"
  },
];

export const education: EducationItem[] = [
  {
    degree: "Bachelor of Science in Information Technology",
    institution: "Cebu Technological University - Naga Extension Campus",
    period: "2022 - 2026",
    honor: "Cum Laude",
    description:
      "Graduated Cum Laude with a focus on web development, database management, and software architecture. Completed multiple capstone projects addressing real-world problems.",
    highlights: ["Cum Laude Graduate", "Software Development", "Database Systems"],
  },
];

export const experiences: ExperienceItem[] = [
  {
    role: "College Instructor (BSIT)",
    organization: "Cebu Technological University - Naga Extension Campus",
    period: "2026 - Present",
    type: "Academic & Tech Instruction",
    badge: "Current Role",
    description:
      "Instructing and mentoring students in the Bachelor of Science in Information Technology (BSIT) program. Delivering hands-on curriculum across software development, web & database technologies, and modern system architectures.",
    skills: ["BSIT Program", "Web Development", "Database Systems", "Software Architecture", "Programming"],
  },
  {
    role: "Full-Stack Web Developer",
    organization: "Independent & Client Projects",
    period: "2023 - Present",
    type: "Development Experience",
    badge: "Active",
    description:
      "Continuously architecting and developing full-stack web applications, custom databases, and client solutions utilizing PHP, MySQL, .NET, React, and Next.js.",
    skills: ["PHP", "MySQL", "C#", "ASP.NET MVC", "React", "Next.js", "TailwindCSS"],
  },
  {
    role: "Lead Capstone Developer",
    organization: "CTU Naga Extension Campus",
    period: "2025",
    type: "System Architecture",
    badge: "Lead Developer",
    description:
      "Architected and deployed production-ready full-stack enterprise systems including Supplify (supply chain platform) and institutional resource platforms.",
    skills: ["TanStack", "Prisma ORM", "PostgreSQL", "Blazor Framework", "C#"],
  },
];

export const sqliteImages: SqliteImageItem[] = [
  {
    src: "/image/sqlite-portables/Picture 1 - Landing Page Dark Mode.png",
    alt: "Landing Page Dark Mode",
  },
  {
    src: "/image/sqlite-portables/Picture 1 - Landing Page Light Mode.png",
    alt: "Landing Page Light Mode",
  },
  {
    src: "/image/sqlite-portables/Picture 2 - SQL Explorer.png",
    alt: "SQL Explorer",
  },
  {
    src: "/image/sqlite-portables/Picture 3 - Create Database.png",
    alt: "Create Database",
  },
  {
    src: "/image/sqlite-portables/Picture 4 - Connection Online.png",
    alt: "Connection Online",
  },
  {
    src: "/image/sqlite-portables/Picture 5 - Connection Offline.png",
    alt: "Connection Offline",
  },
  {
    src: "/image/sqlite-portables/Picture 6 - Integration PHP.png",
    alt: "Integration PHP",
  },
  {
    src: "/image/sqlite-portables/Picture 7 - Integration Python.png",
    alt: "Integration Python",
  },
  {
    src: "/image/sqlite-portables/Picture 8 - Integration C%23.png",
    alt: "Integration C#",
  },
  {
    src: "/image/sqlite-portables/Picture 9 - Integration Javascript.png",
    alt: "Integration JavaScript",
  },
  {
    src: "/image/sqlite-portables/Picture 10 - Integration Typescript.png",
    alt: "Integration TypeScript",
  },
  {
    src: "/image/sqlite-portables/Picture 11 - Integration SQL.png",
    alt: "Integration SQL",
  },
  {
    src: "/image/sqlite-portables/Picture 12 - System Status.png",
    alt: "System Status",
  },
  {
    src: "/image/sqlite-portables/Picture 13 - Database Selected Landing Page.png",
    alt: "Database Selected Landing Page",
  },
  {
    src: "/image/sqlite-portables/Picture 14 - Create New Table.png",
    alt: "Create New Table",
  },
  {
    src: "/image/sqlite-portables/Picture 15 - Create Table - Relationships.png",
    alt: "Create Table Relationships",
  },
  {
    src: "/image/sqlite-portables/Picture 16 - Schema Designer.png",
    alt: "Schema Designer",
  },
  {
    src: "/image/sqlite-portables/Picture 17 - SQL Explorer Console.png",
    alt: "SQL Explorer Console",
  },
  {
    src: "/image/sqlite-portables/Picture 18 - Selected Table.png",
    alt: "Selected Table",
  },
  {
    src: "/image/sqlite-portables/Picture 19 - Selected Table Insights.png",
    alt: "Selected Table Insights",
  },
  {
    src: "/image/sqlite-portables/Picture 20 - Selected Table Insert New Record.png",
    alt: "Insert New Record",
  },
  {
    src: "/image/sqlite-portables/Picture 21 - Selected Table Edit New Record.png",
    alt: "Edit Record",
  },
];

export const certificates: CertificateItem[] = [
  {
    image: "/certificates/certificates-deployment.jpg",
    alt: "Certificate of Deployment - Logan M. Panucat",
    title: "Certificate of Deployment",
    description:
      "Certificate awarded to Logan M. Panucat for successful system deployment and project completion.",
    category: "Deployment",
    tags: ["Professional", "System Deployment"],
  },
  {
    image: "/certificates/certificates-deployment1.jpg",
    alt: "Certificate of Deployment - Dudz Hardware Store",
    title: "Dudz Hardware Store Deployment",
    description:
      "Certificate of deployment for Dudz Hardware Store system successfully completed by the development team.",
    category: "Deployment",
    tags: ["Professional", "Team Project"],
  },
  {
    image: "/certificates/certificates-nextjs-web.jpg",
    alt: "Next.js Certificate",
    title: "Next.js Certification",
    description:
      "Professional certification in Next.js development and React framework.",
    category: "Next.js",
    tags: ["Technical", "React"],
  },
  {
    image: "/certificates/certificates-1-nextjs-web.jpg",
    alt: "Next.js Advanced Certificate",
    title: "Next.js App Router Fundamentals",
    description:
      "Official Next.js certification covering App Router fundamentals, modern routing patterns, and advanced Next.js features.",
    category: "Next.js",
    tags: ["Technical", "App Router"],
  },
  {
    image: "/certificates/certificates-udemy.jpg",
    alt: "Udemy Certificate",
    title: "Udemy Course Completion",
    description:
      "Certificate of completion for advanced web development courses.",
    category: "Udemy",
    tags: ["Learning", "Web Development"],
  },
];

export const services: ServiceItem[] = [
  {
    title: "Full-Stack Web Systems",
    description: "Design and implement responsive, high-performance web applications and dashboards customized for business operations.",
    features: [
      "Custom business dashboards & portals",
      "Robust state management (React / Next.js / TanStack)",
      "Secure API development & integration",
      "Dynamic frontend user experiences"
    ],
    accent: "from-white/5 to-transparent"
  },
  {
    title: "Database Design & Optimization",
    description: "Build robust, clean schemas and performant queries that keep business data safe and quickly accessible.",
    features: [
      "ACID compliant migrations & structures",
      "Efficient object-relational mapping (Prisma, Entity Framework)",
      "High performance indexing & query optimization",
      "Relational databases (MySQL, PostgreSQL, SQL Server)"
    ],
    accent: "from-white/5 to-transparent"
  },
  {
    title: "Secure Auth & Integrations",
    description: "Protect systems and user data with secure session tokens, 2FA, and third-party authentication services.",
    features: [
      "JWT-based security sessions & scopes",
      "Social single sign-on (Google Identity, OAuth)",
      "Two-factor OTP email verification (PHPMailer)",
      "Real-time sockets & messaging (SignalR, WebSockets)"
    ],
    accent: "from-white/5 to-transparent"
  },
  {
    title: "Systems Admin & Deployment",
    description: "Configure infrastructure, automate installations, monitor performance, and deploy software securely.",
    features: [
      "OS setup, resource management, and hardening",
      "Continuous integration & Git repository workflows",
      "Automated server backups and health checks",
      "Serverless deployment configurations (Vercel, Netlify)"
    ],
    accent: "from-white/5 to-transparent"
  }
];
