module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-css-modules-preset'
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5'
  },
  features: {
    buildStoriesJson: true
  }
}
