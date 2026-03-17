import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(vert|frag|glsl)$/,
      type: 'asset/source',
    })
    return config
  },
}

export default nextConfig
