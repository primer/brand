import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'

import placeholderImage from '../../fixtures/images/placeholder.png'
import {Heading, Link, River, RiverAccordion, type RiverAccordionProps, Text} from '../../'

type RiverAccordionStoryProps = {
  test?: string
}

export type MetaProps = RiverAccordionProps & RiverAccordionStoryProps

const meta: Meta<MetaProps> = {
  title: 'Components/RiverAccordion',
  component: RiverAccordion,
  args: {},
  argTypes: {},
}

export default meta

type Story = StoryObj<MetaProps>

const PlaceholderImage = () => <img src={placeholderImage} alt="placeholder, blank area with a gray background color" />

export const Playground: Story = {
  render: () => {
    return (
      <RiverAccordion>
        <River>
          <River.Visual>
            <PlaceholderImage />
          </River.Visual>
          <River.Content>
            <Heading>Heading</Heading>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
              turpis felis nam pulvinar risus elementum.
            </Text>
            <Link href="#">Call to action</Link>
          </River.Content>
        </River>

        <River>
          <River.Visual>
            <PlaceholderImage />
          </River.Visual>
          <River.Content>
            <Heading>Heading</Heading>
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
