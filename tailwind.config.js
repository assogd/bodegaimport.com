module.exports = {
  content: ["./pages/**/*.js", "./components/**/*.js", "./slices/**/*.js"],
  theme: {
    fontFamily: {
      serif: '"Times New Roman", Times, serif',
      mono: 'Panama, "Courier New", monospace',
    },
    fontSize: {
      xs: ["0.6rem", "1.2em"],
      sm: ["0.8rem", "1.2em"],
      base: ["1rem", "1.2em"],
      monoBase: ["0.85rem", "1.2em"],
      lg: ["1.2rem", "1.2em"],
      xl: ["4vw", "1em"],
    },
    extend: {},
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "rgb(0, 0, 0)",
      red: "#E2908D",
      champagne: "rgb(255, 242, 208)",
      gray: {
        100: "#F8F8F8",
      },
      purple: "#E4C1E7",
      yellow: "rgb(255, 255, 144)",
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
