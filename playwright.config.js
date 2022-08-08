const config = {
  reporter: [['html', {open: 'never'}]],
  testMatch: /.*\.visual.spec\.ts/,
  outputDir: './playwright-test-results',
  use: {
    screenshot: 'only-on-failure',
    channel: 'chrome'
  },
  expect: {
    toHaveScreenshot: {maxDiffPixels: 20, animations: 'disabled'}
  }
}

module.exports = config
