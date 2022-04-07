/* eslint-disable github/unescaped-html-literal */
module.exports = {
  cacheDirectory: '.test',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!**/*.stories.{js,jsx,ts,tsx}'],
  maxWorkers: '50%',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy'
  },
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['<rootDir>/(src)/**/*.test.[jt]s?(x)'],
  globals: {
    window: {}
  }
}
