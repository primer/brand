import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {BreakoutBanner} from '.'
import {Link} from '../Link'

import lightNarrowBg from '../fixtures/images/light-vertical-banner.png'
import lightWideBg from '../fixtures/images/light-horizontal-banner.png'
import {LogoGithubIcon} from '@primer/octicons-react'

const meta = {
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
} satisfies Meta<typeof BreakoutBanner>

export default meta
type Story = StoryObj<typeof BreakoutBanner>

export const Playground: Story = {
  render: args => (
    <BreakoutBanner {...args} leadingVisual={<LogoGithubIcon size="medium" />}>
      <BreakoutBanner.Heading>Where the most ambitious teams build great things</BreakoutBanner.Heading>
      <BreakoutBanner.LinkGroup>
        <Link href="#">Primary action</Link>
        <Link href="#">Secondary action</Link>
      </BreakoutBanner.LinkGroup>
    </BreakoutBanner>
  ),
}

export const Default: Story = {
  render: () => (
    <BreakoutBanner>
      <BreakoutBanner.Heading>Where the most ambitious teams build great things</BreakoutBanner.Heading>
      <BreakoutBanner.LinkGroup>
        <Link href="#">Primary action</Link>
      </BreakoutBanner.LinkGroup>
    </BreakoutBanner>
  ),
}
