import React from 'react'
import {Meta, StoryFn} from '@storybook/react'
import {SubNav} from './SubNav'

export default {
  title: 'Components/SubNav',
  component: SubNav,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<typeof SubNav>

const Template: StoryFn<typeof SubNav> = args => (
  <main>
    <SubNav {...args}>
      <SubNav.Heading href="#">Heading</SubNav.Heading>
      <SubNav.Link href="#">
        Link
        <SubNav.SubMenu>
          <SubNav.Link href="#">Link feature one</SubNav.Link>
          <SubNav.Link href="#">Link feature two</SubNav.Link>
          <SubNav.Link href="#">Link feature three</SubNav.Link>
          <SubNav.Link href="#">Link feature four</SubNav.Link>
        </SubNav.SubMenu>
      </SubNav.Link>
      <SubNav.Link href="#">Link</SubNav.Link>
      <SubNav.Link href="#">Link</SubNav.Link>
      <SubNav.Link href="#" aria-current="page">
        Link
      </SubNav.Link>
      <SubNav.Link href="#">Link</SubNav.Link>
      <SubNav.Link href="#">Link</SubNav.Link>
      <SubNav.Action href="#">Primary CTA</SubNav.Action>
    </SubNav>
  </main>
)

export const Default = Template.bind({})
