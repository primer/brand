import React, {createContext} from 'react'
import clsx from 'clsx'
import type {BaseProps} from '../component-helpers'

import styles from './List.module.css'

export const ListContext = createContext({
  variant: 'default'
})

// TODO: Convert to two components, one for ol and one for ul.

// NOTE: I would like to use a list interface here but I can't find one that encompasses both ul and ol.
// QUESTION: Should children be optional? I could see a case for an empty list. But best practice would be to remove it if it is empty for a while. I think leaving it would be a safer bet for any use case.
export type UnorderedListProps = BaseProps<HTMLElement> & {
  /**
   * The semantic structure of list that is presented visually setting 'ol' vs 'ul' based on the style the style of the list.
   */
  variant?: 'default' | 'checked'
  /**
   * React.ReactNode and React.ReactNode[] are valid children.
   */
  children?: React.ReactNode | React.ReactNode[]
}

export function UnorderedList({variant = 'default', children, ...props}: UnorderedListProps) {
  return (
    <ul className={clsx(styles.List, props.className)}>
      <ListContext.Provider value={{variant}}>{children}</ListContext.Provider>
    </ul>
  )
}
