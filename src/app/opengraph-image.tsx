import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { PROFILE_PHOTO } from "@/constants/seo";

// Rendered once at build time; Next wires it into og:image (and Twitter falls back to it).
export const alt = "Logan M. Panucat — Full-Stack Developer and BSIT College Instructor";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const photo = await readFile(join(process.cwd(), "public", PROFILE_PHOTO));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#063F33",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 680 }}>
          <div style={{ display: "flex", fontSize: 26, color: "#10B981", fontWeight: 600, letterSpacing: 2 }}>
            PORTFOLIO
          </div>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700, marginTop: 18, lineHeight: 1.05 }}>
            Logan M. Panucat
          </div>
          <div style={{ display: "flex", fontSize: 34, marginTop: 22, color: "#DDECE5" }}>
            Full-Stack Developer · BSIT College Instructor
          </div>
          <div style={{ display: "flex", fontSize: 26, marginTop: 34, color: "#DDECE5", opacity: 0.85 }}>
            Next.js · C# / .NET · PHP · MySQL — Cebu, Philippines
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- Satori markup, not the DOM */}
        <img
          src={photoSrc}
          alt=""
          width={300}
          height={375}
          style={{ borderRadius: 28, border: "4px solid #10B981", objectFit: "cover", objectPosition: "top" }}
        />
      </div>
    ),
    size,
  );
}
