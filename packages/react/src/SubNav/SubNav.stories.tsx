import React from 'react'
import {Meta, StoryFn} from '@storybook/react'
import {SubNav} from './SubNav'

export default {
  title: 'Components/SubNav',
  component: SubNav,
} as Meta<typeof SubNav>

const Template: StoryFn<typeof SubNav> = args => (
  <SubNav {...args}>
    <SubNav.Heading>Heading</SubNav.Heading>
    <SubNav.Link href="#">Link</SubNav.Link>
    <SubNav.Link href="#">Link</SubNav.Link>
    <SubNav.Link href="#">Link</SubNav.Link>
    <SubNav.Link href="#" aria-current="page">
      Link
    </SubNav.Link>
    <SubNav.Link href="#">Link</SubNav.Link>
    <SubNav.Link href="#">Link</SubNav.Link>
  </SubNav>
)

export const Default = Template.bind({})
