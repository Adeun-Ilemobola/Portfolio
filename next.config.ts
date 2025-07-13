import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
 
  images: {
    domains: ['mgmcrxxlvvkyigdlzids.supabase.co', 'cdn.shadcn.com', "images.unsplash.com"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mgmcrxxlvvkyigdlzids.supabase.co',
        pathname: '/storage/v1/object/public/img/**',
      },
    ],
    // Add domains you use for images (e.g., Supabase storage)
  },


};

export default nextConfig;
