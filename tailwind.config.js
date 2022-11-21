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
      lg: ["1.35rem", "1.2em"],
      xl: ["clamp(2em, 3vw, 8em)", "1em"],
      xxl: ["clamp(3em, 5vw, 8em)", "1em"],
    },
    extend: {
      boxShadow: {
        lg: "0 0 8px 2px rgba(0, 0, 0, .125)",
        glow: "0 0 12px 4px rgba(255, 255, 255, .5)",
        easeTop: "0 -24px 24px 0px rgba(255, 255, 255, 1)",
        easeTopPink: "0 -24px 24px 0px rgb(249, 226, 255, 1)",
      },
    },
    listStyleType: {
      none: "none",
      disc: "circle",
      decimal: "decimal",
      square: "square",
      roman: "upper-roman",
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
      pink: "#F9E2FF",
      purple: "#E4C1E7",
      yellow: "rgb(255, 255, 144)",
      paleYellow: "#FEFFD6",
      peach: "#F3CEB2",
      toddTerje: "#B9B5E7",
      cadmiumGreen: "rgb(0, 158, 89)",
      wine: {
        pinotNoir: "#E2908D",
        gamay: "#E2908D",
        auxerrois: "#FFDBA6",
        sylvaner: "#FFF2D0",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
  safelist: [
    {
      pattern:
        /(bg|text|border)-wine-(pinotNoir|gamay|auxerrois|sylvaner|peach,)/,
    },
  ],
};
