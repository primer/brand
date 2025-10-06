import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {Pillar, PillarIconColors} from '.'
import {CopilotIcon} from '@primer/octicons-react'

type StoryProps = {
  heading: string
  description: string
  iconColor: (typeof PillarIconColors)[number]
}

const meta = {
  title: 'Components/Pillar',
  component: Pillar,
  args: {
    heading: 'Collaboration is the key to DevOps success',
    description: 'Everything you need to know about getting started with GitHub Actions.',
  },
  argTypes: {
    iconColor: {
      description: 'Color of Icon',
      control: {
        type: 'inline-radio',
        options: [...PillarIconColors],
      },
    },
    heading: {
      name: 'heading',
      description: 'Card heading',
      type: {name: 'string', required: true},
      control: {
        type: 'text',
        value: 'Collaboration is the key to DevOps success',
      },
    },
    description: {
      name: 'description',
      description: 'Card description',
      type: {name: 'string', required: true},
      control: {
        type: 'text',
        value: 'Everything you need to know about getting started with GitHub Actions.',
      },
    },
  },
} as Meta<typeof Pillar>

export default meta
type Story = StoryObj<StoryProps>

export const Default: Story = {
  render: () => (
    <Pillar>
      <Pillar.Heading>Collaboration is the key to DevOps success</Pillar.Heading>
      <Pillar.Description>Everything you need to know about getting started with GitHub Actions.</Pillar.Description>
    </Pillar>
  ),
}

export const Playground: Story = {
  render: args => (
    <Pillar>
      <Pillar.Icon icon={<CopilotIcon />} color={args.iconColor} />
      <Pillar.Heading>{args.heading}</Pillar.Heading>
      <Pillar.Description>{args.description}</Pillar.Description>
    </Pillar>
  ),
}
