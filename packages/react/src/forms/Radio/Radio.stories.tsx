import React from 'react'
import type {Meta, StoryFn} from '@storybook/react'
import {Radio} from '.'
import {Stack} from '../../'

export default {
  title: 'Components/Forms/Radio',
  component: Radio,
  args: {
    checked: false,
    value: 'radio',
  },
  argTypes: {
    disabled: {
      description: 'disabled field',
      control: {type: 'boolean'},
      table: {
        category: 'Input',
      },
    },
  },
} as Meta<typeof Radio>

export const Default: StoryFn<typeof Radio> = () => (
  <>
    <Stack direction={{narrow: 'vertical', regular: 'horizontal'}} gap="condensed" padding="condensed">
      <Radio aria-label="Standalone one" name="radio-group" value="radio one" />
      <Radio aria-label="Standalone two" name="radio-group" value="radio two" />
    </Stack>
  </>
)
