const {resolve} = require('node:path')
const {transform} = require('lightningcss')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// Allow customization of SIZE_LIMIT_ROOT to measure another checkout (the main branch) with this config
const root = process.env.SIZE_LIMIT_ROOT || __dirname

const checks = [
  {name: 'UMD — full bundle (JS)', path: 'packages/react/lib/index.js'},
  {name: 'UMD — full bundle (CSS)', path: 'packages/react/lib/css/main.css'},
  {name: 'ESM — full bundle (JS + CSS)', path: 'packages/react/esm/index.esm.js', import: '*'},
  {
    name: 'ESM — tree-shaken simple (Button, JS + CSS)',
    path: 'packages/react/esm/index.esm.js',
    import: '{ Button }',
  },
  {
    name: 'ESM — tree-shaken complex (ActionMenu, JS + CSS)',
    path: 'packages/react/esm/index.esm.js',
    import: '{ ActionMenu }',
  },
]

module.exports = checks.map(check => ({
  ignore: ['react', 'react-dom'],
  ...check,
  path: resolve(root, check.path),
  modifyWebpackConfig(config) {
    config.context = root
    config.module.rules.push({
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, {loader: require.resolve('css-loader'), options: {modules: false}}],
    })
    config.plugins.push(new MiniCssExtractPlugin(), {
      // Minify like a consumer's production build. Unminified, the build timestamps in the design token
      // banners of lib/css/main.css change the size between two otherwise identical builds
      apply(compiler) {
        const {Compilation, sources} = compiler.webpack
        compiler.hooks.compilation.tap('minify-css', compilation => {
          compilation.hooks.processAssets.tap(
            {name: 'minify-css', stage: Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_SIZE},
            assets => {
              for (const name of Object.keys(assets).filter(name => name.endsWith('.css'))) {
                const {code} = transform({filename: name, code: assets[name].buffer(), minify: true})
                compilation.updateAsset(name, new sources.RawSource(code))
              }
            },
          )
        })
      },
    })
    return config
  },
}))
