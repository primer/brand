import React, {forwardRef} from 'react'
import clsx from 'clsx'
import type {BaseProps} from '../component-helpers'
import styles from './Prose.module.css'

export type ExpectedProseChildren = HTMLDivElement | HTMLHeadingElement | HTMLParagraphElement

export type ProseProps = {
  /**
   * Valid children include `<ul>`, `<ol>`, `<li>`, `<div>`, `<a>`, `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>`, and `<p>`.
   */
  rawHtmlMarkup: string
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
        dangerouslySetInnerHTML={{__html: rawHtmlMarkup}}
      />
    )
  },
)
