"use client";

import { useState, useEffect, useCallback, memo } from "react";
import { motion } from "framer-motion";
import {
  GlobeAsiaAustraliaIcon,
  SignalIcon,
  ClockIcon,
  ArrowTopRightOnSquareIcon,
  CheckIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";

// Format time in Asia/Manila (GMT+8) - 12-Hour Format
const timeFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Manila",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Manila",
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
});

const hourFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Manila",
  hour: "numeric",
  hour12: false,
});

export default memo(function GeoTelemetryCard() {
  const [timeStr, setTimeStr] = useState<string>("");
  const [dateStr, setDateStr] = useState<string>("");
  const [isDaylight, setIsDaylight] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  const coordinates = "10.2090° N, 123.7569° E";
  const mapsUrl = "https://maps.app.goo.gl/KZfeHGxGwRAiw9J5A";

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      setTimeStr(timeFormatter.format(now));
      setDateStr(dateFormatter.format(now));

      const currentHour = parseInt(hourFormatter.format(now), 10);
      setIsDaylight(currentHour >= 6 && currentHour < 18);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCoordinates = useCallback(() => {
    navigator.clipboard.writeText(coordinates);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [coordinates]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="mt-8 w-full rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_12px_40px_rgba(37,99,235,0.06)] relative group hover:border-blue-300 transition-all duration-500"
    >
      {/* Top CAD Header Bar */}
      <div className="flex flex-wrap items-center justify-between px-5 py-3.5 bg-slate-50/90 border-b border-slate-200/80 select-none gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.8)] animate-pulse" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-800">
              GEO.TELEMETRY // STATION_CEBU
            </span>
          </div>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <span className="text-[10px] font-mono text-slate-500 hidden sm:inline uppercase tracking-wider">
            GRID: 10.2090N • 123.7569E
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyCoordinates}
            type="button"
            className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 hover:text-blue-700 hover:border-blue-300 hover:bg-blue-50/50 transition-all cursor-pointer shadow-xs"
            title="Copy coordinates"
          >
            {copied ? (
              <>
                <CheckIcon className="w-3 h-3 text-emerald-600" />
                <span className="text-emerald-600 font-semibold">Copied</span>
              </>
            ) : (
              <>
                <DocumentDuplicateIcon className="w-3 h-3 text-blue-600" />
                <span>Copy Coords</span>
              </>
            )}
          </button>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-all cursor-pointer shadow-xs font-semibold"
          >
            <span>Satellite Map</span>
            <ArrowTopRightOnSquareIcon className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Main Telemetry Grid Layout */}
      <div className="grid lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200/80">
        {/* Left Interactive Radar Screen (7 Cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden bg-[#0a0f1d] min-h-[300px]">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* SVG Tactical Radar Display */}
          <div className="relative w-full aspect-[16/9] max-h-[260px] mx-auto flex items-center justify-center">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#38bdf820_1px,transparent_1px),linear-gradient(to_bottom,#38bdf820_1px,transparent_1px)] bg-[size:24px_24px]" />

            {/* Radar Sweep + Hub Ping — HTML layer so the infinite rotation is compositor-driven (SVG-internal transform animations run on the main thread) */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              aria-hidden="true"
            >
              <div className="relative h-full max-h-[280px] aspect-square">
                <div className="absolute inset-0 animate-[spin_6s_linear_infinite]">
                  <svg
                    className="w-full h-full overflow-visible"
                    viewBox="0 0 200 200"
                  >
                    <defs>
                      <linearGradient
                        id="radarSweepGradient"
                        x1="0%"
                        y1="100%"
                        x2="0%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="rgba(56, 189, 248, 0.2)" />
                        <stop offset="100%" stopColor="#38bdf8" />
                      </linearGradient>
                      <radialGradient
                        id="radarBeamSweep"
                        cx="50%"
                        cy="50%"
                        r="50%"
                      >
                        <stop offset="0%" stopColor="rgba(56, 189, 248, 0)" />
                        <stop
                          offset="100%"
                          stopColor="rgba(56, 189, 248, 0.45)"
                        />
                      </radialGradient>
                    </defs>
                    <line
                      x1="100"
                      y1="100"
                      x2="100"
                      y2="10"
                      stroke="url(#radarSweepGradient)"
                      strokeWidth="2"
                    />
                    <path
                      d="M 100 100 L 100 10 A 90 90 0 0 1 180 60 Z"
                      fill="url(#radarBeamSweep)"
                      opacity="0.3"
                    />
                  </svg>
                </div>
                <span className="absolute left-1/2 top-1/2 w-[4%] h-[4%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2563eb] opacity-75 animate-ping" />
              </div>
            </div>

            {/* Radar Circular Rings & Crosshairs */}
            <svg
              className="relative w-full h-full max-w-[280px] max-h-[280px] select-none pointer-events-none overflow-visible"
              viewBox="0 0 200 200"
            >
              {/* Concentric Range Rings */}
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="rgba(56, 189, 248, 0.25)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <circle
                cx="100"
                cy="100"
                r="65"
                fill="none"
                stroke="rgba(56, 189, 248, 0.35)"
                strokeWidth="1"
              />
              <circle
                cx="100"
                cy="100"
                r="40"
                fill="none"
                stroke="rgba(56, 189, 248, 0.45)"
                strokeWidth="1"
                strokeDasharray="2 3"
              />
              <circle
                cx="100"
                cy="100"
                r="15"
                fill="rgba(56, 189, 248, 0.12)"
                stroke="rgba(56, 189, 248, 0.6)"
                strokeWidth="1"
              />

              {/* Crosshair Axes */}
              <line
                x1="10"
                y1="100"
                x2="190"
                y2="100"
                stroke="rgba(56, 189, 248, 0.25)"
                strokeWidth="1"
              />
              <line
                x1="100"
                y1="10"
                x2="100"
                y2="190"
                stroke="rgba(56, 189, 248, 0.25)"
                strokeWidth="1"
              />

              {/* Distance Labels */}
              <text
                x="104"
                y="38"
                fill="rgba(186, 230, 253, 0.7)"
                fontSize="6"
                fontFamily="monospace"
              >
                25 KM
              </text>
              <text
                x="104"
                y="63"
                fill="rgba(186, 230, 253, 0.8)"
                fontSize="6"
                fontFamily="monospace"
              >
                15 KM
              </text>
              <text
                x="104"
                y="88"
                fill="rgba(186, 230, 253, 0.9)"
                fontSize="6"
                fontFamily="monospace"
              >
                05 KM
              </text>

              {/* Central Target Reticle: Cebu / Naga Hub */}
              <g transform="translate(100, 100)">
                <circle r="3" fill="#38bdf8" />
                <circle r="1" fill="#ffffff" />
              </g>

              {/* Secondary Node: CTU Naga Campus */}
              <g transform="translate(125, 82)">
                <rect x="-2" y="-2" width="4" height="4" fill="#38bdf8" />
                <text
                  x="5"
                  y="2"
                  fill="#bae6fd"
                  fontSize="5.5"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  CTU_NAGA
                </text>
              </g>

              {/* Secondary Node: Carcar Base */}
              <g transform="translate(75, 125)">
                <rect x="-2" y="-2" width="4" height="4" fill="#60a5fa" />
                <text
                  x="5"
                  y="2"
                  fill="#bae6fd"
                  fontSize="5.5"
                  fontFamily="monospace"
                >
                  CARCAR_BASE
                </text>
              </g>

              {/* Secondary Node: Cebu IT Park Hub */}
              <g transform="translate(135, 45)">
                <circle r="2" fill="#818cf8" />
                <text
                  x="5"
                  y="2"
                  fill="#c7d2fe"
                  fontSize="5.5"
                  fontFamily="monospace"
                >
                  CEBU_METRO
                </text>
              </g>
            </svg>
          </div>

          {/* Bottom Radar Status Strip */}
          <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-slate-400 pt-3 border-t border-white/10">
            <div className="flex items-center gap-2">
              <SignalIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-200 font-semibold">
                BEACON ACTIVE
              </span>
              <span className="text-blue-400">•</span>
              <span className="text-slate-400">LATENCY: &lt;18ms</span>
            </div>
            <div className="text-[10px] text-sky-400 tracking-wider font-semibold">
              3D_LOCK: VERIFIED
            </div>
          </div>
        </div>

        {/* Right Station Diagnostics & Live Clock (5 Cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between gap-6 bg-white">
          <div>
            {/* Live Clock Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
                <ClockIcon className="w-4 h-4 text-blue-600" />
                <span>Station Local Time</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-blue-700 font-semibold">
                UTC +08:00
              </span>
            </div>

            {/* Big Live Digital Clock */}
            <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 mb-4 shadow-xs">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-950 tracking-tight flex items-baseline gap-2 flex-wrap">
                <span>{mounted ? timeStr : "--:--:-- --"}</span>
                <span className="text-xs font-semibold text-blue-600">PHT</span>
              </div>
              <div className="text-xs font-mono text-slate-500 mt-1.5 flex items-center justify-between">
                <span>{mounted ? dateStr : "Loading..."}</span>
                <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {isDaylight ? "Daylight Hours" : "Night Operations"}
                </span>
              </div>
            </div>

            {/* Geographical Specs List */}
            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-500">Primary Hub</span>
                <span className="text-slate-900 font-semibold">
                  Carcar / Naga, Cebu, PH
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-500">Timezone</span>
                <span className="text-blue-700 font-semibold">
                  Asia/Manila (GMT+8)
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-500">Coordinates</span>
                <span className="text-slate-800 font-medium">
                  {coordinates}
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-500">Availability</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Global Remote & On-Site
                </span>
              </div>
            </div>
          </div>

          {/* Quick Collab Note */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <GlobeAsiaAustraliaIcon className="w-4 h-4 text-blue-600 shrink-0" />
              <p className="text-[11px] text-slate-600 leading-tight">
                Seamless overlap with US, EMEA, & APAC development teams.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});
