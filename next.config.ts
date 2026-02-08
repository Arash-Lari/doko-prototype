import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/doko-prototype",
  images: { unoptimized: true },
};

export default nextConfig;
