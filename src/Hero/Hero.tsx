import clsx from 'clsx'
import React from 'react'
import styles from './Hero.module.css'

export type HeroProps = {
  heading: string | React.ReactElement
  description: string | React.ReactElement
  align: 'start' | 'center'
}

export function Hero({heading, description, align = 'start'}: HeroProps) {
  return (
    /* FIXME: `styles` is not type-safe */
    <div className={clsx(styles.container, styles[`align-${align}`])}>
      <h1 className={styles.heading}>{heading}</h1>
      <p className={styles.description}>{description}</p>
    </div>
  )
}
