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

export const FlowColumnVisualFirst: StoryFn<typeof Bento> = () => (
  <Bento.Item flow="column">
    <Bento.Visual>
      <img className="test" alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
    <Bento.Content>
      <Heading as="h3">Heading</Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
  </Bento.Item>
)

export const FlowRowVisualFirst: StoryFn<typeof Bento> = () => (
  <Bento.Item flow="row">
    <Bento.Visual>
      <img className="test" alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
    <Bento.Content>
      <Heading as="h3">Heading</Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
  </Bento.Item>
)

export const HeadingPaddingCondensed: StoryFn<typeof Bento> = () => (
  <Bento.Item>
    <Bento.Content padding="condensed">
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

export const HeadingPaddingNormal: StoryFn<typeof Bento> = () => (
  <Bento.Item>
    <Bento.Content padding="normal">
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

export const HeadingPaddingSpacious: StoryFn<typeof Bento> = () => (
  <Bento.Item>
    <Bento.Content padding="spacious">
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

export const VisualPaddingCondensed: StoryFn<typeof Bento> = () => (
  <Bento.Item>
    <Bento.Content>
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

export const VisualPaddingNormal: StoryFn<typeof Bento> = () => (
  <Bento.Item>
    <Bento.Content>
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

export const VisualPaddingSpacious: StoryFn<typeof Bento> = () => (
  <Bento.Item>
    <Bento.Content>
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

export const VerticalAlignStart: StoryFn<typeof Bento> = () => (
  <Bento.Item verticalAlign="start">
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

export const VerticalAlignEnd: StoryFn<typeof Bento> = () => (
  <Bento.Item verticalAlign="end">
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

// TODO: This isn't working as expected yet
export const HorizontalAlignStart: StoryFn<typeof Bento> = () => (
  <Bento.Item horizontalAlign="start">
    <Bento.Content>
      <Heading as="h3">Heading</Heading>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual>
      <img className="test" alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)

export const HorizontalAlignEnd: StoryFn<typeof Bento> = () => (
  <Bento.Item horizontalAlign="end">
    <Bento.Content>
      <Heading as="h3">Heading</Heading>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual>
      <img className="test" alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)
