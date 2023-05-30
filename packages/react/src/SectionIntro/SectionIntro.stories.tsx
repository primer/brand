import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'
import {SectionIntro} from '.'

export default {
  title: 'Components/SectionIntro',
  component: SectionIntro,
  args: {
    align: 'start',
  },
  argTypes: {
    align: {
      description: 'The alignment of the SectionIntro',
      control: {
        type: 'radio',
        options: ['start', 'center'],
      },
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof SectionIntro>

export const Playground: ComponentStory<typeof SectionIntro> = args => (
  <SectionIntro {...args}>
    <SectionIntro.Heading>This is my super sweet SectionIntro heading</SectionIntro.Heading>
    <SectionIntro.Description>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit id. Aliquam luctus sed turpis felis nam
      pulvinar risus elementum.
    </SectionIntro.Description>
    <SectionIntro.Link href="#">Call to action</SectionIntro.Link>
  </SectionIntro>
)

export const Default = () => (
  <SectionIntro>
    <SectionIntro.Heading>This is my super sweet SectionIntro heading</SectionIntro.Heading>
    <SectionIntro.Description>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit id. Aliquam luctus sed turpis felis nam
      pulvinar risus elementum.
    </SectionIntro.Description>
    <SectionIntro.Link href="#">Call to action</SectionIntro.Link>
  </SectionIntro>
)
