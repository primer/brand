import {dirname, join} from 'path'

module.exports = {
  stories: ['../../../packages/react/src/**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: ['../static'],
  addons: [
    {
      name: getAbsolutePath('@storybook/addon-essentials'),
      options: {
        actions: false,
      },
    },
    getAbsolutePath('@storybook/addon-storysource'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('storybook-css-modules-preset'),
    getAbsolutePath('@storybook/addon-webpack5-compiler-swc'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-webpack5'),
    options: {builder: {useSWC: true}},
  },
  swc: () => ({
    jsc: {
      transform: {
        react: {
          runtime: 'automatic',
        },
      },
    },
  }),
  features: {
    buildStoriesJson: true,
    disableTelemetry: true,
  },
  docs: {},
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  core: {
    disableWhatsNewNotifications: true,
  },
}

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')))
}
