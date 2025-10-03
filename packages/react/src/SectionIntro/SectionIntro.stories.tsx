import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {SectionIntro} from '.'

const meta = {
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
} satisfies Meta<typeof SectionIntro>

export default meta
type Story = StoryObj<typeof SectionIntro>

export const Playground: Story = {
  render: args => (
    <SectionIntro {...args}>
      <SectionIntro.Label>Label</SectionIntro.Label>
      <SectionIntro.Heading>This is my super sweet SectionIntro heading</SectionIntro.Heading>
      <SectionIntro.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit id. Aliquam luctus sed turpis felis nam
        pulvinar risus elementum.
      </SectionIntro.Description>
      <SectionIntro.Link href="#">Call to action</SectionIntro.Link>
    </SectionIntro>
  ),
}

export const Default: Story = {
  render: () => (
    <SectionIntro>
      <SectionIntro.Label>Label</SectionIntro.Label>
      <SectionIntro.Heading>This is my super sweet SectionIntro heading</SectionIntro.Heading>
      <SectionIntro.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit id. Aliquam luctus sed turpis felis nam
        pulvinar risus elementum.
      </SectionIntro.Description>
      <SectionIntro.Link href="#">Call to action</SectionIntro.Link>
    </SectionIntro>
  ),
}
