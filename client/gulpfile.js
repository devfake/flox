var elixir = require('laravel-elixir');

require('laravel-elixir-spritesmith');

elixir.config.sourcemaps = false;

elixir.config.css.outputFolder = './../public/assets/css';
elixir.config.js.outputFolder = './../public/assets/js';
elixir.config.assetsPath = 'assets/';
elixir.config.publicPath = '../public/';

elixir(function(mix) {
  mix.sass('app.scss');

  mix.browserify('../../app/app.js');

  mix.spritesmith('assets/sprites', {
    imgOutput: '../public/assets/img',
    cssOutput: 'assets/sass',
    cssName: '_sprite.scss',
    cssFormat: 'css'
  });

  mix.task('browserify', './app/**/*.js');
});
