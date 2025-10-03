import React from 'react'
import {INITIAL_VIEWPORTS} from 'storybook/viewport'
import {Meta, StoryFn} from '@storybook/react'

import {SolutionPage} from '../SolutionPage'
import {sharedArgTypes} from '../../helpers'
import {ColorModesEnum} from '../../../../ThemeProvider'

export default {
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
export const Maximum: StoryFn<typeof SolutionPage> = args => <SolutionPage {...args} />
Maximum.args = {
  ...maximumArgs,
  variant: 'use-case',
}
Maximum.storyName = 'Maximum Light'

export const MaximumDark: StoryFn<typeof SolutionPage> = args => <Maximum {...args} />
MaximumDark.args = {
  ...maximumArgs,
  variant: 'use-case',
  colorMode: ColorModesEnum.DARK,
}

export const Minimum: StoryFn<typeof SolutionPage> = args => <SolutionPage {...args} />
Minimum.args = {
  variant: 'use-case',
  riverVisible: true,
}
Minimum.storyName = 'Minimum Light'

export const MinimumDark = Minimum.bind({})
MinimumDark.args = {
  variant: 'use-case',
  colorMode: ColorModesEnum.DARK,
  riverVisible: true,
}
MinimumDark.storyName = 'Minimum Dark'
