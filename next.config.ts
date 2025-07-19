import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ✅ Disable ESLint errors from failing the build
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
    ],
    dangerouslyAllowSVG: true, // Only if you trust the source!
  },
};

export default nextConfig;
