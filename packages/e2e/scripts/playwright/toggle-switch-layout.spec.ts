import {expect, test, type Page} from '@playwright/test'
import {waitForStoryReady} from './wait-for-story-ready'

const narrowStory = 'components-forms-toggleswitch-features--status-label-narrow'
const statusStory = 'components-forms-toggleswitch-features--status-label'
const loadingStory = 'components-forms-toggleswitch-features--standalone-loading-positions'
const failureStory = 'components-forms-toggleswitch-examples--optimistic-update-failure'

async function openStory(page: Page, storyId: string) {
  await page.goto(`http://localhost:6006/iframe.html?viewMode=story&id=${storyId}`)
  await waitForStoryReady(page, storyId)
}

async function checkNarrowLayout(page: Page, width?: number) {
  for (const size of ['medium', 'small'] as const) {
    const control = page.getByRole('switch', {name: `${size} setting`})
    const section = control.locator('xpath=ancestor::section[1]')
    if (width !== undefined) {
      await section.evaluate((element, value) => {
        element.style.inlineSize = `${value}px`
      }, width)
    }

    const layout = await section.evaluate(element => {
      const label = element.querySelector('label')
      const button = element.querySelector('[role="switch"]')
      const toggle = button?.closest('[data-testid="ToggleSwitch"]')
      const track = button?.querySelector('[class*="ToggleSwitch-track"]')
      const status = button?.querySelector('[data-testid="ToggleSwitch-status-label"]')
      const hint = element.querySelector('[id$="-hint"]')
      if (!label || !button || !toggle || !track || !status || !hint) {
        throw new Error('The narrow switch example is missing a required element')
      }

      const bounds = (node: Element) => {
        const {left, right, top, bottom, width: nodeWidth} = node.getBoundingClientRect()
        return {left, right, top, bottom, width: nodeWidth}
      }

      return {
        section: bounds(element),
        label: bounds(label),
        button: bounds(button),
        toggle: bounds(toggle),
        track: bounds(track),
        status: bounds(status),
        hint: bounds(hint),
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: window.innerWidth,
      }
    })

    expect(layout.label.width).toBeGreaterThanOrEqual(Math.min(layout.section.width, 96) - 1)
    expect(layout.toggle.left).toBeGreaterThanOrEqual(layout.section.left - 1)
    expect(layout.toggle.right).toBeLessThanOrEqual(layout.section.right + 1)
    expect(layout.track.width).toBe(size === 'medium' ? 44 : 28)
    expect(layout.status.width).toBeGreaterThan(0)
    expect(layout.status.left).toBeGreaterThanOrEqual(layout.button.left - 1)
    expect(layout.status.right).toBeLessThanOrEqual(layout.button.right + 1)
    expect(layout.hint.top).toBeGreaterThanOrEqual(layout.toggle.bottom - 1)
    expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth)
    const labelsOverlap =
      layout.label.left < layout.toggle.right &&
      layout.label.right > layout.toggle.left &&
      layout.label.top < layout.toggle.bottom &&
      layout.label.bottom > layout.toggle.top
    expect(labelsOverlap).toBe(false)

    const before = await control.boundingBox()
    await control.click()
    const after = await control.boundingBox()
    expect(before).not.toBeNull()
    expect(after).not.toBeNull()
    if (!before || !after) throw new Error('The switch is not visible')
    expect(after.x).toBeCloseTo(before.x, 1)
    expect(after.width).toBeCloseTo(before.width, 1)
  }
}

test('keeps switch labels readable in narrow containers on a wide viewport', async ({page}) => {
  await page.setViewportSize({width: 1280, height: 800})
  await openStory(page, narrowStory)

  for (const direction of ['ltr', 'rtl']) {
    await page.locator('#storybook-root').evaluate((element, value) => element.setAttribute('dir', value), direction)
    for (const width of [160, 200, 320]) {
      await checkNarrowLayout(page, width)
    }
  }
})

test('keeps switch labels readable on a 320px viewport', async ({page}) => {
  await page.setViewportSize({width: 320, height: 800})
  await openStory(page, narrowStory)
  await checkNarrowLayout(page)
})

test('keeps validation text below a switch in a narrow container', async ({page}) => {
  await page.setViewportSize({width: 1280, height: 800})
  await openStory(page, statusStory)
  const section = page.getByRole('switch', {name: 'Validation error'}).locator('xpath=ancestor::section[1]')
  await section.evaluate(element => {
    element.style.inlineSize = '160px'
  })
  await section.locator('[id$="-validation"]').evaluate(async element => {
    await Promise.all(element.getAnimations().map(animation => animation.finished))
  })

  const layout = await section.evaluate(element => {
    const toggle = element.querySelector('[data-testid="ToggleSwitch"]')
    const validation = element.querySelector('[id$="-validation"]')
    if (!toggle || !validation) throw new Error('The validation example is missing a required element')
    return {
      controlBottom: toggle.getBoundingClientRect().bottom,
      validationTop: validation.getBoundingClientRect().top,
      validationRight: validation.getBoundingClientRect().right,
      sectionRight: element.getBoundingClientRect().right,
    }
  })
  expect(layout.validationTop).toBeGreaterThanOrEqual(layout.controlBottom - 1)
  expect(layout.validationRight).toBeLessThanOrEqual(layout.sectionRight + 1)
})

test('shows standalone loading spinners on the requested side of the switch', async ({page}) => {
  await openStory(page, loadingStory)

  for (const [name, position] of [
    ['Spinner at start', 'start'],
    ['Spinner at end + checked', 'end'],
  ] as const) {
    const control = page.getByRole('switch', {name})
    const root = control.locator('..')
    const spinnerSlot = root.getByTestId('ToggleSwitch-spinner').locator('xpath=../..')
    await expect(root.getByTestId('ToggleSwitch-status-label')).toBeVisible()
    const adjacentRole = await spinnerSlot.evaluate(
      (element, side) =>
        (side === 'start' ? element.nextElementSibling : element.previousElementSibling)?.getAttribute('role'),
      position,
    )
    expect(adjacentRole).toBe('switch')
  }
})

test('waits for the validation story and its animation after a delayed load', async ({page}) => {
  let delayedStory = false
  await page.route(/ToggleSwitch\.examples\.stories/, async route => {
    delayedStory = true
    await new Promise(resolve => setTimeout(resolve, 1700))
    await route.continue()
  })

  await openStory(page, failureStory)

  expect(delayedStory).toBe(true)
  const validation = page.locator('[id$="-validation"]')
  await expect(validation).toContainText(/\S/)
  await expect(validation).toHaveCSS('opacity', '1')
  await expect(page.getByRole('switch', {name: 'Email notifications'})).toHaveAttribute('aria-invalid', 'true')
})

test('does not report readiness when the validation message never appears', async ({page}) => {
  await page.addInitScript(() => {
    document.addEventListener(
      'click',
      event => {
        if (event.target instanceof Element && event.target.closest('[role="switch"]')) event.stopImmediatePropagation()
      },
      true,
    )
  })

  await page.goto(`http://localhost:6006/iframe.html?viewMode=story&id=${failureStory}`)
  await expect(waitForStoryReady(page, failureStory, 3000)).rejects.toThrow(/Timeout/)
})

test('does not report readiness when an interaction fails after validation appears', async ({page}) => {
  await page.addInitScript(() => {
    const getAnimations = Element.prototype.getAnimations
    Element.prototype.getAnimations = function (options) {
      if (this.id.endsWith('-validation')) throw new Error('Forced interaction failure')
      return getAnimations.call(this, options)
    }
  })

  await page.goto(`http://localhost:6006/iframe.html?viewMode=story&id=${failureStory}`)
  await expect(waitForStoryReady(page, failureStory, 3000)).rejects.toThrow(/Timeout/)
  await expect(page.locator('[id$="-validation"]')).toContainText(/\S/)
})
