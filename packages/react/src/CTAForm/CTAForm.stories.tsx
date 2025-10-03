import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'

import {CTAForm} from './CTAForm'
import {FormControl, TextInput, Checkbox, Text, InlineLink} from '../index'

const meta = {
  title: 'Components/CTAForm',
  component: CTAForm,
} satisfies Meta<typeof CTAForm>

export default meta
type Story = StoryObj<typeof CTAForm>

export const Playground: Story = {
  render: () => (
    <CTAForm>
      <CTAForm.Input>
        <FormControl required>
          <FormControl.Label>Your Work Email Address</FormControl.Label>
          <TextInput placeholder="email" autoComplete="email" />
        </FormControl>
      </CTAForm.Input>
      <CTAForm.Confirm>
        <FormControl required>
          <FormControl.Label>
            <Text size="200" variant="muted">
              I agree to the <InlineLink href="https://github.com">Privacy Policy</InlineLink> and{' '}
              <InlineLink href="https://github.com">Terms of Service</InlineLink>
            </Text>
          </FormControl.Label>
          <Checkbox name="confirm" />
        </FormControl>
      </CTAForm.Confirm>
      <CTAForm.Action>Subscribe</CTAForm.Action>
    </CTAForm>
  ),
}

export const Default: Story = {
  render: () => (
    <CTAForm>
      <CTAForm.Input>
        <FormControl required>
          <FormControl.Label>Your Work Email Address</FormControl.Label>
          <TextInput placeholder="email" autoComplete="email" />
        </FormControl>
      </CTAForm.Input>
      <CTAForm.Confirm>
        <FormControl required>
          <FormControl.Label>
            <Text size="300" variant="muted">
              I agree to the <InlineLink href="https://github.com">Privacy Policy</InlineLink> and{' '}
              <InlineLink href="https://github.com">Terms of Service</InlineLink>
            </Text>
          </FormControl.Label>
          <Checkbox name="confirm" />
        </FormControl>
      </CTAForm.Confirm>
      <CTAForm.Action>Subscribe</CTAForm.Action>
    </CTAForm>
  ),
}
