/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['uploadthing.com', 'lh3.googleusercontent.com'],
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

module.exports = nextConfig;
