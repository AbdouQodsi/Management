const mix = require('laravel-mix');
const path = require('path');

mix.webpackConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'resources/js'),
    },
  },
})
  .js('resources/js/app.js', 'public/assets/js')
  .sass('resources/sass/app.scss', 'public/assets/css')
  .vue()
  .version();
