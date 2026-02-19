import React, {Ref, forwardRef} from 'react'
import {clsx} from 'clsx'
import {RiverProps} from '../River'
import {Visual as RiverVisual, RiverContent} from '../River/River'
import {useAnimation} from '../../animation'
import findElementInChildren from '../../findElementInChildren'
import {Heading} from '../../Heading'

import styles from '../river-shared.module.css'

type RiverBreakoutProps = Omit<RiverProps, 'align' | 'imageTextRatio'>

const Root = forwardRef(({animate, className, children, style, ...rest}: RiverBreakoutProps, ref: Ref<HTMLElement>) => {
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
})

const A11yHeading = ({as = 'h3', children}: React.PropsWithChildren<{as?: 'h2' | 'h3'}>) => (
  <Heading className="visually-hidden" as={as}>
    {children}
  </Heading>
)

export const RiverBreakout = Object.assign(Root, {Visual: RiverVisual, Content: RiverContent, A11yHeading})
