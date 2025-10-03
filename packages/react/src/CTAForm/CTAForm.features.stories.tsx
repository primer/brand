import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'

import {CTAForm} from './CTAForm'
import {FormControl, TextInput} from '../index'

const meta = {
  title: 'Components/CTAForm/Features',
  component: CTAForm,
} satisfies Meta<typeof CTAForm>

export default meta
type Story = StoryObj<typeof CTAForm>

export const WithNoConfirm: Story = {
  render: () => (
    <CTAForm>
      <CTAForm.Input>
        <FormControl required>
          <FormControl.Label>Your Work Email Address</FormControl.Label>
          <TextInput placeholder="email" autoComplete="email" />
        </FormControl>
      </CTAForm.Input>
      <CTAForm.Action>Subscribe</CTAForm.Action>
    </CTAForm>
  ),
}
