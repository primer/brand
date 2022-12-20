import React, {PropsWithChildren} from 'react'
import clsx from 'clsx'
import type {BaseProps} from '../component-helpers'
import {ListItem} from './ListItem'
import {ListContext} from './listContext'

import styles from './List.module.css'

export type UnorderedListProps = PropsWithChildren<BaseProps<HTMLUListElement>> & {
  /**
   * The semantic structure of list that is presented visually setting 'ol' vs 'ul' based on the style the style of the list.
   */
  variant?: 'default' | 'checked'
}

function Root({variant = 'default', children, ...props}: UnorderedListProps) {
  return (
    <ul className={clsx(styles.List, props.className)} {...props}>
      <ListContext.Provider value={{variant}}>{children}</ListContext.Provider>
    </ul>
  )
}

export const UnorderedList = Object.assign(Root, {Item: ListItem})
