import React, {type Ref, useContext} from 'react'
import clsx from 'clsx'
import {CheckIcon, DashIcon} from '@primer/octicons-react'
import type {BaseProps} from '../component-helpers'
import {ListContext} from './UnorderedList'

import styles from './List.module.css'

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

export const ListItem = ({className, children, ...props}: ListItemProps) => {
  const {variant} = useContext(ListContext)

  const startingIcon = () => {
    switch (variant) {
      case 'checked':
        return <CheckIcon className={styles.StartingContent} />
      case 'default':
        return <DashIcon className={styles.StartingContent} />

      default:
        return <></>
    }
  }
  return (
    <li className={clsx(styles.ListItem, className)} {...props}>
      {startingIcon()}
      {children}
    </li>
  )
}
