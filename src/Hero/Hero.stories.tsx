import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'

import {Hero} from '.'
export default {
  title: 'Components/Hero',
  component: Hero
} as ComponentMeta<typeof Hero>

const Template: ComponentStory<typeof Hero> = args => <Hero {...args} />

export const defaultArgs = {
  heading: 'This is my super sweet hero heading',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis felis nam pulvinar risus elementum.',
  primaryAction: {
    text: 'Primary action',
    href: '#'
  }
}
export const Default = Template.bind({})
Default.args = defaultArgs

export const Centered = Template.bind({})
Centered.args = {
  heading: 'This is my super sweet hero heading',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis felis nam pulvinar risus elementum.',
  align: 'center',
  primaryAction: {
    text: 'Primary action',
    href: '#'
  }
}

export const WithoutDescription = Template.bind({})
WithoutDescription.args = {
  heading: 'This is my super sweet hero heading',
  primaryAction: {
    text: 'Primary action',
    href: '#'
  }
}

export const WithSecondaryAction = Template.bind({})
export const withSecondaryActionArgs = {
  heading: 'This is my super sweet hero heading',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis felis nam pulvinar risus elementum.',
  primaryAction: {
    text: 'Primary action',
    href: '#'
  },
  secondaryAction: {
    text: 'Secondary action',
    href: '#'
  }
}
WithSecondaryAction.args = withSecondaryActionArgs

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
  align: 'center',
  primaryAction: {
    text: 'Get started',
    href: '#'
  }
}

export const Issues = Template.bind({})
Issues.args = {
  heading: 'Project planning for developers',
  description:
    'Create issues, break them into tasks, track relationships, add custom fields, and have conversations. Visualize large projects as spreadsheets or boards, and automate everything with code.',
  align: 'center',
  primaryAction: {
    text: 'Watch video',
    href: '#'
  },
  secondaryAction: {
    text: 'Start using project tables',
    href: '#'
  }
}
