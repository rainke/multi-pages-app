/* eslint-disable */
const fs = require('fs-extra');
const path = require('path');
const webpack = require('webpack')
const express = require('express')
// const proxy = require('http-proxy-middleware')
const webpackConfig = require('./webpack.config')
const devCofnig = require('./dev-config');

const app = express()
const compiler = webpack(webpackConfig)
const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})
const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})

compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

app.use(devMiddleware)
app.use(hotMiddleware)
app.use('/', express.static('./public'))
const server = app.listen(devCofnig.port, '0.0.0.0', function (err) {
  copyPublicFolder();
  if (!err) {
    console.log(`http://localhost:${devCofnig.port}`)
  }
})

function copyPublicFolder() {
  fs.copySync(
    path.join(__dirname, devCofnig.public),
    path.join(__dirname, devCofnig.build),
    {
      dereference: true,
      filter: file => !file.endsWith('.html'),
    }
  );
}

module.exports = {
  close: () => {
    server.close()
  }
}
