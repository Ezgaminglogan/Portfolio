"use client";

import { useState, useEffect } from "react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SqlitePortableSection from "@/components/sections/SqlitePortableSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import CertificatesSection from "@/components/sections/CertificatesSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a global loading state for 2 seconds
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-zinc-200 font-sans selection:bg-white/20 selection:text-white">
      <Navigation />

      <main className="max-w-6xl mx-auto px-6">
        <HeroSection isLoading={isLoading} />
        <AboutSection isLoading={isLoading} />
        <SkillsSection isLoading={isLoading} />
        <ProjectsSection isLoading={isLoading} />
        <SqlitePortableSection isLoading={isLoading} />
        <ExperienceSection isLoading={isLoading} />
        <CertificatesSection isLoading={isLoading} />
        <ContactSection isLoading={isLoading} />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
