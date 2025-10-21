import React from 'react'
import {INITIAL_VIEWPORTS} from 'storybook/viewport'
import type {Meta, StoryObj} from '@storybook/react'

import {SolutionPage} from '../SolutionPage'
import {sharedArgTypes} from '../../helpers'
import {ColorModesEnum} from '../../../../ThemeProvider'

const meta = {
  title: 'Recipes/Solutions/Solution: Industry',
  component: SolutionPage,
  args: {
    heroVideo: true,
    heroLabel: 'Healthcare',
    heroTitle: 'Empower healthcare development with a secure, AI-powered platform',
    heroDescription:
      'By incorporating AI into developer workflows, you can build secure and optimized communication channel between patient and care providers.',
    heroCtaTextPrimary: 'Start a free trial',
    heroCtaTextSecondary: 'Contact Sales',

    sectionIntroText: 'A single, integrated, enterprise-ready platform',

    introVariant: 'pillars',
    logoBarVisible: false,
    riverVisible: false,
    customerStoryVisible: false,
    testimonialsVisible: false,
    faqVisible: false,
  },
  argTypes: {
    ...sharedArgTypes,
  },
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
    layout: 'fullscreen',
  },
} as Meta<typeof SolutionPage>

export default meta

type Story = StoryObj<typeof SolutionPage>

const maximumArgs = {
  variant: 'industry',

  logoBarVisible: true,
  riverVisible: true,
  customerStoryVisible: true,
  testimonialsVisible: true,
  faqVisible: true,
}
export const Maximum: Story = {
  name: 'Maximum Light',
  render: args => <SolutionPage {...args} />,
  args: {
    ...maximumArgs,
    variant: 'industry',
  },
}

export const MaximumDark: Story = {
  render: args => <SolutionPage {...args} />,
  args: {
    ...maximumArgs,
    variant: 'industry',
    colorMode: ColorModesEnum.DARK,
  },
}

export const Minimum: Story = {
  name: 'Minimum Light',
  render: args => <SolutionPage {...args} />,
  args: {
    variant: 'industry',
  },
}

export const MinimumDark: Story = {
  render: args => <SolutionPage {...args} />,
  args: {
    variant: 'industry',
    colorMode: ColorModesEnum.DARK,
  },
}
