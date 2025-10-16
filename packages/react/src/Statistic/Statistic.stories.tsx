import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {Statistic, StatisticProps} from '.'

type StoryProps = {
  heading: string
  description: string
} & StatisticProps

const meta = {
  title: 'Components/Statistic',
  component: Statistic as Meta<StoryProps>['component'], // because Statistic applies forwardRef
  args: {
    heading: '$2M+',
    description: 'Given back to our maintainers',
    padding: 'normal',
    size: 'large',
    variant: 'default',
  },
  argTypes: {
    heading: {control: 'text'},
    description: {control: 'text'},
    padding: {
      control: 'inline-radio',
      options: ['none', 'condensed', 'normal', 'spacious'],
    },
    size: {
      control: 'inline-radio',
      options: ['small', 'medium', 'large'],
    },
    variant: {
      control: 'inline-radio',
      options: ['default', 'boxed'],
    },
  },
} satisfies Meta<StoryProps>

export default meta
type Story = StoryObj<StoryProps>

export const Playground: Story = {
  render: args => (
    <Statistic {...args}>
      <Statistic.Heading>{args.heading}</Statistic.Heading>
      <Statistic.Description>{args.description}</Statistic.Description>
    </Statistic>
  ),
}

export const Default: Story = {
  render: args => (
    <Statistic>
      <Statistic.Heading>{args.heading}</Statistic.Heading>
      <Statistic.Description>{args.description}</Statistic.Description>
    </Statistic>
  ),
}
