/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    devtoolSegmentExplorer: false,
  },
  webpack: (config) => {
    config.ignoreWarnings = [
      { module: /scripts\// },
    ];
    return config;
  },
  // Оптимизация изображений
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    domains: [],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
  },
  // Кэширование статических ресурсов
  async headers() {
    return [
      {
        source: '/figma/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/documents/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
