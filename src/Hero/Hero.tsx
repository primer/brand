import React from 'react'
import styles from './Hero.module.css'

export type HeroProps = {
  title: string | React.ReactElement
  description: string | React.ReactElement
  align: 'start' | 'center' | 'end'
}

export function Hero({title, description, align = 'start'}: HeroProps) {
  return (
    <div
      className={styles.container}
      style={{
        /** @ts-ignore FIXME */
        '--hero-align': align
      }}
    >
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
    </div>
  )
}
