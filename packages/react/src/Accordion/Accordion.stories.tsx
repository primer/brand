import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {Accordion, AccordionHeadingProps, AccordionRootProps, AccordionToggleColors} from '.'

type AccordionStoryProps = AccordionRootProps & Pick<AccordionHeadingProps, 'toggleColor'>

const meta: Meta<AccordionStoryProps> = {
  title: 'Components/Accordion',
  component: Accordion,
  args: {
    open: false,
    variant: 'default',
    toggleColor: undefined,
  },
  argTypes: {
    open: {
      name: 'Open',
      control: {
        type: 'boolean',
      },
    },
    variant: {
      name: 'Variant',
      options: ['default', 'emphasis'],
      control: {type: 'inline-radio'},
    },
    toggleColor: {
      name: 'Toggle color',
      options: AccordionToggleColors,
      control: {type: 'select'},
    },
  },
}
export default meta

type Story = StoryObj<AccordionStoryProps>

export const Default: Story = {
  render: ({toggleColor, ...props}) => {
    return (
      <Accordion {...props}>
        <Accordion.Heading toggleColor={toggleColor}>Heading</Accordion.Heading>
        <Accordion.Content>
          <p>Some description</p>
          <p>Some description</p>
        </Accordion.Content>
      </Accordion>
    )
  },
}
