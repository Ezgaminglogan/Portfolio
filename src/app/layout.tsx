import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://portfolio-665c.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Logan M. Panucat | Full Stack Developer Portfolio",
    template: "%s | Logan M. Panucat",
  },
  description:
    "Logan M. Panucat (Ezgaminglogan) — Full Stack Developer from Carcar City, Cebu, Philippines. Specializing in PHP, MySQL, C#, ASP.NET MVC, .NET Framework, React, Next.js, and TypeScript. BSIT student at CTU Naga. View my projects, skills, and experience.",
  keywords: [
    "Logan Panucat",
    "Logan M. Panucat",
    "Ezgaminglogan",
    "ezgaminglogan",
    "Full Stack Developer",
    "Web Developer",
    "PHP Developer",
    "C# Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "ASP.NET MVC",
    ".NET Framework",
    "MySQL",
    "Cebu Developer",
    "Filipino Developer",
    "Carcar City",
    "CTU Naga",
    "BSIT",
    "Portfolio",
    "Frontend Developer",
    "Backend Developer",
    "Node.js",
    "JavaScript",
    "TailwindCSS",
    "Blazor Framework",
  ],
  authors: [{ name: "Logan M. Panucat", url: SITE_URL }],
  creator: "Logan M. Panucat",
  publisher: "Logan M. Panucat",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "Logan M. Panucat | Full Stack Developer Portfolio",
    description:
      "Logan M. Panucat (Ezgaminglogan) — Full Stack Developer from Cebu, Philippines. Building modern web applications with PHP, C#, React, Next.js, and TypeScript. View my projects and experience.",
    siteName: "Logan M. Panucat — Portfolio",
    images: [
      {
        url: "/portfolio.png",
        width: 1200,
        height: 630,
        alt: "Logan M. Panucat — Full Stack Developer Portfolio",
        type: "image/png",
      },
      {
        url: "/image/profile.jpg",
        width: 800,
        height: 800,
        alt: "Logan M. Panucat — Profile Photo",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Logan M. Panucat | Full Stack Developer",
    description:
      "Full Stack Developer from Cebu, Philippines. PHP, C#, React, Next.js, TypeScript. View my portfolio and projects.",
    images: ["/portfolio.png"],
    creator: "@ezgaminglogan",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/grad-pic.jpg",
    shortcut: "/grad-pic.jpg",
    apple: "/grad-pic.jpg",
  },
  category: "portfolio",
  verification: {
    google: "googlebae7fa9d71fe05c7",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
