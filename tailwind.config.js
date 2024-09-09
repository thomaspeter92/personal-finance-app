/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        beige: {
          500: "#98908B",
          100: "#F8F4F0",
        },
        gray: {
          900: "#201F24",
          500: "#696868",
          300: "#B3B3B3",
          200: "#F2F2F2",
        },
        green: "#277C78",
      },
    },
  },
  plugins: [],
};
