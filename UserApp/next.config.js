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
        port: '3012',
        pathname: '/*',
      },
    ],
  },
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
