import React from 'react'
import {ComponentMeta} from '@storybook/react'
import {Card, CardProps} from '.'

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
    }
  }
} as ComponentMeta<typeof Card>

const Template = (args: CardProps) => {
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'center', marginTop: '10vh'}}>
      <Card {...args}>
        <Card.Heading>Collaboration is the key to DevOps success</Card.Heading>
        <Card.Description>Everything you need to know about getting started with GitHub Actions.</Card.Description>
      </Card>
      <Card {...args}>
        <Card.Heading>GitHub Actions cheat sheet</Card.Heading>
        <Card.Description>
          In a recent TechTarget study, 70 percent of organizations reported they had adopted DevOps.
        </Card.Description>
      </Card>
      <Card {...args}>
        <Card.Heading>How healthy teams build better software</Card.Heading>
        <Card.Description>
          Your culture is key to recruiting and retaining the talent you need to ship exceptional customer experiences.
        </Card.Description>
      </Card>
    </div>
  )
}

export const Playground = Template.bind({})
