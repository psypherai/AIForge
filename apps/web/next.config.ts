import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {},
  transpilePackages: [
    '@aiforge/ui',
    '@aiforge/core',
    '@aiforge/ai',
    '@aiforge/mcp',
    '@aiforge/api-client',
    '@aiforge/observability',
    '@aiforge/db',
    'solito',
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '4mb',
    },
  },
};

export default nextConfig;
