module.exports = {
  content: ["./**/*.{html,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#1a1519",
        white: "#fbfbfa",
        gray: "#d1deeb",
        blue: "#36477d",
        red: "#f1584c",
        yellow: "#f6c74a",
      },
    },
  },
  plugins: [],
  corePlugins: require("tailwind-rn/unsupported-core-plugins"),
};
