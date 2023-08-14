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

function findEmInChildren(children: React.ReactNode): boolean {
  if (!children) {
    return false
  }

  if (Array.isArray(children)) {
    for (const child of children) {
      if (findEmInChildren(child)) {
        return true
      }
    }
  } else if (React.isValidElement(children)) {
    if (children.type === 'em') {
      return true
    }

    if (children.props && children.props.children) {
      if (findEmInChildren(children.props.children)) {
        return true
      }
    }
  }

  return false
}

export const RiverBreakout = forwardRef(
  (
    {animate, a11yHeading, a11yHeadingTag = 'h2', className, children, style, ...rest}: RiverBreakoutProps,
    ref: Ref<HTMLElement>,
  ) => {
    const {classes: animationClasses, styles: animationInlineStyles} = useAnimation(animate)

    // TODO: when Firefox supports :has() selector, we should use that instead of JS
    const defaultColor = findEmInChildren(children) ? 'muted' : 'default'

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
        <Heading className={clsx(styles.RiverBreakout__hiddenHeading)} as={a11yHeadingTag}>
          {a11yHeading}
        </Heading>
        {children}
      </section>
    )
  },
)
