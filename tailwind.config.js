module.exports = {
  content: [
    './pages/**/*.{js,jsx,md,mdx}',
    './components/**/*.{js,jsx}',
    './content/**/*.{md,mdx}',
    './styles/**/*.{css}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: '#2C3848',
        accent: '#a5f63a',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            pre: {
              backgroundColor: theme('colors.gray.800'),
              color: theme('colors.gray.100'),
              borderRadius: '0.5rem',
              padding: '1rem',
              overflowX: 'auto',
            },
            code: {
              color: theme('colors.accent'),
              fontWeight: '500',
              backgroundColor: theme('colors.gray.800'),
              padding: '0.2em 0.4em',
              borderRadius: '4px',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
