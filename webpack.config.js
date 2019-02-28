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
    devtool: 'source-map',
    watch: true,
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'banner-loader', // 注释的 loader
                    options: {
                        text: 'Aaayang',
                        filename: path.resolve(__dirname, 'banner.js')
                    }
                }
            }
        ]
    }
};