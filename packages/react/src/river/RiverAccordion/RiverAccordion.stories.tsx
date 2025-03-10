import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'

// import placeholderImage from '../../fixtures/images/placeholder.png'
import {Accordion, Heading, Link, River, RiverAccordion, type RiverAccordionProps, Text} from '../../'

export type MetaProps = RiverAccordionProps

const meta: Meta<MetaProps> = {
  title: 'Components/RiverAccordion',
  component: RiverAccordion,
  args: {
    align: 'start',
  },
  argTypes: {
    align: {
      options: ['start', 'end'],
      control: {type: 'inline-radio'},
    },
  },
}

export default meta

type Story = StoryObj<MetaProps>

export const Playground: Story = {
  render: args => {
    return (
      <RiverAccordion {...args}>
        <River>
          <River.Visual>
            <img
              src="https://picsum.photos/seed/hello/1000/800"
              alt="placeholder, blank area with a gray background color"
            />
          </River.Visual>
          <River.Content>
            <Heading>Heading 1</Heading>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
              turpis felis nam pulvinar risus elementum.
            </Text>
            <Link href="#">Call to action</Link>
          </River.Content>
        </River>

        <River>
          <River.Visual>
            <img
              src="https://picsum.photos/seed/beans/1000/800"
              alt="placeholder, blank area with a gray background color"
            />
          </River.Visual>
          <River.Content>
            <Heading>Heading 2</Heading>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
              turpis felis nam pulvinar risus elementum.
            </Text>
            <Link href="#">Call to action</Link>
          </River.Content>
        </River>

        <River>
          <River.Visual>
            <img
              src="https://picsum.photos/seed/badger/1000/800"
              alt="placeholder, blank area with a gray background color"
            />
          </River.Visual>
          <River.Content>
            <Heading>Heading 3</Heading>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
              turpis felis nam pulvinar risus elementum.
            </Text>
            <Link href="#">Call to action</Link>
          </River.Content>
        </River>
      </RiverAccordion>
    )
  },
}
