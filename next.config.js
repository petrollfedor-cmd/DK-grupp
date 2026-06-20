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
}

module.exports = nextConfig
