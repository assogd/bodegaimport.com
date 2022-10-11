module.exports = {
  content: ["./pages/**/*.js", "./components/**/*.js", "./slices/**/*.js"],
  theme: {
    fontFamily: {
      serif: '"Times New Roman", Times, serif',
    },
    extend: {},
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      gray: {
        100: "#F8F8F8",
      },
      purple: "#E4C1E7",
    },
    extend: {
      lineHeight: {
        regular: "1.15",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
