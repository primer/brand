const path = require('path')

module.exports = {
  siteMetadata: {
    title: 'Primer React Brand',
    shortName: 'React Brand',
    description: 'React components for GitHub marketing pages',
  },
  plugins: [
    'gatsby-plugin-typescript',
    {
      resolve: '@primer/gatsby-theme-doctocat',
      options: {
        repoRootPath: '..',
        defaultBranch: 'main',
      },
    },
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          '@primer/react-brand': path.resolve(__dirname, '../src'),
          react: path.resolve(__dirname, 'node_modules', 'react'),
        },
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        cssLoaderOptions: {
          esModule: false,
          camelCase: false,
          modules: {
            exportLocalsConvention: 'asIs',
            namedExport: false,
          },
        },
      },
    },
  ],
  flags: {
    DEV_SSR: false,
  },
  pathPrefix: '/react-brand',
}
