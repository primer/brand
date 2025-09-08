const path = require('node:path')

const ROOT_DIR = path.resolve(__dirname, '..', '..')

const componentsWith100PercentCoverage = Object.fromEntries(
  [
    './src/animation/Animate/',
    './src/Avatar/',
    './src/Box/',
    './src/Breadcrumbs/',
    './src/ButtonGroup/',
    './src/ExpandableArrow/',
    './src/Footnotes/',
    './src/forms/Checkbox/',
    './src/forms/CheckboxGroup/',
    './src/forms/RadioGroup/',
    './src/forms/Textarea/',
    './src/Icon/',
    './src/InlineLink/',
    './src/list/OrderedList/',
    './src/list/UnorderedList/',
    './src/MinimalFooter/',
    './src/Prose/',
    './src/river/RiverStoryScroll/',
    './src/Section/',
    './src/Tabs/',
    './src/Testimonial/',
  ].map(component => [
    component,
    {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  ]),
)

/* eslint-disable github/unescaped-html-literal */
module.exports = {
  cacheDirectory: '.test',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/recipes/**/*',
    '!src/fixtures/**/*',
    '!src/test-utils/**/*',
    '!**/*.stories.{js,jsx,ts,tsx}',
    '!**/*.visual.spec.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
  ],
  coverageThreshold: {
    ...componentsWith100PercentCoverage,
    './src/Accordion/': {
      statements: 97.91,
      branches: 94.11,
      functions: 100,
      lines: 100,
    },
  },
  maxWorkers: '50%',
  moduleNameMapper: {
    // We need to specify this package subpath because it does not provide a `require` conditional export path
    '@oddbird/popover-polyfill/fn': path.join(
      // Note: we use ROOT_DIR here since this dependency is hoisted
      ROOT_DIR,
      'node_modules',
      '@oddbird',
      'popover-polyfill',
      'dist',
      'popover-fn.js',
    ),
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./src/test-utils/setupTests.ts'],
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/(src)/**/*.test.[jt]s?(x)'],
  globals: {
    window: {},
  },
  transformIgnorePatterns: ['node_modules/(?!@oddbird/popover-polyfill)'],
}
