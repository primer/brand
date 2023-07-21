import React from 'react'
import {Grid, Pillar, PillarIconColors, type GridColumnIndex} from '../..'
import {Icon} from '@primer/octicons-react'

type ContentStackBlockItem = {
  heading: string
  description: string
  icon?: React.ReactNode | Icon
  link?: {
    href: string
    label: string
  }
}

export type ContentStackBlockProps = {
  items: ContentStackBlockItem[]
  accentColor?: (typeof PillarIconColors)[number]
}

export const ContentStackBlock = ({items, accentColor = PillarIconColors[0]}: ContentStackBlockProps) => {
  const count = items.length
  const gridRowGapOverride = `.custom-grid-gap {--brand-Grid-spacing-row: 48px;}`

  return (
    <>
      <style>{gridRowGapOverride}</style>
      <Grid className="custom-grid-gap">
        {items.map(({heading, description, link, icon}, index) => {
          const colSpanLarge = count <= 3 || count % 3 === 0 ? 4 : 3
          const colSpanMedium = count <= 3 || count % 3 === 0 ? 4 : 6
          const colStartLarge = count < 3 ? ((3 + index * colSpanLarge) as GridColumnIndex) : undefined
          const colStartMedium = count < 3 ? ((2 + index * colSpanMedium) as GridColumnIndex) : undefined

          return (
            <Grid.Column
              key={index}
              span={{
                large: colSpanLarge,
                medium: colSpanMedium,
              }}
              start={{
                large: colStartLarge,
                medium: colStartMedium,
              }}
            >
              <Pillar>
                {icon && <Pillar.Icon icon={icon} color={accentColor} />}
                <Pillar.Heading>{heading}</Pillar.Heading>
                <Pillar.Description>{description}</Pillar.Description>
                {link && <Pillar.Link href={link.href}>{link.label}</Pillar.Link>}
              </Pillar>
            </Grid.Column>
          )
        })}
      </Grid>
    </>
  )
}
