/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5001',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'futbol.webmahsul.com.tr',
        pathname: '/uploads/**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // Vercel deploy sırasında ESLint hatalarını yok say
  },
  typescript: {
    ignoreBuildErrors: true, // TypeScript hatalarını yok say
  },
  reactStrictMode: false, // Strict mode'u kapatıyoruz
};

module.exports = nextConfig;
