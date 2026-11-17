import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {TextInput, TextInputSizes} from '.'
import {CheckIcon, SearchIcon} from '@primer/octicons-react'

const meta = {
  title: 'Components/Forms/TextInput',
  component: TextInput,
  argTypes: {
    leadingText: {
      type: 'string',
      name: 'leading text',
      description: 'string',
      table: {
        category: 'Input',
      },
    },
    trailingText: {
      type: 'string',
      name: 'trailing text',
      description: 'string',
      table: {
        category: 'Input',
      },
    },
    size: {
      options: TextInputSizes,
      control: {
        type: 'inline-radio',
      },
      table: {
        category: 'Input',
      },
    },
    fullWidth: {
      description: 'formerly called Block',
      control: {type: 'boolean'},
      table: {
        category: 'Input',
      },
    },
    monospace: {
      description: 'monospace text',
      control: {type: 'boolean'},
      table: {
        category: 'Input',
      },
    },
    disabled: {
      description: 'disabled field',
      control: {type: 'boolean'},
      table: {
        category: 'Input',
      },
    },
    required: {
      description: 'required field',
      control: {type: 'boolean'},
      table: {
        category: 'Input',
      },
    },
    placeholder: {
      type: 'string',
      name: 'placeholder',
      description: 'string',
      table: {
        category: 'Input',
      },
    },
    leadingVisual: {
      control: {type: 'boolean'},
      name: 'leading visual',
      description: 'Octicon',
      table: {
        category: 'Input',
      },
    },
    trailingVisual: {
      control: {type: 'boolean'},
      name: 'trailing visual',
      description: 'Octicon',
      table: {
        category: 'Input',
      },
    },
  },
} satisfies Meta<typeof TextInput>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  name: 'TextInput - Playground',
  render: args => (
    <TextInput
      aria-label="Standalone text input"
      {...args}
      leadingVisual={args.leadingVisual ? <CheckIcon aria-label="Check" /> : undefined}
      trailingVisual={args.trailingVisual ? <SearchIcon aria-label="Search" /> : undefined}
    />
  ),
}
