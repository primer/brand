import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {Textarea} from '.'
import {Stack, FormControl} from '../../'

export default {
  title: 'Components/Forms/Textarea/Features',
  component: Textarea
} as ComponentMeta<typeof Textarea>

export const Validation: ComponentStory<typeof Textarea> = () => (
  <Stack direction="vertical">
    <Textarea aria-label="Standalone text input" validationStatus="success" fullWidth />
    <Textarea aria-label="Standalone text input" validationStatus="error" fullWidth />
  </Stack>
)

export const WithFormControl: ComponentStory<typeof Textarea> = () => (
  <FormControl>
    <FormControl.Label>Description</FormControl.Label>
    <Textarea />
  </FormControl>
)
WithFormControl.storyName = 'w/ labels'

export const Inactive: ComponentStory<typeof Textarea> = () => <Textarea disabled />

export const FullWidth: ComponentStory<typeof Textarea> = () => <Textarea fullWidth />
