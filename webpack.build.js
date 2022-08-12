const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {merge} = require('webpack-merge')
const commonConfig = require('./webpack.common')

module.exports = merge(commonConfig, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.build.json')
            }
          }
        ]
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: 'Primer_Brand__[name]__[local]___[hash:base64:5]'
              },
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env', 'autoprefixer']]
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // Extract library css into a separate file
    new MiniCssExtractPlugin({
      filename: './css/[name].css'
    })
  ]
})
