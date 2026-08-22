"use client";

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
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#f8fafc]">
      {/* ─── 1. ARCHITECTURAL BLUEPRINT GRID & DOT MATRIX ─── */}
      <div 
        className="absolute inset-0 opacity-75 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(37, 99, 235, 0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(37, 99, 235, 0.035) 1px, transparent 1px),
            radial-gradient(circle, rgba(37, 99, 235, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px, 56px 56px, 28px 28px",
          maskImage: "radial-gradient(ellipse 95% 85% at 50% 35%, #000 45%, transparent 95%)",
          WebkitMaskImage: "radial-gradient(ellipse 95% 85% at 50% 35%, #000 45%, transparent 95%)"
        }}
      />

      {/* ─── 2. RADIANT COBALT & SKY BLUE AMBIENT DIFFUSE GLOWS ─── */}
      <div className="absolute -top-36 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-blue-500/12 via-sky-400/8 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[40%] -right-28 w-[700px] h-[700px] bg-blue-600/7 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 -left-24 w-[650px] h-[650px] bg-sky-500/6 rounded-full blur-[150px] pointer-events-none" />

      {/* ─── 3. PERIPHERAL CAD REGISTRATION MARKS & METADATA ─── */}
      
      {/* Top Left Registration Marker */}
      <div className="absolute top-6 left-6 font-mono text-[9px] text-slate-400/80 tracking-widest hidden md:flex items-center gap-2">
        <span className="text-blue-600 font-semibold">┌─</span>
        <span>SYS.LOC // 10.2090° N, 123.7569° E [CEBU_PH]</span>
      </div>

      {/* Top Right Coordinate Tracker */}
      <div className="absolute top-6 right-6 font-mono text-[9px] text-slate-400/80 tracking-widest hidden md:flex items-center gap-2">
        <span>CUR.POS // X:{String(mousePos.x).padStart(4, "0")} Y:{String(mousePos.y).padStart(4, "0")}</span>
        <span className="text-blue-600 font-semibold">─┐</span>
      </div>

      {/* Bottom Left Frame ID */}
      <div className="absolute bottom-6 left-6 font-mono text-[9px] text-slate-400/80 tracking-widest hidden md:flex items-center gap-2">
        <span className="text-blue-600 font-semibold">└─</span>
        <span>FULLSTACK_ARCHITECTURE • SCALE 1:1.0</span>
      </div>

      {/* Bottom Right Protocol Reference */}
      <div className="absolute bottom-6 right-6 font-mono text-[9px] text-slate-400/80 tracking-widest hidden md:flex items-center gap-2">
        <span>REF_ID // 0x4C50_PANUCAT • STABLE</span>
        <span className="text-blue-600 font-semibold">─┘</span>
      </div>
    </div>
  );
});
