"use client";
import { useState, useEffect } from "react";
import { motion, MotionValue } from "framer-motion";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { certificates } from "@/app/data";
import { Skeleton } from "@/components/ui/Skeleton";
import { useParallax, useChildParallax } from "@/hooks/useParallax";

export default function CertificatesSection({ isLoading }: { isLoading?: boolean }) {
  const [selectedCertificate, setSelectedCertificate] = useState<number | null>(
    null
  );

  const { ref, y, opacity, scrollYProgress } = useParallax({
    speed: 0.1,
    fadeIn: true,
  });

  const openCertificateModal = (index: number) => {
    setSelectedCertificate(index);
    document.body.style.overflow = "hidden";
  };

  const closeCertificateModal = () => {
    setSelectedCertificate(null);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCertificateModal();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  if (isLoading) {
    return (
      <section ref={ref} className="py-32 border-t border-white/5">
        <div className="mb-20">
          <Skeleton className="h-10 w-64 mb-4 bg-white/10" />
          <Skeleton className="h-4 w-80 bg-white/5" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex flex-col gap-6">
              <Skeleton className="w-full aspect-[4/3] rounded-2xl bg-white/10" />
              <div>
                <Skeleton className="h-3 w-20 mb-3 bg-white/5" />
                <Skeleton className="h-6 w-48 mb-3 bg-white/10" />
                <div className="flex flex-wrap gap-2 mt-4">
                  <Skeleton className="h-5 w-16 rounded-full bg-white/5" />
                  <Skeleton className="h-5 w-20 rounded-full bg-white/5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <>
      <motion.section
        ref={ref}
        id="certificates"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ y, opacity }}
        className="py-32 border-t border-white/5"
      >
        <div className="mb-20">
          <h2 className="text-4xl font-extrabold text-white tracking-tighter mb-4">
            Certifications.
          </h2>
          <p className="text-zinc-500">
            Professional credentials and continuous learning achievements.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <CertificateCard
              key={index}
              cert={cert}
              index={index}
              scrollYProgress={scrollYProgress}
              onOpen={() => openCertificateModal(index)}
            />
          ))}
        </div>
      </motion.section>

      {selectedCertificate !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
          onClick={closeCertificateModal}
        >
          <div
            className="relative w-full max-w-5xl bg-black border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeCertificateModal}
              type="button"
              aria-label="Close certificate"
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-zinc-400 hover:text-white transition-colors border border-white/10"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
            <div className="relative w-full h-[60vh] sm:h-[75vh] bg-white/[0.02] flex-shrink-0 flex items-center justify-center p-4">
              <div className="relative w-full h-full max-w-4xl max-h-full">
                <Image
                  src={certificates[selectedCertificate].image}
                  alt={
                    certificates[selectedCertificate].alt ||
                    certificates[selectedCertificate].title
                  }
                  fill
                  quality={100}
                  sizes="(min-width: 1024px) 960px, 100vw"
                  className="object-contain"
                />
              </div>
            </div>
            <div className="p-6 border-t border-white/5 bg-black/90 backdrop-blur">
              <h3 className="text-xl font-semibold text-white mb-2">
                {certificates[selectedCertificate].title}
              </h3>
              <p className="text-zinc-400 text-sm">
                {certificates[selectedCertificate].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function CertificateCard({
  cert,
  index,
  scrollYProgress,
  onOpen,
}: {
  cert: (typeof certificates)[number];
  index: number;
  scrollYProgress: MotionValue<number>;
  onOpen: () => void;
}) {
  // Alternating parallax speeds for visual variety
  const speeds = [0.03, 0.06, 0.04];
  const speed = speeds[index % speeds.length];
  const cardY = useChildParallax(scrollYProgress, speed);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onClick={onOpen}
      style={{ y: cardY }}
      className="group flex flex-col gap-6 cursor-pointer"
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-white/[0.02] border border-white/5">
        <Image
          src={cert.image}
          alt={cert.alt || cert.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-all duration-700 ease-in-out group-hover:scale-105"
        />
      </div>
      <div>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs uppercase tracking-wider text-zinc-500">
            {cert.category}
          </span>
        </div>
        <h3 className="text-xl font-medium text-white mb-2 group-hover:text-zinc-300 transition-colors">
          {cert.title}
        </h3>
        <div className="flex flex-wrap gap-2 mt-4">
          {cert.tags.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 bg-white/[0.05] border border-white/10 font-medium text-zinc-400 text-xs rounded-full"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
