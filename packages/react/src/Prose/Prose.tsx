import React, {forwardRef} from 'react'
import clsx from 'clsx'
import type {BaseProps} from '../component-helpers'
import styles from './Prose.module.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/prose/base.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/prose/colors-with-modes.css'

export type ProseProps = {
  /**
   * Valid children include string encapsulated HTML elements such as `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>`, `<p>`, `<strong>`, `<em>`, `<a>`, `<ul>`, `<ol>`, `<li>`, `<img>`, and `<div>`.
   */
  html: string
  /**
   * The presentational variant of the prose.
   */
  variant?: 'default' | 'editorial'
  /**
   * Whether to enable full width prose or not.
   */
  enableFullWidth?: boolean
} & Omit<BaseProps<HTMLDivElement>, 'animate' | 'children'> &
  Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>

export const Prose = forwardRef<HTMLDivElement, ProseProps>(
  ({html, enableFullWidth = false, className, variant = 'default', ...props}, ref) => {
    return (
      <div
        className={clsx(
          styles.Prose,
          !enableFullWidth && styles['Prose--lineLength'],
          styles[`Prose--${variant}`],
          className,
        )}
        ref={ref}
        {...props}
        dangerouslySetInnerHTML={{__html: html}}
      />
    )
  },
)
