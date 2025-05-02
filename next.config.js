/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  basePath: '/Diabetes-Checker',
  assetPrefix: '/Diabetes-Checker/',
  images: {
    unoptimized: true,
  },
  // Disable server-side features for static export
  trailingSlash: true,
}

module.exports = nextConfig
