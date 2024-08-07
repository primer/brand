/*
 * Do not modify this file directly.
 * This file was generated by: playwright.generate-tests.ts.
 * Regenerate using: npm run test:visual:generate
 */
import {test, expect} from '@playwright/test'

// eslint-disable-next-line i18n-text/no-en
test.describe('Visual Comparison: Grid', () => {
  test('Grid / Default', async ({page}) => {
    await page.goto('http://localhost:6006/iframe.html?args=&id=components-grid--default&viewMode=story')

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Grid / Playground', async ({page}) => {
    await page.goto('http://localhost:6006/iframe.html?args=&id=components-grid--playground&viewMode=story')

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Grid / Asymmetry', async ({page}) => {
    await page.goto('http://localhost:6006/iframe.html?args=&id=components-grid-features--asymmetry&viewMode=story')

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Grid / Nesting', async ({page}) => {
    await page.goto('http://localhost:6006/iframe.html?args=&id=components-grid-features--nesting&viewMode=story')

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Grid / Responsive', async ({page}) => {
    await page.goto('http://localhost:6006/iframe.html?args=&id=components-grid-features--responsive&viewMode=story')

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Grid / Centering', async ({page}) => {
    await page.goto('http://localhost:6006/iframe.html?args=&id=components-grid-features--centering&viewMode=story')

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Grid / Ratio: 50:50', async ({page}) => {
    await page.goto('http://localhost:6006/iframe.html?args=&id=components-grid-features--fifty-fifty&viewMode=story')

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Grid / Ratio: 60:40', async ({page}) => {
    await page.goto('http://localhost:6006/iframe.html?args=&id=components-grid-features--sixty-forty&viewMode=story')

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Grid / Ratio: 40:60', async ({page}) => {
    await page.goto('http://localhost:6006/iframe.html?args=&id=components-grid-features--forty-sixty&viewMode=story')

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Grid / Responsive Min Width', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?args=&id=components-grid-features--responsive-min-width&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })
})
