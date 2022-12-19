import React from 'react'
import clsx from 'clsx'
import type {BaseProps} from '../component-helpers'
import {ListContext} from './UnorderedList'

import styles from './List.module.css'

export type OrderedListProps = BaseProps<HTMLElement> & {
  /**
   * React.ReactNode and React.ReactNode[] are valid children.
   */
  children?: React.ReactNode | React.ReactNode[]
}

export function OrderedList({children, ...props}: OrderedListProps) {
  return (
    <ol className={clsx(styles.List, props.className)}>
      <ListContext.Provider value={{variant: ''}}>{children}</ListContext.Provider>
    </ol>
  )
}
