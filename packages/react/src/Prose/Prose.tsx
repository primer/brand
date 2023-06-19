import React, {forwardRef} from 'react'
import clsx from 'clsx'
import type {BaseProps} from '../component-helpers'
import styles from './Prose.module.css'

export type ExpectedProseChildren = HTMLDivElement | HTMLHeadingElement | HTMLParagraphElement

export type ProseProps = {
  /**
   * Valid children include Card.Image, Card.Heading, and Card.Description
   * FIX: type HTMLElements would allow us to get tagName and textContent but that doesn't work
   */
  rawHtmlMarkup: React.ReactNode | React.ReactNode[]
  enableFullWidth?: boolean
} & Omit<BaseProps<HTMLDivElement>, 'animate' | 'children'> &
  Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>

export const Prose = forwardRef<HTMLDivElement, ProseProps>(
  ({rawHtmlMarkup, enableFullWidth = false, className, ...props}, ref) => {
    return (
      <div
        className={clsx(styles.Prose, !enableFullWidth && styles['Prose--lineLength'], className)}
        ref={ref}
        {...props}
      >
        {rawHtmlMarkup}
      </div>
    )
  },
)
