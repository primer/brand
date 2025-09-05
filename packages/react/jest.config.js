const path = require('node:path')

const ROOT_DIR = path.resolve(__dirname, '..', '..')

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
