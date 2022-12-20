import React, {type Ref} from 'react'
import clsx from 'clsx'
import type {BaseProps} from '../component-helpers'
import {ListContext} from './UnorderedList'

import styles from './List.module.css'

export type OrderedListProps = BaseProps<HTMLElement> & {
  /**
   * React.ReactNode and React.ReactNode[] are valid children.
   */
  children?: React.ReactNode | React.ReactNode[]
  /**
   * Ref object to be attached to the list.
   */
  ref?: Ref<HTMLOListElement>
}

export function OrderedList({children, ...props}: OrderedListProps) {
  return (
    <ol className={clsx(styles.List, props.className)} {...props}>
      <ListContext.Provider value={{variant: ''}}>{children}</ListContext.Provider>
    </ol>
  )
}
