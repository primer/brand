import React from 'react'
import type {Meta, StoryFn} from '@storybook/react'
import {TextRevealAnimation} from '.'
import {Testimonial, Box, AnimationProvider, Hero} from '../..'

const meta: Meta<typeof TextRevealAnimation> = {
  title: 'Components/TextRevealAnimation/Examples',
  component: TextRevealAnimation,
  decorators: [
    Story => (
      <AnimationProvider>
        <Box animate="fade-in">
          <Story />
        </Box>
      </AnimationProvider>
    ),
  ],
}

export const WithLargeTestimonial: StoryFn = () => (
  <Testimonial size="large" quoteMarkColor="pink">
    <Testimonial.Quote>
      <TextRevealAnimation>
        GitHub helps us ensure that we have our security controls baked into our pipelines all the way from the first
        line of code we&apos;re writing.
      </TextRevealAnimation>
    </Testimonial.Quote>
    <Testimonial.Name position="Staff Software Engineer">David Ross</Testimonial.Name>
  </Testimonial>
)

export const WithHero: StoryFn = () => (
  <Hero>
    <Hero.Label>Label</Hero.Label>
    <Hero.Heading>
      <TextRevealAnimation>This is my super sweet hero heading</TextRevealAnimation>
    </Hero.Heading>
    <Hero.Description>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
      felis nam pulvinar risus elementum.
    </Hero.Description>
    <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
  </Hero>
)

export default meta
