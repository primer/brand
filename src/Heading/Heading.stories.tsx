import {ComponentMeta, ComponentStory} from '@storybook/react'
import React from 'react'
import {Heading} from '.'

export default {
  title: 'Components/Heading',
  component: Heading
} as ComponentMeta<typeof Heading>

const Template: ComponentStory<typeof Heading> = args => <Heading {...args} />

export const Size1000 = Template.bind({})
Size1000.args = {
  children: 'Size 1000',
  variant: '1000'
}

export const Size900 = Template.bind({})
Size900.args = {
  children: 'Size 900',
  variant: '900'
}

export const Size800 = Template.bind({})
Size800.args = {
  children: 'Size 800',
  variant: '800'
}

export const Size750 = Template.bind({})
Size750.args = {
  children: 'Size 750',
  variant: '750'
}

export const Size650 = Template.bind({})
Size650.args = {
  children: 'Size 650',
  variant: '650'
}

export const Size550 = Template.bind({})
Size550.args = {
  children: 'Size 550',
  variant: '550'
}

export const Size450 = Template.bind({})
Size450.args = {
  children: 'Size 450',
  variant: '450'
}

export const Scale: ComponentStory<typeof Heading> = () => (
  <>
    <Heading variant="1000">Size 1000</Heading>
    <Heading variant="900">Size 900</Heading>
    <Heading variant="800">Size 800</Heading>
    <Heading variant="750">Size 750</Heading>
    <Heading variant="650">Size 650</Heading>
    <Heading variant="550">Size 550</Heading>
    <Heading variant="450">Size 450</Heading>
  </>
)
