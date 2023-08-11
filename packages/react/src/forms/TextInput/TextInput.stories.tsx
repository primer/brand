import React from 'react'
import {Meta, StoryFn} from '@storybook/react'
import {TextInput} from '.'
import {CheckIcon, SearchIcon} from '@primer/octicons-react'
import {Button} from '../../Button'
import {Stack} from '../../Stack'
import {Select} from '../Select'

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
    validationStatus: {
      options: [0, 1, 2], // iterator
      mapping: [undefined, 'error', 'success'], // values
      control: {
        type: 'inline-radio',
        labels: ['undefined', 'error', 'success'],
      },
      table: {
        category: 'Validation',
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
  <Stack direction="horizontal">
    <TextInput
      aria-label="Standalone text input"
      {...args}
      leadingVisual={args.leadingVisual ? CheckIcon : undefined}
      trailingVisual={args.trailingVisual ? SearchIcon : undefined}
    />

    <Select aria-label="Standalone select input" defaultValue="select a handle" size="large">
      <Select.Option value="select a handle" disabled>
        Select a handle
      </Select.Option>
      <Select.Option value="mona">Monalisa</Select.Option>
      <Select.Option value="hubot">Hubot</Select.Option>
    </Select>
    <Button size="large">Hello</Button>
  </Stack>
)

Playground.storyName = 'TextInput - Playground'
