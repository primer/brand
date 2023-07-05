import {Meta, StoryFn} from '@storybook/react'
import React from 'react'
import {Button, ButtonVariants, ButtonSizes, defaultButtonVariant, defaultButtonSize} from '.'

export default {
  title: 'Components/Button',
  component: Button,
  args: {
    as: 'a',
    variant: defaultButtonVariant,
    size: defaultButtonSize,
    href: '#',
    children: 'Button',
    disabled: false,
    'aria-disabled': false,
  },
  // overriding default type inference for args with more useful control types
  argTypes: {
    as: {
      description: 'The HTML element used to render the root of Button.',
      control: {
        type: 'inline-radio',
        options: ['a', 'button'],
      },
    },
    variant: {
      description: 'The HTML element used to render the root of Button.',
      control: {
        type: 'inline-radio',
        options: [...ButtonVariants],
      },
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
        options: [...ButtonSizes],
      },
    },
    children: {
      name: 'children',
      description: 'Button label`.',
      type: {name: 'string', required: true},
      control: {
        type: 'text',
      },
    },
  },
} as Meta<typeof Button>

const Template: StoryFn<typeof Button> = args => <Button {...args} />

export const Playground = Template.bind({})
export const Default = () => <Button>Default</Button>
