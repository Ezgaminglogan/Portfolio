"use client";

import { useEffect, useRef } from "react";
import { lockScroll, unlockScroll } from "@/components/SmoothScroll";

const FOCUSABLE =
  'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

/**
 * Shared modal behavior: locks page scroll (Lenis + body), closes on Escape,
 * focuses the first control on open, traps Tab inside, and restores focus
 * to the previously focused element on close.
 * Attach the returned ref to the dialog container; give it tabIndex={-1}
 * so it can take focus when it contains no focusable elements.
 */
export function useModal(open: boolean, onClose: () => void) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    lockScroll();

    const focusables = () =>
      Array.from(dialog?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);

    (focusables()[0] ?? dialog)?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialog) return;
      const items = focusables();
      if (!items.length) {
        e.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (!dialog.contains(active)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown, true);
    return () => {
      window.removeEventListener("keydown", onKeyDown, true);
      unlockScroll();
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  return dialogRef;
}
