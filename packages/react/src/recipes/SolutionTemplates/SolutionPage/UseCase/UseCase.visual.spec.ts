/*
 * Do not modify this file directly.
 * This file was generated by: playwright.generate-tests.ts.
 * Regenerate using: npm run test:visual:generate
 */
import {test, expect} from '@playwright/test'

// eslint-disable-next-line i18n-text/no-en
test.describe('Visual Comparison: UseCase', () => {
  test('UseCase / Maximum Light', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?args=&id=recipes-solutions-solution-use-case--maximum&viewMode=story',
    )

    await page.waitForTimeout(2000)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('UseCase / Maximum Light (fr)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Afr&args=&id=recipes-solutions-solution-use-case--maximum&viewMode=story',
    )

    await page.waitForTimeout(2000)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('UseCase / Maximum Light (de)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Ade&args=&id=recipes-solutions-solution-use-case--maximum&viewMode=story',
    )

    await page.waitForTimeout(2000)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('UseCase / Maximum Light (ja)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aja&args=&id=recipes-solutions-solution-use-case--maximum&viewMode=story',
    )

    await page.waitForTimeout(2000)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('UseCase / Maximum Light (es)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aes&args=&id=recipes-solutions-solution-use-case--maximum&viewMode=story',
    )

    await page.waitForTimeout(2000)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('UseCase / Maximum Light (pt-BR)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Apt-BR&args=&id=recipes-solutions-solution-use-case--maximum&viewMode=story',
    )

    await page.waitForTimeout(2000)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('UseCase / Maximum Dark', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?args=&id=recipes-solutions-solution-use-case--maximum-dark&viewMode=story',
    )

    await page.waitForTimeout(2000)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('UseCase / Maximum Dark (fr)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Afr&args=&id=recipes-solutions-solution-use-case--maximum-dark&viewMode=story',
    )

    await page.waitForTimeout(2000)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('UseCase / Maximum Dark (de)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Ade&args=&id=recipes-solutions-solution-use-case--maximum-dark&viewMode=story',
    )

    await page.waitForTimeout(2000)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('UseCase / Maximum Dark (ja)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aja&args=&id=recipes-solutions-solution-use-case--maximum-dark&viewMode=story',
    )

    await page.waitForTimeout(2000)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('UseCase / Maximum Dark (es)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aes&args=&id=recipes-solutions-solution-use-case--maximum-dark&viewMode=story',
    )

    await page.waitForTimeout(2000)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('UseCase / Maximum Dark (pt-BR)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Apt-BR&args=&id=recipes-solutions-solution-use-case--maximum-dark&viewMode=story',
    )

    await page.waitForTimeout(2000)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('UseCase / Minimum Light', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?args=&id=recipes-solutions-solution-use-case--minimum&viewMode=story',
    )

    await page.waitForTimeout(2000)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('UseCase / Minimum Light (fr)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Afr&args=&id=recipes-solutions-solution-use-case--minimum&viewMode=story',
    )

    await page.waitForTimeout(2000)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('UseCase / Minimum Light (de)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Ade&args=&id=recipes-solutions-solution-use-case--minimum&viewMode=story',
    )

    await page.waitForTimeout(2000)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('UseCase / Minimum Light (ja)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aja&args=&id=recipes-solutions-solution-use-case--minimum&viewMode=story',
    )

    await page.waitForTimeout(2000)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('UseCase / Minimum Light (es)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aes&args=&id=recipes-solutions-solution-use-case--minimum&viewMode=story',
    )

    await page.waitForTimeout(2000)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('UseCase / Minimum Light (pt-BR)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Apt-BR&args=&id=recipes-solutions-solution-use-case--minimum&viewMode=story',
    )

    await page.waitForTimeout(2000)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('UseCase / Minimum Dark', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?args=&id=recipes-solutions-solution-use-case--minimum-dark&viewMode=story',
    )

    await page.waitForTimeout(2000)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('UseCase / Minimum Dark (fr)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Afr&args=&id=recipes-solutions-solution-use-case--minimum-dark&viewMode=story',
    )

    await page.waitForTimeout(2000)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('UseCase / Minimum Dark (de)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Ade&args=&id=recipes-solutions-solution-use-case--minimum-dark&viewMode=story',
    )

    await page.waitForTimeout(2000)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('UseCase / Minimum Dark (ja)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aja&args=&id=recipes-solutions-solution-use-case--minimum-dark&viewMode=story',
    )

    await page.waitForTimeout(2000)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('UseCase / Minimum Dark (es)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aes&args=&id=recipes-solutions-solution-use-case--minimum-dark&viewMode=story',
    )

    await page.waitForTimeout(2000)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('UseCase / Minimum Dark (pt-BR)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Apt-BR&args=&id=recipes-solutions-solution-use-case--minimum-dark&viewMode=story',
    )

    await page.waitForTimeout(2000)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })
})
