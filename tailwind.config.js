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
      xl: ["clamp(2em, 4vw, 10em)", "1em"],
    },
    extend: {
      boxShadow: {
        glow: "0 0 12px 4px rgba(255, 255, 255, .5)",
        easeTop: "0 -24px 24px 0px rgba(255, 255, 255, 1)",
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "rgb(0, 0, 0)",
      red: "#E2908D",
      champagne: "rgb(255 242 208)",
      neutral: {
        100: "rgb(245 245 245)",
        200: "rgb(229 229 229)",
        300: "rgb(212 212 212)",
        400: "rgb(163 163 163)",
        500: "rgb(115 115 115)",
        600: "rgb(82 82 82)",
        700: "rgb(64 64 64)",
        800: "rgb(38 38 38)",
        900: "rgb(23 23 23)",
      },
      purple: "#E4C1E7",
      yellow: "rgb(255, 255, 144)",
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
