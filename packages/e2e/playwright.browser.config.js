const visualConfig = require('./playwright.config')

module.exports = {
  ...visualConfig,
  testMatch: /.*\.browser\.spec\.ts/,
  use: {
    ...visualConfig.use,
    viewport: {width: 1440, height: 800},
    channel: undefined,
    launchOptions: {},
  },
  projects: [
    {name: 'chromium', use: {browserName: 'chromium'}},
    {name: 'firefox', use: {browserName: 'firefox'}},
    {name: 'webkit', use: {browserName: 'webkit'}},
  ],
}
