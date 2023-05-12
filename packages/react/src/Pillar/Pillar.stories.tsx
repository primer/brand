import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {Pillar, PillarIconColors} from '.'
import {CopilotIcon} from '@primer/octicons-react'

export default {
  title: 'Components/Pillar',
  component: Pillar,
  args: {
    heading: 'Collaboration is the key to DevOps success',
    description: 'Everything you need to know about getting started with GitHub Actions.'
  },
  argTypes: {
    iconColor: {
      description: 'Color of Icon',
      control: {
        type: 'inline-radio',
        options: [...PillarIconColors]
      }
    },
    heading: {
      name: 'heading',
      description: 'Card heading',
      type: {name: 'string', required: true},
      control: {
        type: 'text',
        value: 'Collaboration is the key to DevOps success'
      }
    },
    description: {
      name: 'description',
      description: 'Card description',
      type: {name: 'string', required: true},
      control: {
        type: 'text',
        value: 'Everything you need to know about getting started with GitHub Actions.'
      }
    }
  }
} as ComponentMeta<typeof Pillar>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: ComponentStory<typeof Pillar> = (_, storyArgs: any) => (
  <Pillar>
    <Pillar.Icon icon={CopilotIcon} color={storyArgs.args.iconColor} />
    <Pillar.Heading>{storyArgs.args.heading}</Pillar.Heading>
    <Pillar.Description>{storyArgs.args.description}</Pillar.Description>
  </Pillar>
)

export const Default = () => (
  <Pillar>
    <Pillar.Heading>Collaboration is the key to DevOps success</Pillar.Heading>
    <Pillar.Description>Everything you need to know about getting started with GitHub Actions.</Pillar.Description>
  </Pillar>
)

export const Playground = Template.bind({})
