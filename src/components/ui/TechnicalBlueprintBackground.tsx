"use client";

import Image from "next/image";
import { useEffect, useState, memo } from "react";

export default memo(function TechnicalBlueprintBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      animationFrameId = requestAnimationFrame(() => {
        setMousePos({
          x: Math.round(e.clientX),
          y: Math.round(e.clientY),
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Base Obsidian Void */}
      <div className="absolute inset-0 bg-[#06080e]" />

      {/* Generated High-Craft Architectural Technical Wallpaper */}
      <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none">
        <Image
          src="/image/background-tech.jpg"
          alt="Technical Architecture Wallpaper"
          fill
          priority
          sizes="100vw"
          quality={95}
          className="object-cover object-center filter contrast-110 brightness-90"
        />
      </div>

      {/* Gradient Scrim & Depth Vignette for 100% Content Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#06080e]/80 via-[#06080e]/70 to-[#06080e]/95 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_70%_at_50%_35%,transparent_15%,rgba(6,8,14,0.75)_80%,rgba(6,8,14,0.95)_100%)] pointer-events-none" />

      {/* Peripheral CAD Registration Marks & Coordinate Metadata */}
      
      {/* Top Left Registration Marker */}
      <div className="absolute top-6 left-6 font-mono text-[9px] text-blue-400/50 tracking-widest hidden md:flex items-center gap-2">
        <span className="text-blue-400/80">┌─</span>
        <span>SYS.LOC // 10.2090° N, 123.7569° E [CEBU_PH]</span>
      </div>

      {/* Top Right Coordinate Tracker */}
      <div className="absolute top-6 right-6 font-mono text-[9px] text-blue-400/50 tracking-widest hidden md:flex items-center gap-2">
        <span>CUR.POS // X:{String(mousePos.x).padStart(4, "0")} Y:{String(mousePos.y).padStart(4, "0")}</span>
        <span className="text-blue-400/80">─┐</span>
      </div>

      {/* Bottom Left Frame ID */}
      <div className="absolute bottom-6 left-6 font-mono text-[9px] text-blue-400/50 tracking-widest hidden md:flex items-center gap-2">
        <span className="text-blue-400/80">└─</span>
        <span>ARCH // FULLSTACK_SYSTEMS_ENG • SCALE 1:1.0</span>
      </div>

      {/* Bottom Right Protocol Reference */}
      <div className="absolute bottom-6 right-6 font-mono text-[9px] text-blue-400/50 tracking-widest hidden md:flex items-center gap-2">
        <span>REF_ID // 0x4C50_PANUCAT • STABLE</span>
        <span className="text-blue-400/80">─┘</span>
      </div>

      {/* Atmospheric Cobalt Depth Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-blue-600/[0.08] via-blue-950/[0.03] to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute top-[60%] right-[-5%] w-[600px] h-[600px] bg-blue-500/[0.05] blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-[-5%] w-[600px] h-[600px] bg-blue-600/[0.04] blur-[150px] pointer-events-none" />
    </div>
  );
});
