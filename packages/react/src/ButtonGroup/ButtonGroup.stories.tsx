import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {ButtonGroup, ButtonGroupVariants, defaultButtonGroupVariant} from '.'
import {Button, ButtonSizes} from '../Button'
import {IconButton} from '../IconButton'
import {ActionMenu} from '../ActionMenu'
import {Stack} from '../Stack'
import {DownloadIcon, KebabHorizontalIcon, ShareIcon} from '@primer/octicons-react'

const meta = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  subcomponents: {Button, IconButton, ActionMenu},
  args: {
    buttonSize: 'medium',
    buttonsAs: 'button',
    variant: defaultButtonGroupVariant,
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
    variant: {
      description: 'The visual presentation of the group',
      control: 'radio',
      options: [...ButtonGroupVariants],
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

export const WithIconButtons: Story = {
  render: () => (
    <Stack direction="vertical" alignItems="flex-start">
      {ButtonSizes.map(size => (
        <ButtonGroup key={size} buttonSize={size} variant="joined">
          <IconButton icon={DownloadIcon} aria-label="Download" />
          <IconButton icon={ShareIcon} aria-label="Share" />
          <IconButton icon={KebabHorizontalIcon} aria-label="More actions" />
        </ButtonGroup>
      ))}
    </Stack>
  ),
}

export const JoinedButtons: Story = {
  render: () => (
    <Stack direction="vertical" alignItems="flex-start">
      {ButtonSizes.map(size => (
        <ButtonGroup key={size} buttonSize={size} variant="joined">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      ))}
    </Stack>
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
