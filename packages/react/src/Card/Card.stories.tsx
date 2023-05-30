import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
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
  },
  argTypes: {
    iconColor: {
      description: 'Color of Icon',
      control: {
        type: 'inline-radio',
        options: [...CardIconColors],
      },
    },
    iconHasBackground: {
      description: 'Icon has background',
      control: {
        type: 'inline-radio',
        options: [false, true],
      },
    },
    labelColor: {
      description: 'Color of Label',
      control: {
        type: 'inline-radio',
        options: [...LabelColors],
      },
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
  },
} as ComponentMeta<typeof Card>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: ComponentStory<typeof Card> = (_, storyArgs: any) => (
  <Card href="https://github.com">
    <Card.Icon hasBackground={storyArgs.args.iconHasBackground} icon={CopilotIcon} color={storyArgs.args.iconColor} />
    <Card.Label color={storyArgs.args.labelColor}>Beta</Card.Label>
    <Card.Heading>{storyArgs.args.heading}</Card.Heading>
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
