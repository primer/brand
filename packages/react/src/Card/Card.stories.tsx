import React from 'react'
import {ComponentMeta} from '@storybook/react'
import {Card} from '.'

export default {
  title: 'Components/Card',
  component: Card
} as ComponentMeta<typeof Card>

export const Default = () => (
  <Card href="https://github.com">
    <Card.Heading>Collaboration is the key to DevOps success</Card.Heading>
    <Card.Description>Everything you need to know about getting started with GitHub Actions.</Card.Description>
  </Card>
)
