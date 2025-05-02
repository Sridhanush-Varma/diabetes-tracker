/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  // Use relative paths for GitHub Pages
  basePath: '',
  assetPrefix: './',
  images: {
    unoptimized: true,
  },
  // Disable server-side features for static export
  trailingSlash: true,
}

module.exports = nextConfig
