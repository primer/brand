const config = {
  reporter: [['html', {open: 'never'}]],
  testDir: '../../packages/react',
  testMatch: /.*\.visual.spec\.ts/,
  outputDir: './playwright-test-results',
  workers: process.env.CI ? 2 : undefined, // Use workers in Actions only
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
