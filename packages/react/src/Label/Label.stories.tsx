import {Meta, StoryFn} from '@storybook/react'
import React from 'react'
import {Label, LabelColors, LabelSizes, defaultLabelColor, defaultLabelSize} from '.'

export default {
  title: 'Components/Label',
  component: Label,
  args: {
    color: defaultLabelColor,
    size: defaultLabelSize,
    children: 'Label',
  },
  // overriding default type inference for args with more useful control types
  argTypes: {
    color: {
      description: 'Color of Label',
      control: {
        type: 'inline-radio',
        options: [...LabelColors],
      },
    },
    size: {
      description: 'Size of Label',
      control: {
        type: 'inline-radio',
        options: [...LabelSizes],
      },
    },
    children: {
      name: 'children',
      description: 'Label label`.',
      type: {name: 'string', required: true},
      control: {
        type: 'text',
      },
    },
  },
} as Meta<typeof Label>

const Template: StoryFn<typeof Label> = args => <Label {...args} />

export const Default = () => <Label>Default</Label>
export const Playground = Template.bind({})
