import React, {Ref, forwardRef} from 'react'
import clsx from 'clsx'
import {RiverProps} from '.'
import {useAnimation} from '../animation'
import styles from './River.module.css'
import {Heading} from '../Heading'

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

    return (
      <section
        ref={ref}
        className={clsx(styles['River--breakout'], animationClasses, className)}
        style={{...animationInlineStyles, ...style}}
        {...rest}
      >
        <Heading className={clsx(styles.River__hiddenBreakoutHeading)} as={a11yHeadingTag}>
          {a11yHeading}
        </Heading>
        {children}
      </section>
    )
  },
)
