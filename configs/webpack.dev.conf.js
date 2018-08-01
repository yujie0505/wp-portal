const commonConfig = require('./webpack.common.conf.js')
const path = require('path')
const webpackMerge = require('webpack-merge')

const webConfig = webpackMerge(commonConfig[0], {
  devServer: {
    allowedHosts: ['merry.ee.ncku.edu.tw', 'zoro.ee.ncku.edu.tw'],
    contentBase: path.resolve(__dirname, '../src/res/'),
    host: '0.0.0.0',
    stats: { colors: true, chunkModules: false }
  }
})

module.exports = webConfig

