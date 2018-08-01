module.exports = () => {
  switch (process.env.NODE_ENV) {
    case 'development' : return require('./configs/webpack.dev.conf.js')
    case 'production'  : return require('./configs/webpack.prod.conf.js')
  }
}
