import React from 'react'
import {INITIAL_VIEWPORTS} from 'storybook/viewport'
import type {Meta, StoryObj} from '@storybook/react'

import {SolutionPage} from '../SolutionPage'
import {sharedArgTypes} from '../../helpers'
import {ColorModesEnum} from '../../../../ThemeProvider'

const meta = {
  title: 'Recipes/Solutions/Solution: Use case',
  component: SolutionPage,
  args: {
    variant: 'use-case',
    heroImage: true,
    heroLabel: 'DevOps',
    heroTitle: 'The complete CI/CD solution',
    heroDescription:
      'Build, test, and deploy software with simple and secure enterprise CI/CD, all on the complete development platform.',
    heroCtaTextPrimary: 'Start a free trial',
    heroCtaTextSecondary: 'Contact Sales',
    sectionIntroText: 'A single, integrated, enterprise-ready platform',
    sectionIntroCTAText: 'Explore GitHub Enterprise',
    introVariant: 'editorial list',

    logoBarVisible: true,
    riverVisible: false,
    customerStoryVisible: false,
    testimonialsVisible: false,
    faqVisible: false,
    statisticsVisible: false,
    breakoutBannerVisible: false,
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
  variant: 'use-case',
  logoBarVisible: true,
  riverVisible: true,
  customerStoryVisible: false,
  testimonialsVisible: true,
  faqVisible: true,
  statisticsVisible: true,
  breakoutBannerVisible: true,
}
export const Maximum: Story = {
  name: 'Maximum Light',
  render: args => <SolutionPage {...args} />,
  args: {
    ...maximumArgs,
    variant: 'use-case',
  },
}

export const MaximumDark: Story = {
  render: args => <SolutionPage {...args} />,
  args: {
    ...maximumArgs,
    variant: 'use-case',
    colorMode: ColorModesEnum.DARK,
  },
}

export const Minimum: Story = {
  name: 'Minimum Light',
  render: args => <SolutionPage {...args} />,
  args: {
    variant: 'use-case',
    riverVisible: true,
  },
}

export const MinimumDark: Story = {
  name: 'Minimum Dark',
  render: args => <SolutionPage {...args} />,
  args: {
    variant: 'use-case',
    colorMode: ColorModesEnum.DARK,
    riverVisible: true,
  },
}
