import React from 'react'
import {ComponentMeta} from '@storybook/react'
import {Card, CardProps} from '.'
import {CopilotIcon, RocketIcon, GitBranchIcon} from '@primer/octicons-react'

export default {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    link: {
      description: 'Title of the card',
      control: {
        type: 'text'
      },
      defaultValue: 'Learn more'
    },
    linkHref: {
      description: 'Title href of the card',
      control: {
        type: 'text'
      },
      defaultValue: 'https://github.com'
    },
    fill: {
      description: 'Fill image',
      control: {
        type: 'boolean',
        options: [true, false]
      },
      defaultValue: false
    }
  }
} as ComponentMeta<typeof Card>

type PlaygroundProps = CardProps & {
  height: number
  width: number
  fill?: boolean
}

const Template = (args: PlaygroundProps) => {
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'center', marginTop: '10vh'}}>
      <Card {...args}>
        <Card.Icon
          icon={CopilotIcon}
          fill="var(--base-color-scale-blue-6)"
          background="var(--base-color-scale-blue-1)"
        />
        <Card.Heading>Collaboration is the key to DevOps success</Card.Heading>
        <Card.Description>Everything you need to know about getting started with GitHub Actions.</Card.Description>
      </Card>
      <Card {...args}>
        <Card.Icon
          icon={GitBranchIcon}
          fill="var(--base-color-scale-orange-6)"
          background="var(--base-color-scale-orange-1)"
        />
        <Card.Heading>GitHub Actions cheat sheet</Card.Heading>
        <Card.Description>
          In a recent TechTarget study, 70 percent of organizations reported they had adopted DevOps.
        </Card.Description>
      </Card>
      <Card {...args}>
        <Card.Icon
          icon={RocketIcon}
          fill="var(--base-color-scale-purple-6)"
          background="var(--base-color-scale-purple-0)"
        />
        <Card.Heading>How healthy teams build better software</Card.Heading>
        <Card.Description>
          Your culture is key to recruiting and retaining the talent you need to ship exceptional customer experiences.
        </Card.Description>
      </Card>
    </div>
  )
}

export const Playground = Template.bind({})
