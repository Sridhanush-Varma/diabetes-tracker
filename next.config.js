/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  basePath: '/diabetes-tracker',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
