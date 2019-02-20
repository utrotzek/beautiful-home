const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: [
        './src/js/app.js',
    ],
    output: {
        path: path.resolve('./dist'),
        filename: 'main.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            }
        ],
    },

    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
            jquery: 'jquery/dist/jquery.js'
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            Tether: 'tether',
            tether: 'tether',
            Popper: ['popper.js', 'default'],
            bootstrap: 'libraries/bootstrap/js/bootstrap'
        })
    ]
};