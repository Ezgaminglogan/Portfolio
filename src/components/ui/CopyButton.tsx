"use client";

import { useState } from "react";
import { CheckIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";

export default function CopyButton({ value, label }: { value: string; label: string }) {
  const [result, setResult] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setResult("copied");
    } catch {
      setResult("failed");
    }
    setTimeout(() => setResult("idle"), 2500);
  }

  return (
    <button type="button" onClick={copy} className="btn btn-outline h-11 shrink-0 px-3">
      {result === "copied" ? (
        <CheckIcon className="h-4 w-4 text-emerald" aria-hidden="true" />
      ) : (
        <DocumentDuplicateIcon className="h-4 w-4" aria-hidden="true" />
      )}
      <span aria-live="polite">
        {result === "copied" ? "Copied" : result === "failed" ? "Copy failed" : "Copy"}
      </span>
      <span className="sr-only"> {label}</span>
    </button>
  );
}
