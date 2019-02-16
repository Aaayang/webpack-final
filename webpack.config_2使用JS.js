const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const htmlPlugin = new HtmlWebpackPlugin({
    // 引入的模板
    template: path.join(__dirname, './src/index.html'),
    // 在内存中生成的文件的名称
    filename: 'index.html',
    // npm run build 或者运行 webpack-dev-server 时删除 html 文件中属性的双引号
    minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true // HTML 变成一行
    },
    // 给 HTML 中引入的文件加 Hash，防止缓存
    hash: true
});

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.[hash:8].js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        hot: true
    },
    plugins: [
        htmlPlugin,
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader
                }, "css-loader", "postcss-loader"]
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(gif|jpg|jpeg|png|bmp|eot|woff|woff2|ttf|svg)$/,
                use: [
                    {
                        // url-loader 里面封装了 file-loader
                        loader: 'url-loader',
                        options: {
                            // 小于 10kb 才需要 base64，这时候起作用的 url-loader
                            // 大于 10kb 会在内部自动调用 file-loader 去处理图片
                            // 默认不加这个参数全部是用 url-loader 搞成 base64
                            limit: 10 * 1024,
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: 'html-withimg-loader'
            },
            // {
            //     test: /\.js$/,
            //     use: {
            //         loader: 'eslint-loader',
            //         options: {
            //             enforce: 'pre' // previous
            //         }
            //     }
            // },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // 用 babel-loader 把 ES6 转 ES5
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            ['@babel/plugin-proposal-decorators', {legacy: true}],
                            ['@babel/plugin-proposal-class-properties',{loose: true}],
                            ['@babel/plugin-transform-runtime']
                        ]
                    }
                },
                exclude: /node_modules/, // 千万别忘记排除这个，注意这里的值没有引号！
                include: path.resolve(__dirname, 'src') // 最好写上
            }
        ]
    }
};