"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    PauseIcon,
    PlayIcon,
} from "@heroicons/react/24/outline";

export interface CarouselImage {
    src: string;
    alt: string;
}

interface ImageCarouselProps {
    images: CarouselImage[];
    autoplayInterval?: number;
}

export default function ImageCarousel({
    images,
    autoplayInterval = 4000,
}: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const carouselRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const goToSlide = useCallback(
        (index: number) => {
            if (isTransitioning) return;
            setIsTransitioning(true);
            setCurrentIndex(index);
            // Allow the CSS transition to complete
            setTimeout(() => setIsTransitioning(false), 600);
        },
        [isTransitioning]
    );

    const goToNext = useCallback(() => {
        goToSlide((currentIndex + 1) % images.length);
    }, [currentIndex, images.length, goToSlide]);

    const goToPrev = useCallback(() => {
        goToSlide((currentIndex - 1 + images.length) % images.length);
    }, [currentIndex, images.length, goToSlide]);

    // Autoplay
    useEffect(() => {
        if (isPaused || isHovered) {
            if (timerRef.current) clearTimeout(timerRef.current);
            return;
        }

        timerRef.current = setTimeout(goToNext, autoplayInterval);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [currentIndex, isPaused, isHovered, autoplayInterval, goToNext]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Only respond when the carousel or its children are focused
            if (!carouselRef.current?.contains(document.activeElement)) return;

            switch (e.key) {
                case "ArrowLeft":
                    e.preventDefault();
                    goToPrev();
                    break;
                case "ArrowRight":
                    e.preventDefault();
                    goToNext();
                    break;
                case " ":
                    e.preventDefault();
                    setIsPaused((p) => !p);
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [goToNext, goToPrev]);

    const togglePause = () => setIsPaused((p) => !p);

    // Determine which slides to preload (current, next, and previous)
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    const nextIndex = (currentIndex + 1) % images.length;

    return (
        <div
            ref={carouselRef}
            className="relative w-full max-w-5xl mx-auto"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            role="region"
            aria-roledescription="carousel"
            aria-label="SQLite Portable screenshots"
            tabIndex={0}
        >
            {/* Slide Area */}
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-emerald-500/20 bg-black/50 shadow-2xl shadow-emerald-500/5">
                {images.map((image, index) => {
                    const isActive = index === currentIndex;
                    const shouldRender =
                        index === currentIndex ||
                        index === prevIndex ||
                        index === nextIndex;

                    if (!shouldRender) return null;

                    return (
                        <div
                            key={index}
                            className="absolute inset-0 transition-opacity duration-[600ms] ease-in-out"
                            style={{ opacity: isActive ? 1 : 0 }}
                            aria-hidden={!isActive}
                            role="group"
                            aria-roledescription="slide"
                            aria-label={`Slide ${index + 1} of ${images.length}: ${image.alt}`}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 85vw, 64rem"
                                className="object-cover"
                                priority={isActive}
                            />
                        </div>
                    );
                })}

                {/* Gradient overlays for depth */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />

                {/* Caption bar */}
                <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white font-medium text-sm sm:text-base truncate">
                        {images[currentIndex].alt.replace("SQLite Portable - ", "")}
                    </p>
                    <p className="text-emerald-400/80 text-xs mt-0.5">
                        {currentIndex + 1} / {images.length}
                    </p>
                </div>

                {/* Navigation buttons — visible on hover/focus */}
                <button
                    onClick={goToPrev}
                    disabled={isTransitioning}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/10
                     text-white/70 hover:text-white hover:bg-black/60 hover:border-emerald-500/30
                     opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-300
                     disabled:opacity-30 disabled:cursor-not-allowed
                     sm:opacity-0 hover:sm:opacity-100"
                    style={{ opacity: isHovered ? 1 : undefined }}
                    aria-label="Previous slide"
                >
                    <ChevronLeftIcon className="w-6 h-6" />
                </button>

                <button
                    onClick={goToNext}
                    disabled={isTransitioning}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/10
                     text-white/70 hover:text-white hover:bg-black/60 hover:border-emerald-500/30
                     opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-300
                     disabled:opacity-30 disabled:cursor-not-allowed
                     sm:opacity-0 hover:sm:opacity-100"
                    style={{ opacity: isHovered ? 1 : undefined }}
                    aria-label="Next slide"
                >
                    <ChevronRightIcon className="w-6 h-6" />
                </button>
            </div>

            {/* Controls bar: dots + pause/play */}
            <div className="mt-6 flex flex-col items-center gap-4">
                {/* Dot indicators */}
                <div className="flex items-center gap-1.5 flex-wrap justify-center max-w-md" role="tablist" aria-label="Slide indicators">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            disabled={isTransitioning}
                            role="tab"
                            aria-selected={index === currentIndex}
                            aria-label={`Go to slide ${index + 1}: ${image.alt.replace("SQLite Portable - ", "")}`}
                            className={`rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-1 focus:ring-offset-black
                ${index === currentIndex
                                    ? "w-6 h-2 bg-emerald-400 shadow-lg shadow-emerald-500/50"
                                    : "w-2 h-2 bg-white/20 hover:bg-white/40"
                                }`}
                        />
                    ))}
                </div>

                {/* Pause/Play toggle */}
                <button
                    onClick={togglePause}
                    className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium
                     bg-emerald-500/10 border border-emerald-500/20 text-emerald-400
                     hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300"
                    aria-label={isPaused ? "Resume autoplay" : "Pause autoplay"}
                >
                    {isPaused ? (
                        <>
                            <PlayIcon className="w-3.5 h-3.5" />
                            <span>Resume</span>
                        </>
                    ) : (
                        <>
                            <PauseIcon className="w-3.5 h-3.5" />
                            <span>Pause</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
