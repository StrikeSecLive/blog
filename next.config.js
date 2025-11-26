const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
});

const isProd = process.env.NODE_ENV === 'production';

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  output: 'export',
  basePath: isProd ? '/blog' : '',
  assetPrefix: isProd ? '/blog/' : '',
  trailingSlash: true
});
