import {default as clsx} from 'clsx'
import React, {type PropsWithChildren, type Ref, forwardRef, useCallback, useEffect, useMemo, useState} from 'react'
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

export type LogoSuiteProps = {
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

export type LogoSuiteHeadingProps = BaseProps<HTMLHeadingElement> &
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

export type LogoSuiteDescriptionProps = BaseProps<HTMLParagraphElement> &
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

const PauseIcon = () => (
  <svg fill="none" role="presentation" aria-hidden="true" viewBox="3.17 2.28 13.7 15.42">
    <path
      d="M4.66148 2.3125C3.83593 2.3125 3.16669 2.98174 3.16669 3.80729V16.1927C3.16669 17.0183 3.83593 17.6875 4.66148 17.6875H7.65106C8.47662 17.6875 9.14586 17.0183 9.14586 16.1927V3.80729C9.14586 2.98174 8.47662 2.3125 7.65106 2.3125H4.66148ZM4.44794 3.80729C4.44794 3.68936 4.54355 3.59375 4.66148 3.59375H7.65106C7.769 3.59375 7.86461 3.68936 7.86461 3.80729V16.1927C7.86461 16.3106 7.769 16.4062 7.65106 16.4062H4.66148C4.54355 16.4062 4.44794 16.3106 4.44794 16.1927V3.80729ZM12.349 2.3125C11.5235 2.3125 10.8542 2.98174 10.8542 3.80729V16.1927C10.8542 17.0183 11.5235 17.6875 12.349 17.6875H15.3386C16.1642 17.6875 16.8334 17.0183 16.8334 16.1927V3.80729C16.8334 2.98174 16.1642 2.3125 15.3386 2.3125H12.349ZM12.1355 3.80729C12.1355 3.68936 12.2311 3.59375 12.349 3.59375H15.3386C15.4565 3.59375 15.5521 3.68936 15.5521 3.80729V16.1927C15.5521 16.3106 15.4565 16.4062 15.3386 16.4062H12.349C12.2311 16.4062 12.1355 16.3106 12.1355 16.1927V3.80729Z"
      fill="currentColor"
    ></path>
  </svg>
)
const PlayIcon = () => (
  <svg fill="none" role="presentation" aria-hidden="true" viewBox="4.02 2.3 14.43 15.4">
    <path
      d="M6.24905 3.69194C5.82218 3.45967 5.30225 3.76868 5.30225 4.25466V15.7452C5.30225 16.2312 5.82218 16.5402 6.24906 16.3079L16.8079 10.5626C17.2538 10.32 17.2538 9.67983 16.8079 9.4372L6.24905 3.69194ZM4.021 4.25466C4.021 2.79672 5.58078 1.86969 6.86142 2.56651L17.4203 8.31176C18.758 9.03966 18.758 10.9602 17.4203 11.6881L6.86143 17.4333C5.58079 18.1301 4.021 17.2031 4.021 15.7452V4.25466Z"
      fill="currentColor"
    ></path>
  </svg>
)

type PlayPauseButtonProps = {
  isPlaying?: boolean
  onPlayPause?: (isPlaying: boolean) => void
}

const PlayPauseButton = ({isPlaying = true, onPlayPause}: PlayPauseButtonProps) => {
  const onClick = useCallback(() => {
    onPlayPause?.(!isPlaying)
  }, [onPlayPause, isPlaying])

  /**
   * aria-pressed is intentionally not used here to prevent potentially confusing screen reader announcements
   * eg "Play animation on" or "Pause animation off"
   */
  return (
    <button
      className={styles['LogoSuite__logobar-playPauseButton']}
      type="button"
      onClick={onClick}
      aria-label={isPlaying ? 'Pause animation' : 'Play animation'}
    >
      {isPlaying ? <PauseIcon /> : <PlayIcon />}
    </button>
  )
}

export type LogoSuiteLogoBarProps = BaseProps<HTMLDivElement> & {
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
    {className, children, marquee = false, marqueeSpeed = 'normal', variant, ...props}: LogoSuiteLogoBarProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
    const [isPlaying, setIsPlaying] = useState(marquee && !prefersReducedMotion)

    const childrenCount = React.Children.toArray(children).length
    variant ??= childrenCount <= 5 ? 'emphasis' : 'muted'

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
        <div
          {...restProps}
          className={clsx(
            styles['LogoSuite__logobar--has-marquee'],
            marqueeDefaultClassName,
            !isPlaying && styles['LogoSuite__logobar--paused'],
          )}
        >
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
          <PlayPauseButton onPlayPause={setIsPlaying} isPlaying={isPlaying} />
        </div>
      )
    }

    return <div {...defaultProps}>{children}</div>
  },
)

/**
 * Use LogoSuite to present a list of logos, such as sponsors or vendors.
 * @see https://primer.style/brand/components/LogoSuite
 */
export const LogoSuite = Object.assign(_LogoSuite, {
  Heading: _Heading,
  Description: _Description,
  Logobar: _LogoBar,
  testIds,
})
