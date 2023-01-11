import React, {type Ref, useContext} from 'react'
import clsx from 'clsx'
import {CheckIcon, DashIcon} from '@primer/octicons-react'
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
}

function Root({className, children, ...props}: ListItemProps) {
  const {variant} = useContext(ListContext)

  const leadingVisual = () => {
    switch (variant) {
      case 'checked':
        return <CheckIcon className={clsx(styles['ListItem__leading-visual'], styles['ListItem__checked'])} />
      case 'default':
        return <DashIcon className={clsx(styles['ListItem__leading-visual'], styles['ListItem__default'])} />

      default:
        return null
    }
  }
  return (
    <li className={clsx(styles.ListItem, !variant && styles.OrderedList__item, className)} {...props}>
      {leadingVisual()}
      {children}
    </li>
  )
}

export const ListItem = Object.assign(Root)
