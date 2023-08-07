import React, {PropsWithChildren} from 'react'
import clsx from 'clsx'
import styles from './Timeline.module.css'
import {BaseProps} from '../component-helpers'
import {useAnimation} from '../animation'

export type TimelineProps = BaseProps<HTMLUListElement>

const _TimelineRoot = ({animate, className, children, ...rest}: PropsWithChildren<TimelineProps>) => {
  const {classes: animationClasses, styles: animationInlineStyles} = useAnimation(animate)

  const timelineClassName = clsx(animationClasses, styles.Timeline, className)

  return (
    // TODO add ...stye
    <ul className={timelineClassName} style={{...animationInlineStyles}} {...rest}>
      {children}
    </ul>
  )
}

export type TimelineItemProps = BaseProps<HTMLLIElement>

const Item = ({className, children, ...rest}: PropsWithChildren<TimelineItemProps>) => {
  const itemClassName = clsx(styles['Timeline-item'], className)

  return (
    <li className={itemClassName} {...rest}>
      {children}
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
