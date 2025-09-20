import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here cdn.myanimelist.net */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.myanimelist.net",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
