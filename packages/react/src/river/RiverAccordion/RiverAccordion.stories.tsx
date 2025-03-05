import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'

// import placeholderImage from '../../fixtures/images/placeholder.png'
import {Link, RiverAccordion, type RiverAccordionProps, Stack, Text} from '../../'

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
        <RiverAccordion.Item>
          <RiverAccordion.Heading>Heading 1</RiverAccordion.Heading>
          <RiverAccordion.Content>
            <Text as="p" variant="muted" weight="medium" size="200">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
              turpis felis nam pulvinar risus elementum.
            </Text>
            <Link href="#" variant="accent">
              Call to action
            </Link>
          </RiverAccordion.Content>

          <RiverAccordion.Visual>
            <img
              src="https://picsum.photos/seed/hello/1000/800"
              alt="placeholder, blank area with a gray background color"
            />
          </RiverAccordion.Visual>
        </RiverAccordion.Item>

        <RiverAccordion.Item>
          <RiverAccordion.Heading>Heading 2</RiverAccordion.Heading>
          <RiverAccordion.Content>
            <Text as="p" variant="muted" weight="medium" size="200">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
              turpis felis nam pulvinar risus elementum.
            </Text>
            <Link href="#" variant="accent">
              Call to action
            </Link>
          </RiverAccordion.Content>

          <RiverAccordion.Visual>
            <img
              src="https://picsum.photos/seed/beans/1000/800"
              alt="placeholder, blank area with a gray background color"
            />
          </RiverAccordion.Visual>
        </RiverAccordion.Item>

        <RiverAccordion.Item>
          <RiverAccordion.Heading>Heading 3</RiverAccordion.Heading>
          <RiverAccordion.Content>
            <Text as="p" variant="muted" weight="medium" size="200">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
              turpis felis nam pulvinar risus elementum.
            </Text>
            <Link href="#" variant="accent">
              Call to action
            </Link>
          </RiverAccordion.Content>

          <RiverAccordion.Visual>
            <img
              src="https://picsum.photos/seed/badger/1000/800"
              alt="placeholder, blank area with a gray background color"
            />
          </RiverAccordion.Visual>
        </RiverAccordion.Item>
      </RiverAccordion>
    )
  },
}
