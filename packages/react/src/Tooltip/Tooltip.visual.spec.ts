/*
 * Do not modify this file directly.
 * This file was generated by: playwright.generate-tests.ts.
 * Regenerate using: npm run test:visual:generate
 */
import {test, expect} from '@playwright/test'

// eslint-disable-next-line i18n-text/no-en
test.describe('Visual Comparison: Tooltip', () => {
  test('Tooltip / Default', async ({page}) => {
    await page.goto('http://localhost:6006/iframe.html?args=&id=components-tooltip--default&viewMode=story')

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Tooltip / Default (fr)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Afr&args=&id=components-tooltip--default&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Tooltip / Default (de)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Ade&args=&id=components-tooltip--default&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Tooltip / Default (ja)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aja&args=&id=components-tooltip--default&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Tooltip / Default (es)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aes&args=&id=components-tooltip--default&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Tooltip / Default (pt-BR)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Apt-BR&args=&id=components-tooltip--default&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Tooltip / Playground', async ({page}) => {
    await page.goto('http://localhost:6006/iframe.html?args=&id=components-tooltip--playground&viewMode=story')

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Tooltip / Playground (fr)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Afr&args=&id=components-tooltip--playground&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Tooltip / Playground (de)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Ade&args=&id=components-tooltip--playground&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Tooltip / Playground (ja)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aja&args=&id=components-tooltip--playground&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Tooltip / Playground (es)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aes&args=&id=components-tooltip--playground&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Tooltip / Playground (pt-BR)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Apt-BR&args=&id=components-tooltip--playground&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Tooltip / Anchor Has Margin', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?args=&id=components-tooltip-features--anchor-has-margin&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Tooltip / Anchor Has Margin (fr)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Afr&args=&id=components-tooltip-features--anchor-has-margin&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Tooltip / Anchor Has Margin (de)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Ade&args=&id=components-tooltip-features--anchor-has-margin&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Tooltip / Anchor Has Margin (ja)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aja&args=&id=components-tooltip-features--anchor-has-margin&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Tooltip / Anchor Has Margin (es)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aes&args=&id=components-tooltip-features--anchor-has-margin&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Tooltip / Anchor Has Margin (pt-BR)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Apt-BR&args=&id=components-tooltip-features--anchor-has-margin&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Tooltip / Label Type', async ({page}) => {
    await page.goto('http://localhost:6006/iframe.html?args=&id=components-tooltip-features--label-type&viewMode=story')

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Tooltip / Label Type (fr)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Afr&args=&id=components-tooltip-features--label-type&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Tooltip / Label Type (de)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Ade&args=&id=components-tooltip-features--label-type&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Tooltip / Label Type (ja)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aja&args=&id=components-tooltip-features--label-type&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Tooltip / Label Type (es)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aes&args=&id=components-tooltip-features--label-type&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Tooltip / Label Type (pt-BR)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Apt-BR&args=&id=components-tooltip-features--label-type&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Tooltip / All Directions', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?args=&id=components-tooltip-features--all-directions&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Tooltip / All Directions (fr)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Afr&args=&id=components-tooltip-features--all-directions&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Tooltip / All Directions (de)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Ade&args=&id=components-tooltip-features--all-directions&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Tooltip / All Directions (ja)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aja&args=&id=components-tooltip-features--all-directions&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Tooltip / All Directions (es)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aes&args=&id=components-tooltip-features--all-directions&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Tooltip / All Directions (pt-BR)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Apt-BR&args=&id=components-tooltip-features--all-directions&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Tooltip / Multiline Text', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?args=&id=components-tooltip-features--multiline-text&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Tooltip / Multiline Text (fr)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Afr&args=&id=components-tooltip-features--multiline-text&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Tooltip / Multiline Text (de)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Ade&args=&id=components-tooltip-features--multiline-text&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Tooltip / Multiline Text (ja)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aja&args=&id=components-tooltip-features--multiline-text&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Tooltip / Multiline Text (es)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aes&args=&id=components-tooltip-features--multiline-text&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Tooltip / Multiline Text (pt-BR)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Apt-BR&args=&id=components-tooltip-features--multiline-text&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Tooltip / Calculated Direction', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?args=&id=components-tooltip-features--calculated-direction&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Tooltip / Calculated Direction (fr)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Afr&args=&id=components-tooltip-features--calculated-direction&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Tooltip / Calculated Direction (de)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Ade&args=&id=components-tooltip-features--calculated-direction&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Tooltip / Calculated Direction (ja)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aja&args=&id=components-tooltip-features--calculated-direction&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Tooltip / Calculated Direction (es)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aes&args=&id=components-tooltip-features--calculated-direction&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('Tooltip / Calculated Direction (pt-BR)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Apt-BR&args=&id=components-tooltip-features--calculated-direction&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })
})
