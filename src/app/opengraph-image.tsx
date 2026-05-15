import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt = "EVERWILD Tennis Club";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 64,
          background: "#fff8e7",
          color: "#0b3d2e",
          fontFamily: "system-ui, sans-serif"
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 700, color: "#0b3d2e", letterSpacing: "0.2em" }}>
          EVERWILD
        </div>
        <div style={{ marginTop: 16, fontSize: 56, fontWeight: 800, lineHeight: 1.1, color: "#0b3d2e" }}>
          Tennis Club
        </div>
        <div style={{ marginTop: 24, fontSize: 28, color: "#3d5249", maxWidth: 900 }}>
          Courts, coaching, and community.
        </div>
      </div>
    ),
    { ...size }
  );
}
