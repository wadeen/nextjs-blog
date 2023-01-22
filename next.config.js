/** @type {import('next').NextConfig} */

const withInterceptStdout = require('next-intercept-stdout')

module.exports = withInterceptStdout(
  {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
      fontLoaders: [
        { loader: '@next/font/google', options: { subsets: ['latin'] } },
      ],
    },
  },
  (text) => (text.includes('Duplicate atom key') ? '' : text)
)
