/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')

module.exports = {
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4001',
        pathname: '/*',
      },
      {
        protocol: 'https',
        hostname: 'api.deepl.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  i18n,
  async redirects() {
    return [
      {
        source: '/messages',
        destination: '/messages/any',
        permanent: true,
      },
    ]
  },
}
