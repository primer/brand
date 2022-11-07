import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {Radio} from '.'
import {Stack} from '../../'

export default {
  title: 'Components/Forms/Radio',
  component: Radio,
  args: {
    checked: false,
    value: 'radio'
  },
  argTypes: {
    disabled: {
      description: 'disabled field',
      control: {type: 'boolean'},
      table: {
        category: 'Input'
      }
    }
  }
} as ComponentMeta<typeof Radio>

export const Default: ComponentStory<typeof Radio> = () => (
  <>
    <Stack direction={{narrow: 'vertical', regular: 'horizontal'}} gap="condensed" padding="condensed">
      <Radio aria-label="Standalone one" name="radio-group" value="radio one" />
      <Radio aria-label="Standalone two" name="radio-group" value="radio two" />
    </Stack>
  </>
)
