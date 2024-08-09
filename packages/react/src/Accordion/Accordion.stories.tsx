import {Meta} from '@storybook/react'
import React from 'react'
import {Accordion} from '.'

export default {
  title: 'Components/Accordion',
  component: Accordion,
} as Meta<typeof Accordion>

export const Default = () => (
  <Accordion>
    <Accordion.Heading>Heading</Accordion.Heading>
    <Accordion.Content>
      <p>Some description</p>
      <p>Some description</p>
    </Accordion.Content>
  </Accordion>
)

export const Playground = args => (
  <Accordion variant={args.variant}>
    <Accordion.Heading reversedToggles={args.reversedToggles}>{args.heading}</Accordion.Heading>
    <Accordion.Content>{args.content}</Accordion.Content>
  </Accordion>
)
Playground.argTypes = {
  variant: {
    name: 'variant',
    control: {
      type: 'radio',
    },
    options: ['default', 'emphasis'],
  },
  heading: {
    name: 'text',
    control: {
      type: 'text',
    },
    table: {
      category: 'Accordion.Heading',
    },
  },
  reversedToggles: {
    name: 'reversedToggles',
    control: {
      type: 'boolean',
    },
    table: {
      category: 'Accordion.Heading',
    },
  },
  headingAs: {
    name: 'as',
    control: {
      type: 'inline-radio',
    },
    options: ['h2', 'h3', 'h4', 'h5', 'h6'],
    table: {
      category: 'Accordion.Heading',
    },
  },
  content: {
    name: 'text',
    control: {
      type: 'text',
    },
    table: {
      category: 'Accordion.Content',
    },
  },
}
Playground.args = {
  variant: 'default',
  heading: 'Heading',
  reversedToggles: false,
  headingAs: 'h4',
  content: 'Content',
}
