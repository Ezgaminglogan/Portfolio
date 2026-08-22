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

  // High-accuracy scroll spy for reliable active section tracking
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;

          // 1. Guaranteed "Home" lock when near or at the top of page
          if (scrollY < 120) {
            setActiveSection("home");
            ticking = false;
            return;
          }

          // 2. Check each section from bottom to top
          const navbarOffset = 110;
          const sectionIds = NAV_ITEMS.map((item) => item.id);
          let current = "home";

          for (const id of sectionIds) {
            const el = document.getElementById(id);
            if (el) {
              const top = el.getBoundingClientRect().top + scrollY - navbarOffset;
              if (scrollY >= top) {
                current = id;
              }
            }
          }

          setActiveSection(current);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      closeMobileMenu();

      if (id === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (window.history.pushState) {
          window.history.pushState(null, "", window.location.pathname);
        }
        setActiveSection("home");
        return;
      }

      const element = document.getElementById(id);
      if (element) {
        const navbarHeight = 72;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        if (window.history.pushState) {
          window.history.pushState(null, "", `#${id}`);
        }
        setActiveSection(id);
      }
    },
    [closeMobileMenu]
  );

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
    <nav className="fixed top-0 w-full bg-white/85 backdrop-blur-xl z-50 border-b border-slate-200/80 transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.03)]">
      <div className="w-full max-w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 h-16 flex items-center justify-between">
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "home")}
          className="text-slate-900 text-sm font-bold tracking-wider uppercase flex items-center gap-2 group cursor-pointer"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.7)] animate-pulse" />
          <span className="group-hover:text-blue-600 transition-colors">
            Logan M. Panucat
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-1 text-xs uppercase tracking-wider font-semibold">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`transition-all duration-300 py-1.5 px-3 rounded-full border cursor-pointer ${
                activeSection === item.id
                  ? "text-blue-600 bg-blue-50 border-blue-200 shadow-[0_0_15px_rgba(37,99,235,0.12)] font-bold"
                  : "text-slate-600 border-transparent hover:text-slate-950 hover:bg-slate-100/80"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          ref={buttonRef}
          type="button"
          className="lg:hidden p-2 -mr-2 text-slate-600 hover:text-slate-950 focus:outline-none cursor-pointer"
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
          className="lg:hidden px-6 py-4 bg-white/98 backdrop-blur-xl border-t border-slate-200 flex flex-col gap-2 text-xs uppercase tracking-wider font-semibold shadow-lg"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`transition-all duration-300 py-2.5 px-3.5 rounded-lg cursor-pointer ${
                activeSection === item.id
                  ? "text-blue-600 font-bold bg-blue-50 border border-blue-200"
                  : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
