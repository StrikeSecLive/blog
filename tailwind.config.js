module.exports = {
  content: ['./pages/**/*.{js,jsx,md,mdx}', './components/**/*.{js,jsx}', './content/**/*.{md,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: '#2C3848',
        accent: '#a5f63a',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
