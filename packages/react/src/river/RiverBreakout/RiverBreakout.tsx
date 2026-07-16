import React, {Ref, forwardRef} from 'react'
import {clsx} from 'clsx'
import {RiverProps} from '../River'
import {Visual as RiverVisual, RiverContent, type RiverVisualProps} from '../River/River'
import {useAnimation} from '../../animation'
import findElementInChildren from '../../findElementInChildren'
import {Heading} from '../../Heading'

import styles from '../river-shared.module.css'
import gridlineStyles from '../../component-helpers/shared.module.css'

export const RiverBreakoutVariants = ['default', 'gridline'] as const
export type RiverBreakoutVariant = (typeof RiverBreakoutVariants)[number]

type RiverBreakoutProps = Omit<RiverProps, 'align' | 'imageTextRatio'> & {
  /**
   * Apply a visual variant. The default is `default`.
   * `gridline` adds horizontal border lines and lateral spacing.
   */
  variant?: RiverBreakoutVariant
}

const Root = forwardRef(
  ({animate, className, children, style, variant = 'default', ...rest}: RiverBreakoutProps, ref: Ref<HTMLElement>) => {
    const {classes: animationClasses, styles: animationInlineStyles} = useAnimation(animate)

    const Children = React.Children.map(children, child => {
      if (React.isValidElement<RiverVisualProps>(child) && child.type === Visual) {
        return React.cloneElement(child, {
          className: clsx(child.props.className, variant === 'gridline' && styles['River__visual--has-background']),
        })
      }

      return child
    })

    // TODO: when Firefox supports :has() selector, we should use that instead of JS
    const defaultColor =
      findElementInChildren(children, 'b') || findElementInChildren(children, 'em') ? 'muted' : 'default'

    if (!findElementInChildren(children, A11yHeading)) {
      if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
        // eslint-disable-next-line no-console
        console.warn(
          'RiverBreakout: A11yHeading child is required. This element will not be visible, only read by screenreaders.',
        )
      }
    }

    return (
      <section
        ref={ref}
        className={clsx(
          styles.RiverBreakout,
          variant === 'gridline' && styles['RiverBreakout--variant-gridline'],
          variant === 'gridline' && gridlineStyles.gridline,
          defaultColor === 'muted' && styles['RiverBreakout--muted'],
          animationClasses,
          className,
        )}
        style={{...animationInlineStyles, ...style}}
        {...rest}
      >
        {Children}
      </section>
    )
  },
)

const A11yHeading = ({as = 'h3', children}: React.PropsWithChildren<{as?: 'h2' | 'h3'}>) => (
  <Heading className="visually-hidden" as={as}>
    {children}
  </Heading>
)

const Visual = forwardRef<HTMLDivElement, RiverVisualProps>(({className, ...props}, ref) => (
  <RiverVisual ref={ref} className={className} {...props} />
))

export const RiverBreakout = Object.assign(Root, {Visual, Content: RiverContent, A11yHeading})
