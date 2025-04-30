/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
          transitionProperty: {
            'all': 'all',
          },
          transitionDuration: {
            '700': '700ms',
            '1000': '1000ms',
          },
          scale: {
            '150': '1.5',
          },
          blur: {
            'lg': '8px',
          },
        },
      },
    plugins: [],
  }
  