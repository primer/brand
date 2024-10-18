const path = require('path')

module.exports = {
  siteMetadata: {
    title: 'Primer Brand UI',
    header: {
      title: 'Primer Brand UI',
    },
    shortName: '',
    description: 'React components for GitHub marketing pages',
  },
  plugins: [
    'gatsby-plugin-typescript',
    {
      resolve: '@primer/gatsby-theme-doctocat',
      options: {
        repoRootPath: '../',
        defaultBranch: 'main/apps',
      },
    },
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          '@primer/react-brand': path.resolve(
            __dirname,
            '../../packages/react/src',
          ),
          '@primer/brand-primitives': path.resolve(
            __dirname,
            '../../packages/design-tokens',
          ),
          react: path.resolve(__dirname, './node_modules', 'react'),
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
    `gatsby-plugin-image`,
  ],
  flags: {
    DEV_SSR: false,
  },
  pathPrefix: '/brand', // TODO: check this doesn't apply to preview deployments
}
