import React from 'react'
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'
import {Meta, StoryFn} from '@storybook/react'

import {SolutionTemplate} from './SolutionTemplate'
import {sharedArgTypes} from '../helpers'

export default {
  title: 'Recipes/Solutions/Industry',
  component: SolutionTemplate,
  args: {
    heroLabel: 'Healthcare',
    heroTitle: 'Empower healthcare development with a secure, AI-powered platform',
    heroDescription:
      'By incorporating AI into developer workflows, you can build secure and optimized communication channel between patient and care providers.',
    heroCtaTextPrimary: 'Start a free trial',
    heroCtaTextSecondary: 'Contact Sales',

    sectionIntroText: 'A single, integrated, enterprise-ready platform',

    introVariant: 'pillars',
    logobarVisible: false,
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
} as Meta<typeof SolutionTemplate>

export const Playground: StoryFn<typeof SolutionTemplate> = args => <SolutionTemplate {...args} />
Playground.args = {
  variant: 'industry',

  logobarVisible: true,
  riverVisible: true,
  customerStoryVisible: true,
  testimonialsVisible: true,
  faqVisible: true,
}

export const Minimum: StoryFn<typeof SolutionTemplate> = args => <SolutionTemplate {...args} />
Minimum.args = {
  variant: 'industry',
}

export const Maximum: StoryFn<typeof SolutionTemplate> = args => <SolutionTemplate {...args} />
Maximum.args = {
  variant: 'industry',

  logobarVisible: true,
  riverVisible: true,
  customerStoryVisible: true,
  testimonialsVisible: true,
  faqVisible: true,
}
