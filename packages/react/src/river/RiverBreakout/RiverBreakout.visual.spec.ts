/*
 * Do not modify this file directly.
 * This file was generated by: playwright.generate-tests.ts.
 * Regenerate using: npm run test:visual:generate
 */
import {test, expect} from '@playwright/test'

// eslint-disable-next-line i18n-text/no-en
test.describe('Visual Comparison: RiverBreakout', () => {
  test('RiverBreakout / Default', async ({page}) => {
    await page.goto('http://localhost:6006/iframe.html?args=&id=components-riverbreakout--default&viewMode=story')

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('RiverBreakout / Highlighted Portion', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?args=&id=components-riverbreakout--highlighted-portion&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('RiverBreakout / Without Trailing Component', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?args=&id=components-riverbreakout--without-trailing-component&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })
})
