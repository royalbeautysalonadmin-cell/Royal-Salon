import { ImageResponse } from "next/og";

// Favicon shown in browser tabs and Google mobile search results.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 9999,
          background: "linear-gradient(135deg, #c9a227 0%, #e6c76a 50%, #b8860b 100%)",
          color: "#1a120c",
          fontSize: 40,
          fontWeight: 700,
        }}
      >
        R
      </div>
    ),
    size
  );
}
