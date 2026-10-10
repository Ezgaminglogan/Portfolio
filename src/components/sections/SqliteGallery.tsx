"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import type { Screenshot } from "@/types";

/** Native scroll-snap strip: swipe, trackpad and keyboard scrolling work without JS; buttons are a convenience. */
export default function SqliteGallery({ images }: { images: Screenshot[] }) {
  const strip = useRef<HTMLUListElement>(null);
  // Smoothness comes from CSS (motion-safe:scroll-smooth), so reduced motion is respected.
  const scroll = (dir: number) => strip.current?.scrollBy({ left: dir * strip.current.clientWidth });

  return (
    // min-w-0: as a grid item it would otherwise grow to the strip's full width.
    <div className="min-w-0">
      <ul
        ref={strip}
        tabIndex={0}
        aria-label="SQLite Portable screenshots (scrollable)"
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-3 motion-safe:scroll-smooth"
      >
        {images.map((img, i) => (
          <li key={img.src} className="w-full shrink-0 snap-start sm:w-[85%]">
            <figure className="overflow-hidden rounded-md border-2 border-ink bg-white">
              <Image
                src={img.src}
                alt={img.alt}
                width={1600}
                height={900}
                sizes="(min-width: 1024px) 40rem, 90vw"
                className="aspect-video w-full bg-porcelain object-contain"
              />
              <figcaption className="border-t-2 border-ink px-4 py-2 font-mono text-xs text-muted">
                {i + 1} / {images.length} · {img.alt.replace("SQLite Portable: ", "")}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex justify-end gap-2">
        <button type="button" onClick={() => scroll(-1)} className="btn btn-outline h-11 w-11 px-0">
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          <span className="sr-only">Previous screenshot</span>
        </button>
        <button type="button" onClick={() => scroll(1)} className="btn btn-outline h-11 w-11 px-0">
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          <span className="sr-only">Next screenshot</span>
        </button>
      </div>
    </div>
  );
}
