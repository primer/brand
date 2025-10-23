import React from 'react'
import {INITIAL_VIEWPORTS} from 'storybook/viewport'
import type {Meta, StoryObj} from '@storybook/react'

import {SolutionsOverview} from './SolutionsOverview'
import {ColorModesEnum} from '../../../ThemeProvider'

const meta = {
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

export default meta

type Story = StoryObj<typeof SolutionsOverview>

export const Light: Story = {
  render: args => <SolutionsOverview {...args} />,
  args: {
    colorMode: ColorModesEnum.LIGHT,
  },
}

export const Dark: Story = {
  render: args => <SolutionsOverview {...args} />,
  args: {
    colorMode: ColorModesEnum.DARK,
  },
}
