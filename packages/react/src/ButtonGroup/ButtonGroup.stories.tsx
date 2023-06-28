import React from 'react'
import {Meta, StoryFn} from '@storybook/react'
import {ButtonGroup} from '.'
import {Button} from '../Button'

export default {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  subcomponents: {Button},
  args: {
    buttonSize: 'medium',
    buttonsAs: 'button',
  },
  argTypes: {
    buttonSize: {
      description: 'The size of the button elements',
      control: {
        type: 'radio',
        options: ['medium', 'large'],
      },
    },
    buttonsAs: {
      description: 'The HTML element the button is rendered as',
      control: {
        type: 'radio',
        options: ['button', 'a'],
      },
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
} as Meta<typeof ButtonGroup>

const Template: StoryFn<typeof ButtonGroup> = args => (
  <ButtonGroup {...args}>
    <Button>This is one button</Button>
    <Button>This is another button</Button>
  </ButtonGroup>
)

export const Playground = Template.bind({})

const SingleButtonTemplate: StoryFn<typeof ButtonGroup> = args => (
  <ButtonGroup {...args}>
    <Button>This is one button</Button>
  </ButtonGroup>
)

export const SingleButtonGroup = SingleButtonTemplate.bind({})

export const LargeButtonGroup = Template.bind({})
LargeButtonGroup.args = {
  buttonSize: 'large',
}

export const LinkButtonGroup = Template.bind({})
LinkButtonGroup.args = {
  buttonsAs: 'a',
}
