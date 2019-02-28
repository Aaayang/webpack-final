const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolveLoader: {
        modules: ['node_modules', path.resolve(__dirname, 'loaders')]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'loader1'
                },
                enforce: 'pre'
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'loader2'
                }
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'loader3'
                },
                enforce: 'post'
            }
        ]
    }
};