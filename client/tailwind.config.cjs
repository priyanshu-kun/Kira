/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'extraBlack':['./assets/fonts/HelveticaNowDisplay-ExtBlk.otf'],
      'black':['HelveticaNowDisplay-Black.otf'],
      'main':['HelveticaNowDisplay-Medium.otf'],
      'secondary':['HelveticaNowDisplay-Regular.otf'],
      'thin':['HelveticaNowDisplay-Thin.otf'],
      'extraThin':['HelveticaNowDisplay-Hairline.otf']
    },
    extend: {
      colors: {
        'main-light': "#fff",
        'secondary-light': "#F5F2EA",
        'button-main-light': "#FDC886",
        'text-main-light': "#000"
      }
    },
  },
  plugins: [require("daisyui")],
}
