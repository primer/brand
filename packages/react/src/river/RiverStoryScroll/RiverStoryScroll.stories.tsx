import React from 'react'
import {StoryFn, Meta} from '@storybook/react'

import {RiverStoryScroll} from '.'
import {Text, Link, River, Box} from '../..'
import {Container} from '../../component-helpers'

import placeholder1 from '../../fixtures/images/placeholder-1.png'
import placeholder2 from '../../fixtures/images/placeholder-2.png'
import placeholder3 from '../../fixtures/images/placeholder-3.png'

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
              src={placeholder1}
              alt="placeholder, blank area with an orange background color and a white number 1 in the center"
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
              src={placeholder2}
              alt="placeholder, blank area with a purple background color and a white number 2 in the center"
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
              src={placeholder3}
              alt="placeholder, blank area with a turquoise background color and a white number 3 in the center"
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
