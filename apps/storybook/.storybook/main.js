import path from 'node:path'
import {fileURLToPath} from 'node:url'

const storybookRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

export default {
  stories: ['../../../packages/react/src/**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: ['../static'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-links', 'storybook-addon-pseudo-states'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {},
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      tsconfigPath: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../packages/react/tsconfig.json'),
      include: [path.join(storybookRoot, '../../packages/react/src/**/*.tsx')],
      exclude: [
        path.join(storybookRoot, '../../packages/react/src/**/*.stories.tsx'),
        path.join(storybookRoot, '../../packages/react/src/**/*.test.tsx'),
        path.join(storybookRoot, '../../packages/react/src/**/*.spec.tsx'),
      ],
    },
  },
  core: {
    disableTelemetry: true,
    disableWhatsNewNotifications: true,
  },
  async viteFinal(config) {
    if (!config.css) {
      config.css = {}
    }

    if (!config.css.modules) {
      config.css.modules = {}
    }

    config.css.modules.generateScopedName = '[name]__[local]__[hash:base64:5]'

    return config
  },
}
