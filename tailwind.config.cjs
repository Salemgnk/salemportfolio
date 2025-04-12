module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        dark: {
          900: '#1a1a1a',
          800: '#2a2a2a',
        },
        green: {
          400: '#00ff00',
          200: '#99ff99',
        },
      },
    },
  },
  plugins: [],
};