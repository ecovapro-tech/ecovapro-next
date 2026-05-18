import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "EcovaPro — Eco Cleaning London",
    short_name: "EcovaPro",
    description: "Eco-friendly cleaning services across London.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1F4D3A",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
