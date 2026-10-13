import {test, expect} from '@playwright/test'

test.beforeEach(async ({page}) => {
  await page.goto(
    'http://localhost:6006/iframe.html?id=components-featurecomparisontable-features--sticky-headers&viewMode=story',
  )
  await expect(page.getByRole('table', {name: 'Compare features'})).toBeVisible()
  await page.evaluate(() => document.fonts.ready)
})

test('keeps aligned headers sticky and releases them at the end of the table', async ({page}) => {
  const table = page.getByRole('table', {name: 'Compare features'})
  const head = table.locator('thead')
  const headers = table.getByRole('columnheader')
  await expect(headers).toHaveCount(3)
  const initialHeight = await head.evaluate(element => element.getBoundingClientRect().height)
  expect(initialHeight).toBeGreaterThan(0)

  const headerColumns = await headers.evaluateAll(elements =>
    elements.map(element => {
      const {x, width} = element.getBoundingClientRect()
      return {x, width}
    }),
  )
  const bodyColumns = await table
    .locator('tbody tr')
    .filter({has: page.locator('td')})
    .first()
    .locator('th, td')
    .evaluateAll(elements =>
      elements.map(element => {
        const {x, width} = element.getBoundingClientRect()
        return {x, width}
      }),
    )
  expect(bodyColumns).toHaveLength(headerColumns.length)
  for (let index = 0; index < headerColumns.length; index++) {
    expect(headerColumns[index].x).toBeCloseTo(bodyColumns[index].x, 0)
    expect(headerColumns[index].width).toBeCloseTo(bodyColumns[index].width, 0)
  }

  for (const scrollTop of [400, 700]) {
    await page.evaluate(top => window.scrollTo({top, behavior: 'instant'}), scrollTop)
    await expect.poll(() => head.evaluate(element => element.getBoundingClientRect().top)).toBeCloseTo(0, 0)
    await expect
      .poll(() => head.evaluate(element => element.getBoundingClientRect().height))
      .toBeCloseTo(initialHeight, 0)
    for (const header of await headers.all()) {
      expect((await header.boundingBox())?.y).toBeCloseTo(0, 0)
    }
  }

  await page.evaluate(() => {
    document.body.style.paddingBottom = '100vh'
  })
  const tableBottom = await table.evaluate(element => element.getBoundingClientRect().bottom + window.scrollY)
  await page.evaluate(top => window.scrollTo({top, behavior: 'instant'}), tableBottom)
  await expect.poll(() => head.evaluate(element => element.getBoundingClientRect().bottom)).toBeLessThanOrEqual(1)

  await page.setViewportSize({width: 1279, height: 800})
  await expect(table).toHaveCount(0)
  await expect(page.getByTestId('FeatureComparisonTable__narrow')).toBeVisible()
})

test('keeps keyboard focus visible below the sticky header', async ({page}) => {
  const table = page.getByRole('table', {name: 'Compare features'})
  const head = table.locator('thead')
  const control = table.getByRole('button', {name: 'Collaboration'})

  await page.evaluate(() => window.scrollTo({top: 400, behavior: 'instant'}))
  await control.focus()
  await expect(control).toBeFocused()
  await expect
    .poll(async () => {
      const headerBottom = await head.evaluate(element => element.getBoundingClientRect().bottom)
      return control.evaluate((element, bottom) => {
        const style = getComputedStyle(element)
        const clearance = Math.max(
          0,
          (Number.parseFloat(style.outlineWidth) || 0) + (Number.parseFloat(style.outlineOffset) || 0),
        )
        return element.getBoundingClientRect().top - clearance - bottom
      }, headerBottom)
    })
    .toBeGreaterThanOrEqual(-1)
})
