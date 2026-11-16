import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75, 82, 88],
  },
};

export default nextConfig;
