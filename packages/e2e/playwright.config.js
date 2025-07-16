const config = {
  reporter: [['html', {open: 'never'}]],
  testDir: '../../packages/react',
  testMatch: /.*\.visual.spec\.ts/,
  outputDir: './playwright-test-results',
  workers: process.env.CI ? 16 : Math.max(4, Math.min(12, require('os').cpus().length)),
  fullyParallel: true,
  retries: process.env.CI ? 2 : 1,
  timeout: 15000,
  use: {
    screenshot: 'only-on-failure',
    headless: true,
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
      maxDiffPixels: 20,
      animations: 'disabled',
    },
  },
  // Filter tests based on LANGUAGE environment variable, if set
  grep: process.env.LANGUAGE
    ? process.env.LANGUAGE === 'en'
      ? /^(?!.*\().*$/ // Match tests without parentheses (English tests)
      : new RegExp(`\\(${process.env.LANGUAGE}\\)`) // Match tests with the specific language
    : undefined, // If LANGUAGE is not set, include all tests
}

module.exports = config
