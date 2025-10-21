import React from 'react'
import {INITIAL_VIEWPORTS} from 'storybook/viewport'
import type {Meta, StoryObj} from '@storybook/react'

import {SolutionPage} from '../SolutionPage'
import {sharedArgTypes} from '../../helpers'
import {ColorModesEnum} from '../../../../ThemeProvider'

const meta = {
  title: 'Recipes/Solutions/Solution: Org size',
  component: SolutionPage,
  args: {
    variant: 'size',
    heroTitle: 'Build like the best teams on the planet',
    heroDescription:
      'With CI/CD, Dependabot, and the world’s largest developer community, GitHub gives your team everything they need to ship better software faster.',
    heroCtaTextPrimary: 'Get started with Teams',
    heroCtaTextSecondary: 'Create a free organization',
    heroAlign: 'center',

    sectionIntroText: 'A single, integrated, enterprise-ready platform',
    sectionIntroCTAText: 'Explore GitHub Enterprise',

    introVariant: 'editorial list',
    logobarVisible: false,
    riverVisible: false,
    customerStoryVisible: false,
    testimonialsVisible: false,
    faqVisible: false,

    jtbd1Visible: true,
    jtbd2Visible: false,
    jtbd3Visible: false,
    jtbdBentosVisible: false,
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
  variant: 'size',
  logoBarVisible: true,
  testimonialsVisible: true,
  pricingOptionsVisible: true,
  faqVisible: true,
  jtbd2Visible: true,
  jtbd3Visible: true,
  jtbdBentosVisible: true,
}

export const Maximum: Story = {
  name: 'Maximum Light',
  render: args => <SolutionPage {...args} />,
  args: {
    ...maximumArgs,
    variant: 'size',
  },
}

export const MaximumDark: Story = {
  render: args => <SolutionPage {...args} />,
  args: {
    ...maximumArgs,
    variant: 'size',
    colorMode: ColorModesEnum.DARK,
  },
}

const minimumArgs = {
  variant: 'size',
  jtbd1Visible: true,
  jtbd2Visible: false,
  jtbd3Visible: false,
  jtbdBentosVisible: false,
}
export const Minimum: Story = {
  name: 'Minimum Light',
  render: args => <SolutionPage {...args} />,
  args: {
    ...minimumArgs,
    variant: 'size',
  },
}

export const MinimumDark: Story = {
  render: args => <SolutionPage {...args} />,
  args: {
    ...minimumArgs,
    variant: 'size',
    colorMode: ColorModesEnum.DARK,
  },
}
