import {test, expect} from '@playwright/test'

test('PricingOptions / Open menu remains interactive over the adjacent pricing option', async ({page}) => {
  await page.setViewportSize({width: 390, height: 900})
  await page.goto(
    'http://localhost:6006/iframe.html?args=&id=components-pricingoptions-features--with-menu-action&viewMode=story',
    {waitUntil: 'networkidle'},
  )
  await page.locator('body.sb-show-main').waitFor({state: 'visible'})

  // Compact the first option so that the open menu overlaps the next one.
  await page.addStyleTag({
    content:
      '[data-testid="PricingOptions"] { row-gap: 0 } [data-testid="PricingOptions__featureList"] { display: none }',
  })

  const trigger = page.locator('button[aria-haspopup="true"]').first()
  await trigger.click()
  const menu = page.getByRole('menu')
  await expect(menu).toBeVisible()
  const lastItem = menu.getByRole('menuitem').last()
  await expect
    .poll(() =>
      lastItem.evaluate(item => {
        const sibling = item.closest('[data-testid="PricingOptions__item"]')?.nextElementSibling
        const {x, y, width, height} = item.getBoundingClientRect()
        return sibling && document.elementsFromPoint(x + width / 2, y + height / 2).includes(sibling)
      }),
    )
    .toBe(true)
  await lastItem.click()
  await expect(page).toHaveURL(/#$/)
})

test('PricingOptions / Updated story copy supports German', async ({page}) => {
  await page.goto(
    'http://localhost:6006/iframe.html?args=&id=components-pricingoptions-features--actions-message&viewMode=story&globals=locale:de',
    {waitUntil: 'networkidle'},
  )
  await page.locator('body.sb-show-main').waitFor({state: 'visible'})
  await expect(page.getByText(/Upgrades sind pausiert/).first()).toBeVisible()
  await expect(page.getByRole('link', {name: 'Mehr erfahren'}).first()).toBeVisible()

  await page.goto(
    'http://localhost:6006/iframe.html?args=&id=components-pricingoptions-features--center-aligned&viewMode=story&globals=locale:de',
    {waitUntil: 'networkidle'},
  )
  await page.locator('body.sb-show-main').waitFor({state: 'visible'})
  await expect(page.getByText(/Kostenlos für verifizierte Studierende/)).toBeVisible()
})

test('PricingOptions / Custom leading visual story uses the selected French locale', async ({page}) => {
  await page.goto(
    'http://localhost:6006/iframe.html?id=components-pricingoptions-features--with-custom-feature-list-item-leading-visual&viewMode=story&globals=locale:fr',
  )
  const plan = page.getByTestId('PricingOptions__item').first()
  await expect(plan.getByRole('link', {name: 'Démarrer un essai gratuit'})).toBeVisible()
  await expect(plan.getByText(/^Assistance en ligne de commande$/)).toBeVisible()
  await expect(plan.getByLabel('Inclus').first()).toBeVisible()
})
