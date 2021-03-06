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
        /* alias: {
            loader1: path.resolve(__dirname, 'loaders', 'loader1.js')
        } */
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader1',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ]
                    }
                }
            }
        ]
    }
};