const withMDX = require('@next/mdx')({ extension: /\.mdx?$/ });

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },  
  options: {
    providerImportSource: '@mdx-js/react', // Enables MDXProvider
  },
});
