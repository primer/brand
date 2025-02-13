import React from 'react'
import {StoryFn, Meta} from '@storybook/react'
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'
import {Bento} from '.'
import {Label, Link} from '../'
import placeholderImage from '../fixtures/images/placeholder.png'
import styles from './Bento.features.stories.module.css'

export default {
  title: 'Components/Bento/Item',
  component: Bento,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
  decorators: [
    Story => (
      <div className={styles['story-background-decorator']}>
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Bento>

export const HeadingWithEmphasizedText: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item rowSpan={5} flow="column">
      <Bento.Content>
        <Bento.Heading size="3">
          <b>This is my super-sweet</b> bento heading
        </Bento.Heading>
        <Link href="#">Call to action</Link>
      </Bento.Content>
      <Bento.Visual position="50% 100%">
        <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
      </Bento.Visual>
    </Bento.Item>
  </Bento>
)

export const WithLabel: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item rowSpan={5} flow="column">
      <Bento.Content>
        <Label color="red">Label</Label>
        <Bento.Heading size="3">
          <b>This is my super-sweet</b> bento heading
        </Bento.Heading>
        <Link href="#">Call to action</Link>
      </Bento.Content>
      <Bento.Visual position="50% 100%">
        <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
      </Bento.Visual>
    </Bento.Item>
  </Bento>
)

export const VisualPositionBottom: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item rowSpan={4}>
      <Bento.Content>
        <Bento.Heading>Heading</Bento.Heading>
        <Link href="#">Call to action</Link>
      </Bento.Content>
      <Bento.Visual position="50% 100%">
        <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
      </Bento.Visual>
    </Bento.Item>
  </Bento>
)

export const FlowColumn: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item flow="column" rowSpan={4}>
      <Bento.Content>
        <Bento.Heading>Heading</Bento.Heading>
        <Link href="#">Call to action</Link>
      </Bento.Content>
      <Bento.Visual>
        <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
      </Bento.Visual>
    </Bento.Item>
  </Bento>
)

export const FlowColumnVisualFirst: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item flow="column" rowSpan={4}>
      <Bento.Visual>
        <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
      </Bento.Visual>
      <Bento.Content>
        <Bento.Heading>Heading</Bento.Heading>
        <Link href="#">Call to action</Link>
      </Bento.Content>
    </Bento.Item>
  </Bento>
)

export const FlowRowVisualFirst: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item flow="row" rowSpan={6}>
      <Bento.Visual>
        <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
      </Bento.Visual>
      <Bento.Content>
        <Bento.Heading>Heading</Bento.Heading>
        <Link href="#">Call to action</Link>
      </Bento.Content>
    </Bento.Item>
  </Bento>
)

export const ContentPaddingCondensed: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item rowSpan={4}>
      <Bento.Content padding="condensed">
        <Bento.Heading>Heading</Bento.Heading>
        <Link href="#">Call to action</Link>
      </Bento.Content>
      <Bento.Visual>
        <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
      </Bento.Visual>
    </Bento.Item>
  </Bento>
)

export const ContentPaddingNormal: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item rowSpan={4}>
      <Bento.Content padding="normal">
        <Bento.Heading>Heading</Bento.Heading>
        <Link href="#">Call to action</Link>
      </Bento.Content>
      <Bento.Visual>
        <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
      </Bento.Visual>
    </Bento.Item>
  </Bento>
)

export const ContentPaddingSpacious: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item rowSpan={4}>
      <Bento.Content padding="spacious">
        <Bento.Heading>Heading</Bento.Heading>
        <Link href="#">Call to action</Link>
      </Bento.Content>
      <Bento.Visual>
        <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
      </Bento.Visual>
    </Bento.Item>
  </Bento>
)

export const VisualPaddingCondensed: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item rowSpan={4}>
      <Bento.Content>
        <Bento.Heading>Heading</Bento.Heading>
        <Link href="#">Call to action</Link>
      </Bento.Content>
      <Bento.Visual padding="condensed">
        <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
      </Bento.Visual>
    </Bento.Item>
  </Bento>
)

export const VisualPaddingNormal: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item rowSpan={4}>
      <Bento.Content>
        <Bento.Heading>Heading</Bento.Heading>
        <Link href="#">Call to action</Link>
      </Bento.Content>
      <Bento.Visual padding="normal">
        <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
      </Bento.Visual>
    </Bento.Item>
  </Bento>
)

export const VisualPaddingSpacious: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item rowSpan={4}>
      <Bento.Content>
        <Bento.Heading>Heading</Bento.Heading>
        <Link href="#">Call to action</Link>
      </Bento.Content>
      <Bento.Visual padding="spacious">
        <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
      </Bento.Visual>
    </Bento.Item>
  </Bento>
)

export const OrderReversed: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item order="reversed" rowSpan={6}>
      <Bento.Content>
        <Bento.Heading>Heading</Bento.Heading>
        <Link href="#">Call to action</Link>
      </Bento.Content>
      <Bento.Visual>
        <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
      </Bento.Visual>
    </Bento.Item>
  </Bento>
)

export const VisualAsBackground: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item visualAsBackground rowSpan={4}>
      <Bento.Content>
        <Bento.Heading>Heading</Bento.Heading>
        <Link href="#">Call to action</Link>
      </Bento.Content>
      <Bento.Visual>
        <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
      </Bento.Visual>
    </Bento.Item>
  </Bento>
)

export const NoVisual: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item visualAsBackground rowSpan={4}>
      <Bento.Content>
        <Bento.Heading>Heading</Bento.Heading>
        <Link href="#">Call to action</Link>
      </Bento.Content>
    </Bento.Item>
  </Bento>
)

export const NoContent: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item visualAsBackground rowSpan={4}>
      <Bento.Visual>
        <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
      </Bento.Visual>
    </Bento.Item>
  </Bento>
)

export const DarkModeItem: StoryFn<typeof Bento> = () => (
  <Bento>
    <Bento.Item colorMode="dark" rowSpan={4}>
      <Bento.Content>
        <Bento.Heading>Heading</Bento.Heading>
        <Link href="#">Call to action</Link>
      </Bento.Content>
      <Bento.Visual>
        <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
      </Bento.Visual>
    </Bento.Item>
  </Bento>
)

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
      <Bento.Content>
        <Bento.Heading>Heading</Bento.Heading>
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
      <Bento.Content verticalAlign="start">
        <Bento.Heading>Heading</Bento.Heading>
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
      <Bento.Content verticalAlign="center">
        <Bento.Heading>Heading</Bento.Heading>
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
      <Bento.Content verticalAlign="end">
        <Bento.Heading>Heading</Bento.Heading>
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
      <Bento.Content horizontalAlign="start">
        <Bento.Heading>Heading</Bento.Heading>
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
        <Link href="#">Call to action</Link>
      </Bento.Content>
      <Bento.Visual>
        <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
      </Bento.Visual>
    </Bento.Item>
  </Bento>
)
