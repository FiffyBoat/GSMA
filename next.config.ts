import type { NextConfig } from "next";
import path from "node:path";

const LOADER = path.resolve(__dirname, 'src/visual-edits/component-tagger-loader.js');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  outputFileTracingRoot: path.resolve(__dirname, '../../'),
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Rewrites for local Supabase development (CORS workaround)
  async rewrites() {
    if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('127.0.0.1')) {
      return {
        beforeFiles: [
          {
            source: '/supabase/:path*',
            destination: 'http://127.0.0.1:54321/:path*',
          },
        ],
      };
    }
    return {};
  },
  turbopack: {
      rules: {
        "*.{jsx,tsx}": {
          loaders: [LOADER]
        }
      }
    }
};

export default nextConfig;
// Orchids restart: 1768739046088
