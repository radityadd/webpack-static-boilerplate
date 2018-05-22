const path = require('path')
const webpack = require('webpack')
const isProduction = process.env.NODE_ENV === 'production'

const userConfig = require('./config')
const publicDir = (isProduction && userConfig.cdn.upload) 
  ? (userConfig.cdn.options.domain + userConfig.cdn.options.directory)
  : ''

const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const S3Plugin = require('webpack-s3-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  mode: process.env.NODE_ENV,
  devServer: {
    contentBase: './dist'
  },
  devtool: isProduction ? false : 'source-map',
  entry: userConfig.entry,
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: publicDir
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: !isProduction
            }
          },
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !isProduction
            }
          },
        ]
      },
      {
        test: /\.jsx?$/,
        use: ['babel-loader']
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
          }
        }]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({
      filename: isProduction ? '[name].[contenthash].css' : '[name].css',
      chunkFilename: isProduction ? '[id].[contenthash].css' : '[id].css'
    }),
    new HtmlWebpackPlugin({
      template: userConfig.html.template,
      filename: userConfig.html.build
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: !isProduction
      }),
      new OptimizeCssAssetsPlugin({})
    ]
  }
}

if(userConfig.jquery) {
  module.exports.plugins.push(
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  )
}

if(isProduction && userConfig.cdn.upload) {
  module.exports.plugins.push(
    new S3Plugin({
      include: /.*\.(css|js|png|jpe?g|gif|svg)$/,
      s3Options: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: 'ap-southeast-1'
      },
      s3UploadOptions: {
        Bucket: userConfig.cdn.options.bucket
      },
      basePath: userConfig.cdn.options.directory
    })
  )
}
