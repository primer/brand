import clsx from 'clsx'
import React, {forwardRef, useMemo, type Ref} from 'react'
import {Text} from '../Text'

import {useAnimation} from '../animation'

import type {BaseProps} from '../component-helpers'
import {Colors, BiColorGradients, TriColorGradients} from '../constants'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/label/colors-with-modes.css'

/** * Main Stylesheet (as a CSS Module) */
import styles from './Label.module.css'
import {Icon} from '@primer/octicons-react'

const Gradients = [...BiColorGradients, ...TriColorGradients] as const

export const LabelColors = [...Colors, ...Gradients] as const
export const LabelSizes = ['medium', 'large'] as const

export const defaultLabelColor = LabelColors[0]
export const defaultLabelSize = LabelSizes[0]

export type LabelProps = BaseProps<HTMLSpanElement> & {
  /**
   * The leading visual appears before the Label content
   */
  leadingVisual?: React.ReactNode | Icon
  /**
   * The color variations available in Label
   */
  color?: (typeof LabelColors)[number]
  /**
   * The size variations available in Label
   */
  size?: (typeof LabelSizes)[number]
  ['data-testid']?: string
} & React.ComponentPropsWithoutRef<'span'>

const testIds = {
  root: 'Label',
  get leadingVisual() {
    return `${this.root}-leading-visual`
  },
}

const _Label = forwardRef<HTMLSpanElement, LabelProps>(
  (
    {
      animate,
      className,
      size = defaultLabelSize,
      color = defaultLabelColor,
      children,
      'data-testid': testId,
      leadingVisual: LeadingVisual,
      style,
      ...props
    },
    ref: Ref<HTMLSpanElement>,
  ) => {
    const {classes: animationClasses, styles: animationInlineStyles} = useAnimation(animate)

    const isGradient = useMemo(() => Gradients.find(gradient => gradient === color), [color])

    return (
      <span
        ref={ref}
        className={clsx(
          animationClasses,
          styles.Label,
          styles[`Label--color-${color}`],
          styles[`Label--size-${size}`],
          isGradient && styles['Label--gradient'],
          className,
        )}
        data-testid={testId || testIds.root}
        style={{...animationInlineStyles, ...style}}
        {...props}
      >
        {LeadingVisual && (
          <span className={styles['Label__leading-visual']} data-testid={testIds.leadingVisual}>
            {typeof LeadingVisual === 'function' ? (
              <LeadingVisual />
            ) : (
              React.isValidElement(LeadingVisual) &&
              React.cloneElement(LeadingVisual as React.ReactElement, {
                className: clsx(styles['Label__icon-visual']),
                ['aria-hidden']: 'true',
              })
            )}
          </span>
        )}
        <span className={clsx(styles['Label__text'])}>
          <Text as="span" size={size === 'medium' ? '100' : '200'} className={clsx(styles['Label__label'])}>
            {children}
          </Text>
        </span>
      </span>
    )
  },
)

/**
 * Use a Label to indicate the status of an object or to categorize it with metadata that describes it.
 * @see https://primer.style/brand/components/Label
 */
export const Label = Object.assign(_Label, {testIds})
