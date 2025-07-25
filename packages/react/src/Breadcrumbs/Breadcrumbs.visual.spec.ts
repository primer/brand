/*
 * Do not modify this file directly.
 * This file was generated by: playwright.generate-tests.ts.
 * Regenerate using: npm run test:visual:generate
 */
import {test, expect} from '@playwright/test'

// eslint-disable-next-line i18n-text/no-en
test.describe('Visual Comparison: Breadcrumbs', () => {
  test('Breadcrumbs / Default', async ({page}) => {
    await page.goto('http://localhost:6006/iframe.html?args=&id=components-breadcrumbs--default&viewMode=story')

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Breadcrumbs / Default (fr)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Afr&args=&id=components-breadcrumbs--default&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Breadcrumbs / Default (de)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Ade&args=&id=components-breadcrumbs--default&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Breadcrumbs / Default (ja)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aja&args=&id=components-breadcrumbs--default&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Breadcrumbs / Default (es)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aes&args=&id=components-breadcrumbs--default&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Breadcrumbs / Default (pt-BR)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Apt-BR&args=&id=components-breadcrumbs--default&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Breadcrumbs / Playground', async ({page}) => {
    await page.goto('http://localhost:6006/iframe.html?args=&id=components-breadcrumbs--playground&viewMode=story')

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Breadcrumbs / Playground (fr)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Afr&args=&id=components-breadcrumbs--playground&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Breadcrumbs / Playground (de)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Ade&args=&id=components-breadcrumbs--playground&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Breadcrumbs / Playground (ja)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aja&args=&id=components-breadcrumbs--playground&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Breadcrumbs / Playground (es)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aes&args=&id=components-breadcrumbs--playground&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Breadcrumbs / Playground (pt-BR)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Apt-BR&args=&id=components-breadcrumbs--playground&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Breadcrumbs / Accent variant', async ({page}) => {
    await page.goto('http://localhost:6006/iframe.html?args=&id=components-breadcrumbs-features--accent&viewMode=story')

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Breadcrumbs / Accent variant (fr)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Afr&args=&id=components-breadcrumbs-features--accent&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Breadcrumbs / Accent variant (de)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Ade&args=&id=components-breadcrumbs-features--accent&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Breadcrumbs / Accent variant (ja)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aja&args=&id=components-breadcrumbs-features--accent&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Breadcrumbs / Accent variant (es)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aes&args=&id=components-breadcrumbs-features--accent&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Breadcrumbs / Accent variant (pt-BR)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Apt-BR&args=&id=components-breadcrumbs-features--accent&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Breadcrumbs / Long Links', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?args=&id=components-breadcrumbs-features--long-links&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Breadcrumbs / Long Links (fr)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Afr&args=&id=components-breadcrumbs-features--long-links&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Breadcrumbs / Long Links (de)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Ade&args=&id=components-breadcrumbs-features--long-links&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Breadcrumbs / Long Links (ja)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aja&args=&id=components-breadcrumbs-features--long-links&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Breadcrumbs / Long Links (es)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aes&args=&id=components-breadcrumbs-features--long-links&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Breadcrumbs / Long Links (pt-BR)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Apt-BR&args=&id=components-breadcrumbs-features--long-links&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  // eslint-disable-next-line i18n-text/no-en
  test.describe('Mobile viewport test for Long links (narrow viewport)', () => {
    test.use({viewport: {width: 360, height: 800}})
    test('Breadcrumbs / Long links (narrow viewport)', async ({page}) => {
      await page.goto(
        'http://localhost:6006/iframe.html?args=&id=components-breadcrumbs-features--long-links-narrow&viewMode=story',
      )

      await page.waitForTimeout(500)
      expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
    })

    test('Breadcrumbs / Long links (narrow viewport) (fr)', async ({page}) => {
      await page.goto(
        'http://localhost:6006/iframe.html?globals=locale%3Afr&args=&id=components-breadcrumbs-features--long-links-narrow&viewMode=story',
      )

      await page.waitForTimeout(500)
      expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
    })

    test('Breadcrumbs / Long links (narrow viewport) (de)', async ({page}) => {
      await page.goto(
        'http://localhost:6006/iframe.html?globals=locale%3Ade&args=&id=components-breadcrumbs-features--long-links-narrow&viewMode=story',
      )

      await page.waitForTimeout(500)
      expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
    })

    test('Breadcrumbs / Long links (narrow viewport) (ja)', async ({page}) => {
      await page.goto(
        'http://localhost:6006/iframe.html?globals=locale%3Aja&args=&id=components-breadcrumbs-features--long-links-narrow&viewMode=story',
      )

      await page.waitForTimeout(500)
      expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
    })

    test('Breadcrumbs / Long links (narrow viewport) (es)', async ({page}) => {
      await page.goto(
        'http://localhost:6006/iframe.html?globals=locale%3Aes&args=&id=components-breadcrumbs-features--long-links-narrow&viewMode=story',
      )

      await page.waitForTimeout(500)
      expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
    })

    test('Breadcrumbs / Long links (narrow viewport) (pt-BR)', async ({page}) => {
      await page.goto(
        'http://localhost:6006/iframe.html?globals=locale%3Apt-BR&args=&id=components-breadcrumbs-features--long-links-narrow&viewMode=story',
      )

      await page.waitForTimeout(500)
      expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
    })
  })
})
