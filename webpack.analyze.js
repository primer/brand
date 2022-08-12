const {merge} = require('webpack-merge')
const buildConfig = require('./webpack.build')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = merge(buildConfig, {
  plugins: [new BundleAnalyzerPlugin({openAnalyzer: true})]
})
