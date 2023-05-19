/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.jsx', 'index.html'],
  theme: {
    extend: {
      colors: {
        azul: '#001F3D',
        azul2: '#01162b',
        rojo: '#DC1F26',
        rojoHover: '#6e0f13',
        gris: '#303030',
        fondo: '#D9D9D9',
        grisClaro: '#E5E5E5',
        naranja: '#FF5731',
        cyan: '#00BFB3',
        gris2: '#2e313b',
        gris3: '#1c1c1c',
      },
      screens: {
        laptop: '1100px',
      },
    },
  },
  plugins: [],
};
