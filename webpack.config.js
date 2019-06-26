// webpack.config.js
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html插件
// const {CleanWebpackPlugin} = require('clean-webpack-plugin'); // 清除文件
const ExtractTextPlugin = require("extract-text-webpack-plugin"); //css分离

const ENV = process.env.NODE_ENV;
module.exports = {  //module.exports commonjs规范
  // entry: './src/main.js', // 项目的入口文件，webpack会从main.js开始，把所有依赖的js都加载打包
  entry: ['babel-polyfill', './src/main.js'], // 项目的入口文件，webpack会从main.js开始，把所有依赖的js都加载打包 参考 https://www.jianshu.com/p/3b27dfc6785c

  output: {
    path: path.resolve(__dirname, './dist'), // 项目的打包文件路径
    publicPath: '../dist/', // 通过devServer访问路径
    filename: '[name].[hash].bundle.js' // 打包后的文件名
  },
  devServer: {
    historyApiFallback: true,
    overlay: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 接口的域名和端口 如果端口为80则可以不写
        pathRewrite: {'^/api': ''}, // 如果不是以api开头的可以清空
        changeOrigin: true,     // target是域名的话，需要这个参数，
        secure: false,          // 默认情况下，不接受运行在 HTTPS 上，且使用了无效证书的后端服务器。如果你想要接受，修改配置如下：
      },
    },
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
   module: {
     rules: [
       {
         test: /\.css$/,
         use: [
           'vue-style-loader',
           'css-loader'
         ],
       },
       { // scss
         test: /\.scss$/,
         use: [
           'vue-style-loader',
           'css-loader',
           'sass-loader'
         ],
       },
       {
         test: /\.js$/,
         loader: 'babel-loader',
         exclude: /node_modules/
       }
     ]
   },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new ExtractTextPlugin('style.css'),
    // new CleanWebpackPlugin({
    //   root: __dirname,
    //   verbose: true,
    //   dry: false
    // })
  ],
}
