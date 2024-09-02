import React from 'react'
import {StoryFn, Meta} from '@storybook/react'
import {DuotoneText} from '.'
import {Text} from '../Text'

export default {
  title: 'Components/DuotoneText',
  component: DuotoneText,
} as Meta<typeof DuotoneText>

const Template: StoryFn<typeof DuotoneText> = () => (
  <Text>
    <DuotoneText>
      <DuotoneText.Emphasis>Emphasized text</DuotoneText.Emphasis> followed by regular text.
    </DuotoneText>
  </Text>
)

export const Default = Template.bind({})
