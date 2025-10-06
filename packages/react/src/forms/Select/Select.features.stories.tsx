import React from 'react'
import {Meta, StoryFn} from '@storybook/react'
import {userEvent, waitFor} from 'storybook/test'

import {Select} from '.'

export default {
  title: 'Components/Forms/Select/Features',
  component: Select,
} as Meta<typeof Select>

const Template: StoryFn<typeof Select> = args => (
  <Select {...args} aria-label="Standalone select input" defaultValue="select a handle" {...args}>
    <Select.Option value="select a handle" disabled>
      Select a handle
    </Select.Option>
    <Select.Option value="mona">Monalisa</Select.Option>
    <Select.Option value="hubot">Hubot</Select.Option>
  </Select>
)

export const FullWidth = Template.bind({})
FullWidth.args = {
  fullWidth: true,
}

export const FullWidthFocussed = Template.bind({})
FullWidthFocussed.args = {
  fullWidth: true,
}

FullWidthFocussed.play = async () => {
  await waitFor(async () => {
    userEvent.tab()
  })
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
}

export const Large = Template.bind({})
Large.args = {
  size: 'large',
}

export const LargeFullWidth = Template.bind({})
LargeFullWidth.args = {
  fullWidth: true,
  size: 'large',
}

export const ValidationSuccess = Template.bind({})
ValidationSuccess.args = {
  validationStatus: 'success',
}

export const ValidationError = Template.bind({})
ValidationError.args = {
  validationStatus: 'error',
}
