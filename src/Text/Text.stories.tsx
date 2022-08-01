import {ComponentMeta, ComponentStory} from '@storybook/react'
import React from 'react'
import {Text, TextSizes} from '.'

export default {
  title: 'Components/Text',
  component: Text
} as ComponentMeta<typeof Text>

const Template: ComponentStory<typeof Text> = args => <Text {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'Text',
  size: '400'
}

export const Scale: ComponentStory<typeof Text> = args => (
  <>
    {TextSizes.map(size => (
      <Text key={size} size={size} {...args}>
        Text {size} HELLO
      </Text>
    ))}
  </>
)

Scale.args = {
  as: 'div'
}
