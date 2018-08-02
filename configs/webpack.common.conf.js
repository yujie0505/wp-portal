const autoprefixer = require('autoprefixer')
const extractTextWebpackPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

const entry = { app: path.resolve(__dirname, '../src/app.js') }
const moduleRules = [
  { test: /\.css$/, use: extractTextWebpackPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }) },
  { test: /\.(eot|ico|jpg|mp3|otf|svg|ttf|woff2|woff|png)($|\?)/, use: 'file-loader?name=[hash:5].[ext]' }
]

module.exports = {
  webConfig: {
    entry: entry,
    module: {
      rules: moduleRules.slice().concat([
        {
          test: /\.vue$/, use: {
            loader: 'vue-loader',
            options: {
              compilerModules: [{
                postTransformNode: el => require('weex-vue-precompiler')()(el)
              }],
              loaders: { sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' },
              optimizeSSR: false,
              postcss: [
                require('postcss-plugin-weex')(),
                require('autoprefixer')(),
                require('postcss-plugin-px2rem')({ rootValue: 75, minPixelValue: 1.01 })
              ]
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
  },
  weexConfig: {
    entry: entry,
    module: {
      rules: moduleRules.slice().concat([
        { test: /\.vue$/, use: 'weex-loader' }
      ])
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, '../dist')
    },
    plugins: [
      new webpack.BannerPlugin({
        banner: '// { "framework": "Vue" }\n"use weex:vue";\n',
        raw: true
      })
    ]
  }
}
