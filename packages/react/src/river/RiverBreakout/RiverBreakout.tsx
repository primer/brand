import React, {Ref, forwardRef} from 'react'
import {clsx} from 'clsx'
import {River, RiverProps} from '../River'
import {useAnimation} from '../../animation'
import findElementInChildren from '../../findElementInChildren'
import {Heading} from '../../Heading'

import styles from '../river-shared.module.css'

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
          defaultColor === 'muted' && styles['RiverBreakout--muted'],
          animationClasses,
          className,
        )}
        style={{...animationInlineStyles, ...style}}
        {...rest}
      >
        {children}
      </section>
    )
  },
)

const A11yHeading = ({as = 'h3', children}: React.PropsWithChildren<{as?: 'h2' | 'h3'}>) => (
  <Heading className="visually-hidden" as={as}>
    {children}
  </Heading>
)

export const RiverBreakout = Object.assign(Root, {Visual: River.Visual, Content: River.Content, A11yHeading})
