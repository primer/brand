import React from 'react'
import {Grid, Card, type GridColumnIndex} from '../../..'

type HeaderActionsBlockItem = {
  heading: string
  description: string
  cta: {
    href: string
    label: string
  }
}

export type HeaderActionsBlockProps = {
  items: {
    item1: HeaderActionsBlockItem
    item2: HeaderActionsBlockItem
    item3: HeaderActionsBlockItem
  }
}

export const HeaderActionsBlock = ({items}: HeaderActionsBlockProps) => {
  return (
    <Grid>
      {Object.values(items).map(({heading, description, cta}, index) => (
        <Grid.Column
          key={index}
          span={{
            large: 4,
            medium: 6,
          }}
          start={{
            medium: index === 2 ? (4 as GridColumnIndex) : undefined,
          }}
        >
          <Card href={cta.href} ctaText={cta.label}>
            <Card.Heading>{heading}</Card.Heading>
            <Card.Description>{description}</Card.Description>
          </Card>
        </Grid.Column>
      ))}
    </Grid>
  )
}
