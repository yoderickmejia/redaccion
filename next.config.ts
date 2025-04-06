import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  eslint: {
    ignoreDuringBuilds: true, // Esto deshabilita ESLint en la fase de build
  },
}

export default nextConfig;
