import React, {Ref, forwardRef} from 'react'
import clsx from 'clsx'
import {RiverProps} from '.'
import {useAnimation} from '../animation'
import findElementInChildren from '../findElementInChildren'
import {Heading} from '../Heading'

import styles from './River.module.css'

type RiverBreakoutProps = {a11yHeading: string; a11yHeadingTag?: 'h2' | 'h3'} & Omit<
  RiverProps,
  'align' | 'imageTextRatio'
>

export const RiverBreakout = forwardRef(
  (
    {animate, a11yHeading, a11yHeadingTag = 'h2', className, children, style, ...rest}: RiverBreakoutProps,
    ref: Ref<HTMLElement>,
  ) => {
    const {classes: animationClasses, styles: animationInlineStyles} = useAnimation(animate)

    // TODO: when Firefox supports :has() selector, we should use that instead of JS
    const defaultColor = findElementInChildren(children, 'em') ? 'muted' : 'default'

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
        <Heading className="visually-hidden" as={a11yHeadingTag}>
          {a11yHeading}
        </Heading>
        {children}
      </section>
    )
  },
)
