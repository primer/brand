import React, {forwardRef} from 'react'
import clsx from 'clsx'
import styles from './Hero.module.css'
import {Button} from '../Button'
import {Heading} from '../Heading'
import {Text} from '../Text'

import type {BaseProps} from '../component-helpers'
import '../../lib/design-tokens/css/tokens/functional/components/hero/base.css'

type Action = {
  text: string
  href: string
}

export type HeroProps = BaseProps<HTMLDivElement> & {
  heading: string | React.ReactElement
  description?: string | React.ReactElement
  primaryAction: Action
  secondaryAction?: Action
  align?: 'start' | 'center'
}

export const Hero = forwardRef<HTMLDivElement, HeroProps>(
  ({className, heading, description, primaryAction, secondaryAction, align = 'start', ...rest}, ref) => {
    return (
      <div className={clsx(styles.Hero, styles[`Hero--align-${align}`], className)} ref={ref} {...rest}>
        <Heading className={styles['Hero-heading']} as="h1">
          {heading}
        </Heading>
        {description ? (
          <Text className={styles['Hero-description']} as="p" size="400" variant="muted">
            {description}
          </Text>
        ) : null}
        <div className={styles['Hero-actions']}>
          <Button as="a" variant="primary" href={primaryAction.href}>
            {primaryAction.text}
          </Button>
          {secondaryAction ? (
            <Button as="a" variant="secondary" href={secondaryAction.href}>
              {secondaryAction.text}
            </Button>
          ) : null}
        </div>
      </div>
    )
  }
)
