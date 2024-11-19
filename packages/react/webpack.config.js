const {name: libraryName} = require('./package')
const path = require('path')
const postcssPresetEnv = require('postcss-preset-env')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    library: libraryName,
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true,
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
    'react-dom/client': {
      root: 'ReactDOMClient',
      commonjs2: 'react-dom/client',
      commonjs: 'react-dom/client',
      amd: 'react-dom/client',
    },
    'react/jsx-runtime': {
      root: 'ReactJSXRuntime',
      commonjs2: 'react/jsx-runtime',
      commonjs: 'react/jsx-runtime',
      amd: 'react/jsx-runtime',
    },
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.build.json'),
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        exclude: [/utilities.css/],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: 'Primer_Brand__[name]__[local]___[hash:base64:5]',
              },
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    postcssPresetEnv({
                      features: {
                        // prevent rewriting these in final output
                        'logical-properties-and-values': false,
                        'has-pseudo-class': false,
                      },
                    }),
                    'autoprefixer',
                  ],
                ],
              },
            },
          },
        ],
      },
      /**
       * Special rule for any global stylesheets that shouldn't be hashed
       */
      {
        test: /\.css$/i,
        include: [/utilities.css/],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env', 'autoprefixer']],
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css'],
  },
  plugins: [
    // Extract library css into a separate file
    new MiniCssExtractPlugin({
      filename: './css/[name].css',
    }),
  ],
}
