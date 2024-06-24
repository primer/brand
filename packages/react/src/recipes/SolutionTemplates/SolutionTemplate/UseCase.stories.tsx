import React from 'react'
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'
import {Meta, StoryFn} from '@storybook/react'

import {SolutionTemplate} from './SolutionTemplate'
import {sharedArgTypes} from '../helpers'

export default {
  title: 'Recipes/Solutions/Use case',
  component: SolutionTemplate,
  args: {
    introVariant: 'editorial prose',
    logobarVisible: false,
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
} as Meta<typeof SolutionTemplate>

export const Playground: StoryFn<typeof SolutionTemplate> = args => <SolutionTemplate {...args} />
Playground.args = {
  variant: 'use-case',

  heroLabel: 'Security',
  heroTitle: 'The complete CI/CD solution',
  sectionIntroText: 'A single, integrated, enterprise-ready platform',
  sectionIntroCTAText: 'Explore GitHub Enterprise',

  logobarVisible: true,
  riverVisible: true,
  customerStoryVisible: true,
  testimonialsVisible: true,
  faqVisible: true,
  statisticsVisible: true,
}

export const Minimum: StoryFn<typeof SolutionTemplate> = args => <SolutionTemplate {...args} />
Minimum.args = {
  variant: 'use-case',

  heroLabel: 'Security',
  heroTitle: 'The complete CI/CD solution',
  sectionIntroText: 'A single, integrated, enterprise-ready platform',
  sectionIntroCTAText: 'Explore GitHub Enterprise',
}

export const Maximum: StoryFn<typeof SolutionTemplate> = args => <SolutionTemplate {...args} />
Maximum.args = {
  variant: 'use-case',

  heroLabel: 'Security',
  heroTitle: 'The complete CI/CD solution',
  sectionIntroText: 'A single, integrated, enterprise-ready platform',
  sectionIntroCTAText: 'Explore GitHub Enterprise',

  logobarVisible: true,
  riverVisible: true,
  customerStoryVisible: true,
  testimonialsVisible: true,
  faqVisible: true,
  statisticsVisible: true,
}
