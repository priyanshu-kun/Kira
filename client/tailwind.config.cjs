/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    borderWidth: {
      DEFAULT: '1px',
      '5px': '5px',
      '2px': '2px'

    },
    fontFamily: {
      'extraBlack':['./assets/fonts/HelveticaNowDisplay-ExtBlk.otf'],
      'black':['HelveticaNowDisplay-Black.otf'],
      'main':['HelveticaNowDisplay-Medium.otf'],
      'secondary':['HelveticaNowDisplay-Regular.otf'],
      'thin':['HelveticaNowDisplay-Thin.otf'],
      'extraThin':['HelveticaNowDisplay-Hairline.otf']
    },
    maxWidth: {
       'register-form-field': '24rem',
       'fullName': '208px'
    },
    extend: {
      colors: {
        'main-light': "#fff",
        'secondary-light': "#F5F2EA",
        'button-main-light': "#FDC886",
        'accent-color': "#ffa500",
        'text-main-light': "#000"
      },
      spacing: {
        'form-width': '900px',
        'form-width-login': '480px',
        'form-width-otp': '400px'
      }
    },
  },
  plugins: [require("daisyui")],
}
