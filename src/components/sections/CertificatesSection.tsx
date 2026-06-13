"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { certificates } from "@/app/data";
import { useParallax } from "@/hooks/useParallax";

export default function CertificatesSection() {
  const [selectedCertificate, setSelectedCertificate] = useState<number | null>(
    null
  );

  const { ref, y, opacity } = useParallax({
    speed: 0.08,
    fadeIn: true,
  });

  const openCertificateModal = (index: number) => {
    setSelectedCertificate(index % certificates.length);
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

  // Duplicate certificates array for seamless marquee wrapping
  const marqueeCertificates = [...certificates, ...certificates];

  return (
    <>
      <motion.section
        ref={ref}
        id="certificates"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ y, opacity }}
        className="py-32 border-t border-emerald-500/10 relative overflow-hidden"
      >
        <div className="mb-20">
          <h2 className="text-4xl font-extrabold text-white tracking-tighter mb-4">
            Certifications.
          </h2>
          <p className="text-zinc-500">
            Professional credentials and continuous learning achievements.
          </p>
        </div>

        {/* Infinite Carousel Container */}
        <div className="relative w-full overflow-hidden select-none -mx-6 px-6">
          {/* Side Fade Gradients for premium blending */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-black via-black/40 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-black via-black/40 to-transparent z-10 pointer-events-none" />

          {/* Marquee Track */}
          <div className="animate-marquee gap-8 py-6">
            {marqueeCertificates.map((cert, index) => (
              <div
                key={index}
                onClick={() => openCertificateModal(index)}
                className="w-[280px] sm:w-[350px] md:w-[400px] flex-shrink-0 group cursor-pointer bg-emerald-950/[0.02] hover:bg-emerald-500/[0.04] border border-emerald-500/10 hover:border-emerald-500/25 rounded-2xl p-5 transition-all duration-500 flex flex-col gap-4 shadow-[0_4px_25px_rgba(0,0,0,0.4)] hover:shadow-[0_0_30px_rgba(52,211,153,0.06)] hover:-translate-y-1"
              >
                {/* Certificate Preview Image */}
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-zinc-950 border border-emerald-500/5">
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
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/[0.06] border border-emerald-500/10 px-2.5 py-1 rounded-full">
                    {cert.category}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-3.5 group-hover:text-emerald-300 transition-colors tracking-tight line-clamp-1">
                    {cert.title}
                  </h3>
                  <p className="text-zinc-500 text-xs mt-2 leading-relaxed line-clamp-2">
                    {cert.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {cert.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-zinc-950 border border-emerald-500/5 font-semibold text-zinc-500 text-[10px] rounded"
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
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-fade-in"
          onClick={closeCertificateModal}
        >
          <div
            className="relative w-full max-w-5xl bg-black border border-emerald-500/15 rounded-2xl overflow-hidden flex flex-col shadow-2xl animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeCertificateModal}
              type="button"
              aria-label="Close certificate"
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-zinc-400 hover:text-emerald-400 transition-colors border border-emerald-500/15"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
            <div className="relative w-full h-[60vh] sm:h-[75vh] bg-emerald-500/[0.02] flex-shrink-0 flex items-center justify-center p-4">
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
            <div className="p-6 border-t border-emerald-500/10 bg-black/90 backdrop-blur">
              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                {certificates[selectedCertificate].title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {certificates[selectedCertificate].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
