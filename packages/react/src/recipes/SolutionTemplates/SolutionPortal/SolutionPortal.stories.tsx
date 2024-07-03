import React from 'react'
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'
import {Meta, StoryFn} from '@storybook/react'

import {SolutionPortal} from './SolutionPortal'
import {ColorModesEnum} from '../../../ThemeProvider'

export default {
  title: 'Recipes/Solutions/Portal',
  component: SolutionPortal,
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
} as Meta<typeof SolutionPortal>

export const Light: StoryFn<typeof SolutionPortal> = args => <SolutionPortal {...args} />
Light.args = {
  colorMode: ColorModesEnum.LIGHT,
}

export const Dark: StoryFn<typeof SolutionPortal> = args => <SolutionPortal {...args} />
Dark.args = {
  colorMode: ColorModesEnum.DARK,
}
