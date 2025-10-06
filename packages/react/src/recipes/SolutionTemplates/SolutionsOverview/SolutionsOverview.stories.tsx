import React from 'react'
import {INITIAL_VIEWPORTS} from 'storybook/viewport'
import {Meta, StoryFn} from '@storybook/react'

import {SolutionsOverview} from './SolutionsOverview'
import {ColorModesEnum} from '../../../ThemeProvider'

export default {
  title: 'Recipes/Solutions/Overview',
  component: SolutionsOverview,
  args: {
    heroAlign: 'center',
    heroLabel: 'Label',
    heroTitle: 'Solutions for lorem ipsum dolor sit amet',
    heroDescription: 'Line lengths for body text are usually between 60 to 130 characters.',
    heroCtaTextPrimary: 'Primary CTA',
    heroCtaTextSecondary: 'Secondary CTA',

    sectionIntroText: 'Lorem ipsum of all sizes dolor sit amet',
  },
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
    layout: 'fullscreen',
  },
} as Meta<typeof SolutionsOverview>

export const Light: StoryFn<typeof SolutionsOverview> = args => <SolutionsOverview {...args} />
Light.args = {
  colorMode: ColorModesEnum.LIGHT,
}

export const Dark: StoryFn<typeof SolutionsOverview> = args => <SolutionsOverview {...args} />
Dark.args = {
  colorMode: ColorModesEnum.DARK,
}
