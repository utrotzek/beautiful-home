const path = require('path');

module.exports = {
    entry: './src/app.js',
    mode: 'development',
    output: {
        path: path.resolve('./dist'),
        filename: 'main.js',
    },

    resolve: {
        alias: { vue: 'vue/dist/vue.js' }
    }
};