import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'
import {SectionIntro} from '.'

export default {
  title: 'Components/SectionIntro',
  component: SectionIntro,
  args: {
    heading: 'This is my super sweet SectionIntro heading',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit id. Aliquam luctus sed turpis felis nam pulvinar risus elementum.',
    align: 'start',
    action: {
      text: 'Action',
      href: '#',
      subtle: false
    }
  },
  argTypes: {
    heading: {
      description: 'The heading of the SectionIntro',
      control: {
        type: 'text'
      }
    },
    description: {
      description: 'The description of the SectionIntro',
      control: {
        type: 'text'
      }
    },
    align: {
      description: 'The alignment of the SectionIntro',
      control: {
        type: 'radio',
        options: ['start', 'center']
      }
    }
  }
} as ComponentMeta<typeof SectionIntro>

export const Playground: ComponentStory<typeof SectionIntro> = args => <SectionIntro {...args} />
