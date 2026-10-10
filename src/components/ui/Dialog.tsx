"use client";

import { useId, useRef, type ReactNode } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

/**
 * Native modal <dialog>: the browser provides the focus trap, Escape to close,
 * inert background and focus return to the trigger. Content is server-rendered
 * children, so only the open/close wiring ships as JS.
 */
export default function Dialog({
  trigger,
  triggerClassName,
  title,
  children,
}: {
  trigger: ReactNode;
  triggerClassName: string;
  title: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  return (
    <>
      <button type="button" className={triggerClassName} onClick={() => ref.current?.showModal()}>
        {trigger}
      </button>
      <dialog
        ref={ref}
        aria-labelledby={titleId}
        // Close on clicks outside the dialog box (the backdrop). Checking coordinates
        // rather than e.target means dragging the dialog's scrollbar never closes it.
        onClick={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) {
            e.currentTarget.close();
          }
        }}
        // The dialog is the only scroll container (no nested scroller), and the
        // header stays pinned so Close is always reachable.
        className="m-auto max-h-[calc(100dvh-2rem)] w-[min(60rem,calc(100%-2rem))] overflow-y-auto overscroll-contain rounded-lg border-2 border-ink bg-white p-0 text-ink shadow-hard backdrop:bg-forest/80"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b-2 border-ink bg-white px-5 py-4 sm:px-8">
          <h2 id={titleId} className="text-2xl font-black tracking-tight sm:text-3xl">
            {title}
          </h2>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border-2 border-ink text-ink shadow-hard-sm hover:bg-sage"
          >
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            <span className="sr-only">Close</span>
          </button>
        </div>
        <div className="p-5 sm:p-8">{children}</div>
      </dialog>
    </>
  );
}
