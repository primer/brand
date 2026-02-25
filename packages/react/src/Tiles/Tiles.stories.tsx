import React from 'react'

import type {Meta, StoryObj} from '@storybook/react'
import {Tiles, type TilesProps} from './Tiles'
import {Section} from '../Section'
import {tileItems} from './Tiles.fixtures'

type StoryProps = Required<Pick<TilesProps, 'variant' | 'layout'>> & {
  itemCount: number
  interactive: boolean
}

const meta = {
  title: 'Components/Tiles',
  component: Tiles,
  args: {
    variant: 'default',
    layout: 'default',
    itemCount: 6,
    interactive: true,
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['default', 'gridlines'],
      table: {
        category: 'Tiles',
      },
    },
    layout: {
      control: 'radio',
      options: ['default', 'compact'],
      table: {
        category: 'Tiles',
      },
    },
    itemCount: {
      control: {
        type: 'number',
        min: 1,
        max: 12,
      },
      table: {
        category: 'Tiles',
      },
    },
    interactive: {
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Tiles.Item',
      },
    },
  },
} satisfies Meta<StoryProps>

export default meta
type Story = StoryObj<StoryProps>

export const Playground: Story = {
  render: ({variant, layout, itemCount, interactive}) => (
    <Section>
      <Tiles variant={variant} layout={layout}>
        {tileItems.slice(0, itemCount).map(item => (
          <Tiles.Item key={item.name} name={item.name} href={interactive ? item.href : undefined}>
            {item.icon}
          </Tiles.Item>
        ))}
      </Tiles>
    </Section>
  ),
}

export const Default: Story = {
  render: () => (
    <Section>
      <Tiles>
        {tileItems.slice(0, 6).map(item => (
          <Tiles.Item key={item.name} name={item.name} href={item.href}>
            {item.icon}
          </Tiles.Item>
        ))}
      </Tiles>
    </Section>
  ),
}
