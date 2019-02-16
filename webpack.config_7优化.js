const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
const HappyPack = require('happypack');

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
        filename: 'main.[hash:8].js',
        // 在引用资源（例如CSS、Img）的时候会统一加上这个前缀
        // publicPath: 'http://www.zhihur.com'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        hot: true,
        port: 8080,
        host: "localhost",
        before(app) {
            app.get('/api/user', (req, res)=> {
                res.send({
                    user: 'wx',
                    age: 18
                });
            });
        }
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.css']
    },
    devtool: "cheap-module-eval-source-map",
    // watch: true,
    watchOptions: {
        ignored: /node_modules/,
        // 每秒向文件询问的次数
        poll: 1000,
        // 多少毫秒内重复保存不打包
        aggregateTimeout: 500
    },
    plugins: [
        htmlPlugin,
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        // new webpack.ProvidePlugin({
        //     $: 'jquery'
        // })
        // new CleanWebpackPlugin([path.resolve(__dirname, 'dist')]),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, 'src/assets'),
            to: path.resolve(__dirname, 'dist/assets')
        }]),
        new webpack.BannerPlugin('weixian'),
        new webpack.DefinePlugin({
            // DEV: "'dev'" // 'dev': 代表的是 dev 变量
            DEV: JSON.stringify('dev'),
            FLAG: 'true' // 会把单引号去掉，就是布尔 true
        }),
        new webpack.IgnorePlugin(/^\.\/locale/,/moment$/),
        new DllReferencePlugin({
            manifest: path.resolve(__dirname, 'dist', 'react.manifest.json')
        }),
        new HappyPack({
            id: 'js',
            use: [
                {
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
                }
            ]
        })
    ],
    module: {
        noParse: /jquery/, // 这个包不需要去解析
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
                use: 'happypack/loader?id=js',
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