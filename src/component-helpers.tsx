import React, {Ref} from 'react'

/**
 * Layout
 */
export const Container = ({children}) => <div style={{maxWidth: 1024, margin: '0 auto'}}>{children}</div>

/**
 * Base Types
 */
export type BaseProps<T> = {
  className?: string
  id?: string
  ref?: Ref<T>
}
