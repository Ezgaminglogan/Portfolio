"use client";

import { useEffect, useRef, memo } from "react";

const pad = (n: number) => String(Math.round(n)).padStart(4, "0");
const formatPos = (x: number, y: number) =>
  `CUR.POS // X:${pad(x)} Y:${pad(y)}`;

export default memo(function TechnicalBlueprintBackground() {
  const posRef = useRef<HTMLSpanElement>(null);

  // Write straight to the DOM (no React re-render) and coalesce to one update per frame.
  useEffect(() => {
    let frame = 0;
    let x = 0;
    let y = 0;

    const handleMouseMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (posRef.current) posRef.current.textContent = formatPos(x, y);
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frame);
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
          maskImage:
            "radial-gradient(ellipse 95% 85% at 50% 35%, #000 45%, transparent 95%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 95% 85% at 50% 35%, #000 45%, transparent 95%)",
        }}
      />

      {/* ─── 2. RADIANT COBALT & SKY BLUE AMBIENT DIFFUSE GLOWS ─── */}
      {/* Pre-softened radial gradients instead of filter: blur() — same look, no per-frame blur raster cost */}
      <div
        className="absolute -top-[424px] left-1/2 -translate-x-1/2 w-[1460px] h-[1110px] pointer-events-none"
        style={{
          background:
            "radial-gradient(closest-side, rgba(59,130,246,0.065), rgba(56,189,248,0.04) 50%, transparent)",
        }}
      />
      <div
        className="absolute top-[calc(40%-320px)] -right-[432px] w-[1340px] h-[1340px] pointer-events-none"
        style={{
          background:
            "radial-gradient(closest-side, rgba(37,99,235,0.07), rgba(37,99,235,0.045) 50%, transparent)",
        }}
      />
      <div
        className="absolute -bottom-[260px] -left-[396px] w-[1250px] h-[1250px] pointer-events-none"
        style={{
          background:
            "radial-gradient(closest-side, rgba(14,165,233,0.055), rgba(14,165,233,0.035) 50%, transparent)",
        }}
      />

      {/* ─── 3. PERIPHERAL CAD REGISTRATION MARKS & METADATA ─── */}

      {/* Top Left Registration Marker */}
      <div className="absolute top-6 left-6 font-mono text-[9px] text-slate-400/80 tracking-widest hidden md:flex items-center gap-2">
        <span className="text-blue-600 font-semibold">┌─</span>
        <span>SYS.LOC // 10.2090° N, 123.7569° E [CEBU_PH]</span>
      </div>

      {/* Top Right Coordinate Tracker */}
      <div className="absolute top-6 right-6 font-mono text-[9px] text-slate-400/80 tracking-widest hidden md:flex items-center gap-2">
        <span ref={posRef}>{formatPos(0, 0)}</span>
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
