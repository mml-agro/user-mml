/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display:['"Playfair Display"','serif'],
        body:['"DM Sans"','sans-serif'],
        accent:['"Cormorant Garamond"','serif'],
      },
      colors: {
        gold:{50:'#fffbeb',100:'#fef3c7',200:'#fde68a',300:'#fcd34d',400:'#fbbf24',500:'#f59e0b',600:'#d97706',700:'#b45309',800:'#92400e',900:'#78350f'},
        saffron:'#FF6B00',
        cream:'#FFF8EE',
        warmgray:'#f5f0e8',
      },
    },
  },
  plugins:[],
}
