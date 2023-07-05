import React from 'react'
import {Meta, StoryFn} from '@storybook/react'

import {CTAForm} from './CTAForm'
import {FormControl, TextInput, Checkbox, Text, InlineLink} from '../index'

export default {
  title: 'Components/CTAForm',
  component: CTAForm,
} as Meta<typeof CTAForm>

export const Playground: StoryFn<typeof CTAForm> = _args => (
  <CTAForm>
    <CTAForm.Input>
      <FormControl required>
        <FormControl.Label>Your Work Email Address</FormControl.Label>
        <TextInput placeholder="name" />
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
)

export const Default: StoryFn<typeof CTAForm> = _args => (
  <CTAForm>
    <CTAForm.Input>
      <FormControl required>
        <FormControl.Label>Your Work Email Address</FormControl.Label>
        <TextInput placeholder="name" />
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
)
