import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'
import {SectionIntro} from '.'

export default {
  title: 'Components/SectionIntro/Features',
  component: SectionIntro
} as ComponentMeta<typeof SectionIntro>

const Template: ComponentStory<typeof SectionIntro> = args => <SectionIntro {...args} />

export const HeadingOnly = Template.bind({})
HeadingOnly.args = {
  heading: 'This is my super sweet SectionIntro heading'
}

export const WithDescription = Template.bind({})
WithDescription.args = {
  heading: 'This is my super sweet SectionIntro heading',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit id. Aliquam luctus sed turpis felis nam pulvinar risus elementum.'
}

export const WithAction = Template.bind({})
WithAction.args = {
  heading: 'This is my super sweet SectionIntro heading',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit id. Aliquam luctus sed turpis felis nam pulvinar risus elementum.',
  action: {
    text: 'Action',
    href: '#'
  }
}

export const WithSubtleAction = Template.bind({})
WithSubtleAction.args = {
  heading: 'This is my super sweet SectionIntro heading',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit id. Aliquam luctus sed turpis felis nam pulvinar risus elementum.',
  action: {
    text: 'Action',
    href: '#',
    subtle: true
  }
}

export const AlignedCenter = Template.bind({})
AlignedCenter.args = {
  heading: 'This is my super sweet SectionIntro heading',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit id. Aliquam luctus sed turpis felis nam pulvinar risus elementum.',
  align: 'center',
  action: {
    text: 'Action',
    href: '#'
  }
}
