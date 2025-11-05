import React from 'react'
import type {Meta, StoryFn} from '@storybook/react'
import {TextInput} from '.'
import {CheckIcon, SearchIcon} from '@primer/octicons-react'

export default {
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
      options: [0, 1],
      mapping: ['medium', 'large'],
      control: {
        type: 'inline-radio',
        labels: ['medium', 'large'],
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
} as Meta<typeof TextInput>

export const Playground: StoryFn<typeof TextInput> = args => (
  <TextInput
    aria-label="Standalone text input"
    {...args}
    leadingVisual={args.leadingVisual ? <CheckIcon aria-label="Check" /> : undefined}
    trailingVisual={args.trailingVisual ? <SearchIcon aria-label="Search" /> : undefined}
  />
)

Playground.storyName = 'TextInput - Playground'
