"use client";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { certificates } from "@/app/data";
import { useParallax } from "@/hooks/useParallax";
import AnimatedSectionHeading from "@/components/ui/AnimatedSectionHeading";

// Duplicate certificates array for seamless marquee wrapping (static reference)
const MARQUEE_CERTIFICATES = [...certificates, ...certificates];

export default function CertificatesSection() {
  const [selectedCertificate, setSelectedCertificate] = useState<number | null>(
    null
  );

  const { ref, y, opacity } = useParallax({
    speed: 0.08,
    fadeIn: true,
  });

  const openCertificateModal = useCallback((index: number) => {
    setSelectedCertificate(index % certificates.length);
    document.body.style.overflow = "hidden";
  }, []);

  const closeCertificateModal = useCallback(() => {
    setSelectedCertificate(null);
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCertificateModal();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [closeCertificateModal]);

  return (
    <>
      <motion.section
        ref={ref}
        id="certificates"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ y, opacity }}
        className="py-32 border-t border-white/10 relative overflow-hidden"
      >
        <AnimatedSectionHeading
          title="Certifications."
          label="Credentials"
          subtitle="Professional credentials and continuous learning achievements."
        />

        {/* Infinite Carousel Container */}
        <div className="relative w-full overflow-hidden select-none -mx-6 px-6">
          {/* Side Fade Gradients for premium blending */}
          <div className="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-[#06080e] via-[#06080e]/70 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-[#06080e] via-[#06080e]/70 to-transparent z-10 pointer-events-none" />

          {/* Marquee Track */}
          <div className="animate-marquee gap-6 sm:gap-8 py-6">
            {MARQUEE_CERTIFICATES.map((cert, index) => (
              <div
                key={`${cert.title}-${index}`}
                onClick={() => openCertificateModal(index)}
                className="w-64 sm:w-80 md:w-96 shrink-0 group cursor-pointer bg-[#0f1422]/90 hover:bg-white/4 border border-white/10 hover:border-blue-400/40 rounded-xl p-4 sm:p-5 transition-all duration-500 flex flex-col gap-4 shadow-[0_4px_25px_rgba(0,0,0,0.6)] hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:-translate-y-1"
              >
                {/* Certificate Preview Image */}
                <div className="relative w-full aspect-4/3 rounded-lg overflow-hidden bg-[#06080e] border border-white/5">
                  <Image
                    src={cert.image}
                    alt={cert.alt || cert.title}
                    fill
                    sizes="(max-width: 768px) 280px, 400px"
                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                {/* Meta details */}
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-300 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full">
                    {cert.category}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-3.5 group-hover:text-blue-200 transition-colors tracking-tight line-clamp-1">
                    {cert.title}
                  </h3>
                  <p className="text-slate-400 text-xs mt-2 leading-relaxed line-clamp-2">
                    {cert.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {cert.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-[#080b11] border border-white/10 font-mono text-slate-300 text-[10px] rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Modal View */}
      {selectedCertificate !== null && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-[#080b11]/95 backdrop-blur-xl animate-fade-in"
          onClick={closeCertificateModal}
        >
          <div
            className="relative w-full max-w-5xl bg-[#080b11] border border-white/15 rounded-xl overflow-hidden flex flex-col shadow-2xl animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeCertificateModal}
              type="button"
              aria-label="Close certificate"
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-zinc-400 hover:text-white transition-colors border border-white/15"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
            <div className="relative w-full h-[60vh] sm:h-[75vh] bg-white/2 shrink-0 flex items-center justify-center p-4">
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
            <div className="p-6 border-t border-white/10 bg-[#080b11]/90 backdrop-blur">
              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                {certificates[selectedCertificate].title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {certificates[selectedCertificate].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
