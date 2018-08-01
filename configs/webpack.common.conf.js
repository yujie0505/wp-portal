const autoprefixer = require('autoprefixer')
const extractTextWebpackPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

const moduleRules = [
  { test: /\.css$/, use: extractTextWebpackPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }) },
  { test: /\.(eot|ico|jpg|mp3|otf|svg|ttf|woff2|woff|png)($|\?)/, use: 'file-loader?name=[hash:5].[ext]' },
  {
    test: /\.sass$/, use: extractTextWebpackPlugin.extract({
      fallback: 'style-loader',
      use: [
        'css-loader',
        { loader: 'postcss-loader', options: { plugins: [ autoprefixer ] } },
        'sass-loader',
      ]
    })
  }
]

const webConfig = {
  entry: { app: path.resolve(__dirname, '../src/app.js') },
  module: {
    rules: moduleRules.slice().concat([
      {
        test: /\.vue$/, use: {
          loader: 'vue-loader',
          options: {
            optimizeSSR: false,
            loaders: { sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' },
            postcss: [
              require('postcss-plugin-weex')(),
              require('autoprefixer')(),
              require('postcss-plugin-px2rem')({ rootValue: 75, minPixelValue: 1.01 })
            ],
            compilerModules: [{
              postTransformNode: el => require('weex-vue-precomplier')()(el)
            }]
          }
        }
      }
    ])
  },
  output: {
    filename: '[name].web.js',
    path: path.resolve(__dirname, '../dist')
  },
  plugins: [
    new extractTextWebpackPlugin('app.css')
  ]
}

module.exports = [webConfig]
