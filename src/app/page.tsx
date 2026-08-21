import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import TechnicalBlueprintBackground from "@/components/ui/TechnicalBlueprintBackground";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SqlitePortableSection from "@/components/sections/SqlitePortableSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import CertificatesSection from "@/components/sections/CertificatesSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#06080e] text-zinc-200 font-sans selection:bg-blue-500/25 selection:text-blue-100 relative">
      {/* Technical Architecture Blueprint Background */}
      <TechnicalBlueprintBackground />

      <Navigation />

      <main className="max-w-7xl mx-auto px-6 relative">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
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
