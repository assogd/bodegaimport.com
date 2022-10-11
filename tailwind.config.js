module.exports = {
  content: ["./pages/**/*.js", "./components/**/*.js", "./slices/**/*.js"],
  theme: {
    fontFamily: {
      serif: '"Times New Roman", Times, serif',
      mono: 'Panama, "Courier New", monospace',
    },
    fontSize: {
      sm: ["0.8rem", "1.2em"],
      base: ["1rem", "1.2em"],
      lg: ["1.2rem", "1.2em"],
      xl: ["4vw", "1em"],
    },
    extend: {},
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "rgb(0, 0, 0)",
      gray: {
        100: "#F8F8F8",
      },
      purple: "#E4C1E7",
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
