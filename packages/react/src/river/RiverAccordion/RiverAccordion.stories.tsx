import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'

import {Link, RiverAccordion, type RiverAccordionProps, Text} from '../../'

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
              src="https://placehold.co/600x400/FF5733/ffffff?text=1"
              alt="placeholder, blank area with an orange background color and a white number 1 in the center"
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
              src="https://placehold.co/600x400/AF7AC5/ffffff?text=2"
              alt="placeholder, blank area with a purple background color and a white number 2 in the center"
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
              src="https://placehold.co/600x400/48C9B0/ffffff?text=3"
              alt="placeholder, blank area with a green background color and a white number 3 in the center"
            />
          </RiverAccordion.Visual>
        </RiverAccordion.Item>
      </RiverAccordion>
    )
  },
}

export default meta

type Story = StoryObj<MetaProps>

export const Default: Story = {}

export const Playground: Story = {
  args: {
    align: 'start',
  },
}
