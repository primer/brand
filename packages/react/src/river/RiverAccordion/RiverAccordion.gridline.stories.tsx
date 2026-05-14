import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'

import {Image, Link, RiverAccordion, Section, Text} from '../../'
import placeholder1 from '../../fixtures/images/placeholder-1.png'
import placeholder2 from '../../fixtures/images/placeholder-2.png'
import placeholder3 from '../../fixtures/images/placeholder-3.png'

const meta: Meta<typeof RiverAccordion> = {
  title: 'Components/RiverAccordion/Features/Gridline variants',
  component: RiverAccordion,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj<typeof RiverAccordion>

export const GridLine: Story = {
  name: 'Gridline variant',
  render: () => (
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
            <Image
              src={placeholder1}
              alt="placeholder, blank area with an orange background color and a white number 1 in the center"
              aspectRatio="1:1"
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
            <Image
              src={placeholder2}
              alt="placeholder, blank area with a purple background color and a white number 2 in the center"
              aspectRatio="1:1"
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
            <Image
              src={placeholder3}
              alt="placeholder, blank area with a green background color and a white number 3 in the center"
              aspectRatio="1:1"
            />
          </RiverAccordion.Visual>
        </RiverAccordion.Item>
      </RiverAccordion>
    </Section>
  ),
}

export const GridLineEnd: Story = {
  name: 'Gridline variant (end)',
  render: () => (
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
            <Image
              src={placeholder1}
              alt="placeholder, blank area with an orange background color and a white number 1 in the center"
              aspectRatio="1:1"
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
            <Image
              src={placeholder2}
              alt="placeholder, blank area with a purple background color and a white number 2 in the center"
              aspectRatio="1:1"
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
            <Image
              src={placeholder3}
              alt="placeholder, blank area with a green background color and a white number 3 in the center"
              aspectRatio="1:1"
            />
          </RiverAccordion.Visual>
        </RiverAccordion.Item>
      </RiverAccordion>
    </Section>
  ),
}

export const GridLineWithBackground: Story = {
  name: 'Gridline variant (with background)',
  render: () => (
    <Section>
      <RiverAccordion variant="gridline">
        <RiverAccordion.Item>
          <RiverAccordion.Heading>Heading 1</RiverAccordion.Heading>
          <RiverAccordion.Content>
            <Text>
              The imageBackgroundColor prop creates a full-bleed container with a subtle background, centering the media
              with padding around it.
            </Text>
            <Link href="#">Call to action</Link>
          </RiverAccordion.Content>

          <RiverAccordion.Visual imageBackgroundColor="subtle">
            <Image
              src={placeholder1}
              alt="placeholder, blank area with an orange background color and a white number 1 in the center"
              aspectRatio="1:1"
            />
          </RiverAccordion.Visual>
        </RiverAccordion.Item>

        <RiverAccordion.Item>
          <RiverAccordion.Heading>Heading 2</RiverAccordion.Heading>
          <RiverAccordion.Content>
            <Text>
              The background treatment is applied to each visual while the accordion keeps its existing interaction
              pattern.
            </Text>
            <Link href="#">Call to action</Link>
          </RiverAccordion.Content>

          <RiverAccordion.Visual imageBackgroundColor="subtle">
            <Image
              src={placeholder2}
              alt="placeholder, blank area with a purple background color and a white number 2 in the center"
              aspectRatio="1:1"
            />
          </RiverAccordion.Visual>
        </RiverAccordion.Item>

        <RiverAccordion.Item>
          <RiverAccordion.Heading>Heading 3</RiverAccordion.Heading>
          <RiverAccordion.Content>
            <Text>
              Use this treatment with the gridline variant when visuals should sit in an edge-to-edge background panel.
            </Text>
            <Link href="#">Call to action</Link>
          </RiverAccordion.Content>

          <RiverAccordion.Visual imageBackgroundColor="subtle">
            <Image
              src={placeholder3}
              alt="placeholder, blank area with a green background color and a white number 3 in the center"
              aspectRatio="1:1"
            />
          </RiverAccordion.Visual>
        </RiverAccordion.Item>
      </RiverAccordion>
    </Section>
  ),
}

export const GridLineWithBackgroundEnd: Story = {
  name: 'Gridline variant (with background, end)',
  render: () => (
    <Section>
      <RiverAccordion variant="gridline" align="end">
        <RiverAccordion.Item>
          <RiverAccordion.Heading>Heading 1</RiverAccordion.Heading>
          <RiverAccordion.Content>
            <Text>The imageBackgroundColor prop can be combined with end alignment.</Text>
            <Link href="#">Call to action</Link>
          </RiverAccordion.Content>

          <RiverAccordion.Visual imageBackgroundColor="subtle">
            <Image
              src={placeholder1}
              alt="placeholder, blank area with an orange background color and a white number 1 in the center"
              aspectRatio="1:1"
            />
          </RiverAccordion.Visual>
        </RiverAccordion.Item>

        <RiverAccordion.Item>
          <RiverAccordion.Heading>Heading 2</RiverAccordion.Heading>
          <RiverAccordion.Content>
            <Text>Changing the active item swaps the visual within the same full-bleed background treatment.</Text>
            <Link href="#">Call to action</Link>
          </RiverAccordion.Content>

          <RiverAccordion.Visual imageBackgroundColor="subtle">
            <Image
              src={placeholder2}
              alt="placeholder, blank area with a purple background color and a white number 2 in the center"
              aspectRatio="1:1"
            />
          </RiverAccordion.Visual>
        </RiverAccordion.Item>

        <RiverAccordion.Item>
          <RiverAccordion.Heading>Heading 3</RiverAccordion.Heading>
          <RiverAccordion.Content>
            <Text>Use a consistent background treatment across all item visuals.</Text>
            <Link href="#">Call to action</Link>
          </RiverAccordion.Content>

          <RiverAccordion.Visual imageBackgroundColor="subtle">
            <Image
              src={placeholder3}
              alt="placeholder, blank area with a green background color and a white number 3 in the center"
              aspectRatio="1:1"
            />
          </RiverAccordion.Visual>
        </RiverAccordion.Item>
      </RiverAccordion>
    </Section>
  ),
}
