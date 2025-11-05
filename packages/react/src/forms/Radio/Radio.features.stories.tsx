import React from 'react'
import type {Meta, StoryFn} from '@storybook/react'
import {Radio} from '.'
import {FormControl, Stack, ThemeProvider} from '../..'

export default {
  title: 'Components/Forms/Radio/Features',
  component: Radio,
} as Meta<typeof Radio>

export const WithFormControl: StoryFn<typeof Radio> = () => (
  <>
    <Stack direction={{narrow: 'vertical', regular: 'horizontal'}} gap="condensed" padding="none">
      <FormControl>
        <FormControl.Label>Radio One</FormControl.Label>
        <Radio name="radio-group" value="radio one" />
      </FormControl>
      <FormControl>
        <FormControl.Label>Radio Two</FormControl.Label>
        <Radio name="radio-group" value="radio two" />
      </FormControl>
    </Stack>
  </>
)

WithFormControl.storyName = 'w/ labels'

export const Inactive: StoryFn<typeof Radio> = () => (
  <Radio aria-label="Standalone one" name="radio-group" value="radio one" disabled />
)
export const OnCustomBackgroundColor: StoryFn<typeof Radio> = () => {
  const designTokenOverrides = `
  .custom-colors[data-color-mode='dark'] {
    padding: 3rem;
    background-color: var(--base-color-scale-purple-9);
  }
`

  return (
    <ThemeProvider colorMode="dark" className="custom-colors">
      <style>{designTokenOverrides}</style>
      <Stack>
        <FormControl>
          <FormControl.Label>Radio One</FormControl.Label>
          <Radio name="radio-group" value="radio one" />
        </FormControl>
        <FormControl>
          <FormControl.Label>Radio Two</FormControl.Label>
          <Radio name="radio-group" value="radio two" />
        </FormControl>
      </Stack>
    </ThemeProvider>
  )
}
