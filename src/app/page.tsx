"use client";
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
  return (
    <div className="min-h-screen bg-black text-zinc-200 font-sans selection:bg-white/20 selection:text-white">
      <Navigation />

      <main className="max-w-6xl mx-auto px-6">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <SqlitePortableSection />
        <ExperienceSection />
        <CertificatesSection />
        <ContactSection />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
