import {test, expect} from '@playwright/test'

test('PricingOptions / Menu action remains interactive above sibling items', async ({page}) => {
  await page.setViewportSize({width: 390, height: 900})
  await page.goto(
    'http://localhost:6006/iframe.html?args=&id=components-pricingoptions-features--with-menu-action&viewMode=story',
    {waitUntil: 'networkidle'},
  )
  await page.locator('body.sb-show-main').waitFor({state: 'visible'})

  const trigger = page.locator('button[aria-haspopup="true"]').first()
  await trigger.click()
  const menu = page.getByRole('menu')
  await expect(menu).toBeVisible()
  await menu.getByRole('menuitem').last().click()
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
