import React from 'react'
import type {Meta, StoryFn} from '@storybook/react'

import {Link, RiverAccordion, Section, Text} from '../../'
import placeholder1 from '../../fixtures/images/placeholder-1.png'
import placeholder2 from '../../fixtures/images/placeholder-2.png'
import placeholder3 from '../../fixtures/images/placeholder-3.png'

export default {
  title: 'Components/RiverAccordion/Features/GridLine variants',
  component: RiverAccordion,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<typeof RiverAccordion>

export const GridLine: StoryFn<typeof RiverAccordion> = () => (
  <Section>
    <RiverAccordion variant="gridline">
      <RiverAccordion.Item>
        <RiverAccordion.Heading>Heading 1</RiverAccordion.Heading>
        <RiverAccordion.Content>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
            turpis felis nam pulvinar risus elementum.
          </Text>
          <Link href="#">Call to action</Link>
        </RiverAccordion.Content>

        <RiverAccordion.Visual>
          <img
            src={placeholder1}
            alt="placeholder, blank area with an orange background color and a white number 1 in the center"
            style={{aspectRatio: '1 / 1', objectFit: 'cover'}}
          />
        </RiverAccordion.Visual>
      </RiverAccordion.Item>

      <RiverAccordion.Item>
        <RiverAccordion.Heading>Heading 2</RiverAccordion.Heading>
        <RiverAccordion.Content>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
            turpis felis nam pulvinar risus elementum.
          </Text>
          <Link href="#">Call to action</Link>
        </RiverAccordion.Content>

        <RiverAccordion.Visual>
          <img
            src={placeholder2}
            alt="placeholder, blank area with a purple background color and a white number 2 in the center"
            style={{aspectRatio: '1 / 1', objectFit: 'cover'}}
          />
        </RiverAccordion.Visual>
      </RiverAccordion.Item>

      <RiverAccordion.Item>
        <RiverAccordion.Heading>Heading 3</RiverAccordion.Heading>
        <RiverAccordion.Content>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
            turpis felis nam pulvinar risus elementum.
          </Text>
          <Link href="#">Call to action</Link>
        </RiverAccordion.Content>

        <RiverAccordion.Visual>
          <img
            src={placeholder3}
            alt="placeholder, blank area with a green background color and a white number 3 in the center"
            style={{aspectRatio: '1 / 1', objectFit: 'cover'}}
          />
        </RiverAccordion.Visual>
      </RiverAccordion.Item>
    </RiverAccordion>
  </Section>
)

GridLine.storyName = 'GridLine variant'

export const GridLineEnd: StoryFn<typeof RiverAccordion> = () => (
  <Section>
    <RiverAccordion variant="gridline" align="end">
      <RiverAccordion.Item>
        <RiverAccordion.Heading>Heading 1</RiverAccordion.Heading>
        <RiverAccordion.Content>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
            turpis felis nam pulvinar risus elementum.
          </Text>
          <Link href="#">Call to action</Link>
        </RiverAccordion.Content>

        <RiverAccordion.Visual>
          <img
            src={placeholder1}
            alt="placeholder, blank area with an orange background color and a white number 1 in the center"
            style={{aspectRatio: '1 / 1', objectFit: 'cover'}}
          />
        </RiverAccordion.Visual>
      </RiverAccordion.Item>

      <RiverAccordion.Item>
        <RiverAccordion.Heading>Heading 2</RiverAccordion.Heading>
        <RiverAccordion.Content>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
            turpis felis nam pulvinar risus elementum.
          </Text>
          <Link href="#">Call to action</Link>
        </RiverAccordion.Content>

        <RiverAccordion.Visual>
          <img
            src={placeholder2}
            alt="placeholder, blank area with a purple background color and a white number 2 in the center"
            style={{aspectRatio: '1 / 1', objectFit: 'cover'}}
          />
        </RiverAccordion.Visual>
      </RiverAccordion.Item>

      <RiverAccordion.Item>
        <RiverAccordion.Heading>Heading 3</RiverAccordion.Heading>
        <RiverAccordion.Content>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
            turpis felis nam pulvinar risus elementum.
          </Text>
          <Link href="#">Call to action</Link>
        </RiverAccordion.Content>

        <RiverAccordion.Visual>
          <img
            src={placeholder3}
            alt="placeholder, blank area with a green background color and a white number 3 in the center"
            style={{aspectRatio: '1 / 1', objectFit: 'cover'}}
          />
        </RiverAccordion.Visual>
      </RiverAccordion.Item>
    </RiverAccordion>
  </Section>
)

GridLineEnd.storyName = 'GridLine variant (end)'
