/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Identidad propia: azul marino y negros. Deliberadamente distinta
        // de la paleta de Nexo Bajío, que es la marca de la firma, no la personal.
        canvas: {
          DEFAULT: '#F7F8FA',
          50: '#FFFFFF',
          200: '#EDF0F4',
        },
        // Escalonados para que los cuatro niveles cumplan AA sobre el fondo claro
        // (17.1 / 13.6 / 6.4 / 4.6 de contraste), no solo los dos primeros.
        ink: {
          DEFAULT: '#0A1628',
          soft: '#1B2A41',
          muted: '#4A5A73',
          faint: '#5F6F87',
        },
        line: {
          DEFAULT: '#E2E6ED',
          strong: '#CDD5E0',
          dark: 'rgba(226, 232, 240, 0.16)',
        },
        accent: {
          DEFAULT: '#1D4ED8', // azul señal, para texto y marcas sobre fondo claro
          bright: '#7FA8FF', // azul claro, único legible sobre el marino profundo
          soft: '#DBE4FF', // fondo de etiquetas sobre claro
        },
      },
      fontFamily: {
        display: ['Manrope', 'system-ui', 'sans-serif'],
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.045em',
        tighter2: '-0.03em',
      },
      maxWidth: {
        content: '78rem',
        prose2: '46rem',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
