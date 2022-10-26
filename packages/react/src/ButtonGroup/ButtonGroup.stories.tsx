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
    <Button>This is one button</Button>
    <p>ruining until reduce works</p>
    <Button>This is the second button</Button>
    <Button>This button won't appear</Button>
  </ButtonGroup>
)

export const Primary = Template.bind({})
Primary.args = {}
