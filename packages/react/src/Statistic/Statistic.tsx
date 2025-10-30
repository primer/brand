import React, {PropsWithChildren, forwardRef, useMemo} from 'react'
import {clsx} from 'clsx'

import {Text, TextProps, useAnimation} from '../'

import type {BaseProps} from '../component-helpers'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/statistic/base.css'

/** * Main Stylesheet (as a CSS Module) */
import styles from './Statistic.module.css'

export const StatisticSizes = ['small', 'medium', 'large'] as const
export const StatisticSpacingValues = ['none', 'condensed', 'normal', 'spacious'] as const

type StatisticSpacingValues = (typeof StatisticSpacingValues)[number]

export type StatisticSize = (typeof StatisticSizes)[number]

type ResponsiveMap<T> = {
  narrow?: T
  regular?: T
  wide?: T
}

export type StatisticProps = BaseProps<HTMLAnchorElement> & {
  /**
   * The size of the Statistic
   */
  size?: StatisticSize
  /**
   * Adding padding to all internal sides of the component
   */
  padding?: StatisticSpacingValues | ResponsiveMap<StatisticSpacingValues>
  /**
   * Specify alternative  appearance
   */
  variant?: 'default' | 'boxed'
  /**
   * Escape-hatch for inserting custom React components.
   * Warning:
   *   This prop isn't advertised in our docs but remains part of the public API for edge-cases.
   *   Need to use this prop? Please check in with #primer-brand first to confirm correct usage.
   */
  leadingComponent?: React.FunctionComponent
  /**
   * Escape-hatch for inserting custom React components.
   * Warning:
   *   This prop isn't advertised in our docs but remains part of the public API for edge-cases.
   *   Need to use this prop? Please check in with #primer-brand first to confirm correct usage.
   */
  trailingComponent?: React.FunctionComponent
  /**
   * Optional attirbute for testing
   */
  ['data-testid']?: string
} & BaseProps<HTMLDivElement> &
  React.HTMLAttributes<HTMLDivElement>

const testIds = {
  root: 'Statistic',
}

const _HeadingSizeMap: {
  [key in StatisticSize]: TextProps['size']
} = {
  small: '600',
  medium: '800',
  large: '1000',
}

const classBuilder = (property: string, value?: StatisticSpacingValues | ResponsiveMap<StatisticSpacingValues>) => {
  if (!value) return ''

  if (typeof value === 'string' || typeof value === 'number') {
    return styles[`Statistic--${property}-${value}`]
  } else {
    return Object.keys(value)
      .map(viewport => styles[`Statistic--${viewport}-${property}-${value[viewport]}`])
      .join(' ')
  }
}

const _Statistic = forwardRef<HTMLDivElement, PropsWithChildren<StatisticProps>>(
  (
    {
      animate,
      className,
      children,
      'data-testid': testId,
      size = 'large',
      variant = 'default',
      padding = 'none',
      leadingComponent: LeadingComponent,
      trailingComponent: TrailingComponent,
      style,
      ...rest
    },
    ref,
  ) => {
    const {classes: animationClasses, styles: animationInlineStyles} = useAnimation(animate)
    const paddingClasses = useMemo(() => classBuilder('padding', padding), [padding])

    let HeadingChild = useMemo(
      () =>
        React.Children.toArray(children).find(child => {
          if (React.isValidElement(child) && child.type === StatisticHeading) {
            return child
          }
        }),
      [children],
    )

    const DescriptionChild = useMemo(
      () =>
        React.Children.toArray(children).find(child => {
          if (React.isValidElement(child) && child.type === StatisticDescription) {
            return child
          }
        }),
      [children],
    )

    /**
     * To aid assistive technology, we append the optional description to the heading
     */
    if (DescriptionChild) {
      const updatedHeadingChild = React.isValidElement(HeadingChild)
        ? React.cloneElement(HeadingChild as React.ReactElement<TextProps>, {
            children: (
              <>
                {HeadingChild.props.children} {DescriptionChild}
              </>
            ),
          })
        : HeadingChild

      HeadingChild = updatedHeadingChild
    }

    return (
      <div
        ref={ref}
        className={clsx(styles[`Statistic--variant-${variant}`], paddingClasses, animationClasses, className)}
        style={{...animationInlineStyles, ...style}}
        data-testid={testId || testIds.root}
        {...rest}
      >
        {LeadingComponent && <LeadingComponent />}

        {React.isValidElement(HeadingChild) &&
          React.cloneElement(HeadingChild as React.ReactElement<TextProps>, {
            size: HeadingChild.props.size || _HeadingSizeMap[size],
          })}

        {TrailingComponent && <TrailingComponent />}
      </div>
    )
  },
)

type StatisticHeadingProps = TextProps

const StatisticHeading = forwardRef<HTMLParagraphElement, StatisticHeadingProps>(
  ({as = 'p', className, children, font = 'hubot-sans', weight = 'semibold', size = '1000', ...rest}, ref) => {
    return (
      <Text
        as={as}
        ref={ref}
        className={clsx(styles[`Statistic__heading`], className)}
        font={font}
        weight={weight}
        size={size}
        {...rest}
      >
        {children}
      </Text>
    )
  },
)

type StatisticDescriptionProps = BaseProps<HTMLSpanElement> &
  Omit<TextProps, 'variant' | 'as'> & {
    variant?: 'default' | 'muted' | 'accent'
  }

const StatisticDescription = forwardRef<HTMLSpanElement, PropsWithChildren<StatisticDescriptionProps>>(
  ({children, className, size = '300', variant = 'muted', ...rest}, ref) => {
    return (
      <Text
        variant={variant !== 'accent' ? variant : 'muted'}
        ref={ref}
        size={size}
        font="mona-sans"
        className={clsx(styles['Statistic__description'], styles[`Statistic__description--${variant}`], className)}
        {...rest}
      >
        {children}
      </Text>
    )
  },
)

/**
 * Use the statistic component display concise numerical information
 * @see https://primer.style/brand/components/Statistic
 */
export const Statistic = Object.assign(_Statistic, {
  Heading: StatisticHeading,
  Description: StatisticDescription,
  testIds,
})
