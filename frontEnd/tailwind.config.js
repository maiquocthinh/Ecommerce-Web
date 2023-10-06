/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        custom: {
          primary: '#d70018',
          Colorprimary: '#fd2424',
          bg_button: '#df3346',
          text_color: '#343a40',
          disable:"#707070",
          colorProduct:"#444444",
          Shadow:"#9a0b16"
        },
      },
      height: {
        header: '65px',
      },
      width:{
        widthProduct: '228px',
      },
      inset: {
        '1/6': '16.6666667%',
        "1px":"1px"
      },
      spacing:{
        "1px":"1px"
      },
      backgroundColor: {
        primary: '#d70018',
        backgroundRgba:'rgba(0,0,0,.4)',
        backgroundHover: '#f3f4f6',
        backgroundSale: '#830505',
      },
      borderRadius:{
        search:'25px',
        border:'5px',
        primary:'50%',
        borderContnet:"10px"
      },
      borderColor:{
        border:"#cbd5e11a"
      }
    },
  },
  plugins: [],
}
