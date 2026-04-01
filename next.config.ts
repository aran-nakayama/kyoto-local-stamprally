import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/kyoto-local-stamprally",
  allowedDevOrigins: ["192.168.0.48"],
};

export default nextConfig;
