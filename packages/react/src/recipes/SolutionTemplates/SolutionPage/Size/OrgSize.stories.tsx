import React from 'react'
import {INITIAL_VIEWPORTS} from 'storybook/viewport'
import {Meta, StoryFn} from '@storybook/react'

import {SolutionPage} from '../SolutionPage'
import {sharedArgTypes} from '../../helpers'
import {ColorModesEnum} from '../../../../ThemeProvider'

export default {
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

export const Maximum: StoryFn<typeof SolutionPage> = args => <SolutionPage {...args} />
Maximum.args = {
  ...maximumArgs,
  variant: 'size',
}
Maximum.storyName = 'Maximum Light'

export const MaximumDark = Maximum.bind({})
MaximumDark.args = {
  ...maximumArgs,
  variant: 'size',
  colorMode: ColorModesEnum.DARK,
}

const minimumArgs = {
  variant: 'size',
  jtbd1Visible: true,
  jtbd2Visible: false,
  jtbd3Visible: false,
  jtbdBentosVisible: false,
}
export const Minimum: StoryFn<typeof SolutionPage> = args => <SolutionPage {...args} />
Minimum.args = {
  ...minimumArgs,
  variant: 'size',
}
Minimum.storyName = 'Minimum Light'

export const MinimumDark = Minimum.bind({})
MinimumDark.args = {
  ...minimumArgs,
  variant: 'size',
  colorMode: ColorModesEnum.DARK,
}
