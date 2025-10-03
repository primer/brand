import type {Meta, StoryObj} from '@storybook/react'
import React from 'react'
import {ChevronDownIcon, SearchIcon} from '@primer/octicons-react'
import {Button, ButtonVariants, ButtonSizes, defaultButtonVariant, defaultButtonSize} from '.'

const meta = {
  title: 'Components/Button',
  component: Button,
  args: {
    as: 'button',
    variant: defaultButtonVariant,
    size: defaultButtonSize,
    block: false,
    href: '#',
    children: 'Button',
    disabled: false,
    'aria-disabled': false,
    hasArrow: false,
    leadingVisual: false,
    trailingVisual: false,
  },
  // overriding default type inference for args with more useful control types
  argTypes: {
    as: {
      description: 'The HTML element used to render the root of Button.',
      control: {
        type: 'inline-radio',
      },
      options: ['a', 'button'],
    },
    variant: {
      description: 'The HTML element used to render the root of Button.',
      control: {
        type: 'inline-radio',
      },
      options: [...ButtonVariants],
    },
    href: {
      name: 'href',
      description: 'Should apply only to Buttons using `as="a"`.',
      type: {name: 'string', required: false},
      control: {
        type: 'text',
      },
    },
    size: {
      description: 'Size of button',
      control: {
        type: 'inline-radio',
      },
      options: [...ButtonSizes],
    },
    children: {
      name: 'children',
      description: 'Button label`.',
      type: {name: 'string', required: true},
      control: {
        type: 'text',
      },
    },
    disabled: {
      name: 'disabled',
      type: {name: 'boolean', required: false},
      control: {
        type: 'boolean',
      },
    },
    hasArrow: {
      name: 'hasArrow',
      type: {name: 'boolean', required: false},
      control: {
        type: 'boolean',
      },
    },
    leadingVisual: {
      control: {type: 'boolean'},
      name: 'leading visual',
      description: 'Octicon',
    },
    trailingVisual: {
      control: {type: 'boolean'},
      name: 'trailing visual',
      description: 'Octicon',
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof Button>

export const Playground: Story = {
  render: args => (
    <Button
      {...args}
      leadingVisual={args.leadingVisual ? <SearchIcon /> : undefined}
      trailingVisual={args.trailingVisual ? <ChevronDownIcon /> : undefined}
    />
  ),
}

export const Default: Story = {
  render: () => <Button>Default</Button>,
}
