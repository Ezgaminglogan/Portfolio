"use client";
import { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = [
      "home",
      "about",
      "skills",
      "projects",
      "sqlite-portable",
      "experience",
      "certificates",
      "contact",
    ];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "SQLite Portable", id: "sqlite-portable" },
    { label: "Experience", id: "experience" },
    { label: "Certificates", id: "certificates" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-black/50 backdrop-blur-xl z-50 border-b border-white/5 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="text-lg font-semibold tracking-tight text-white hover:text-zinc-300 transition-colors">
          Logan
        </span>
        <div className="hidden lg:flex gap-8 text-sm font-medium">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={activeSection === item.id ? "page" : undefined}
              className={`transition-colors py-2 ${
                activeSection === item.id
                  ? "text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
        <button
          type="button"
          className="lg:hidden p-2 -mr-2 text-zinc-400 hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? <XMarkIcon className="w-5 h-5" /> : <Bars3Icon className="w-5 h-5" />}
        </button>
      </div>
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden px-6 py-4 bg-black/95 backdrop-blur-xl border-t border-white/5 flex flex-col gap-4 text-sm"
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-zinc-400 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
