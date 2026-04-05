const playwrightChromePath = process.env.PLAYWRIGHT_CHROME_PATH
const chromeLaunchArgs = ['--disable-dev-shm-usage', '--disable-extensions', '--no-sandbox']

const config = {
  reporter: [['html', {open: 'never'}]],
  testDir: '../../packages/react',
  testMatch: /.*\.visual.spec\.ts/,
  outputDir: './playwright-test-results',
  workers:
    Number(process.env.VRT_WORKERS) || (process.env.CI ? 6 : Math.max(4, Math.min(6, require('os').cpus().length / 2))),
  fullyParallel: true,
  retries: process.env.CI ? 3 : 0,
  timeout: process.env.CI ? 30000 : 15000,
  maxFailures: 10,
  use: {
    screenshot: 'only-on-failure',
    headless: true,
    // CI can pin an exact Chrome binary path for deterministic rendering.
    // Fallback to channel "chrome" for local development.
    ...(playwrightChromePath ? {} : {channel: 'chrome'}),
    env: {
      NODE_ENV: 'test',
    },
    actionTimeout: process.env.CI ? 15000 : 10000,
    navigationTimeout: process.env.CI ? 15000 : 10000,
    launchOptions: {
      ...(playwrightChromePath ? {executablePath: playwrightChromePath} : {}),
      args: chromeLaunchArgs,
    },
  },
  expect: {
    toHaveScreenshot: {
      timeout: process.env.CI ? 10000 : 5000,
      maxDiffPixelRatio: 0.0002,
      animations: 'disabled',
    },
  },
}

module.exports = config
