import React from 'react'
import clsx from 'clsx'
import styles from './Hero.module.css'
import {LinkButton} from '../LinkButton'

type Action = {
  text: string
  href: string
}

export type HeroProps = {
  heading: string | React.ReactElement
  description?: string | React.ReactElement
  primaryAction: Action
  secondaryAction?: Action
  align?: 'start' | 'center'
}

export function Hero({heading, description, primaryAction, secondaryAction, align = 'start'}: HeroProps) {
  return (
    <div className={clsx(styles.Hero, styles[`Hero--align-${align}`])}>
      <h1 className={styles['Hero-heading']}>{heading}</h1>
      {description ? <p className={styles['Hero-description']}>{description}</p> : null}
      <div className={styles['Hero-actions']}>
        <LinkButton variant="primary" href={primaryAction.href}>
          {primaryAction.text}
        </LinkButton>
        {secondaryAction ? (
          <LinkButton variant="secondary" href={secondaryAction.href}>
            {secondaryAction.text}
          </LinkButton>
        ) : null}
      </div>
    </div>
  )
}
