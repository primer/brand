import React from 'react'
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'
import {Meta, StoryFn} from '@storybook/react'

import {SolutionPage} from './SolutionPage'
import {sharedArgTypes} from '../helpers'

export default {
  title: 'Recipes/Solutions/Solution: Use case',
  component: SolutionPage,
  args: {
    heroImage: true,
    heroLabel: 'DevOps',
    heroTitle: 'The complete CI/CD solution',
    heroDescription:
      'Build, test, and deploy software with simple and secure enterprise CI/CD, all on the complete development platform.',
    heroCtaTextPrimary: 'Start a free trial',
    heroCtaTextSecondary: 'Contact Sales',
    introVariant: 'editorial list',

    logoBarVisible: true,
    riverVisible: false,
    customerStoryVisible: false,
    testimonialsVisible: false,
    faqVisible: false,
    statisticsVisible: false,
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

export const Playground: StoryFn<typeof SolutionPage> = args => <SolutionPage {...args} />
Playground.args = {
  variant: 'use-case',

  sectionIntroText: 'A single, integrated, enterprise-ready platform',
  sectionIntroCTAText: 'Explore GitHub Enterprise',

  logoBarVisible: true,
  riverVisible: true,
  customerStoryVisible: false,
  testimonialsVisible: true,
  faqVisible: true,
  statisticsVisible: true,
}

export const Minimum: StoryFn<typeof SolutionPage> = args => <SolutionPage {...args} />
Minimum.args = {
  variant: 'use-case',

  sectionIntroText: 'A single, integrated, enterprise-ready platform',
  sectionIntroCTAText: 'Explore GitHub Enterprise',
}

export const Maximum: StoryFn<typeof SolutionPage> = args => <SolutionPage {...args} />
Maximum.args = {
  variant: 'use-case',

  sectionIntroText: 'A single, integrated, enterprise-ready platform',
  sectionIntroCTAText: 'Explore GitHub Enterprise',

  logoBarVisible: true,
  riverVisible: true,
  customerStoryVisible: false,
  testimonialsVisible: true,
  faqVisible: true,
  statisticsVisible: true,
}
