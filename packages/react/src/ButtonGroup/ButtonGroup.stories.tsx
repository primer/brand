import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {ButtonGroup} from '.'
import {Button} from '../Button'

const meta = {
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
} satisfies Meta<typeof ButtonGroup>

export default meta
type Story = StoryObj<typeof ButtonGroup>

const Template: Story = {
  render: args => (
    <ButtonGroup {...args}>
      <Button>This is one button</Button>
      <Button>This is another button</Button>
    </ButtonGroup>
  ),
}

export const Playground: Story = {
  ...Template,
}

export const SingleButtonGroup: Story = {
  render: args => (
    <ButtonGroup {...args}>
      <Button>This is one button</Button>
    </ButtonGroup>
  ),
}

export const LargeButtonGroup: Story = {
  ...Template,
  args: {
    buttonSize: 'large',
  },
}

export const LinkButtonGroup: Story = {
  ...Template,
  args: {
    buttonsAs: 'a',
  },
}
