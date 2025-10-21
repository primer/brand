import React from 'react'
import {INITIAL_VIEWPORTS} from 'storybook/viewport'
import type {Meta, StoryObj} from '@storybook/react'

import {CategoryPage} from './CategoryPage'
import {ColorModesEnum} from '../../../ThemeProvider'

const meta = {
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

export default meta

type Story = StoryObj<typeof CategoryPage>

export const Light: Story = {
  render: args => <CategoryPage {...args} />,
  args: {
    colorMode: ColorModesEnum.LIGHT,
  },
}

export const Dark: Story = {
  render: args => <CategoryPage {...args} />,
  args: {
    colorMode: ColorModesEnum.DARK,
  },
}
