import {ComponentMeta, ComponentStory} from '@storybook/react'
import React from 'react'
import {ButtonGroup} from '.'
import {Button} from '../Button'

export default {
  title: 'Components/ButtonGroup',
  component: ButtonGroup
} as ComponentMeta<typeof ButtonGroup>

const Template: ComponentStory<typeof ButtonGroup> = args => (
  <ButtonGroup {...args}>
    <Button as="a">This is one button</Button>
    <Button>This is the second button</Button>
  </ButtonGroup>
)

export const Primary = Template.bind({})
Primary.args = {}
