import React from 'react'
import type {Meta} from '@storybook/react'
import {Tiles} from './Tiles'
import {Section} from '../Section'
import {tileItems} from './Tiles.fixtures'

export default {
  title: 'Components/Tiles/Features',
  component: Tiles,
} as Meta<typeof Tiles>

export const DefaultVariant = () => (
  <Section>
    <Tiles>
      {tileItems.slice(0, 6).map(item => (
        <Tiles.Item key={item.name} name={item.name} href={item.href}>
          {item.icon}
        </Tiles.Item>
      ))}
    </Tiles>
  </Section>
)

export const GridlinesVariant = () => (
  <Section>
    <Tiles variant="gridlines">
      {tileItems.slice(0, 6).map(item => (
        <Tiles.Item key={item.name} name={item.name} href={item.href}>
          {item.icon}
        </Tiles.Item>
      ))}
    </Tiles>
  </Section>
)

export const CompactLayout = () => (
  <Section>
    <Tiles variant="gridlines" layout="compact">
      {tileItems.map((item, index) => (
        <Tiles.Item key={`${item.name}-${index}`} name={item.name} href={item.href}>
          {item.icon}
        </Tiles.Item>
      ))}
    </Tiles>
  </Section>
)

export const StaticItems = () => (
  <Section>
    <Tiles variant="gridlines">
      {tileItems.slice(0, 6).map(item => (
        <Tiles.Item key={item.name} name={item.name}>
          {item.icon}
        </Tiles.Item>
      ))}
    </Tiles>
  </Section>
)

export const MultipleRows = () => (
  <Section>
    <Tiles variant="gridlines">
      {tileItems.map((item, index) => (
        <Tiles.Item key={`${item.name}-${index}`} name={item.name} href={item.href}>
          {item.icon}
        </Tiles.Item>
      ))}
    </Tiles>
  </Section>
)
