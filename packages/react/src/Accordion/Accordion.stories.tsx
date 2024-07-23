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
