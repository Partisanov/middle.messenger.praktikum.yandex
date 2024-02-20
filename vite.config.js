import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import checker from 'vite-plugin-checker';

export default defineConfig({
  plugins: [
    handlebars(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint ./src/**/*.{ts,tsx}',
      },
      stylelint: {
        lintCommand: 'stylelint ./src/**/*.{css,scss}',
      },
    }),
  ],
  build: {
    outDir: 'dist',
  },
  assetsInclude: ['**/*.hbs'],
});
