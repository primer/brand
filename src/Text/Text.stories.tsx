import {ComponentMeta, ComponentStory} from '@storybook/react'
import React from 'react'
import {Text} from '.'

export default {
  title: 'Components/Text',
  component: Text
} as ComponentMeta<typeof Text>

const Template: ComponentStory<typeof Text> = args => <Text {...args} />

export const Size700 = Template.bind({})
Size700.args = {
  children: 'Size 700',
  variant: '700'
}

export const Size600 = Template.bind({})
Size600.args = {
  children: 'Size 600',
  variant: '600'
}

export const Size500 = Template.bind({})
Size500.args = {
  children: 'Size 500',
  variant: '500'
}

export const Size400 = Template.bind({})
Size400.args = {
  children: 'Size 400',
  variant: '400'
}

export const Size300 = Template.bind({})
Size300.args = {
  children: 'Size 300',
  variant: '300'
}

export const Size200 = Template.bind({})
Size200.args = {
  children: 'Size 200',
  variant: '200'
}

export const Size100 = Template.bind({})
Size100.args = {
  children: 'Size 100',
  variant: '100'
}
