const commonConfig = require('./webpack.common.conf.js')
const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')

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
    host: '0.0.0.0',
    stats: { colors: true, chunkModules: false }
  }
})
