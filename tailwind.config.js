module.exports = {
  content: ['./pages/**/*.{js,jsx,md,mdx}', './components/**/*.{js,jsx}', './content/**/*.{md,mdx}','./styles/**/*.css',],
  theme: {
    extend: {
      colors: {
        navy: '#2C3848',
        accent: '#a5f63a',
      },
    },
  },  
  // tailwind.config.js
  plugins: [require('@tailwindcss/typography')],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            pre: {
              backgroundColor: theme('colors.gray.800'),
              color: theme('colors.gray.100'),
              borderRadius: '0.5rem',
              padding: '1rem',
            },
            code: {
              color: theme('colors.accent'),
              fontWeight: '500',
            },
          },
        },
      }),
    },
  },
};
