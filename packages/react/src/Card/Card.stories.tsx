import React from 'react'
import {Meta, StoryFn} from '@storybook/react'
import {Card, CardIconColors} from '.'
import {LabelColors} from '../Label'
import {CopilotIcon} from '@primer/octicons-react'

export default {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: StoryFn<typeof Card> = (_, storyArgs: any) => (
  <Card href="https://github.com" hasBorder={storyArgs.args.hasBorder} fullWidth={storyArgs.args.fullWidth}>
    <Card.Icon hasBackground={storyArgs.args.iconHasBackground} icon={CopilotIcon} color={storyArgs.args.iconColor} />
    <Card.Heading>{storyArgs.args.heading}</Card.Heading>
    <Card.Label color={storyArgs.args.labelColor}>Beta</Card.Label>
    <Card.Description>{storyArgs.args.description}</Card.Description>
  </Card>
)

export const Default = () => (
  <Card href="https://github.com">
    <Card.Heading>Collaboration is the key to DevOps success</Card.Heading>
    <Card.Description>Everything you need to know about getting started with GitHub Actions.</Card.Description>
  </Card>
)

export const Playground = Template.bind({})
