const path = require('path')
const isProduction = process.env.NODE_ENV === 'production'

const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: process.env.NODE_ENV,
  devServer: {
    contentBase: './dist'
  },
  devtool: 'source-map',
  entry: {
    main: [
      './src/js/index.js',
      './src/sass/style.scss'
    ]
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          !isProduction ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: !isProduction
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !isProduction
            }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}
