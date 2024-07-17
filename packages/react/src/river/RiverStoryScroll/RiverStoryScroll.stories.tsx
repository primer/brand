import React from 'react'
import {StoryFn, Meta} from '@storybook/react'

import {RiverStoryScroll} from '.'
import {Heading, Text, Link, River, Box} from '../..'
import {Container} from '../../component-helpers'

export default {
  title: 'Components/RiverStoryScroll',
  component: RiverStoryScroll,
} as Meta<typeof RiverStoryScroll>

const Template: StoryFn<typeof RiverStoryScroll> = args => (
  <Container>
    <Box style={{padding: '15dvh 0 200dvh'}}>
      <RiverStoryScroll {...args}>
        <River>
          <River.Visual>
            <img
              src="https://placehold.co/600x400/FF5733/ffffff.png?text=1"
              alt="placeholder, blank area with an off-white background color"
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
              src="https://placehold.co/600x400/AF7AC5/ffffff.png?text=2"
              alt="placeholder, blank area with an off-white background color"
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
              src="https://placehold.co/600x400/FFC300/ffffff.png?text=3"
              alt="placeholder, blank area with an off-white background color"
            />
          </River.Visual>
          <River.Content>
            <Heading>Heading 3 </Heading>
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
              src="https://placehold.co/600x400/48C9B0/ffffff.png?text=4"
              alt="placeholder, blank area with an off-white background color"
            />
          </River.Visual>
          <River.Content>
            <Heading>Heading 4</Heading>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
              turpis felis nam pulvinar risus elementum.
            </Text>
            <Link href="#">Call to action</Link>
          </River.Content>
        </River>
      </RiverStoryScroll>
    </Box>
  </Container>
)

export const Default = Template.bind({})
