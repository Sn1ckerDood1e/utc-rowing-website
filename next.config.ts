import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ewjqcsdxlvvvwfcjzrsq.supabase.co",
        pathname: "/storage/v1/object/public/photos/**",
      },
    ],
  },
};

export default nextConfig;
