/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')

module.exports = {
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
