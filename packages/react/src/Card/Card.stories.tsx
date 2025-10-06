import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {Card, CardIconColors} from '.'
import {LabelColors} from '../Label'
import {CopilotIcon} from '@primer/octicons-react'

type StoryProps = {
  iconColor: (typeof CardIconColors)[number]
  labelColor: (typeof LabelColors)[number]
  iconHasBackground: boolean
  heading: string
  description: string
  hasBorder?: boolean
  fullWidth?: boolean
}

const meta = {
  title: 'Components/Card',
  component: Card,
  args: {
    iconColor: 'default',
    labelColor: 'default',
    iconHasBackground: false,
    heading: 'Collaboration is the key to DevOps success',
    description: 'Everything you need to know about getting started with GitHub Actions.',
    fullWidth: false,
    hasBorder: false,
  },
  argTypes: {
    iconColor: {
      name: 'color',
      description: 'Color of Icon',
      control: {
        type: 'inline-radio',
      },
      options: [...CardIconColors],
      table: {
        category: 'Icon',
      },
    },
    iconHasBackground: {
      name: 'hasBackground',
      type: {name: 'boolean', required: false},
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Icon',
      },
    },
    hasBorder: {
      name: 'hasBorder',
      type: {name: 'boolean', required: false},
      control: {
        type: 'boolean',
      },
    },
    labelColor: {
      description: 'Color of Label',
      control: {
        type: 'inline-radio',
      },
      options: [...LabelColors],
    },
    heading: {
      name: 'heading',
      description: 'Card heading`.',
      type: {name: 'string', required: true},
      control: {
        type: 'text',
        value: 'Collaboration is the key to DevOps success',
      },
    },
    description: {
      name: 'description',
      description: 'Card description`.',
      type: {name: 'string', required: true},
      control: {
        type: 'text',
        value: 'Everything you need to know about getting started with GitHub Actions.',
      },
    },
    fullWidth: {
      name: 'fullWidth',
      type: {name: 'boolean', required: false},
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta<typeof Card>

export default meta
type Story = StoryObj<StoryProps>

export const Default: Story = {
  render: () => (
    <Card href="https://github.com">
      <Card.Heading>Collaboration is the key to DevOps success</Card.Heading>
      <Card.Description>Everything you need to know about getting started with GitHub Actions.</Card.Description>
    </Card>
  ),
}

export const Playground: Story = {
  render: args => (
    <Card href="https://github.com" hasBorder={args.hasBorder} fullWidth={args.fullWidth}>
      <Card.Icon hasBackground={args.iconHasBackground} icon={CopilotIcon} color={args.iconColor} />
      <Card.Heading>{args.heading}</Card.Heading>
      <Card.Label color={args.labelColor}>Beta</Card.Label>
      <Card.Description>{args.description}</Card.Description>
    </Card>
  ),
}
