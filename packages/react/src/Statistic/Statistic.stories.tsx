import React from 'react'
import {Meta} from '@storybook/react'
import {Statistic} from '.'

export default {
  title: 'Components/Statistic',
  component: Statistic,
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
} as Meta<typeof Statistic>

export const Playground = args => (
  <Statistic {...args}>
    <Statistic.Heading>{args.heading}</Statistic.Heading>
    <Statistic.Description>{args.description}</Statistic.Description>
  </Statistic>
)

export const Default = args => (
  <Statistic>
    <Statistic.Heading>{args.heading}</Statistic.Heading>
    <Statistic.Description>{args.description}</Statistic.Description>
  </Statistic>
)
