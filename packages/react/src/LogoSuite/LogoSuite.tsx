import {default as clsx} from 'clsx'
import React, {PropsWithChildren, Ref, forwardRef, useEffect, useMemo, useState} from 'react'
import type {BaseProps} from '../component-helpers'
import {Heading, HeadingProps, defaultHeadingTag, Text, TextProps} from '../'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/logosuite/colors-with-modes.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/logosuite/base.css'

/** * Main Stylesheet (as a CSS Module) */
import styles from './LogoSuite.module.css'

const testIds = {
  root: 'LogoSuite',
  get marqueeGroup() {
    return `${this.root}-marqueeGroup`
  },
}

type LogoSuiteProps = {
  /**
   * The horizontal alignment of the LogoSuite.
   */
  align?: 'start' | 'center' | 'justify'
  /**
   * Whether to render a divider immediately after the LogoSuite.
   */
  hasDivider?: boolean
  /**
   * Test id for the root LogoSuite element.
   */
  'data-testid'?: string
} & BaseProps<HTMLDivElement> &
  React.HTMLAttributes<HTMLDivElement>

const _LogoSuite = ({
  align = 'center',
  children,
  className,
  hasDivider = true,
  'data-testid': testId,
}: PropsWithChildren<LogoSuiteProps>) => {
  const childrenArray = useMemo(() => React.Children.toArray(children), [children])

  const HeadingChild = childrenArray.find(child => {
    return React.isValidElement(child) && child.type === _Heading
  })

  const DescriptionChild = childrenArray.find(child => {
    return React.isValidElement(child) && child.type === _Description
  })

  const LogobarChild = childrenArray.find(child => {
    return React.isValidElement(child) && child.type === _LogoBar
  })

  if (!HeadingChild) {
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
      // eslint-disable-next-line no-console
      console.warn('LogoSuite: Heading child is required. You may use `visuallyHidden` to hide it from view.')
    }
  }

  return (
    <div
      className={clsx(
        styles.LogoSuite,
        styles[`LogoSuite--${align}`],
        hasDivider && styles['LogoSuite--hasDivider'],
        className,
      )}
      data-testid={testId}
    >
      {HeadingChild}
      {DescriptionChild}
      {LogobarChild}
    </div>
  )
}

type LogoSuiteHeadingProps = BaseProps<HTMLHeadingElement> &
  HeadingProps & {
    /**
     * Whether to visually hide the heading.
     */
    visuallyHidden?: boolean
  }

const _Heading = forwardRef(
  (
    {
      as = defaultHeadingTag,
      size = '3',
      className,
      children,
      visuallyHidden,
      ...props
    }: PropsWithChildren<LogoSuiteHeadingProps>,
    ref: Ref<HTMLHeadingElement>,
  ) => {
    return (
      <Heading
        ref={ref}
        className={clsx(
          styles['LogoSuite__heading'],
          visuallyHidden && styles['LogoSuite__heading--visually-hidden'],
          visuallyHidden && 'visually-hidden',
          className,
        )}
        size={size}
        as={as}
        {...props}
      >
        {children}
      </Heading>
    )
  },
)

type LogoSuiteDescriptionProps = BaseProps<HTMLParagraphElement> &
  TextProps & {
    children: React.ReactNode | React.ReactNode[]
  }

const _Description = forwardRef(
  (
    {className, children, size = '300', variant = 'muted', ...props}: LogoSuiteDescriptionProps,
    ref: Ref<HTMLParagraphElement>,
  ) => {
    return (
      <Text
        as="p"
        ref={ref}
        size={size}
        variant={variant}
        className={clsx(styles['LogoSuite__description'], className)}
        {...props}
      >
        {children}
      </Text>
    )
  },
)

type LogoSuiteLogoBarProps = BaseProps<HTMLDivElement> & {
  children: React.ReactNode | React.ReactNode[]
  /**
   * Enables an optional marquee effect
   */
  marquee?: boolean
  /**
   * The speed of the marquee effect
   */
  marqueeSpeed?: 'slow' | 'normal'
  /**
   * The stylistic variant of the LogoBar.
   */
  variant?: 'muted' | 'emphasis'
}

const _LogoBar = forwardRef(
  (
    {className, children, marquee = false, marqueeSpeed = 'normal', variant = 'muted', ...props}: LogoSuiteLogoBarProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

    useEffect(() => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      setPrefersReducedMotion(mediaQuery.matches)

      const handleChange = (event: MediaQueryListEvent) => {
        setPrefersReducedMotion(event.matches)
      }

      mediaQuery.addEventListener('change', handleChange)

      return () => {
        mediaQuery.removeEventListener('change', handleChange)
      }
    }, [])

    const defaultProps = {
      ref,
      className: clsx(styles['LogoSuite__logobar'], styles[`LogoSuite__logobar--variant-${variant}`], className),
      ...props,
    }

    if (marquee && !prefersReducedMotion) {
      const {className: marqueeDefaultClassName, ...restProps} = defaultProps
      return (
        <div {...restProps} className={clsx(styles['LogoSuite__logobar--has-marquee'], marqueeDefaultClassName)}>
          <div className={clsx(styles['LogoSuite__logobar-marquee'])}>
            <div
              className={clsx(
                styles['LogoSuite__logobar-marqueeGroup'],
                styles[`LogoSuite__logobar-marqueeGroup--speed-${marqueeSpeed}`],
              )}
              data-testid={testIds.marqueeGroup}
            >
              {children}
            </div>
            <div
              aria-hidden="true"
              className={clsx(
                styles['LogoSuite__logobar-marqueeGroup'],
                styles[`LogoSuite__logobar-marqueeGroup--speed-${marqueeSpeed}`],
              )}
            >
              {children}
            </div>
          </div>
        </div>
      )
    }

    return <div {...defaultProps}>{children}</div>
  },
)

/**
 * Use LogoSuite to present a list logos, such as sponsors or vendors.
 * @see https://primer.style/brand/components/LogoSuite
 */
export const LogoSuite = Object.assign(_LogoSuite, {
  Heading: _Heading,
  Description: _Description,
  Logobar: _LogoBar,
  testIds,
})
