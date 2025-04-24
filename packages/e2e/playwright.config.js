const config = {
  reporter: [['html', {open: 'never'}]],
  testDir: '../../packages/react',
  testMatch: /.*\.visual.spec\.ts/,
  outputDir: './playwright-test-results',
  workers: process.env.CI ? 4 : undefined, // Use workers in Actions only
  use: {
    screenshot: 'only-on-failure',
    headless: true,
    channel: 'chromium',
    env: {
      NODE_ENV: 'test',
    },
  },
  expect: {
    toHaveScreenshot: {maxDiffPixels: 20, animations: 'disabled'},
  },
}

module.exports = config
