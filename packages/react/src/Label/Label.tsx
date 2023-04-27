import clsx from 'clsx'
import React, {forwardRef, type Ref} from 'react'
import {Text} from '../Text'
import type {BaseProps} from '../component-helpers'
import {Colors, Gradients} from '../constants'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/label/colors-with-modes.css'

/** * Main Stylesheet (as a CSS Module) */
import styles from './Label.module.css'

export const LabelColors = [...Colors, ...Gradients] as const
export const LabelSizes = ['small', 'medium', 'large'] as const

export const defaultLabelColor = LabelColors[0]
export const defaultLabelSize = LabelSizes[1]

export type LabelProps = BaseProps<HTMLSpanElement> & {
  /**
   * The leading visual appears before the Label content
   */
  leadingVisual?: React.ReactNode
  /**
   * The color variations available in Label
   */
  color?: typeof LabelColors[number]
  /**
   * The size variations available in Label
   */
  size?: typeof LabelSizes[number]
  ['data-testid']?: string
} & React.ComponentPropsWithoutRef<'span'>

const testIds = {
  root: 'Label',
  get leadingVisual() {
    return `${this.root}-leading-visual`
  }
}

const _Label = forwardRef<HTMLSpanElement, LabelProps>(
  (
    {
      className,
      size = defaultLabelSize,
      color = defaultLabelColor,
      children,
      'data-testid': testId,
      leadingVisual: LeadingVisual,
      ...props
    },
    ref: Ref<HTMLSpanElement>
  ) => {
    return (
      <span
        ref={ref}
        className={clsx(styles.Label, styles[`Label--color-${color}`], styles[`Label--size-${size}`], className)}
        data-testid={testId || testIds.root}
        {...props}
      >
        {LeadingVisual && (
          <span className={styles['Label__leading-visual']} data-testid={testIds.leadingVisual}>
            {typeof LeadingVisual === 'function' ? (
              <LeadingVisual className={clsx(styles['Label__icon-visual'])} aria-hidden />
            ) : (
              React.isValidElement(LeadingVisual) &&
              React.cloneElement(LeadingVisual, {
                className: clsx(styles['Label__icon-visual']),
                ['aria-hidden']: 'true'
              })
            )}
          </span>
        )}
        <span className={styles['Label__text']}>
          <Text
            as="span"
            size={size === 'small' ? '100' : size === 'medium' ? '200' : '300'}
            className={clsx(styles['Label__label'])}
          >
            {children}
          </Text>
        </span>
      </span>
    )
  }
)

/**
 * Use a Label to indicate the status of an object or to categorize it with metadata that describes it.
 * @see https://primer.style/brand/components/Label
 */
export const Label = Object.assign(_Label, {testIds})
