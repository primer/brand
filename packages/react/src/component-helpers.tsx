import React, {Ref, PropsWithChildren} from 'react'

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

type RedlineBackgroundProps = {
  height?: number
  hasBorder?: boolean
}

export function RedlineBackground({height, hasBorder = true, ...rest}: PropsWithChildren<RedlineBackgroundProps>) {
  return (
    <div
      style={{
        display: 'flex',
        overflow: 'hidden',
        border: hasBorder ? '1px solid var(--base-color-scale-red-2)' : undefined,
        backgroundImage:
          'linear-gradient(45deg, var(--base-color-scale-red-0) 12.5%, hsla(var(--base-color-scale-red-2-hsl) / 50%) 12.5%, hsla(var(--base-color-scale-red-2-hsl) / 50%) 50%, var(--base-color-scale-red-0) 50%, var(--base-color-scale-red-0) 62.5%, hsla(var(--base-color-scale-red-2-hsl) / 50%) 62.5%, hsla(var(--base-color-scale-red-2-hsl) / 50%) 100%)',
        backgroundSize: '5.66px 5.66px',
        WebkitBoxPack: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height
      }}
      {...rest}
    />
  )
}

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
