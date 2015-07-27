var elixir = require('laravel-elixir');

require('laravel-elixir-spritesmith');

elixir.config.sourcemaps = false;

elixir.config.cssOutput = './../public/assets/css';
elixir.config.jsOutput = './../public/assets/js';
elixir.config.assetsDir = 'assets/';
elixir.config.publicDir = '../public/';

elixir(function(mix) {
  mix.sass('app.scss');

  mix.browserify('../../app/app.js');

  mix.spritesmith('assets/sprites', {
    imgOutput: '../public/assets/img',
    cssOutput: 'assets/sass',
    cssName: '_sprite.scss',
    cssFormat: 'css'
  });

  mix.task('browserify', '../../app/**/*.js');
});
