import React from 'react'
import {INITIAL_VIEWPORTS} from 'storybook/viewport'
import {Meta, StoryFn} from '@storybook/react'

import {CategoryPage} from './CategoryPage'
import {ColorModesEnum} from '../../../ThemeProvider'

export default {
  title: 'Recipes/Solutions/CategoryPage',
  component: CategoryPage,
  args: {
    heroLabel: 'Industry',
    heroTitle: 'Lorem ipsum dolor sit amet',
    heroDescription: 'Line lengths for body text are usually between 60 to 130 characters.',

    sectionIntroText: 'Lorem ipsum of all sizes dolor sit amet',
  },
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
    layout: 'fullscreen',
  },
} as Meta<typeof CategoryPage>

export const Light: StoryFn<typeof CategoryPage> = args => <CategoryPage {...args} />
Light.args = {
  colorMode: ColorModesEnum.LIGHT,
}

export const Dark: StoryFn<typeof CategoryPage> = args => <CategoryPage {...args} />
Dark.args = {
  colorMode: ColorModesEnum.DARK,
}
