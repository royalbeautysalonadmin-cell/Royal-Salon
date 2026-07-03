import { ImageResponse } from "next/og";

// Home-screen icon for iOS "Add to Home Screen" and rich mobile results.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 36,
          background: "linear-gradient(135deg, #c9a227 0%, #e6c76a 50%, #b8860b 100%)",
          color: "#1a120c",
          fontSize: 110,
          fontWeight: 700,
        }}
      >
        R
      </div>
    ),
    size
  );
}
