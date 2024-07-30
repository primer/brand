import React from 'react'
import {StoryFn, Meta} from '@storybook/react'
import {Section} from '.'
import {SectionIntro} from '..'

export default {
  title: 'Components/Section',
  component: Section,
  args: {
    paddingBlockStart: 'normal',
    paddingBlockEnd: 'normal',
    backgroundColor: undefined,
    backgroundImageSrc: undefined,
    backgroundImagePosition: undefined,
    backgroundImageSize: undefined,
    fullWidth: false,
    rounded: false,
    as: 'section',
  },
  argTypes: {
    paddingBlockStart: {
      control: 'inline-radio',
      options: ['none', 'condensed', 'normal', 'spacious'],
    },
    paddingBlockEnd: {
      control: 'inline-radio',
      options: ['none', 'condensed', 'normal', 'spacious'],
    },
    backgroundColor: {
      control: 'text',
    },
    backgroundImageSrc: {
      control: 'text',
    },
    backgroundImageSize: {
      control: 'text',
    },
    backgroundImagePosition: {
      control: 'text',
    },
    fullWidth: {
      control: 'boolean',
    },
    rounded: {
      control: 'boolean',
    },
  },
} as Meta<typeof Section>

const Template: StoryFn<typeof Section> = args => (
  <Section {...args}>
    <SectionIntro>
      <SectionIntro.Heading>Section heading</SectionIntro.Heading>
      <SectionIntro.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </SectionIntro.Description>
    </SectionIntro>
  </Section>
)

export const Default = Template.bind({})

export const Playground = Template.bind({})
