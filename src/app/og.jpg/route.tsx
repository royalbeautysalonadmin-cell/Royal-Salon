import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

// Serves the branded social-share image at /og.jpg, which all page metadata
// and JSON-LD already reference. Generated at build time.
export const dynamic = "force-static";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 20% 20%, #3d2b1f 0%, #1a120c 55%, #0d0906 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 140,
            height: 140,
            borderRadius: 9999,
            background: "linear-gradient(135deg, #c9a227 0%, #e6c76a 50%, #b8860b 100%)",
            color: "#1a120c",
            fontSize: 84,
            fontWeight: 700,
            marginBottom: 36,
          }}
        >
          R
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 700,
            color: "#f5ead1",
            letterSpacing: 2,
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 18,
            fontSize: 32,
            color: "#d9b95c",
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          {siteConfig.tagline}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 34,
            fontSize: 26,
            color: "rgba(245, 234, 209, 0.75)",
          }}
        >
          Luxury Beauty Salon · Warsaw, Poland
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
