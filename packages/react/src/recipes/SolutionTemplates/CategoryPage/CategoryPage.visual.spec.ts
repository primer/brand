/*
 * Do not modify this file directly.
 * This file was generated by: playwright.generate-tests.ts.
 * Regenerate using: npm run test:visual:generate
 */
import {test, expect} from '@playwright/test'

// eslint-disable-next-line i18n-text/no-en
test.describe('Visual Comparison: CategoryPage', () => {
  test('CategoryPage / Light', async ({page}) => {
    await page.goto('http://localhost:6006/iframe.html?args=&id=recipes-solutions-categorypage--light&viewMode=story')

    await page.waitForTimeout(4000)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('CategoryPage / Light (fr)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Afr&args=&id=recipes-solutions-categorypage--light&viewMode=story',
    )

    await page.waitForTimeout(4000)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('CategoryPage / Light (de)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Ade&args=&id=recipes-solutions-categorypage--light&viewMode=story',
    )

    await page.waitForTimeout(4000)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('CategoryPage / Light (ja)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aja&args=&id=recipes-solutions-categorypage--light&viewMode=story',
    )

    await page.waitForTimeout(4000)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('CategoryPage / Light (es)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aes&args=&id=recipes-solutions-categorypage--light&viewMode=story',
    )

    await page.waitForTimeout(4000)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('CategoryPage / Light (pt-BR)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Apt-BR&args=&id=recipes-solutions-categorypage--light&viewMode=story',
    )

    await page.waitForTimeout(4000)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('CategoryPage / Dark', async ({page}) => {
    await page.goto('http://localhost:6006/iframe.html?args=&id=recipes-solutions-categorypage--dark&viewMode=story')

    await page.waitForTimeout(4000)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('CategoryPage / Dark (fr)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Afr&args=&id=recipes-solutions-categorypage--dark&viewMode=story',
    )

    await page.waitForTimeout(4000)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('CategoryPage / Dark (de)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Ade&args=&id=recipes-solutions-categorypage--dark&viewMode=story',
    )

    await page.waitForTimeout(4000)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('CategoryPage / Dark (ja)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aja&args=&id=recipes-solutions-categorypage--dark&viewMode=story',
    )

    await page.waitForTimeout(4000)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('CategoryPage / Dark (es)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aes&args=&id=recipes-solutions-categorypage--dark&viewMode=story',
    )

    await page.waitForTimeout(4000)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('CategoryPage / Dark (pt-BR)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Apt-BR&args=&id=recipes-solutions-categorypage--dark&viewMode=story',
    )

    await page.waitForTimeout(4000)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })
})
