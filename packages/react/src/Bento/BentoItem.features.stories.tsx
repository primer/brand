import React from 'react'
import {StoryFn, Meta} from '@storybook/react'
import {Bento} from '.'
import {Heading, Text, Link} from '../'
import placeholderImage from '../fixtures/images/placeholder-600x400.png'

export default {
  title: 'Components/Bento/Item',
  component: Bento,
} as Meta<typeof Bento>

export const VisualPositionBottom: StoryFn<typeof Bento> = () => (
  <Bento.Item>
    <Bento.Content>
      <Heading as="h3">Heading</Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual position="50% 100%">
      <img className="test" alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)

export const FlowRowReversed: StoryFn<typeof Bento> = () => (
  <Bento.Item flow="row-reverse">
    <Bento.Content>
      <Heading as="h3">Heading</Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual>
      <img className="test" alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)

export const FlowColumn: StoryFn<typeof Bento> = () => (
  <Bento.Item flow="column">
    <Bento.Content>
      <Heading as="h3">Heading</Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual>
      <img className="test" alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)

export const FlowColumnReversed: StoryFn<typeof Bento> = () => (
  <Bento.Item flow="column-reverse">
    <Bento.Content>
      <Heading as="h3">Heading</Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual>
      <img className="test" alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)

export const PaddingCondensed: StoryFn<typeof Bento> = () => (
  <Bento.Item flow="column-reverse">
    <Bento.Content padding="condensed">
      <Heading as="h3">Heading</Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual padding="condensed">
      <img className="test" alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)

export const PaddingNormal: StoryFn<typeof Bento> = () => (
  <Bento.Item flow="column-reverse">
    <Bento.Content padding="normal">
      <Heading as="h3">Heading</Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual padding="normal">
      <img className="test" alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)

export const PaddingSpacious: StoryFn<typeof Bento> = () => (
  <Bento.Item flow="column-reverse">
    <Bento.Content padding="spacious">
      <Heading as="h3">Heading</Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual padding="spacious">
      <img className="test" alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)
