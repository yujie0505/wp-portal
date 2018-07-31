const autoprefixer = require('autoprefixer')
const extractTextWebpackPlugin = require('extract-text-webpack-plugin')
const uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  devServer: {
    allowedHosts: ['merry.ee.ncku.edu.tw', 'zoro.ee.ncku.edu.tw'],
    contentBase: './src/res/',
    host: '0.0.0.0',
    stats: { colors: true, chunkModules: false },
  },
  entry: { app: './src/app.js' },
  module: {
    rules: [
      { test: /\.css$/, use: extractTextWebpackPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader',
      })},
      { test: /\.(eot|ico|jpg|mp3|otf|svg|ttf|woff2|woff|png)($|\?)/, use: 'file-loader?name=[hash:5].[ext]' },
      { test: /\.sass$/, use: extractTextWebpackPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          { loader: 'postcss-loader', options: { plugins: [ autoprefixer ] } },
          'sass-loader',
        ],
      })},
      { test: /\.vue$/, use: { loader: 'vue-loader', options: {
        loaders: { sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' },
        postcss: { plugins: [autoprefixer] },
      }}},
    ],
  },
  output: {
    filename: '[name].js',
    path: `${__dirname}/dist`,
  },
  plugins: [
    new extractTextWebpackPlugin('app.css'),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
  ],
}

if ('production' === process.env.NODE_ENV) {
  module.exports.plugins.push(
    new uglifyjsWebpackPlugin({ uglifyOptions: {
      output: { comments: false },
    }})
  )
}

// vi:et:sw=2:ts=2
