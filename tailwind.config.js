/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'hero-pattern': "url('./wave-haikei.svg')",
        // 'hero-pattern': "url('./src/wave-haikei.svg')",
        // 'hero-pattern': "url('../wave-haikei.svg')",
      })
    },
    screens: {
      'sm': '625px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1440px'
    }
    
    // screens: {
    //   'sm': '640px',
    //   // => @media (min-width: 640px) { ... }

    //   'md': '768px',
    //   // => @media (min-width: 768px) { ... }

    //   'lg': '1024px',
    //   // => @media (min-width: 1024px) { ... }

    //   'xl': '1280px',
    //   // => @media (min-width: 1280px) { ... }

    //   '2xl': '1536px',
    //   // => @media (min-width: 1536px) { ... }
    // }
  },
  plugins: [
    
  ],
  //   corePlugins: {
  //   preflight: false,
  // }
}