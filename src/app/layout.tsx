import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import SmoothScroll from "@/components/SmoothScroll";
import { ViewportProvider } from "@/context/ViewportContext";
import {
  AUTHOR_NAME,
  GOOGLE_SITE_VERIFICATION,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_PATH,
  OG_IMAGE_WIDTH,
  SITE_DESCRIPTION,
  SITE_DESCRIPTION_SHORT,
  SITE_KEYWORDS,
  SITE_LOCALE,
  SITE_NAME,
  SITE_TITLE_DEFAULT,
  SITE_TITLE_TEMPLATE,
  SITE_TWITTER_HANDLE,
  SITE_URL,
} from "@/constants/seo";

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
    default: SITE_TITLE_DEFAULT,
    template: SITE_TITLE_TEMPLATE,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: AUTHOR_NAME, url: SITE_URL }],
  creator: AUTHOR_NAME,
  publisher: AUTHOR_NAME,
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
    locale: SITE_LOCALE,
    url: SITE_URL,
    title: SITE_TITLE_DEFAULT,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE_PATH,
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
        alt: "Logan M. Panucat — Full Stack Developer Portfolio",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Logan M. Panucat | Full Stack Developer",
    description: SITE_DESCRIPTION_SHORT,
    images: [OG_IMAGE_PATH],
    creator: SITE_TWITTER_HANDLE,
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
  category: "portfolio",
  verification: {
    google: GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* JSON-LD is equally valid in <body>; a manual <head> element inside
            <html> is non-standard markup. */}
        <StructuredData />
        <ViewportProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </ViewportProvider>
      </body>
    </html>
  );
}
