import {expect, type Page} from '@playwright/test'

type StorybookWindow = Window & {
  __STORYBOOK_PREVIEW__?: {
    storyRenders: Array<{
      id: string
      phase?: string
      canvasElement?: HTMLElement
      story?: {parameters?: {axe?: {waitForPlay?: boolean}}}
    }>
  }
}

export async function waitForStoryReady(page: Page, storyId: string, timeout = 15000) {
  await page.waitForFunction(
    id => {
      const render = (window as StorybookWindow).__STORYBOOK_PREVIEW__?.storyRenders.find(item => item.id === id)
      if (!render?.story) return false

      // Finished renders can contain failed interactions, so opted-in stories signal successful completion.
      if (!render.story.parameters?.axe?.waitForPlay) return true
      return render.phase === 'finished' && render.canvasElement?.getAttribute('data-axe-ready') === 'true'
    },
    storyId,
    {timeout},
  )
  await expect(page.locator('body.sb-show-main')).toBeVisible()
}
