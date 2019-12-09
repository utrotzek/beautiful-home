const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js("resources/js/app.js", "public/js")
    .js("resources/js/bootstrap.js", "public/js")
    .sourceMaps()
    .sass("resources/sass/app.scss", "public/css")
    //accelerate watch by ignoring node_modules:
    //https://laracasts.com/discuss/channels/elixir/laravel-mix-extremly-slow?page=0#
    .options({
        watchOptions: {
            ignored: /node_modules/
        }
    })
;
