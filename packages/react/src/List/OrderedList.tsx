import React from 'react'
import clsx from 'clsx'
import type {BaseProps} from '../component-helpers'

import styles from './List.module.css'

export type ListProps = BaseProps<HTMLElement> & {
  /**
   * React.ReactNode and React.ReactNode[] are valid children.
   */
  children?: React.ReactNode | React.ReactNode[]
}

export function OrderedList({children, ...props}: ListProps) {
  return <ol className={clsx(styles.List, props.className)}>{children}</ol>
}
