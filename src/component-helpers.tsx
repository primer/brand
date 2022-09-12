import React, {Ref} from 'react'

/**
 * Layout
 */
export const Container = ({
  children,
  style
}: {
  children: React.ReactElement[] | React.ReactElement
  style?: React.CSSProperties
}) => <div style={{maxWidth: 1024, margin: '0 auto', ...style}}>{children}</div>

/**
 * Base Types
 */

/**
 * Component helper type to be extended by component types, e.g.:
 * type CustomComponentProps = BaseProps<HTMLDivElement> & { ... }
 *
 * Example use:
 *   const CustomComponent = forwardRef<HTMLDivElement, CustomComponentProps>(({className, ...props}, ref) => { ... })
 *   // OR:
 *   const CustomComponent = forwardRef(({className: CustomComponentProps, ...props}, ref: Ref<HTMLDivElement>) => { ... })
 */
export type BaseProps<T> = {
  className?: string
  id?: string
  ref?: Ref<T>
}
