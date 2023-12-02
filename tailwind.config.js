module.exports = {
  mode: "jit",
  content: [
    "./src/**/**/*.{js,ts,jsx,tsx,html,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,html,mdx}",
   
"./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  darkMode: "class",
  theme: {
    screens: { md: { max: "1050px" }, sm: { max: "550px" } },
    extend: {
      colors: {
        blue: { 400: "#38a3ff", 600: "#3472e2", A400: "#3673e3" },
        black: {
          900: "#000000",
          "900_3f": "#0000003f",
          "900_87": "#00000087",
          "900_33": "#00000033",
          "900_11": "#00000011",
          "900_14": "#00000014",
        },
        teal: { 200: "#70b6c1" },
        blue_gray: { 800: "#474b4f", 900: "#333333", "900_01": "#292e33" },
        light_blue: { A700: "#0094ff" },
        pink: { 300: "#ec4aa7" },
        gray: {
          200: "#eeeeee",
          400: "#c9c9c9",
          600: "#757575",
          700: "#666666",
          800: "#393939",
          900: "#1f2327",
          "700_99": "#66666699",
          "900_01": "#16191c",
          "700_66": "#66666666",
        },
        lime: { 400: "#e7ea58" },
        indigo: {
          50: "#e3e7f3",
          900: "#0c3786",
          "900_01": "#0e3887",
          A400: "#5051f9",
        },
        white: { A700_87: "#ffffff87", A700: "#ffffff" },
        cyan: { 300: "#4bd1d1" },
      },
      backgroundImage: {
        gradient: "linear-gradient(132deg ,#3673e3,#0e3887)",
        gradient1: "linear-gradient(131deg ,#3472e2,#0c3786)",
      },
      fontFamily: {
        inter: "Inter",
        poppins: "Poppins",
        roboto: "Roboto",
        rubik: "Rubik",
        opensans: "Open Sans",
      },
      boxShadow: {
        bs: "0px 1px  4px 0px #0000003f",
        bs3: "0px 1px  3px 0px #00000014",
        bs4: "0px 1px  4px 0px #00000033",
        bs2: "0px 2px  4px 0px #00000033",
        bs1: "0px 4px  4px 0px #00000033",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
