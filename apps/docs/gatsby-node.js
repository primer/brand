const defines = require('./babel-defines')
const path = require('path')
const fs = require('fs').promises

exports.onCreateWebpackConfig = ({actions, loaders, plugins, getConfig}) => {
  const config = getConfig()
  // Add our `__DEV__` and `process.env.NODE_ENV` defines
  config.plugins.push(
    plugins.define(defines[process.env.NODE_ENV || 'development']),
  )

  // Polyfill `path` and stub `fs` for use in the browser
  // https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v2-to-v3/#webpack-5-node-configuration-changed-nodefs-nodepath-
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      path: require.resolve('path-browserify'),
    },
    fallback: {
      ...config.resolve.fallback,
      fs: false,
    },
  }

  config.module.rules.push({
    test: /@oddbird\/popover-polyfill/,
    use: loaders.null(),
  })

  actions.replaceWebpackConfig(config)
}

exports.onPostBootstrap = async ({reporter}) => {
  // eslint-disable-next-line i18n-text/no-en
  reporter.info('Running post-bootstrap tasks...')

  if (process.env.NODE_ENV === 'production') {
    // eslint-disable-next-line i18n-text/no-en
    reporter.info('No post-bootstrap tasks to run in production environment.')
    return
  }

  const staticDir = path.resolve(__dirname, 'static', 'assets')
  const staticOutDir = path.resolve(__dirname, 'public', 'brand', 'assets')

  try {
    // eslint-disable-next-line i18n-text/no-en
    reporter.info(`Copying static assets from ${staticDir} to ${staticOutDir}`)
    await fs.mkdir(staticOutDir, {recursive: true})

    fs.cp(staticDir, staticOutDir, {recursive: true, overwrite: true})
  } catch (err) {
    reporter.error('onPostBootstrap error:', err)
  }
}
