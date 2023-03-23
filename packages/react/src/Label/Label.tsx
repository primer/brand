import clsx from 'clsx'
import React, {forwardRef, type Ref} from 'react'
import {Text} from '../Text'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/label/colors-with-modes.css'
import type {BaseProps} from '../component-helpers'
import styles from './Label.module.css'

export const LabelColors = [
  'default',
  'blue',
  'blue-purple',
  'coral',
  'green',
  'green-blue',
  'gray',
  'indigo',
  'lemon',
  'lime',
  'orange',
  'pink',
  'pink-blue',
  'purple',
  'purple-red',
  'red',
  'red-orange',
  'teal',
  'yellow'
] as const
export const LabelSizes = ['small', 'medium', 'large'] as const

export const defaultLabelColor = LabelColors[0]
export const defaultLabelSize = LabelSizes[1]

export type LabelProps = BaseProps<HTMLSpanElement> & {
  /**
   * The leading visual appears before the Label content
   */
  leadingVisual?: React.ReactNode
  /**
   * The styling variations available in Label
   */
  color?: typeof LabelColors[number]
  /**
   * The size variations available in Label
   */
  size?: typeof LabelSizes[number]
} & React.ComponentPropsWithoutRef<'span'>

export const Label = forwardRef<HTMLSpanElement, LabelProps>(
  (
    {className, size = defaultLabelSize, color = defaultLabelColor, children, leadingVisual: LeadingVisual, ...props},
    ref: Ref<HTMLSpanElement>
  ) => {
    return (
      <span
        ref={ref}
        className={clsx(styles.Label, styles[`Label--color-${color}`], styles[`Label--size-${size}`], className)}
        {...props}
      >
        {LeadingVisual && (
          <span className={styles['Label__leading-visual']}>
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
            className={clsx(styles['Label--label'], styles[`Label--label-${size}`])}
          >
            {children}
          </Text>
        </span>
      </span>
    )
  }
)
