import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'

import {Hero} from '.'
export default {
  title: 'Components/Hero',
  component: Hero
} as ComponentMeta<typeof Hero>

const Template: ComponentStory<typeof Hero> = args => <Hero {...args} />

export const Default = Template.bind({})
Default.args = {
  heading: 'This is my super sweet hero heading',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis felis nam pulvinar risus elementum.'
}

export const Centered = Template.bind({})
Centered.args = {
  heading: 'This is my super sweet hero heading',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis felis nam pulvinar risus elementum.',
  align: 'center'
}

export const Codespaces = Template.bind({})
Codespaces.args = {
  heading: (
    <>
      Blazing fast cloud
      <br />
      developer environments
    </>
  ),
  description: 'Visual Studio Code backed by high performance VMs that start in seconds.',
  align: 'center'
}

export const Issues = Template.bind({})
Issues.args = {
  heading: 'Project planning for developers',
  description:
    'Create issues, break them into tasks, track relationships, add custom fields, and have conversations. Visualize large projects as spreadsheets or boards, and automate everything with code.',
  align: 'center'
}
