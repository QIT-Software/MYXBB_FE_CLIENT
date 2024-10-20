import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    // container: {
    //   center: true,
    //   padding: '2rem',
    // },
    screens: {
      sm: { max: '640px', min: '0px' },
      md: { max: '1023px', min: '640px' },
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      outline: {
        none: ['focus'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        primary: {
          red: '#F54848',
          black: '#000000',
          brown: '#CFAE8B',
          gray: '#8B8D94',
          'hover-red': '#ff5544',
          'status-red': '#DD3333',
        },
        secondary: {
          yellow: '#FAE19D',
          lightYellow: '#FDF3D8',
          lightRed: '#FDF1EA',
          'main-red': '#E83634',
          red: '#F9DCCB',
          hover: '#e72d3a',
          black: '#232323',
          'black-hover': '#1b1b1b',
          blue: '#DCDCF9',
          white: '#F5F5F5',
          lightGreen: '#E6F3E6',
          darkGreen: '#307E3E',
          whiteBackground: '#FDFDFD',
          dark: '#25262B',
          'light-grey': '#CBCBCB',
          'site-grey': '#ADAFB3',
          'black-blue': '#2C3539',
          pink: '#F00073',
          'facebook-blue': '#1877F2',
          gray: '#CCCCCC',
          'dark-gray': '#333333',
          'light-gray': '#EEEEEE',
        },
        red: {
          100: '#e64232',
        },
        system: {
          error: '#EE5555',
          submit: '#CCEDD2',
          primary: '#1865C3',
        },
        gray: {
          50: '#1865C3',
          100: '#D9D9D9',
          150: '#E9ECEF',
          200: '#BCBCBC',
          250: '#EFEFEF',
          300: '#8B8B8B',
          350: '#FAFAFA',
          400: '#707070',
          450: '#F6F6F6',
          500: '#6B6B6B',
          550: '##E3E3E3',
          600: '#353535',
          650: '#4D4D4D',
          700: '#4D4D4E',
          800: '#BEC3C7',
          850: '#808288',
        },
      },
      borderRadius: {
        md: '4px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
    variants: {
      extend: {
        backgroundColor: ['checked'],
        borderColor: ['checked'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
