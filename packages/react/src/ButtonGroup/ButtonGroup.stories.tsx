import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {ButtonGroup} from '.'
import {Button} from '../Button'
import {ActionMenu} from '../ActionMenu'

const meta = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  subcomponents: {Button, ActionMenu},
  args: {
    buttonSize: 'medium',
    buttonsAs: 'button',
  },
  argTypes: {
    buttonSize: {
      description: 'The size of the button elements',
      control: {
        type: 'radio',
        options: ['small', 'medium', 'large'],
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

export const WithConditionalChild: StoryObj<
  React.ComponentProps<typeof ButtonGroup> & {showSecondaryAction?: boolean}
> = {
  args: {
    showSecondaryAction: true,
  },
  argTypes: {
    showSecondaryAction: {
      control: 'boolean',
      description: 'Show the conditionally rendered secondary action',
    },
  },
  render: ({showSecondaryAction, ...args}) => (
    <ButtonGroup {...args}>
      <Button>Primary action</Button>
      {showSecondaryAction && <Button>Secondary action</Button>}
    </ButtonGroup>
  ),
}

export const WithActionMenu: Story = {
  render: args => (
    <ButtonGroup {...args}>
      <Button>Primary action</Button>
      <ActionMenu>
        <ActionMenu.Button>More actions</ActionMenu.Button>
        <ActionMenu.Overlay aria-label="More actions">
          <ActionMenu.Item value="Contact sales">Contact sales</ActionMenu.Item>
          <ActionMenu.Item value="View pricing">View pricing</ActionMenu.Item>
        </ActionMenu.Overlay>
      </ActionMenu>
    </ButtonGroup>
  ),
}

export const WithVariantOverrides: Story = {
  render: args => (
    <ButtonGroup {...args}>
      <Button variant="secondary">Secondary override</Button>
      <ActionMenu>
        <ActionMenu.Button variant="primary">Primary override</ActionMenu.Button>
        <ActionMenu.Overlay aria-label="More actions">
          <ActionMenu.Item value="Contact sales">Contact sales</ActionMenu.Item>
          <ActionMenu.Item value="View pricing">View pricing</ActionMenu.Item>
        </ActionMenu.Overlay>
      </ActionMenu>
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
