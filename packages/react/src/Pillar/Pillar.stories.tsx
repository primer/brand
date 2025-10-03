import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {Pillar, PillarIconColors} from '.'
import {CopilotIcon} from '@primer/octicons-react'

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
} satisfies Meta<typeof Pillar>

export default meta
type Story = StoryObj<typeof Pillar>

export const Default: Story = {
  render: () => (
    <Pillar>
      <Pillar.Heading>Collaboration is the key to DevOps success</Pillar.Heading>
      <Pillar.Description>Everything you need to know about getting started with GitHub Actions.</Pillar.Description>
    </Pillar>
  ),
}

export const Playground: Story = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (_, storyArgs: any) => (
    <Pillar>
      <Pillar.Icon icon={<CopilotIcon />} color={storyArgs.args.iconColor} />
      <Pillar.Heading>{storyArgs.args.heading}</Pillar.Heading>
      <Pillar.Description>{storyArgs.args.description}</Pillar.Description>
    </Pillar>
  ),
}
