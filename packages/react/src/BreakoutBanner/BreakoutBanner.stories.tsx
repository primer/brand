import React from 'react'
import {Meta, StoryFn} from '@storybook/react'
import {BreakoutBanner} from '.'
import {Link} from '../Link'

import lightNarrowBg from '../fixtures/images/light-vertical-banner.png'
import lightWideBg from '../fixtures/images/light-horizontal-banner.png'
import {LogoGithubIcon} from '@primer/octicons-react'

export default {
  title: 'Components/BreakoutBanner',
  component: BreakoutBanner,
  args: {
    align: 'start',
    backgroundColor: 'subtle',
    backgroundImageSrc: {
      narrow: lightNarrowBg,
      regular: lightWideBg,
      wide: lightWideBg,
    },
  },
  argTypes: {
    align: {
      control: {
        type: 'inline-radio',
      },
      options: ['start', 'center'],
    },
    backgroundColor: {
      control: {
        type: 'inline-radio',
      },
      options: ['default', 'subtle'],
    },
    backgroundImageSrc: {
      control: 'object',
    },
  },
} as Meta<typeof BreakoutBanner>

export const Playground: StoryFn<typeof BreakoutBanner> = args => (
  <BreakoutBanner {...args} leadingVisual={<LogoGithubIcon size="medium" />}>
    <BreakoutBanner.Heading>Where the most ambitious teams build great things</BreakoutBanner.Heading>
    <BreakoutBanner.LinkGroup>
      <Link href="#">Primary action</Link>
      <Link href="#">Secondary action</Link>
    </BreakoutBanner.LinkGroup>
  </BreakoutBanner>
)

export const Default = () => (
  <BreakoutBanner>
    <BreakoutBanner.Heading>Where the most ambitious teams build great things</BreakoutBanner.Heading>
    <BreakoutBanner.LinkGroup>
      <Link href="#">Primary action</Link>
    </BreakoutBanner.LinkGroup>
  </BreakoutBanner>
)
