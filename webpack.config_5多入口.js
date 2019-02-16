const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const htmlPlugin = new HtmlWebpackPlugin({
    // 引入的模板
    template: path.join(__dirname, './src/index.html'),
    // 在内存中生成的文件的名称
    filename: 'index.html',
    // npm run build 或者运行 webpack-dev-server 时删除 html 文件中属性的双引号
    minify: {
        // removeAttributeQuotes: true,
        // collapseWhitespace: true // HTML 变成一行
    },
    // 给 HTML 中引入的文件加 Hash，防止缓存
    hash: true,
    chunks: ['home', 'other']
});

const otherPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, './src/other.html'),
    filename: 'other.html',
    // 给 HTML 中引入的文件加 Hash，防止缓存
    hash: true,
    chunks: ['other']
});

module.exports = {
    mode: 'development',
    entry: {
        home: './src/index.js',
        other: './src/other.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js', // name 代表的就是 home or other
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        hot: true
    },
    plugins: [
        htmlPlugin,
        otherPlugin,
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        // new webpack.ProvidePlugin({
        //     $: 'jquery'
        // })
    ],
    module: {
        rules: [
            // {
            //     test: require.resolve('jquery'),
            //     use: 'expose-loader?$'
            // },
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
                            outputPath: '/img/',
                            publicPath: 'http://www.zhihur.com'
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: 'html-withimg-loader'
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
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
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                include: path.resolve(__dirname, 'src/ts'),
                exclude: /node_modules/
            }
        ]
    },
    optimization: {
        minimizer: [
            new UglifyjsWebpackPlugin({
                cache: true,
                parallel: true, // 多线程打包
                sourceMap: true // ES5 到 ES6 的映射方便调试
            }),
            new OptimizeCssAssetsWebpackPlugin()
        ]
    },
    externals: {
        jquery: '$'
    }
};