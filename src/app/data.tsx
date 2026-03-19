import {
  CodeBracketIcon,
  CpuChipIcon,
  ServerIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";

export const TYPEWRITER_WORDS = [
  "A Full Stack Developer",
  "A Vibe Coder",
  "An UI/UX Enthusiast",
  "A Problem Solver",
];

export const TECH_ICONS: Record<string, string> = {
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
};

export const skills = [
  {
    name: ".NET Developer",
    icon: CpuChipIcon,
    subtitle: "Enterprise & Desktop Algorithms",
    technologies: [
      "C#",
      "ASP.NET MVC",
      ".NET Framework",
      "Entity Framework",
      "Blazor",
      "SQL Server"
    ],
  },
  {
    name: "Full Stack Developer",
    icon: CodeBracketIcon,
    subtitle: "Modern Web & APIs",
    technologies: [
      "Next.js",
      "TanStack Query",
      "PHP",
      "MySQL",
      "TailwindCSS"
    ],
  }
];

export const projects = [
  {
    title: "LibraSys - Library Management System",
    description:
      "A comprehensive library management system developed for Cebu Technological University - Naga Extension Campus. It streamlines student borrowing records, book inventory tracking with ISBN support, and provides real-time analytics using TanStack Query and Prisma ORM.",
    tech: ["React", "TypeScript", "TanStack", "Prisma", "MySQL", "TailwindCSS"],
    gradient: "from-indigo-600 to-purple-600",
    image: "/image/LibraSys.png",
    type: "CTU Naga Extension Campus Project",
  },
  {
    title: "Inventory Management System (IMS-CTU)",
    description:
      "A specialized administrative platform for Cebu Technological University - Naga Extension Campus. This high-performance system streamlines institutional resource tracking using Prisma ORM, secure JWT authentication, and TanStack Query for real-time data synchronization.",
    tech: ["Next.js", "Prisma", "TanStack Query", "JWT", "TailwindCSS"],
    gradient: "from-blue-600 to-cyan-500",
    image: "/image/IMS-CTU.png",
    type: "CTU Naga Extension Campus Project",
  },
  {
    title: "E-Industria",
    description:
      "A comprehensive web-based platform for industrial supplies, manpower services, and business management. Designed to solve real-world problems in industrial operations.",
    tech: ["PHP", "TailwindCSS", "MySQL"],
    gradient: "from-emerald-500 to-teal-600",
    image: "/image/Capstone Project.png",
    type: "Capstone Project",
  },
  {
    title: "Supplify",
    description:
      "Cross-platform supply chain management solution for mobile and web applications. Streamlined inventory tracking, order management, and real-time analytics.",
    tech: ["Blazor Framework", "TailwindCSS", "C#", ".NET"],
    gradient: "from-blue-500 to-purple-600",
    image: "/image/Landing.png",
    type: "Cross-Platform Capstone Project",
  },
  {
    title: "ByteBuilder",
    description:
      "Web-based personal computer modeling and simulation platform with rule-based custom recommendations. Helps users build their dream PC with intelligent suggestions.",
    tech: ["PHP", "Bootstrap", "MySQL"],
    gradient: "from-green-500 to-emerald-600",
    image: "/image/Capstone Project 2.png",
    type: "Capstone Project",
  },
  {
    title: "Mom's Food Delicacies",
    description:
      "E-commerce platform for home-cooked food delicacies featuring email verification with PHPMailer, OTP authentication, and secure user management.",
    tech: ["PHP", "TailwindCSS", "PHPMailer", "MySQL"],
    gradient: "from-teal-500 to-cyan-600",
    image: "/image/Project 3.png",
    type: "School Project",
  },
  {
    title: "School Management System",
    description:
      "Desktop application for school management with student records, grade tracking, and administrative functions. Built with Windows Forms Architecture for efficient data management.",
    tech: ["Visual Basic WFA", "MySQL"],
    gradient: "from-purple-500 to-indigo-600",
    image: "/image/School-Project.png",
    type: "School Project",
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
    type: "School Project",
  },
  {
    title: "Luto",
    description:
      "Modern Blazor web application with Entity Framework Core for data management and Google Sign-In authentication. Demonstrates advanced component-based development and seamless user experience.",
    tech: ["Blazor Framework", "EF Core", "Google Sign-In", "C#", ".NET", "TailwindCSS"],
    gradient: "from-yellow-500 to-amber-600",
    image: "/image/Luto-System.png",
    type: "School Project",
  },
];

export const experiences = [
  {
    title: "Bachelor of Science in Information Technology",
    company: "Cebu Technological University - Naga Extension Campus",
    period: "2022 - Present",
    description:
      "Currently in 4th year, focusing on web development, database management, and software engineering. Completed multiple capstone projects addressing real-world problems.",
  },
  {
    title: "Capstone Project Developer",
    company: "CTU Naga - Academic Project",
    period: "2025",
    description:
      "Led development of multiple capstone projects including E-Industria (industrial supply management platform), Supplify (cross-platform supply chain solution), and ByteBuilder (PC building recommendation system). Demonstrated full-stack development capabilities and real-world problem-solving skills.",
  },
  {
    title: "Web Development Student",
    company: "Self-Learning & Academic Projects",
    period: "2023 - Present",
    description:
      "Building expertise in PHP, MySQL, .NET, and modern web frameworks through hands-on projects and continuous learning.",
  },
];

export const sqliteImages = [
  { src: "/image/sqlite-portables/Picture 1 - Landing Page Dark Mode.png", alt: "Landing Page Dark Mode" },
  { src: "/image/sqlite-portables/Picture 1 - Landing Page Light Mode.png", alt: "Landing Page Light Mode" },
  { src: "/image/sqlite-portables/Picture 2 - SQL Explorer.png", alt: "SQL Explorer" },
  { src: "/image/sqlite-portables/Picture 3 - Create Database.png", alt: "Create Database" },
  { src: "/image/sqlite-portables/Picture 4 - Connection Online.png", alt: "Connection Online" },
  { src: "/image/sqlite-portables/Picture 5 - Connection Offline.png", alt: "Connection Offline" },
  { src: "/image/sqlite-portables/Picture 6 - Integration PHP.png", alt: "Integration PHP" },
  { src: "/image/sqlite-portables/Picture 7 - Integration Python.png", alt: "Integration Python" },
  { src: "/image/sqlite-portables/Picture 8 - Integration C%23.png", alt: "Integration C#" },
  { src: "/image/sqlite-portables/Picture 9 - Integration Javascript.png", alt: "Integration JavaScript" },
  { src: "/image/sqlite-portables/Picture 10 - Integration Typescript.png", alt: "Integration TypeScript" },
  { src: "/image/sqlite-portables/Picture 11 - Integration SQL.png", alt: "Integration SQL" },
  { src: "/image/sqlite-portables/Picture 12 - System Status.png", alt: "System Status" },
  { src: "/image/sqlite-portables/Picture 13 - Database Selected Landing Page.png", alt: "Database Selected Landing Page" },
  { src: "/image/sqlite-portables/Picture 14 - Create New Table.png", alt: "Create New Table" },
  { src: "/image/sqlite-portables/Picture 15 - Create Table - Relationships.png", alt: "Create Table Relationships" },
  { src: "/image/sqlite-portables/Picture 16 - Schema Designer.png", alt: "Schema Designer" },
  { src: "/image/sqlite-portables/Picture 17 - SQL Explorer Console.png", alt: "SQL Explorer Console" },
  { src: "/image/sqlite-portables/Picture 18 - Selected Table.png", alt: "Selected Table" },
  { src: "/image/sqlite-portables/Picture 19 - Selected Table Insights.png", alt: "Selected Table Insights" },
  { src: "/image/sqlite-portables/Picture 20 - Selected Table Insert New Record.png", alt: "Insert New Record" },
  { src: "/image/sqlite-portables/Picture 21 - Selected Table Edit New Record.png", alt: "Edit Record" },
];

export const certificates = [
  {
    image: "/certificates/certificates-deployment.jpg",
    alt: "Certificate of Deployment - Logan M. Panucat",
    title: "Certificate of Deployment",
    description: "Certificate awarded to Logan M. Panucat for successful system deployment and project completion.",
    category: "Deployment",
    tags: ["Professional", "System Deployment"],
  },
  {
    image: "/certificates/certificates-deployment1.jpg",
    alt: "Certificate of Deployment - Dudz Hardware Store",
    title: "Dudz Hardware Store Deployment",
    description: "Certificate of deployment for Dudz Hardware Store system successfully completed by the development team.",
    category: "Deployment",
    tags: ["Professional", "Team Project"],
  },
  {
    image: "/certificates/certificates-nextjs.jpg",
    alt: "Next.js Certificate",
    title: "Next.js Certification",
    description: "Professional certification in Next.js development and React framework.",
    category: "Next.js",
    tags: ["Technical", "React"],
  },
  {
    image: "/certificates/certificates-1-nextjs.jpg",
    alt: "Next.js Advanced Certificate",
    title: "Next.js App Router Fundamentals",
    description: "Official Next.js certification covering App Router fundamentals, modern routing patterns, and advanced Next.js features.",
    category: "Next.js",
    tags: ["Technical", "App Router"],
  },
  {
    image: "/certificates/certificates-udemy.jpg",
    alt: "Udemy Certificate",
    title: "Udemy Course Completion",
    description: "Certificate of completion for advanced web development courses.",
    category: "Udemy",
    tags: ["Learning", "Web Development"],
  },
];
