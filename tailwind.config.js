module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './**/*.php',
    './build/**/*.js'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  corePlugins: {
    // preflight: false, // Disable base styles to avoid conflicts
  }
}