import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'

import {River} from '.'
import {Heading, Text, Link} from '..'
import {Container} from '../component-helpers'

export default {
  title: 'Components/River',
  component: River
} as ComponentMeta<typeof River>

const PlaceholderImage = () => (
  <img
    src="https://via.placeholder.com/600x400/f5f5f5/f5f5f5.png"
    alt="placeholder, blank area with an off-white background color"
  />
)

const Template: ComponentStory<typeof River> = args => (
  <Container>
    <River {...args}>
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
  </Container>
)

export const Default = Template.bind({})

export const LargerPlaceholderImage: ComponentStory<typeof River> = args => (
  <Container>
    <River {...args} imageTextRatio="60:40">
      <River.Visual>
        <PlaceholderImage />
      </River.Visual>
      <River.Content>
        <Heading as="h3">Heading</Heading>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </Text>
        <Link href="#">Call to action</Link>
      </River.Content>
    </River>
  </Container>
)

export const Copilot: ComponentStory<typeof River> = args => (
  <Container>
    <River align="center">
      <River.Visual>
        <PlaceholderImage />
      </River.Visual>
      <River.Content>
        <Heading as="h1">Your AI pair programmer</Heading>
        <Text variant="default">
          With GitHub Copilot, get suggestions for whole lines or entire functions right inside your editor.
        </Text>
      </River.Content>
    </River>
    <River align="left" imageTextRatio={args.imageTextRatio}>
      <River.Visual>
        <PlaceholderImage />
      </River.Visual>
      <River.Content>
        <Text variant="default">
          <strong> Convert comments to code.</strong> Write a comment describing the logic you want, and let GitHub
          Copilot assemble the code for you.
        </Text>
      </River.Content>
    </River>
    <River align="right" imageTextRatio={args.imageTextRatio}>
      <River.Visual>
        <PlaceholderImage />
      </River.Visual>
      <River.Content>
        <Text variant="default">
          <strong>Autofill for repetitive code.</strong> GitHub Copilot works great for quickly producing boilerplate
          and repetitive code patterns. Feed it a few examples and let it generate the rest!
        </Text>
      </River.Content>
    </River>
  </Container>
)
