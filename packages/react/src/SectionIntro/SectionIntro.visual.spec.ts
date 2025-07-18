/*
 * Do not modify this file directly.
 * This file was generated by: playwright.generate-tests.ts.
 * Regenerate using: npm run test:visual:generate
 */
import {test, expect} from '@playwright/test'

// eslint-disable-next-line i18n-text/no-en
test.describe('Visual Comparison: SectionIntro', () => {
  test('SectionIntro / Default', async ({page}) => {
    await page.goto('http://localhost:6006/iframe.html?args=&id=components-sectionintro--default&viewMode=story')

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / Default (fr)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Afr&args=&id=components-sectionintro--default&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / Default (de)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Ade&args=&id=components-sectionintro--default&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / Default (ja)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aja&args=&id=components-sectionintro--default&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / Default (es)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aes&args=&id=components-sectionintro--default&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / Default (pt-BR)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Apt-BR&args=&id=components-sectionintro--default&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / Playground', async ({page}) => {
    await page.goto('http://localhost:6006/iframe.html?args=&id=components-sectionintro--playground&viewMode=story')

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / Playground (fr)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Afr&args=&id=components-sectionintro--playground&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / Playground (de)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Ade&args=&id=components-sectionintro--playground&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / Playground (ja)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aja&args=&id=components-sectionintro--playground&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / Playground (es)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aes&args=&id=components-sectionintro--playground&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / Playground (pt-BR)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Apt-BR&args=&id=components-sectionintro--playground&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / Heading Only', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?args=&id=components-sectionintro-features--heading-only&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / Heading Only (fr)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Afr&args=&id=components-sectionintro-features--heading-only&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / Heading Only (de)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Ade&args=&id=components-sectionintro-features--heading-only&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / Heading Only (ja)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aja&args=&id=components-sectionintro-features--heading-only&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / Heading Only (es)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aes&args=&id=components-sectionintro-features--heading-only&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / Heading Only (pt-BR)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Apt-BR&args=&id=components-sectionintro-features--heading-only&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / With Description', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?args=&id=components-sectionintro-features--with-description&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / With Description (fr)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Afr&args=&id=components-sectionintro-features--with-description&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / With Description (de)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Ade&args=&id=components-sectionintro-features--with-description&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / With Description (ja)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aja&args=&id=components-sectionintro-features--with-description&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / With Description (es)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aes&args=&id=components-sectionintro-features--with-description&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / With Description (pt-BR)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Apt-BR&args=&id=components-sectionintro-features--with-description&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / With Action', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?args=&id=components-sectionintro-features--with-action&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / With Action (fr)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Afr&args=&id=components-sectionintro-features--with-action&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / With Action (de)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Ade&args=&id=components-sectionintro-features--with-action&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / With Action (ja)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aja&args=&id=components-sectionintro-features--with-action&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / With Action (es)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aes&args=&id=components-sectionintro-features--with-action&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / With Action (pt-BR)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Apt-BR&args=&id=components-sectionintro-features--with-action&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / With Secondary Action', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?args=&id=components-sectionintro-features--with-secondary-action&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / With Secondary Action (fr)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Afr&args=&id=components-sectionintro-features--with-secondary-action&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / With Secondary Action (de)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Ade&args=&id=components-sectionintro-features--with-secondary-action&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / With Secondary Action (ja)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aja&args=&id=components-sectionintro-features--with-secondary-action&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / With Secondary Action (es)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aes&args=&id=components-sectionintro-features--with-secondary-action&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / With Secondary Action (pt-BR)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Apt-BR&args=&id=components-sectionintro-features--with-secondary-action&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / With Label', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?args=&id=components-sectionintro-features--with-label&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / With Label (fr)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Afr&args=&id=components-sectionintro-features--with-label&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / With Label (de)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Ade&args=&id=components-sectionintro-features--with-label&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / With Label (ja)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aja&args=&id=components-sectionintro-features--with-label&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / With Label (es)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aes&args=&id=components-sectionintro-features--with-label&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / With Label (pt-BR)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Apt-BR&args=&id=components-sectionintro-features--with-label&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / Aligned Center', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?args=&id=components-sectionintro-features--aligned-center&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / Aligned Center (fr)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Afr&args=&id=components-sectionintro-features--aligned-center&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / Aligned Center (de)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Ade&args=&id=components-sectionintro-features--aligned-center&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / Aligned Center (ja)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aja&args=&id=components-sectionintro-features--aligned-center&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / Aligned Center (es)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aes&args=&id=components-sectionintro-features--aligned-center&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / Aligned Center (pt-BR)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Apt-BR&args=&id=components-sectionintro-features--aligned-center&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / With Emphasized Text', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?args=&id=components-sectionintro-features--with-emphasized-text&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / With Emphasized Text (fr)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Afr&args=&id=components-sectionintro-features--with-emphasized-text&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / With Emphasized Text (de)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Ade&args=&id=components-sectionintro-features--with-emphasized-text&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / With Emphasized Text (ja)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aja&args=&id=components-sectionintro-features--with-emphasized-text&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / With Emphasized Text (es)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aes&args=&id=components-sectionintro-features--with-emphasized-text&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / With Emphasized Text (pt-BR)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Apt-BR&args=&id=components-sectionintro-features--with-emphasized-text&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / Full Width', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?args=&id=components-sectionintro-features--full-width&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / Full Width (fr)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Afr&args=&id=components-sectionintro-features--full-width&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / Full Width (de)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Ade&args=&id=components-sectionintro-features--full-width&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / Full Width (ja)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aja&args=&id=components-sectionintro-features--full-width&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / Full Width (es)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aes&args=&id=components-sectionintro-features--full-width&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / Full Width (pt-BR)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Apt-BR&args=&id=components-sectionintro-features--full-width&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / Leading Component', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?args=&id=components-sectionintro-features--leading-component&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / Leading Component (fr)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Afr&args=&id=components-sectionintro-features--leading-component&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / Leading Component (de)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Ade&args=&id=components-sectionintro-features--leading-component&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / Leading Component (ja)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aja&args=&id=components-sectionintro-features--leading-component&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / Leading Component (es)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Aes&args=&id=components-sectionintro-features--leading-component&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })

  test('SectionIntro / Leading Component (pt-BR)', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?globals=locale%3Apt-BR&args=&id=components-sectionintro-features--leading-component&viewMode=story',
    )

    await page.waitForTimeout(500)
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot()
  })
})
