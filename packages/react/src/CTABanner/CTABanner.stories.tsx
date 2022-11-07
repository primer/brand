import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {CTABanner} from '.'
import {ButtonGroup} from '../ButtonGroup'
import {Button} from '../Button'

export default {
  title: 'Components/CTABanner',
  component: CTABanner,
  subcomponents: {ButtonGroup},
  args: {
    align: 'start'
  },
  argTypes: {
    align: {
      description: 'The alignment of the content',
      control: {
        type: 'radio',
        options: ['start', 'center']
      }
    },
    children: {
      table: {
        disable: true
      }
    }
  }
} as ComponentMeta<typeof CTABanner>

const Template: ComponentStory<typeof CTABanner> = args => (
  <CTABanner {...args}>
    <CTABanner.Heading as={'h1'}>Where the most ambitious teams build great things</CTABanner.Heading>
    <CTABanner.Description>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
      felis nam pulvinar risus elementum.
    </CTABanner.Description>
    <ButtonGroup buttonSize="large">
      <Button>Primary Action</Button>
      <Button>Secondary Action</Button>
    </ButtonGroup>
  </CTABanner>
)

export const Playground = Template.bind({})

// export const LinkButtonGroup = Template.bind({})
// LinkButtonGroup.args = {
//   buttonsAs: 'a'
// }
