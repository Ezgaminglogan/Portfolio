"use client";

import { useEffect, useRef, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const NAV_ITEMS = [
  { label: "Projects", id: "projects" },
  { label: "More Work", id: "more-work" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Certificates", id: "certificates" },
  { label: "Contact", id: "contact" },
];

export default function Navigation() {
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  // Highlight the section crossing the middle band of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const el of document.querySelectorAll("main > section[id]")) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const links = (className: string) =>
    NAV_ITEMS.map(({ label, id }) => (
      <a
        key={id}
        href={`#${id}`}
        onClick={() => setMenuOpen(false)}
        aria-current={active === id ? "true" : undefined}
        className={`${className} border-2 ${
          active === id
            ? "border-white bg-mint text-ink"
            : "border-transparent text-white/80 hover:border-white/60 hover:text-white"
        }`}
      >
        {label}
      </a>
    ));

  return (
    <header className="on-forest fixed inset-x-0 top-0 z-40 border-b-2 border-mint bg-forest">
      <nav aria-label="Main" className="shell flex h-16 items-center justify-between">
        <a href="#top" className="inline-flex min-h-11 items-center font-mono text-sm font-bold whitespace-nowrap text-white">
          Logan M. Panucat
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links("rounded-md px-3 py-1.5 text-sm font-semibold whitespace-nowrap transition-colors")}
        </div>

        <button
          ref={menuButton}
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border-2 border-white text-white hover:bg-white/10 md:hidden"
        >
          {menuOpen ? <XMarkIcon className="h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="h-6 w-6" aria-hidden="true" />}
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
        </button>
      </nav>

      <div id="mobile-menu" hidden={!menuOpen} className="border-t-2 border-white/20 md:hidden">
        <div className="shell flex flex-col gap-1 py-3">
          {links("rounded-md px-3 py-2.5 text-base font-semibold")}
        </div>
      </div>
    </header>
  );
}
