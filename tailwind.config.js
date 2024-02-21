/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mainColor0: "rgb(96, 138, 206)",
        textColor0: "rgb(255, 255, 255)",
      },
      screens: {
        xs: "360px", // Extra small screens (phones)
        sm: "640px", // Small screens (tablets)
        md: "768px", // Medium screens (landscape tablets)
        lg: "1024px", // Large screens (small desktops)
        xl: "1280px", // Extra large screens (desktops)
      },
      fontSize: {
        xsFontSize: "10px",
        smFontSize: "12px",
        mdFontSize: "16px",
        lgFontSize: "18px",
        xlFontSize: "26px",
        xl2FontSize: "36px",
      },
    },
  },
  plugins: [],
};
