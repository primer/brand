module.exports = {
  stories: ['../../../packages/react/src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-css-modules-preset',
    '@storybook/addon-storysource',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  features: {
    buildStoriesJson: true,
    disableTelemetry: true,
  },
  docs: {
    autodocs: false,
  },
}
