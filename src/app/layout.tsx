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

export const metadata: Metadata = {
  title: {
    default: "Logan's Portfolio | Full Stack Developer",
    template: "%s | Logan's Portfolio",
  },
  description:
    "Logan - Full Stack Developer specializing in React, Next.js, TypeScript. Explore my projects, skills, and experience in modern web development.",
  keywords: [
    "Logan",
    "Full Stack Developer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "JavaScript",
    "Portfolio",
    "Frontend Developer",
    "Backend Developer",
  ],
  authors: [{ name: "Logan" }],
  creator: "Logan",
  publisher: "Logan",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://porfolio-665c.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://porfolio-665c.vercel.app",
    title: "Logan's Portfolio | Full Stack Developer",
    description:
      "Logan - Full Stack Developer specializing in React, Next.js, TypeScript. Explore my projects, skills, and experience in modern web development.",
    siteName: "Logan's Portfolio",
    images: [
      {
        url: "/portfolio.png",
        width: 1200,
        height: 630,
        alt: "Logan's Portfolio - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Logan's Portfolio | Full Stack Developer",
    description:
      "Logan - Full Stack Developer specializing in React, Next.js, TypeScript. Explore my projects, skills, and experience in modern web development.",
    images: ["/portfolio.png"],
    creator: "@logan",
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
    icon: "/portfolio.png",
    shortcut: "/portfolio.png",
    apple: "/portfolio.png",
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
