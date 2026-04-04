const config = {
  reporter: [['html', {open: 'never'}]],
  testDir: '../../packages/react',
  testMatch: /.*\.visual.spec\.ts/,
  outputDir: './playwright-test-results',
  workers:
    Number(process.env.VRT_WORKERS) || (process.env.CI ? 8 : Math.max(4, Math.min(6, require('os').cpus().length / 2))),
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  timeout: 15000,
  maxFailures: 2,
  use: {
    screenshot: 'only-on-failure',
    headless: true,
    // Use Chrome instead of Chrome for Testing to get H.264 codec support for video tests
    channel: 'chrome',
    env: {
      NODE_ENV: 'test',
    },
    actionTimeout: 10000,
    navigationTimeout: 10000,
    launchOptions: {
      args: ['--disable-dev-shm-usage', '--disable-extensions', '--no-sandbox'],
    },
  },
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.0002,
      animations: 'disabled',
    },
  },
}

module.exports = config
