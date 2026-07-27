import {clsx} from 'clsx'
import React, {Children} from 'react'

import {Grid} from '../..'

import styles from './Editorial.module.css'

type EditorialCardGridLayout = 'responsive' | 'threeColumn'

type EditorialCardGridProps = {
  children: React.ReactNode
  layout: EditorialCardGridLayout
}

export function EditorialCardGrid({children, layout}: EditorialCardGridProps) {
  const cards = Children.toArray(children)
  const span =
    layout === 'responsive' ? ({xsmall: 12, medium: 6, large: 4} as const) : ({xsmall: 12, medium: 4} as const)

  return (
    <Grid
      columnGap="none"
      rowGap="none"
      enableGutters={false}
      className={clsx(styles.cardGridCells, styles[`cardGridCells--${layout}`])}
    >
      {cards.map((card, index) => (
        <Grid.Column key={`card-${index}`} span={span} className={styles.cardGridCell}>
          {card}
        </Grid.Column>
      ))}
    </Grid>
  )
}
