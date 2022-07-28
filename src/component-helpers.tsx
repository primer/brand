import React, {Ref} from 'react'

/**
 * Layout
 */
export const Container = ({children}) => <div style={{maxWidth: 1024, margin: '0 auto'}}>{children}</div>

/**
 * Base Types
 */

/**
 * Component helper type to be extended by component types, e.g.:
 * type CompNameProps = BaseProps<HTMLDivElement> & { ... }
 *
 * Example use:
 *   const CompName = forwardRef<HTMLDivElement, CompNameProps>(({className, ...props}, ref) => { ... })
 *   // OR:
 *   const CompName = forwardRef(({className: CompNameProps, ...props}, ref: Ref<HTMLDivElement>) => { ... })
 */
export type BaseProps<T> = {
  className?: string
  id?: string
  ref?: Ref<T>
}
