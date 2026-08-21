"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

interface NavItem {
  label: string;
  id: string;
}

const NAV_ITEMS: readonly NavItem[] = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Stacks", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "SQLite Portable", id: "sqlite-portable" },
  { label: "Experience", id: "experience" },
  { label: "Certificates", id: "certificates" },
  { label: "Contact", id: "contact" },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.id);
    const elements: HTMLElement[] = [];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0,
      }
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) {
        elements.push(el);
        observer.observe(el);
      }
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        closeMobileMenu();
        buttonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [mobileMenuOpen, closeMobileMenu]);

  return (
    <nav className="fixed top-0 w-full bg-[#06080e]/90 backdrop-blur-xl z-50 border-b border-white/10 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#"
          className="text-white text-sm font-bold tracking-wider uppercase flex items-center gap-2 group"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.9)] animate-pulse" />
          <span className="group-hover:text-slate-300 transition-colors">
            Logan M. Panucat
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-1 text-xs uppercase tracking-wider font-semibold">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`transition-all duration-300 py-1.5 px-3 rounded-full border ${
                activeSection === item.id
                  ? "text-white bg-blue-500/15 border-blue-400/30 shadow-[0_0_15px_rgba(59,130,246,0.25)] font-bold"
                  : "text-zinc-400 border-transparent hover:text-white hover:bg-white/5"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          ref={buttonRef}
          type="button"
          className="lg:hidden p-2 -mr-2 text-zinc-400 hover:text-white focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? (
            <XMarkIcon className="w-5 h-5" />
          ) : (
            <Bars3Icon className="w-5 h-5" />
          )}
        </button>
      </div>
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden px-6 py-4 bg-[#06080e]/98 backdrop-blur-xl border-t border-white/10 flex flex-col gap-3 text-xs uppercase tracking-wider font-semibold"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`transition-all duration-300 py-2 px-3 rounded-lg ${
                activeSection === item.id
                  ? "text-white font-bold bg-blue-500/15 border border-blue-400/30"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
              onClick={closeMobileMenu}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
