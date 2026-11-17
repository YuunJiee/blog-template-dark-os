import type { NextConfig } from "next";
import packageJson from "./package.json";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker deployments
  output: 'standalone',

  env: {
    NEXT_PUBLIC_APP_VERSION: packageJson.version,
  },

  // Security: hide server fingerprint
  poweredByHeader: false,

  // Image optimization: serve AVIF/WebP automatically
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Tree-shake large packages to reduce client bundle
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
