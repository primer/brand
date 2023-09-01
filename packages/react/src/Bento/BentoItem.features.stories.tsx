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
  <Bento>
    <Bento.Item rowSpan={4}>
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
  </Bento>
)

HeadingWithEmphasizedText.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}

export const VisualPositionBottom: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item rowSpan={4}>
      <Bento.Content>
        <Bento.Heading>Heading</Bento.Heading>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </Text>
        <Link href="#">Call to action</Link>
      </Bento.Content>
      <Bento.Visual position="50% 100%">
        <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
      </Bento.Visual>
    </Bento.Item>
  </Bento>
)

VisualPositionBottom.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}

export const FlowColumn: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item flow="column" rowSpan={4}>
      <Bento.Content>
        <Bento.Heading>Heading</Bento.Heading>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </Text>
        <Link href="#">Call to action</Link>
      </Bento.Content>
      <Bento.Visual>
        <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
      </Bento.Visual>
    </Bento.Item>
  </Bento>
)

FlowColumn.parameters = {
  viewport: {
    defaultViewport: 'desktop',
  },
}

export const FlowColumnVisualFirst: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item flow="column" rowSpan={4}>
      <Bento.Visual>
        <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
      </Bento.Visual>
      <Bento.Content>
        <Bento.Heading>Heading</Bento.Heading>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </Text>
        <Link href="#">Call to action</Link>
      </Bento.Content>
    </Bento.Item>
  </Bento>
)

FlowColumnVisualFirst.parameters = {
  viewport: {
    defaultViewport: 'desktop',
  },
}

export const FlowRowVisualFirst: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item flow="row" rowSpan={4}>
      <Bento.Visual>
        <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
      </Bento.Visual>
      <Bento.Content>
        <Bento.Heading>Heading</Bento.Heading>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </Text>
        <Link href="#">Call to action</Link>
      </Bento.Content>
    </Bento.Item>
  </Bento>
)

FlowRowVisualFirst.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}

export const ContentPaddingCondensed: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item rowSpan={4}>
      <Bento.Content padding="condensed">
        <Bento.Heading>Heading</Bento.Heading>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </Text>
        <Link href="#">Call to action</Link>
      </Bento.Content>
      <Bento.Visual>
        <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
      </Bento.Visual>
    </Bento.Item>
  </Bento>
)

ContentPaddingCondensed.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}

export const ContentPaddingNormal: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item rowSpan={4}>
      <Bento.Content padding="normal">
        <Bento.Heading>Heading</Bento.Heading>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </Text>
        <Link href="#">Call to action</Link>
      </Bento.Content>
      <Bento.Visual>
        <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
      </Bento.Visual>
    </Bento.Item>
  </Bento>
)

ContentPaddingNormal.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}

export const ContentPaddingSpacious: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item rowSpan={4}>
      <Bento.Content padding="spacious">
        <Bento.Heading>Heading</Bento.Heading>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </Text>
        <Link href="#">Call to action</Link>
      </Bento.Content>
      <Bento.Visual>
        <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
      </Bento.Visual>
    </Bento.Item>
  </Bento>
)

ContentPaddingSpacious.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}

export const VisualPaddingCondensed: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item rowSpan={4}>
      <Bento.Content>
        <Bento.Heading>Heading</Bento.Heading>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </Text>
        <Link href="#">Call to action</Link>
      </Bento.Content>
      <Bento.Visual padding="condensed">
        <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
      </Bento.Visual>
    </Bento.Item>
  </Bento>
)

VisualPaddingCondensed.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}

export const VisualPaddingNormal: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item rowSpan={4}>
      <Bento.Content>
        <Bento.Heading>Heading</Bento.Heading>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </Text>
        <Link href="#">Call to action</Link>
      </Bento.Content>
      <Bento.Visual padding="normal">
        <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
      </Bento.Visual>
    </Bento.Item>
  </Bento>
)

VisualPaddingNormal.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}

export const VisualPaddingSpacious: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item rowSpan={4}>
      <Bento.Content>
        <Bento.Heading>Heading</Bento.Heading>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </Text>
        <Link href="#">Call to action</Link>
      </Bento.Content>
      <Bento.Visual padding="spacious">
        <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
      </Bento.Visual>
    </Bento.Item>
  </Bento>
)

VisualPaddingSpacious.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}

export const OrderReversed: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item order="reversed" rowSpan={4}>
      <Bento.Content>
        <Bento.Heading>Heading</Bento.Heading>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </Text>
        <Link href="#">Call to action</Link>
      </Bento.Content>
      <Bento.Visual>
        <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
      </Bento.Visual>
    </Bento.Item>
  </Bento>
)

OrderReversed.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}

export const VisualAsBackground: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item visualAsBackground rowSpan={4}>
      <Bento.Content>
        <Bento.Heading>Heading</Bento.Heading>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </Text>
        <Link href="#">Call to action</Link>
      </Bento.Content>
      <Bento.Visual>
        <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
      </Bento.Visual>
    </Bento.Item>
  </Bento>
)

VisualAsBackground.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}

export const DarkModeItem: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item colorMode={ColorModesEnum.DARK} rowSpan={4}>
      <Bento.Content>
        <Bento.Heading>Heading</Bento.Heading>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </Text>
        <Link href="#">Call to action</Link>
      </Bento.Content>
      <Bento.Visual>
        <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
      </Bento.Visual>
    </Bento.Item>
  </Bento>
)

DarkModeItem.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}

export const ResponsiveFlow: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item
      flow={{
        xsmall: 'row',
        small: 'row',
        medium: 'column',
        large: 'column',
        xlarge: 'column',
        xxlarge: 'column',
      }}
      rowSpan={4}
    >
      <Bento.Content padding="normal">
        <Bento.Heading>Heading</Bento.Heading>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </Text>
        <Link href="#">Call to action</Link>
      </Bento.Content>
      <Bento.Visual>
        <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
      </Bento.Visual>
    </Bento.Item>
  </Bento>
)

export const VerticalAlignStart: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item flow="column" rowSpan={4}>
      <Bento.Content padding="normal" verticalAlign="start">
        <Bento.Heading>Heading</Bento.Heading>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </Text>
        <Link href="#">Call to action</Link>
      </Bento.Content>
      <Bento.Visual>
        <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
      </Bento.Visual>
    </Bento.Item>
  </Bento>
)

export const VerticalAlignCenter: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item flow="column" rowSpan={4}>
      <Bento.Content padding="normal" verticalAlign="center">
        <Bento.Heading>Heading</Bento.Heading>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </Text>
        <Link href="#">Call to action</Link>
      </Bento.Content>
      <Bento.Visual>
        <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
      </Bento.Visual>
    </Bento.Item>
  </Bento>
)

export const VerticalAlignEnd: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item flow="column" rowSpan={4}>
      <Bento.Content padding="normal" verticalAlign="end">
        <Bento.Heading>Heading</Bento.Heading>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </Text>
        <Link href="#">Call to action</Link>
      </Bento.Content>
      <Bento.Visual>
        <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
      </Bento.Visual>
    </Bento.Item>
  </Bento>
)

export const HorizontalAlignStart: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item flow="column" rowSpan={4}>
      <Bento.Content padding="normal" horizontalAlign="start">
        <Bento.Heading>Heading</Bento.Heading>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </Text>
        <Link href="#">Call to action</Link>
      </Bento.Content>
      <Bento.Visual>
        <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
      </Bento.Visual>
    </Bento.Item>
  </Bento>
)

export const HorizontalAlignCenter: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item flow="column" rowSpan={4}>
      <Bento.Content padding="normal" horizontalAlign="center">
        <Bento.Heading>Heading</Bento.Heading>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </Text>
        <Link href="#">Call to action</Link>
      </Bento.Content>
      <Bento.Visual>
        <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
      </Bento.Visual>
    </Bento.Item>
  </Bento>
)

export const ResponsiveHorizontalAlign: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item flow="column" rowSpan={4}>
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </Text>
        <Link href="#">Call to action</Link>
      </Bento.Content>
      <Bento.Visual>
        <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
      </Bento.Visual>
    </Bento.Item>
  </Bento>
)

export const ResponsiveVerticalAlign: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item flow="column" rowSpan={4}>
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </Text>
        <Link href="#">Call to action</Link>
      </Bento.Content>
      <Bento.Visual>
        <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
      </Bento.Visual>
    </Bento.Item>
  </Bento>
)
