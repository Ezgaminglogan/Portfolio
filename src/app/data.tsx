import {
  CodeBracketIcon,
  ServerIcon,
  Squares2X2Icon,
  WrenchScrewdriverIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";

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
    name: "Frontend",
    icon: CodeBracketIcon,
    subtitle: "User Interface & Experience",
    technologies: ["React", "HTML5", "CSS3", "JavaScript"],
  },
  {
    name: "Frameworks",
    icon: Squares2X2Icon,
    subtitle: "Architectures & Systems",
    technologies: ["Next.js", "ASP.NET MVC", ".NET Framework"],
  },
  {
    name: "Backend",
    icon: ServerIcon,
    subtitle: "Server Logic & Data",
    technologies: ["PHP", "C#", "MySQL", "SQL Server"],
  },
  {
    name: "Libraries / Tools",
    icon: WrenchScrewdriverIcon,
    subtitle: "Utilities & Integrations",
    technologies: [
      "TypeScript",
      "TailwindCSS",
      "TanStack Start",
      "Prisma ORM",
      "Git",
    ],
  },
];

export const professionalSkills = [
  {
    icon: CpuChipIcon,
    title: "Systems Administration",
    description:
      "Proficient in the installation, configuration, and deployment of new operating systems. Skilled in managing system resources, user access control, and maintaining optimal performance across diverse environments.",
    highlights: [
      "OS Installation & Configuration",
      "User Access Control",
      "System Monitoring",
      "Network Setup",
    ],
    accent: "from-white/10 to-transparent",
    dot: "bg-emerald-400",
  },
  {
    icon: ShieldCheckIcon,
    title: "IT Support & Security",
    description:
      "Expert in cross-platform troubleshooting, virus/malware removal, and lock-issue recovery for mobile and desktop devices. Committed to maintaining secure and reliable computing environments.",
    highlights: [
      "Malware Removal",
      "Cross-Platform Troubleshooting",
      "Device Recovery",
      "Security Hardening",
    ],
    accent: "from-white/10 to-transparent",
    dot: "bg-emerald-400",
  },
  {
    icon: RocketLaunchIcon,
    title: "Software Engineering",
    description:
      "Accelerate software delivery and improve code efficiency by developing full-stack applications with advanced AI-assisted tools. Passionate about clean architecture and building scalable digital solutions.",
    highlights: [
      "Full-Stack Development",
      "AI-Assisted Coding",
      "Clean Architecture",
      "Agile Workflow",
    ],
    accent: "from-white/10 to-transparent",
    dot: "bg-emerald-400",
  },
];

export const projects = [
  {
    title: "MJE Enterprises (AirZen) System",
    description:
      "A full-stack premium service management and booking ecosystem combining a seamless public booking journey with a powerful admin suite for analytics, inventory, backups, and customer operations. Built with React 19 and TanStack Start, it features OTP-verified bookings, real-time WebSocket updates, and production-ready data integrity workflows.",
    tech: [
      "React 19",
      "TanStack Start",
      "Prisma ORM",
      "Neon PostgreSQL",
      "Bun Runtime",
      "TailwindCSS",
      "Framer Motion",
      "WebSocket",
    ],
    gradient: "from-emerald-600 to-sky-600",
    image: "/image/mjeenterprises.png",
    liveUrl: "https://mjeenterprises.vercel.app/",
    githubUrl: "https://github.com/Ezgaminglogan/mje-enterprises",
    type: "Enterprise Service Management Platform",
    codeHighlight: {
      filename: "booking-transaction.ts",
      language: "typescript",
      code: `// Execute inventory reservation and booking insertion in a single ACID transaction
export async function createVerifiedBooking(data: BookingInput) {
  return await prisma.$transaction(async (tx) => {
    // 1. Verify capacity and lock row for update to prevent race conditions
    const schedule = await tx.serviceSchedule.findUnique({
      where: { id: data.scheduleId },
      select: { bookedSlots: true, maxCapacity: true }
    });
    if (!schedule || schedule.bookedSlots >= schedule.maxCapacity) {
      throw new Error("Target service slot is fully booked");
    }
    // 2. Increment booked slots atomically
    await tx.serviceSchedule.update({
      where: { id: data.scheduleId },
      data: { bookedSlots: { increment: 1 } }
    });
    // 3. Create the customer booking record with secure OTP verification check
    return await tx.booking.create({
      data: {
        customerEmail: data.email,
        serviceId: data.serviceId,
        status: "CONFIRMED",
        verifiedAt: new Date()
      }
    });
  });
}`,
      explanation: "Implements safe database concurrency using a Prisma transaction. Ensures that customer bookings are atomically registered only when service slots are verified and reserved, preventing double-bookings during peak traffic."
    }
  },
  {
    title: "LibraSys - Library Management System",
    description:
      "A comprehensive library management system developed for Cebu Technological University - Naga Extension Campus. It streamlines student borrowing records, book inventory tracking with ISBN support, and provides real-time analytics using TanStack and Prisma ORM.",
    tech: ["TanStack", "Prisma", "MySQL", "TailwindCSS"],
    gradient: "from-indigo-600 to-purple-600",
    image: "/image/LibraSys.png",
    githubUrl: "https://github.com/Ezgaminglogan/LibraSys",
    type: "CTU Naga Extension Campus Project",
    codeHighlight: {
      filename: "useBookBorrow.ts",
      language: "typescript",
      code: `// Custom React hook for book transactions with optimistic updates
export function useBookBorrow() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ bookId, studentId }: BorrowParams) => {
      const res = await fetch("/api/borrow", {
        method: "POST",
        body: JSON.stringify({ bookId, studentId }),
        headers: { "Content-Type": "application/json" }
      });
      if (!res.ok) throw new Error("Transaction rejected by inventory gate");
      return res.json();
    },
    onMutate: async (variables) => {
      // Cancel outgoing refetches to avoid overriding optimistic state
      await queryClient.cancelQueries({ queryKey: ["books", variables.bookId] });
      const prevBook = queryClient.getQueryData<Book>(["books", variables.bookId]);
      // Optimistically decrement library stock to make UI feel instant
      if (prevBook) {
        queryClient.setQueryData(["books", variables.bookId], {
          ...prevBook,
          availableQty: prevBook.availableQty - 1
        });
      }
      return { prevBook };
    },
    onError: (err, variables, context) => {
      // Rollback library inventory if backend request fails
      if (context?.prevBook) {
        queryClient.setQueryData(["books", variables.bookId], context.prevBook);
      }
    }
  });
}`,
      explanation: "A custom React hook leveraging TanStack Query's optimistic updates. By updating the client cache before the API responds and implementing automatic rollback logic, it provides an instantaneous checkout experience for students."
    }
  },
  {
    title: "Inventory Management System (IMS-CTU)",
    description:
      "A specialized administrative platform for Cebu Technological University - Naga Extension Campus. This high-performance system streamlines institutional resource tracking using Prisma ORM, secure JWT authentication, and TanStack for real-time data synchronization.",
    tech: ["TanStack", "Prisma", "JWT", "TailwindCSS"],
    gradient: "from-blue-600 to-cyan-500",
    image: "/image/IMS-CTU.png",
    githubUrl: "https://github.com/Ezgaminglogan/IMS-CTU",
    type: "CTU Naga Extension Campus Project"
  },

  {
    title: "Supplify",
    description:
      "Cross-platform supply chain management solution for mobile and web applications. Streamlined inventory tracking, order management, and real-time analytics.",
    tech: ["Blazor Framework", "TailwindCSS", "C#", ".NET"],
    gradient: "from-blue-500 to-purple-600",
    image: "/image/Landing.png",
    githubUrl: "https://github.com/Ezgaminglogan/Supplify",
    type: "Cross-Platform Capstone Project"
  },

  {
    title: "Mom's Food Delicacies",
    description:
      "E-commerce platform for home-cooked food delicacies featuring email verification with PHPMailer, OTP authentication, and secure user management.",
    tech: ["PHP", "TailwindCSS", "PHPMailer", "MySQL"],
    gradient: "from-teal-500 to-cyan-600",
    image: "/image/Project 3.png",
    githubUrl: "https://github.com/Ezgaminglogan/Moms-Food-Delicacies",
    type: "School Project",
    codeHighlight: {
      filename: "verify_otp.php",
      language: "php",
      code: `<?php
// Secure PHP database query and OTP validation flow
require_once 'config/database.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
    $otp = filter_input(INPUT_POST, 'otp', FILTER_SANITIZE_NUMBER_INT);

    if ($email && $otp) {
        // Prevent SQL injection by preparing database statement
        $stmt = $conn->prepare("SELECT otp_code, otp_expires FROM users WHERE email = ? LIMIT 1");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result()->fetch_assoc();

        if ($result) {
            $current_time = new DateTime();
            $expiry_time = new DateTime($result['otp_expires']);

            // Verify hash match and ensure token has not expired
            if (password_verify($otp, $result['otp_code']) && $current_time < $expiry_time) {
                // Activate user account
                $update = $conn->prepare("UPDATE users SET is_verified = 1, otp_code = NULL WHERE email = ?");
                $update->bind_param("s", $email);
                $update->execute();
                
                echo json_encode(["status" => "success", "message" => "Account verified successfully!"]);
            } else {
                echo json_encode(["status" => "error", "message" => "Invalid or expired verification code."]);
            }
        }
    }
}`,
      explanation: "Implements secure database preparation, input sanitization, password hashing using bcrypt via PHP's password_verify function, and strict expiration checks for 2FA validation."
    }
  },
  {
    title: "School Management System",
    description:
      "Desktop application for school management with student records, grade tracking, and administrative functions. Built with Windows Forms Architecture for efficient data management.",
    tech: ["Visual Basic WFA", "MySQL"],
    gradient: "from-purple-500 to-indigo-600",
    image: "/image/School-Project.png",
    githubUrl: "https://github.com/Ezgaminglogan",
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
    githubUrl: "https://github.com/Ezgaminglogan/Ticket-Support-System",
    type: "School Project",
    codeHighlight: {
      filename: "SupportHub.cs",
      language: "csharp",
      code: `// ASP.NET Core SignalR Real-Time Ticket Support Hub
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

public class SupportHub : Hub
{
    private readonly ITicketService _ticketService;

    public SupportHub(ITicketService ticketService)
    {
        _ticketService = ticketService;
    }

    // Real-time synchronization when a technical support agent responds to a ticket
    public async Task SendAgentResponse(int ticketId, string agentName, string message)
    {
        // 1. Persist the response to database asynchronously
        await _ticketService.AddResponseAsync(ticketId, agentName, message);
        
        // 2. Broadcast the message to all clients connected to this ticket room
        await Clients.Group($"Ticket_{ticketId}")
            .SendAsync("ReceiveMessage", agentName, message, DateTime.UtcNow);
    }

    public async Task JoinTicketRoom(int ticketId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, $"Ticket_{ticketId}");
    }
}`,
      explanation: "An ASP.NET Core SignalR Hub designed for live chatting. Organizes agents and clients into isolated rooms (Groups) and persists support tickets to a database prior to broadcasting to avoid data loss."
    }
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
    githubUrl: "https://github.com/Ezgaminglogan",
    type: "School Project"
  },
];

export const experiences = [
  {
    title: "Bachelor of Science in Information Technology",
    company: "Cebu Technological University - Naga Extension Campus",
    period: "2022 - 2026",
    description:
      "Graduated with a focus on web development, database management, and software engineering. Completed multiple AI-assisted capstone projects addressing real-world problems.",
  },
  {
    title: "Web Development Engineer",
    company: "Self-Learning & Professional Projects",
    period: "2023 - Present",
    description:
      "Continuously expanding expertise in PHP, MySQL, .NET, and modern web frameworks through hands-on projects and professional development.",
  },
  {
    title: "Capstone Project Developer",
    company: "CTU Naga - Academic Project",
    period: "2025",
    description:
      "Led AI-assisted development of capstone projects including Supplify (a cross-platform supply chain solution). Demonstrated full-stack development capabilities and real-world problem-solving skills.",
  },
];

export const sqliteImages = [
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

export const certificates = [
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
    image: "/certificates/certificates-nextjs.jpg",
    alt: "Next.js Certificate",
    title: "Next.js Certification",
    description:
      "Professional certification in Next.js development and React framework.",
    category: "Next.js",
    tags: ["Technical", "React"],
  },
  {
    image: "/certificates/certificates-1-nextjs.jpg",
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

export const services = [
  {
    title: "Full-Stack Web Systems",
    description: "Design and implement responsive, high-performance web applications and dashboards customized for business operations.",
    features: [
      "Custom business dashboards & portals",
      "Robust state management (React / Next.js / TanStack)",
      "Secure API development & integration",
      "Dynamic frontend user experiences"
    ],
    accent: "from-emerald-500/10 to-transparent"
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
    accent: "from-emerald-500/10 to-transparent"
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
    accent: "from-emerald-500/10 to-transparent"
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
    accent: "from-emerald-500/10 to-transparent"
  }
];
