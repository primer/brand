/*
 * Do not modify this file directly.
 * This file was generated by: playwright.generate-tests.ts.
 * Regenerate using: npm run test:visual:generate
 */
import {test, expect} from '@playwright/test'

// eslint-disable-next-line i18n-text/no-en
test.describe('Visual Comparison: Category', () => {
  test('Category / Playground', async ({page}) => {
    await page.goto('http://localhost:6006/iframe.html?args=&id=recipes-seo-category-page--playground&viewMode=story')

    await page.waitForTimeout(500)
    expect(await page.screenshot()).toMatchSnapshot()
  })
})