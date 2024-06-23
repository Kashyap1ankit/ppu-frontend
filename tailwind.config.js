/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    screens: {
      xsm: "300px",
      sm: "400px",
      md: "520px",
      lg: "800px",
      xl: "1024px",
      "2xl": "1400px",
    },
    extend: {},
  },
  plugins: [],
};
