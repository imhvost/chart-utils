const NODE_ENV = process.env.NODE_ENV
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PACKAGE = require('./package.json')
const banner = PACKAGE.name + ' v' + PACKAGE.version + '\n' + PACKAGE.repository.url.replace('git+', '') + '\n'
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
  mode: NODE_ENV === 'development' ? 'development' : 'production',
  entry: {
    test: './src/index.js',
    'chart-utils.min': './src/chart-utils.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  devServer: {},
  module: {
    rules: []
  },
  plugins: [
    new ESLintPlugin({
        extensions: ['js'],
        exclude: [
          '/node_modules/',
        ],
        fix: true,
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      inject: true
    }),
    new webpack.BannerPlugin(banner)
  ]
}
