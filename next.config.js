/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  output: 'npx serve@latest out',
  trailingSlash: true,
}

module.exports = nextConfig
