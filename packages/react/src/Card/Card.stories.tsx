import React from 'react'
import {ComponentMeta} from '@storybook/react'
import {Card, CardProps} from '.'

export default {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    href: {
      description: 'Title href of the card',
      control: {
        type: 'text'
      },
      defaultValue: 'https://github.com'
    }
  }
} as ComponentMeta<typeof Card>

export const Default = (args: CardProps) => (
  <div style={{display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'center', marginTop: '10vh'}}>
    <Card {...args} target="_blank">
      <Card.Heading>Collaboration is the key to DevOps success</Card.Heading>
      <Card.Description>Everything you need to know about getting started with GitHub Actions.</Card.Description>
    </Card>
  </div>
)
