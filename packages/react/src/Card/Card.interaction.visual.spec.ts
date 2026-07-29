import {expect, test} from '@playwright/test'

const ArrowCTAStory =
  'http://localhost:6006/iframe.html?args=&id=components-card-features--arrow-cta-long-label&viewMode=story'

// eslint-disable-next-line i18n-text/no-en
test.describe('Card interaction behavior', () => {
  test('keeps the arrow CTA label visible on non-hover devices', async ({context, page}) => {
    const client = await context.newCDPSession(page)

    await client.send('Emulation.setTouchEmulationEnabled', {enabled: true, maxTouchPoints: 1})
    await client.send('Emulation.setEmulatedMedia', {
      features: [
        {name: 'hover', value: 'none'},
        {name: 'any-hover', value: 'none'},
        {name: 'pointer', value: 'coarse'},
        {name: 'any-pointer', value: 'coarse'},
      ],
    })
    await page.setViewportSize({width: 375, height: 812})
    await page.goto(ArrowCTAStory, {waitUntil: 'networkidle'})

    const action = page.locator('[class*="Card__action--arrowOnly"]').first()
    const label = action.locator('[class*="Card__actionLabel__"]')
    const labelClip = action.locator('[class*="Card__actionLabelClip__"]')

    await expect(label).toBeVisible()
    await expect(action).toHaveCSS('column-gap', '8px')
    await expect(label).toHaveCSS('white-space', 'normal')
    await expect(labelClip).toHaveCSS('display', 'contents')
    expect(await page.evaluate(() => window.matchMedia('(hover: none)').matches)).toBe(true)
  })

  test('disables the remaining Card transitions and animations', async ({page}) => {
    await page.goto(
      'http://localhost:6006/iframe.html?args=&id=components-card-features--with-inline-code-element&viewMode=story',
      {waitUntil: 'networkidle'},
    )

    const card = page.locator('[class*="Card--disableAnimation"]').first()
    const action = card.locator('[class*="Card__action__"]')
    const arrow = action.locator('[class*="Card--expandableArrow"]')

    await card.hover()

    await expect(card).toHaveCSS('transition-duration', '0s')
    await expect(action).toHaveCSS('transition-duration', '0s')
    await expect(arrow).toHaveCSS('transition-duration', '0s')
  })
})
