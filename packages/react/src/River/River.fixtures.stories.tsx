import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'
import {River} from '.'
import {Heading, Text, Link} from '..'
import {Container} from '../component-helpers'

export default {
  title: 'Components/River/fixtures',
  component: River,
} as ComponentMeta<typeof River>

const PlaceholderImage = () => (
  <img
    src="https://via.placeholder.com/600x400/f5f5f5/f5f5f5.png"
    alt="placeholder, blank area with an off-white background color"
  />
)

export const Left: ComponentStory<typeof River> = () => (
  <River align="start">
    <River.Visual>
      <PlaceholderImage />
    </River.Visual>
    <River.Content>
      <Heading>Heading</Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </River.Content>
  </River>
)

export const Right: ComponentStory<typeof River> = () => (
  <River align="end">
    <River.Visual>
      <PlaceholderImage />
    </River.Visual>
    <River.Content>
      <Heading>Heading</Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </River.Content>
  </River>
)

export const Center: ComponentStory<typeof River> = () => (
  <River align="center">
    <River.Visual>
      <PlaceholderImage />
    </River.Visual>
    <River.Content>
      <Heading>Heading</Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </River.Content>
  </River>
)

export const ColumnRatio6040: ComponentStory<typeof River> = () => (
  <Container>
    <River imageTextRatio="60:40">
      <River.Visual>
        <PlaceholderImage />
      </River.Visual>
      <River.Content>
        <Text>Use the imageTextRatio prop with &quot;60:40&quot; to display a larger image.</Text>
      </River.Content>
    </River>
  </Container>
)

ColumnRatio6040.storyName = '60:40 image ratio'

export const ColumnRatio5050: ComponentStory<typeof River> = () => (
  <Container>
    <River imageTextRatio="50:50">
      <River.Visual>
        <PlaceholderImage />
      </River.Visual>
      <River.Content>
        <Text>By default imageTextRatio is set to &quot;50:50&quot;.</Text>
      </River.Content>
    </River>
  </Container>
)

ColumnRatio5050.storyName = '50:50 image ratio'

export const AlternativeHeadingLevel: ComponentStory<typeof River> = () => (
  <Container>
    <River>
      <River.Visual>
        <PlaceholderImage />
      </River.Visual>
      <River.Content>
        <Heading as="h1">This is a h1</Heading>
        <Text>Use alternative heading levels, while maintaining the default text size.</Text>
      </River.Content>
    </River>
  </Container>
)

export const AlternativeHeadingSize: ComponentStory<typeof River> = () => (
  <Container>
    <River>
      <River.Visual>
        <PlaceholderImage />
      </River.Visual>
      <River.Content>
        <Heading size="1">Heading</Heading>
        <Text>Use alternative heading sizes, while maintaining the default heading level.</Text>
      </River.Content>
    </River>
  </Container>
)

export const AlternatingLayout: ComponentStory<typeof River> = () => (
  <>
    <River align="start">
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
    <River align="end">
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
    <River align="center">
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
  </>
)
