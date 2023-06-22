import React, {forwardRef} from 'react'
import clsx from 'clsx'
import type {BaseProps} from '../component-helpers'
import styles from './Prose.module.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/prose/base.css'

export type ExpectedProseChildren = HTMLDivElement | HTMLHeadingElement | HTMLParagraphElement

export type ProseProps = {
  /**
   * Valid children include string encapsulated HTML elements such as `<h1>`, `<p>`, `<div>`, etc.
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
