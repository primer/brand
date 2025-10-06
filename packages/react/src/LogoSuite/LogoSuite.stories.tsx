import React from 'react'

import type {Meta, StoryObj} from '@storybook/react'
import {LogoSuite, type LogoSuiteHeadingProps, type LogoSuiteLogoBarProps, type LogoSuiteProps} from './LogoSuite'
import {logos} from './LogoSuite.fixtures'

type StoryProps = Required<
  Pick<LogoSuiteProps, 'align' | 'hasDivider'> &
    Pick<LogoSuiteHeadingProps, 'visuallyHidden'> &
    Pick<LogoSuiteLogoBarProps, 'marquee' | 'marqueeSpeed' | 'variant'>
> & {
  logoCount: number
  heading: string
  description: string
}

const meta = {
  title: 'Components/LogoSuite',
  component: LogoSuite,
  args: {
    align: 'center',
    hasDivider: true,
    visuallyHidden: false,
    variant: undefined,
    marquee: false,
    marqueeSpeed: 'normal',
    logoCount: 5,
    heading: 'Heading',
    description: 'Body text maximus ligula felis, non egestas dolor rutrum vel.',
  },
  argTypes: {
    hasDivider: {
      control: {
        type: 'boolean',
      },
      table: {
        category: 'LogoSuite',
      },
    },
    logoCount: {
      control: {
        type: 'number',
        min: 3,
        max: 12,
      },
      table: {
        category: 'LogoSuite',
      },
    },
    align: {
      control: 'radio',
      options: ['start', 'center', 'justify'],
      table: {
        category: 'LogoSuite',
      },
    },
    visuallyHidden: {
      control: {
        type: 'boolean',
      },
      table: {
        category: 'LogoSuite.Heading',
      },
    },
    heading: {
      control: {
        type: 'text',
      },
      table: {
        category: 'LogoSuite.Heading',
      },
    },
    description: {
      control: {
        type: 'text',
      },
      table: {
        category: 'LogoSuite.Description',
      },
    },

    marquee: {
      control: {
        type: 'boolean',
      },
      table: {
        category: 'LogoSuite.Logobar',
      },
    },
    variant: {
      control: 'radio',
      options: [undefined, 'muted', 'emphasis'],
      table: {
        category: 'LogoSuite.Logobar',
      },
    },

    marqueeSpeed: {
      control: 'radio',
      options: ['slow', 'normal', 'idle'],
      table: {
        category: 'LogoSuite.Logobar',
      },
    },
  },
} satisfies Meta<StoryProps>

export default meta
type Story = StoryObj<StoryProps>

export const Playground: Story = {
  render: ({hasDivider, logoCount, align, visuallyHidden, marquee, marqueeSpeed, variant, heading, description}) => (
    <LogoSuite align={align} hasDivider={hasDivider}>
      <LogoSuite.Heading visuallyHidden={visuallyHidden}>{heading}</LogoSuite.Heading>
      <LogoSuite.Description>{description}</LogoSuite.Description>
      <LogoSuite.Logobar variant={variant} marquee={marquee} marqueeSpeed={marqueeSpeed}>
        {logos.slice(0, logoCount)}
      </LogoSuite.Logobar>
    </LogoSuite>
  ),
}
