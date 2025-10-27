import React, {PropsWithChildren} from 'react'
import {clsx} from 'clsx'
import type {BaseProps} from '../../component-helpers'
import {ListContext} from '../listContext'
import {ListItem} from '../ListItem/ListItem'

import baseStyles from '../list-shared.module.css'
import styles from './OrderedList.module.css'

export type OrderedListProps = PropsWithChildren<BaseProps<HTMLOListElement>>

function Root({children, ...props}: OrderedListProps) {
  return (
    <ol className={clsx(baseStyles.List, styles.OrderedList, props.className)} {...props}>
      <ListContext.Provider value={{variant: ''}}>{children}</ListContext.Provider>
    </ol>
  )
}

export const OrderedList = Object.assign(Root, {Item: ListItem})
