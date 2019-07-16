const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');// html 模版插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


let config = {
    entry: {
        index: './src/index.tsx',    // 入口文件
    },
    module: {
        rules: [
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name]_[hash].[ext]',
                        outputPath: 'images/',
                        limit: 10240
                    }
                }
            },
            {
                test: /\.tsx?$/,
                use: ['ts-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html')
        }),
        new CleanWebpackPlugin()
    ],
    resolve: {
        alias: {
            src: path.join(__dirname, '../src')
        },
        extensions: ['.tsx', '.ts', '.js', '.css', '.json', '.less', '.scss']
    },
    //  提取公共代码
    optimization: {
        usedExports: true,   //tree shaking
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
        }
    }
}

module.exports = config