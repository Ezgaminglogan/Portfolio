"use client";
import { useState, useEffect, useRef } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sections = [
      "home",
      "about",
      "services",
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

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [mobileMenuOpen]);

  const navItems = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Services", id: "services" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "SQLite Portable", id: "sqlite-portable" },
    { label: "Experience", id: "experience" },
    { label: "Certificates", id: "certificates" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-black/60 backdrop-blur-lg z-50 border-b border-emerald-500/[0.08] transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2.5 group focus:outline-none">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/40 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          </span>
          <span className="text-xs font-extrabold uppercase tracking-widest text-white group-hover:text-emerald-400 transition-colors">
            Logan M. Panucat
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-4 text-xs font-semibold uppercase tracking-wider">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={activeSection === item.id ? "page" : undefined}
              className={`transition-all duration-300 py-1.5 px-3 rounded-full border ${activeSection === item.id
                ? "text-emerald-400 bg-emerald-500/[0.04] border-emerald-500/25 shadow-[0_0_12px_rgba(16,185,129,0.1)]"
                : "text-zinc-500 border-transparent hover:text-emerald-300"
                }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          ref={buttonRef}
          type="button"
          className="lg:hidden p-2 -mr-2 text-zinc-400 hover:text-emerald-400 focus:outline-none"
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
          className="lg:hidden px-6 py-4 bg-black/90 backdrop-blur-xl border-t border-emerald-500/10 flex flex-col gap-4 text-xs uppercase tracking-wider font-semibold"
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`transition-all duration-300 py-2 ${activeSection === item.id
                ? "text-emerald-400"
                : "text-zinc-500 hover:text-emerald-300"
                }`}
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
