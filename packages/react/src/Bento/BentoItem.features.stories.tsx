import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {Bento} from '.'
import {Label, Link} from '../'
import placeholderImage from '../fixtures/images/placeholder.png'
import styles from './Bento.features.stories.module.css'

const meta = {
  title: 'Components/Bento/Item',
  component: Bento,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    Story => (
      <div className={styles['story-background-decorator']}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Bento>

export default meta
type Story = StoryObj<typeof meta>

export const HeadingWithEmphasizedText: Story = {
  render: () => (
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
  ),
}

export const WithLabel: Story = {
  render: () => (
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
  ),
}

export const VisualPositionBottom: Story = {
  render: () => (
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
  ),
}

export const FlowColumn: Story = {
  render: () => (
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
  ),
}

export const FlowColumnVisualFirst: Story = {
  render: () => (
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
  ),
}

export const FlowRowVisualFirst: Story = {
  render: () => (
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
  ),
}

export const ContentPaddingCondensed: Story = {
  render: () => (
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
  ),
}

export const ContentPaddingNormal: Story = {
  render: () => (
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
  ),
}

export const ContentPaddingSpacious: Story = {
  render: () => (
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
  ),
}

export const VisualPaddingCondensed: Story = {
  render: () => (
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
  ),
}

export const VisualPaddingNormal: Story = {
  render: () => (
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
  ),
}

export const VisualPaddingSpacious: Story = {
  render: () => (
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
  ),
}

export const OrderReversed: Story = {
  render: () => (
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
  ),
}

export const VisualAsBackground: Story = {
  render: () => (
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
  ),
}

export const NoVisual: Story = {
  render: () => (
    <Bento>
      <Bento.Item visualAsBackground rowSpan={4}>
        <Bento.Content>
          <Bento.Heading>Heading</Bento.Heading>
          <Link href="#">Call to action</Link>
        </Bento.Content>
      </Bento.Item>
    </Bento>
  ),
}

export const NoContent: Story = {
  render: () => (
    <Bento>
      <Bento.Item visualAsBackground rowSpan={4}>
        <Bento.Visual>
          <img alt="placeholder, blank area with an gray background color" src={placeholderImage} />
        </Bento.Visual>
      </Bento.Item>
    </Bento>
  ),
}

export const DarkModeItem: Story = {
  render: () => (
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
  ),
}

export const ResponsiveFlow: Story = {
  render: () => (
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
  ),
}

export const VerticalAlignStart: Story = {
  render: () => (
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
  ),
}

export const VerticalAlignCenter: Story = {
  render: () => (
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
  ),
}

export const VerticalAlignEnd: Story = {
  render: () => (
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
  ),
}

export const HorizontalAlignStart: Story = {
  render: () => (
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
  ),
}

export const HorizontalAlignCenter: Story = {
  render: () => (
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
  ),
}

export const ResponsiveHorizontalAlign: Story = {
  render: () => (
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
  ),
}

export const ResponsiveVerticalAlign: Story = {
  render: () => (
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
  ),
}
