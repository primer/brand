import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {SubNav} from './SubNav'

const meta = {
  title: 'Components/SubNav',
  component: SubNav,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SubNav>

export default meta
type Story = StoryObj<typeof SubNav>

export const Default: Story = {
  render: args => (
    <main>
      <SubNav {...args}>
        <SubNav.Heading href="#">Heading</SubNav.Heading>
        <SubNav.Link href="#">Link </SubNav.Link>
        <SubNav.Link href="#">Link</SubNav.Link>
        <SubNav.Link href="#">Link</SubNav.Link>
        <SubNav.Link href="#">Link</SubNav.Link>
        <SubNav.Link href="#">Link</SubNav.Link>
        <SubNav.Link href="#">Link</SubNav.Link>
        <SubNav.Action href="#">Primary CTA</SubNav.Action>
      </SubNav>
    </main>
  ),
}
