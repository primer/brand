import React from 'react'
import {StoryFn, Meta} from '@storybook/react'

import {RiverStoryScroll} from '.'
import {Text, Link, River, Box} from '../..'
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
            <Text size="300">
              <b>This first sentence is highlighted</b> and here is where the body copy starts. Remember to keep this
              nice and succinct.
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
            <Text size="300">
              <b>This first sentence is highlighted</b> and here is where the body copy starts. Remember to keep this
              nice and succinct.
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
            <Text size="300">
              <b>This first sentence is highlighted</b> and here is where the body copy starts. Remember to keep this
              nice and succinct.
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
            <Text size="300">
              <b>This first sentence is highlighted</b> and here is where the body copy starts. Remember to keep this
              nice and succinct.
            </Text>
            <Link href="#">Call to action</Link>
          </River.Content>
        </River>
      </RiverStoryScroll>
    </Box>
  </Container>
)

export const Default = Template.bind({})
