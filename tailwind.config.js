/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        custom: {
          primary: '#d70018',
          bg_button: '#df3346',
          text_color: '#343a40',
        },
      },
      height: {
        header: '65px',
      },
      backgroundColor: {
        primary: '#d70018',
        backgroundRgba:'rgba(0,0,0,.4)',
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
