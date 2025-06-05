import React, {type Ref, useContext} from 'react'
import clsx from 'clsx'
import {CheckIcon, DashIcon, Icon, IconProps, XIcon} from '@primer/octicons-react'
import {Text, TextProps} from '../../Text'
import type {BaseProps} from '../../component-helpers'
import {ListContext} from '../listContext'

import styles from './ListItem.module.css'

export type ListItemProps = BaseProps<HTMLElement> & {
  /**
   * React.ReactNode and React.ReactNode[] are valid children.
   */
  children?: React.ReactNode | React.ReactNode[]
  /**
   * The ref object to be attached to the list item.
   */
  ref?: Ref<HTMLLIElement>
  /*
   * Custom icon to be used as leading visual
   */
  leadingVisual?: Icon
  /*
   * Color of leading icon
   */
  leadingVisualFill?: IconProps['fill']
  /*
   * Aria label for the leading visual
   */
  leadingVisualAriaLabel?: string
} & Pick<TextProps, 'variant'>

function Root({
  className,
  children,
  leadingVisualFill,
  leadingVisual: LeadingVisual,
  leadingVisualAriaLabel,
  variant: textVariant = 'default',
  ...props
}: ListItemProps) {
  const {variant} = useContext(ListContext)

  const _leadingVisual = () => {
    const iconProps = {
      fill: leadingVisualFill,
      'aria-label': leadingVisualAriaLabel,
      ...(leadingVisualFill && {style: {fill: leadingVisualFill}}),
    }

    if (LeadingVisual) {
      return (
        <LeadingVisual
          className={clsx(
            styles['ListItem__leading-visual'],
            !leadingVisualFill && styles['ListItem__leading-visual--muted'],
          )}
          {...iconProps}
        />
      )
    }

    switch (variant) {
      case 'checked':
        return (
          <CheckIcon
            className={clsx(
              styles['ListItem__leading-visual'],
              styles['ListItem__checked'],
              !leadingVisualFill && styles['ListItem__leading-visual--muted'],
            )}
            {...iconProps}
          />
        )
      case 'x':
        return (
          <XIcon
            className={clsx(
              styles['ListItem__leading-visual'],
              styles['ListItem__x'],
              !leadingVisualFill && styles['ListItem__leading-visual--muted'],
            )}
            {...iconProps}
          />
        )
      case 'default':
        return (
          <DashIcon
            className={clsx(
              styles['ListItem__leading-visual'],
              styles['ListItem__default'],
              !leadingVisualFill && styles['ListItem__leading-visual--muted'],
            )}
            {...iconProps}
          />
        )

      default:
        return null
    }
  }

  return (
    <li className={clsx(styles.ListItem, !variant && styles.OrderedList__item, className)} {...props}>
      {_leadingVisual()}
      <Text as="span" variant={textVariant} className={clsx(styles[`ListItem--${textVariant}`])}>
        {children}
      </Text>
    </li>
  )
}

export const ListItem = Object.assign(Root)
