import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'

import {Hero} from '.'

export default {
  title: 'Components/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS
    }
  }
} as ComponentMeta<typeof Hero>

const Template: ComponentStory<typeof Hero> = args => <Hero {...args} />

// export const Default = Template.bind({})

export const Default: ComponentStory<typeof Hero> = _args => (
  <Hero>
    <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
    <Hero.Description>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
      felis nam pulvinar risus elementum.
    </Hero.Description>
    <Hero.PrimaryAction href="#">Primary Action</Hero.PrimaryAction>
  </Hero>
)

// Default.args = {
//   heading: 'This is my super sweet hero heading',
//   description:
//     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis felis nam pulvinar risus elementum.',
//   primaryAction: {
//     text: 'Primary action',
//     href: '#'
//   }
// }

// export const Centered = Template.bind({})
// Centered.args = {
//   heading: 'This is my super sweet hero heading',
//   description:
//     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis felis nam pulvinar risus elementum.',
//   align: 'center',
//   primaryAction: {
//     text: 'Primary action',
//     href: '#'
//   }
// }

// export const WithoutDescription = Template.bind({})
// WithoutDescription.args = {
//   heading: 'This is my super sweet hero heading',
//   primaryAction: {
//     text: 'Primary action',
//     href: '#'
//   }
// }

// export const WithSecondaryAction = Template.bind({})
// WithSecondaryAction.args = {
//   heading: 'This is my super sweet hero heading',
//   description:
//     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis felis nam pulvinar risus elementum.',
//   primaryAction: {
//     text: 'Primary action',
//     href: '#'
//   },
//   secondaryAction: {
//     text: 'Secondary action',
//     href: '#'
//   }
// }

// export const Codespaces = Template.bind({})
// Codespaces.args = {
//   heading: (
//     <>
//       Blazing fast cloud
//       <br />
//       developer environments
//     </>
//   ),
//   description: 'Visual Studio Code backed by high performance VMs that start in seconds.',
//   align: 'center',
//   primaryAction: {
//     text: 'Get started',
//     href: '#'
//   }
// }

// export const Issues = Template.bind({})
// Issues.args = {
//   heading: 'Project planning for developers',
//   description:
//     'Create issues, break them into tasks, track relationships, add custom fields, and have conversations. Visualize large projects as spreadsheets or boards, and automate everything with code.',
//   align: 'center',
//   primaryAction: {
//     text: 'Watch video',
//     href: '#'
//   },
//   secondaryAction: {
//     text: 'Start using project tables',
//     href: '#'
//   }
// }

// export const NarrowView = Template.bind({})
// NarrowView.parameters = {
//   viewport: {
//     defaultViewport: 'iphonexr'
//   }
// }
// NarrowView.args = {
//   heading: 'Project planning for developers',
//   description:
//     'Create issues, break them into tasks, track relationships, add custom fields, and have conversations. Visualize large projects as spreadsheets or boards, and automate everything with code.',
//   primaryAction: {
//     text: 'Watch video',
//     href: '#'
//   },
//   secondaryAction: {
//     text: 'Start using project tables',
//     href: '#'
//   }
// }

// export const NarrowViewCentered = Template.bind({})
// NarrowViewCentered.parameters = {
//   viewport: {
//     defaultViewport: 'iphonexr'
//   }
// }
// NarrowViewCentered.args = {
//   heading: 'Project planning for developers',
//   description:
//     'Create issues, break them into tasks, track relationships, add custom fields, and have conversations. Visualize large projects as spreadsheets or boards, and automate everything with code.',
//   align: 'center',
//   primaryAction: {
//     text: 'Watch video',
//     href: '#'
//   },
//   secondaryAction: {
//     text: 'Start using project tables',
//     href: '#'
//   }
// }
