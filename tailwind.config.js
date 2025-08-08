/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neon Green Theme
        neon: {
          50: '#f0ffef',
          100: '#d9ffdc',
          200: '#b5ffbb',
          300: '#7fff8a',
          400: '#42ff58',
          500: '#00ff88', // Main neon green
          600: '#00cc66',
          700: '#00aa55',
          800: '#008844',
          900: '#006633',
        },
        // Dark Theme
        dark: {
          50: '#f8f8f8',
          100: '#e5e5e5',
          200: '#cccccc',
          300: '#888888',
          400: '#555555',
          500: '#333333',
          600: '#222222',
          700: '#1a1a1a',
          800: '#111111',
          900: '#0a0a0a', // Main dark bg
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        glow: {
          '0%': { 
            boxShadow: '0 0 10px #00ff88, 0 0 20px #00ff88, 0 0 30px #00ff88',
          },
          '100%': { 
            boxShadow: '0 0 5px #00ff88, 0 0 10px #00ff88, 0 0 15px #00ff88',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(20px)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          },
        },
        slideDown: {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(-20px)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-neon': 'linear-gradient(45deg, #00cc66, #00ff88, #00ffaa)',
        'gradient-dark': 'linear-gradient(135deg, #0a0a0a, rgba(0, 255, 136, 0.1), #0a0a0a)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'neon': '0 0 10px #00ff88, 0 0 20px #00ff88, 0 0 40px #00ff88',
        'neon-sm': '0 0 5px #00ff88, 0 0 10px #00ff88',
        'neon-lg': '0 0 20px #00ff88, 0 0 40px #00ff88, 0 0 80px #00ff88',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'dark': '0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.25)',
      },
      spacing: {
        '18': '4.5rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}