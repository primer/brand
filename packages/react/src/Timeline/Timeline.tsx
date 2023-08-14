import React, {PropsWithChildren, useMemo, useCallback} from 'react'
import clsx from 'clsx'
import styles from './Timeline.module.css'
import {BaseProps} from '../component-helpers'
import {useAnimation} from '../animation'
import {Text} from '../Text'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/timeline/colors-with-modes.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/timeline/base.css'

export type TimelineProps = BaseProps<HTMLUListElement>

const _TimelineRoot = ({animate, className, children, ...rest}: PropsWithChildren<TimelineProps>) => {
  const {classes: animationClasses, styles: animationInlineStyles} = useAnimation(animate)

  const timelineClassName = clsx(animationClasses, styles.Timeline, className)

  return (
    <ul className={timelineClassName} style={{...animationInlineStyles}} {...rest}>
      {children}
    </ul>
  )
}

export type TimelineItemProps = BaseProps<HTMLLIElement>

const Item = ({className, children, ...rest}: PropsWithChildren<TimelineItemProps>) => {
  const itemClassName = clsx(styles['Timeline__item'], className)
  const childrenArray = useMemo(() => React.Children.toArray(children), [children])

  const getConditionalVariant = useCallback(() => {
    if (childrenArray.some(child => React.isValidElement(child) && child.type === 'em')) {
      return 'muted'
    }
    return 'default'
  }, [childrenArray])

  const defaultColor = childrenArray.length === 1 ? 'default' : getConditionalVariant()

  return (
    <li className={itemClassName} {...rest}>
      <Text size="300" variant={defaultColor}>
        {children}
      </Text>
    </li>
  )
}

/**
 * Use Timeline to display a list of connected items as a vertical timeline.
 * @see https://primer.style/brand/components/Timeline
 */
export const Timeline = Object.assign(_TimelineRoot, {
  Item,
})
