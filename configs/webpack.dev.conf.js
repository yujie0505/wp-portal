const commonConfig = require('./webpack.common.conf.js')
const friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')

const host = '0.0.0.0'
const port = fs.existsSync(path.resolve(__dirname, '../port')) ? fs.readFileSync(path.resolve(__dirname, '../port'), 'utf-8').match(/^(\d+)/)[1] : 8080

webpack(webpackMerge(commonConfig.weexConfig, {
  watch: true
}), (err, stats) => {
  if (err)
    throw `COMPILE ERROR: ${err.stack}`
})

module.exports = webpackMerge(commonConfig.webConfig, {
  devServer: {
    allowedHosts: ['merry.ee.ncku.edu.tw', 'zoro.ee.ncku.edu.tw'],
    contentBase: [path.resolve(__dirname, '../'), path.resolve(__dirname, '../src/res/')],
    host: host,
    port: port,
    quiet: true,
    stats: { colors: true, chunkModules: false }
  },
  plugins: [
    new friendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`The application is running on ${'\033[1;33m'}http://${host}:${port}${'\033[0m'}`]
      }
    })
  ]
})
