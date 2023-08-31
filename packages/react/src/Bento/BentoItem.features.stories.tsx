import React from 'react'
import {StoryFn, Meta} from '@storybook/react'
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'
import {Bento} from '.'
import {Text, Link, ColorModesEnum} from '../'
import placeholderImage from '../fixtures/images/placeholder-600x400.png'

export default {
  title: 'Components/Bento/Item',
  component: Bento,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
} as Meta<typeof Bento>

export const HeadingWithEmphasizedText: StoryFn<typeof Bento> = () => (
  <Bento.Item>
    <Bento.Content>
      <Bento.Heading>
        <em>Heading</em> with emphasis
      </Bento.Heading>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual position="50% 100%">
      <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)

HeadingWithEmphasizedText.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}

export const VisualPositionBottom: StoryFn<typeof Bento> = () => (
  <Bento.Item>
    <Bento.Content>
      <Bento.Heading>Heading</Bento.Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual position="50% 100%">
      <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)

VisualPositionBottom.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}

export const FlowColumn: StoryFn<typeof Bento> = () => (
  <Bento.Item flow="column">
    <Bento.Content>
      <Bento.Heading>Heading</Bento.Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual>
      <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)

FlowColumn.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}

export const FlowColumnVisualFirst: StoryFn<typeof Bento> = () => (
  <Bento.Item flow="column">
    <Bento.Visual>
      <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
    <Bento.Content>
      <Bento.Heading>Heading</Bento.Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
  </Bento.Item>
)

FlowColumnVisualFirst.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}

export const FlowRowVisualFirst: StoryFn<typeof Bento> = () => (
  <Bento.Item flow="row">
    <Bento.Visual>
      <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
    <Bento.Content>
      <Bento.Heading>Heading</Bento.Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
  </Bento.Item>
)

FlowRowVisualFirst.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}

export const ContentPaddingCondensed: StoryFn<typeof Bento> = () => (
  <Bento.Item>
    <Bento.Content padding="condensed">
      <Bento.Heading>Heading</Bento.Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual>
      <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)

ContentPaddingCondensed.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}

export const ContentPaddingNormal: StoryFn<typeof Bento> = () => (
  <Bento.Item>
    <Bento.Content padding="normal">
      <Bento.Heading>Heading</Bento.Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual>
      <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)

ContentPaddingNormal.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}

export const ContentPaddingSpacious: StoryFn<typeof Bento> = () => (
  <Bento.Item>
    <Bento.Content padding="spacious">
      <Bento.Heading>Heading</Bento.Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual>
      <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)

ContentPaddingSpacious.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}

export const VisualPaddingCondensed: StoryFn<typeof Bento> = () => (
  <Bento.Item>
    <Bento.Content>
      <Bento.Heading>Heading</Bento.Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual padding="condensed">
      <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)

VisualPaddingCondensed.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}

export const VisualPaddingNormal: StoryFn<typeof Bento> = () => (
  <Bento.Item>
    <Bento.Content>
      <Bento.Heading>Heading</Bento.Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual padding="normal">
      <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)

VisualPaddingNormal.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}

export const VisualPaddingSpacious: StoryFn<typeof Bento> = () => (
  <Bento.Item>
    <Bento.Content>
      <Bento.Heading>Heading</Bento.Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual padding="spacious">
      <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)

VisualPaddingSpacious.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}

export const OrderReversed: StoryFn<typeof Bento> = () => (
  <Bento.Item order="reversed">
    <Bento.Content>
      <Bento.Heading>Heading</Bento.Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual>
      <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)

OrderReversed.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}

export const VisualAsBackground: StoryFn<typeof Bento> = () => (
  <Bento.Item visualAsBackground>
    <Bento.Content fixedBottomLink>
      <Bento.Heading>Heading</Bento.Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual>
      <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)

VisualAsBackground.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}

export const DarkModeItem: StoryFn<typeof Bento> = () => (
  <Bento.Item colorMode={ColorModesEnum.DARK}>
    <Bento.Content>
      <Bento.Heading>Heading</Bento.Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual>
      <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)

DarkModeItem.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}

export const ResponsiveFlow: StoryFn<typeof Bento> = () => (
  <Bento.Item
    flow={{
      xsmall: 'row',
      small: 'row',
      medium: 'column',
      large: 'column',
      xlarge: 'column',
      xxlarge: 'column',
    }}
  >
    <Bento.Content padding="normal">
      <Bento.Heading>Heading</Bento.Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual>
      <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)

export const VerticalAlignStart: StoryFn<typeof Bento> = () => (
  <Bento.Item flow="column">
    <Bento.Content padding="normal" verticalAlign="start">
      <Bento.Heading>Heading</Bento.Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual>
      <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)

export const VerticalAlignCenter: StoryFn<typeof Bento> = () => (
  <Bento.Item flow="column">
    <Bento.Content padding="normal" verticalAlign="center">
      <Bento.Heading>Heading</Bento.Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual>
      <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)

export const VerticalAlignEnd: StoryFn<typeof Bento> = () => (
  <Bento.Item flow="column">
    <Bento.Content padding="normal" verticalAlign="end" fixedBottomLink>
      <Bento.Heading>Heading</Bento.Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual>
      <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)

export const HorizontalAlignStart: StoryFn<typeof Bento> = () => (
  <Bento.Item flow="column">
    <Bento.Content padding="normal" horizontalAlign="start">
      <Bento.Heading>Heading</Bento.Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual>
      <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)

export const HorizontalAlignCenter: StoryFn<typeof Bento> = () => (
  <Bento.Item flow="column">
    <Bento.Content padding="normal" horizontalAlign="center">
      <Bento.Heading>Heading</Bento.Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual>
      <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)

export const ResponsiveHorizontalAlign: StoryFn<typeof Bento> = () => (
  <Bento.Item flow="column">
    <Bento.Content
      padding="normal"
      horizontalAlign={{
        xsmall: 'start',
        small: 'start',
        medium: 'center',
        large: 'center',
        xlarge: 'center',
        xxlarge: 'center',
      }}
    >
      <Bento.Heading>Heading</Bento.Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual>
      <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)

export const ResponsiveVerticalAlign: StoryFn<typeof Bento> = () => (
  <Bento.Item flow="column">
    <Bento.Content
      padding="normal"
      verticalAlign={{
        xsmall: 'start',
        small: 'start',
        medium: 'center',
        large: 'center',
        xlarge: 'center',
        xxlarge: 'center',
      }}
    >
      <Bento.Heading>Heading</Bento.Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </Bento.Content>
    <Bento.Visual>
      <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
    </Bento.Visual>
  </Bento.Item>
)
