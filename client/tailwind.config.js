/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens:{
      sm:'480px',
      md: '768px',
      lg:'976px',
      xl: '1440px',
    }, 

    extend: {
      colors:{
        "vuejs":"#4ac44a"
      },
    },
  },
  plugins: [],
} 