import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {ToggleSwitch} from './ToggleSwitch'

const meta = {
  title: 'Components/Forms/ToggleSwitch',
  component: ToggleSwitch,
  args: {'aria-label': 'Enable notifications'},
  argTypes: {
    size: {control: 'radio', options: ['small', 'medium']},
    loadingLabelDelay: {control: {type: 'number', min: 0}},
    spinnerPosition: {control: 'radio', options: ['start', 'end']},
    onChange: {action: 'changed'},
    onClick: {action: 'clicked'},
  },
} satisfies Meta<typeof ToggleSwitch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => <ToggleSwitch {...args} />,
}

export const Playground: Story = {
  args: {
    defaultChecked: true,
    disabled: false,
    loading: false,
    size: 'medium',
    loadingLabel: 'Loading',
    loadingLabelDelay: 2000,
    spinnerPosition: 'end',
  },
  render: args => <ToggleSwitch {...args} />,
}
