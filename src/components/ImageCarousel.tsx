"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

export interface CarouselImage {
  src: string;
  alt: string;
}

interface ImageCarouselProps {
  images: CarouselImage[];
  autoplayInterval?: number;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

/**
 * Swipe Confidence Threshold - the amount of distance the user must swipe
 * to trigger a slide change.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function ImageCarousel({
  images,
  autoplayInterval = 5000,
}: ImageCarouselProps) {
  const [[page, direction], setPage] = useState([0, 0]);

  // We only have a finite amount of images, but this formula
  // lets us infinite loop as we click the next/prev buttons.
  const imageIndex = ((page % images.length) + images.length) % images.length;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, autoplayInterval);
    return () => clearInterval(timer);
  }, [page, autoplayInterval]);

  return (
    <div className="relative w-full aspect-video overflow-hidden group">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        >
          <Image
            src={images[imageIndex].src}
            alt={images[imageIndex].alt}
            fill
            className="object-cover pointer-events-none"
            priority
          />
          
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Caption */}
          <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
            <p className="text-white font-medium text-lg leading-tight">
              {images[imageIndex].alt.replace("SQLite Portable - ", "")}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation - Minimalist style */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/20 backdrop-blur-md border border-white/5 text-white/50 hover:text-white hover:bg-black/40 transition-all opacity-0 group-hover:opacity-100"
        onClick={() => paginate(-1)}
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/20 backdrop-blur-md border border-white/5 text-white/50 hover:text-white hover:bg-black/40 transition-all opacity-0 group-hover:opacity-100"
        onClick={() => paginate(1)}
      >
        <ChevronRightIcon className="w-6 h-6" />
      </button>

      {/* Progress indicators - Minimalist dashes */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            className={`h-1 transition-all duration-300 rounded-full ${
              i === imageIndex ? "w-8 bg-white" : "w-2 bg-white/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
