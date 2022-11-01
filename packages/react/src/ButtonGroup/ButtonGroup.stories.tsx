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
    <Button>This is the second button</Button>
  </ButtonGroup>
)

export const Primary = Template.bind({})
Primary.args = {}

const SingleButtonTemplate: ComponentStory<typeof ButtonGroup> = args => (
  <ButtonGroup {...args}>
    <Button>This is one button</Button>
  </ButtonGroup>
)

export const SingleButton = SingleButtonTemplate.bind({})

const LargeButtonTemplate: ComponentStory<typeof ButtonGroup> = args => (
  <ButtonGroup buttonSize="large" {...args}>
    <Button>This is one button</Button>
    <Button>This is the second button</Button>
  </ButtonGroup>
)

export const LargeButtons = LargeButtonTemplate.bind({})

const VerticalButtonTemplate: ComponentStory<typeof ButtonGroup> = args => (
  <ButtonGroup direction="vertical" {...args}>
    <Button>This is one button</Button>
    <Button>This is the second button</Button>
  </ButtonGroup>
)

export const VerticalButtons = VerticalButtonTemplate.bind({})

const LinkButtonTemplate: ComponentStory<typeof ButtonGroup> = args => (
  <ButtonGroup buttonsAs={'a'} {...args}>
    <Button href="#">This is one button</Button>
    <Button href="#">This is the second button</Button>
  </ButtonGroup>
)

export const LinkButtons = LinkButtonTemplate.bind({})

const ThreeButtonTemplate: ComponentStory<typeof ButtonGroup> = args => (
  <ButtonGroup {...args}>
    <Button>This is one button</Button>
    <Button>This is the second button</Button>
    <Button>This is the third button</Button>
  </ButtonGroup>
)

export const ThreeButtonsOnlyShowingTheExpectedTwo = ThreeButtonTemplate.bind({})
