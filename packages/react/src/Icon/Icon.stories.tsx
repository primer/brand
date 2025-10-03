import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {Icon, iconColors, iconSizes} from '.'
// eslint-disable-next-line import/no-namespace
import * as octicons from '@primer/octicons-react'

const meta = {
  title: 'Components/Icon',
  component: Icon,
  args: {
    // @ts-expect-error - This TS error is due to the options/mapping of the `icon` control
    icon: 'CopilotIcon',
    color: iconColors[0],
    hasBackground: false,
    size: iconSizes[0],
  },
  argTypes: {
    icon: {
      name: 'icon',
      description: 'You can find a list of available icons here: https://primer.style/foundations/icons',
      control: {
        type: 'select',
      },
      options: Object.keys(octicons),
      mapping: octicons,
    },
    color: {
      description: 'Color of Icon',
      control: {
        type: 'select',
      },
      options: [...iconColors],
    },
    hasBackground: {
      name: 'hasBackground',
      type: {name: 'boolean', required: false},
      control: {
        type: 'boolean',
      },
    },
    size: {
      name: 'size',
      type: {name: 'boolean', required: false},
      control: {
        type: 'inline-radio',
      },
      options: [...iconSizes],
    },
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof Icon>

export const Playground: Story = {
  render: props => <Icon {...props} />,
}
