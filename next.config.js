
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  output: 'export',      // Next.js will emit static assets to ./out
  trailingSlash: true,   // GitHub Pages works better with trailing slashes  
  images: {
    unoptimized: true,     // ✅ Fixes Image Optimization error for static export
  },
  // IMPORTANT: remove basePath and assetPrefix for root deployment
});
