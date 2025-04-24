const config = {
  reporter: [['html', {open: 'never'}]],
  testDir: '../../packages/react',
  testMatch: /.*\.visual.spec\.ts/,
  outputDir: './playwright-test-results',
  workers: process.env.CI ? 16 : undefined, // Use all available cores in GitHub Actions
  use: {
    screenshot: 'only-on-failure',
    headless: true,
    env: {
      NODE_ENV: 'test',
    },
  },
  expect: {
    toHaveScreenshot: {maxDiffPixels: 20, animations: 'disabled'},
  },
}

module.exports = config
