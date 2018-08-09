module.exports = () => {
  switch (process.env.NODE_ENV) {
    case 'production' : return require('./configs/webpack.prod.conf.js')
    default           : return require('./configs/webpack.dev.conf.js')
  }
}
