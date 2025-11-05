import React from 'react'
import type {Meta, StoryFn} from '@storybook/react'
import {Textarea} from '.'
import {Stack, FormControl} from '../../'

export default {
  title: 'Components/Forms/Textarea/Features',
  component: Textarea,
} as Meta<typeof Textarea>

export const Validation: StoryFn<typeof Textarea> = () => (
  <Stack direction="vertical">
    <Textarea aria-label="Standalone text input" validationStatus="success" fullWidth />
    <Textarea aria-label="Standalone text input" validationStatus="error" fullWidth />
  </Stack>
)

export const WithFormControl: StoryFn<typeof Textarea> = () => (
  <FormControl>
    <FormControl.Label>Description</FormControl.Label>
    <Textarea />
  </FormControl>
)
WithFormControl.storyName = 'w/ labels'

export const Inactive: StoryFn<typeof Textarea> = () => <Textarea aria-label="Standalone text input" disabled />

export const FullWidth: StoryFn<typeof Textarea> = () => <Textarea aria-label="Standalone text input" fullWidth />
