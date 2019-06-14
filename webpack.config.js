const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');// html 模版插件
const yargsParser = require('yargs-parser') //yargs-parser 模块用来获取命令行参数
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;  // 包依赖可视化
const MiniCssExtractPlugin = require("mini-css-extract-plugin");// 拆分css样式的插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');  // css 优化
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')  // js 优化

const argv = yargsParser(process.argv.slice(2));   // cross-env：运行跨平台设置和使用环境变量的脚本
// console.log(argv)  //{ _: [], open: true, mode: 'development' }
const devMode = argv.mode == 'development' ? true : false;  //  区别是生产环境和开发环境

let plugins = devMode ? [
    // development
    new webpack.HotModuleReplacementPlugin()  // 热更新，热更新不是刷新
] : [
    // production
    new BundleAnalyzerPlugin(), // 包依赖可视化
]

let config = {
    entry: {
        index: './index.js',    // 入口文件
    },
    output: {
        filename: devMode ? 'js/[name].js' : 'js/[name].[chunkhash].js', // 打包后的文件名称
        path: path.resolve('dist'), // 打包后的目录，必须是绝对路径
        publicPath: '/', // 打包的根目录下
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader', 'postcss-loader', 'less-loader'] // 从右向左解析
            },
            {
                test: /\.scss$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader', 'postcss-loader']
            },
            {
                test: /\.(png|jpg|gif|woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            },
            {    // babel es6转 es5
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react']
                        }
                    }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                enforce: 'pre',
                loader: 'eslint-loader',
                include: path.resolve(__dirname, './src/**/*.js'),
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        ...plugins,
        new HtmlWebpackPlugin({
            template: './index.html',
            hash: true // 会在打包好的bundle.js后面加上hash串
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? 'css/[name].css' : 'css/[name].[hash].css',
            chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[hash].css',
        })
    ],
    resolve: {
        alias: {
            src: path.join(__dirname, './src'),
            assets: path.join(__dirname, 'src/assets'),
            api: path.join(__dirname, 'src/api'),
            pages: path.join(__dirname, 'src/pages'),
            utils: path.join(__dirname, 'src/utils'),
            components: path.join(__dirname, 'src/components'),
            http: path.join(__dirname, 'src/http'),
            store: path.join(__dirname, 'src/store'),
        },
        extensions: ['.tsx', '.ts', '.js', '.css', '.json', '.less', '.scss']
    },
    devServer: {
        port: 8088,             // 端口
        open: true,             // 自动打开浏览器
        hot: true,               // 开启热更新
        overlay: true, // 浏览器页面上显示错误
        historyApiFallback: true,
        proxy: { //通过代理解决本地跨域
            '/api': {
                target: 'http://localhost:4000', // 服务端
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': '/api'
                }
            }
        }

    },
    //  提取公共代码
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: { // 抽离第三方插件
                    test: /node_modules/, // 指定是node_modules下的第三方包
                    chunks: 'initial',
                    name: 'vendor', // 打包后的文件名，任意命名
                    // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                    priority: 10,
                }
            }
        },
        minimizer: [
            // 自定义js优化配置，将会覆盖默认配置
            new UglifyJsPlugin({
                exclude: /\.min\.js$/, // 过滤掉以".min.js"结尾的文件，我们认为这个后缀本身就是已经压缩好的代码，没必要进行二次压缩
                cache: true,
                parallel: true, // 开启并行压缩，充分利用cpu
                sourceMap: false,
                extractComments: false, // 移除注释
                uglifyOptions: {
                    compress: {
                        unused: true,
                        drop_debugger: true
                    },
                    output: {
                        comments: false
                    }
                }
            }),
            // 用于优化css文件
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessorOptions: {
                    safe: true,
                    autoprefixer: { disable: true }, // 这里是个大坑，禁用掉cssnano对于浏览器前缀的处理。
                    mergeLonghand: false,
                    discardComments: {
                        removeAll: true // 移除注释
                    }
                },
                canPrint: true
            })
        ]
    },
    //srouce里面能看到我们写的代码，也能打断点调试代码
    devtool: devMode ? 'inline-source-map' : ''
}

module.exports = config