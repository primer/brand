import {clsx} from 'clsx'
import React, {type PropsWithChildren, type Ref, forwardRef, useCallback, useEffect, useMemo, useState} from 'react'
import type {BaseProps} from '../component-helpers'
import {PauseIcon as OcticonPauseIcon} from '@primer/octicons-react'
import {Heading, HeadingProps, defaultHeadingTag, Text, TextProps, Grid, Button} from '../'

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
  /**
   * Alternative presentation
   */
  variant?: 'default' | 'gridline-expressive'
} & BaseProps<HTMLDivElement> &
  React.HTMLAttributes<HTMLDivElement>

const LogoSuiteBase = ({
  align = 'center',
  children,
  className,
  hasDivider = true,
  variant = 'default',
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

  const isHeadingVisuallyHidden =
    React.isValidElement<LogoSuiteHeadingProps>(HeadingChild) && HeadingChild.props.visuallyHidden
  const isGridlineExpressive = variant === 'gridline-expressive'
  const hasVisibleTextContent = isGridlineExpressive && ((HeadingChild && !isHeadingVisuallyHidden) || DescriptionChild)

  return (
    <div
      className={clsx(
        styles.LogoSuite,
        styles[`LogoSuite--${align}`],
        hasDivider && styles['LogoSuite--hasDivider'],
        styles[`LogoSuite--${variant}`],
        className,
      )}
      data-testid={testId}
    >
      {isGridlineExpressive ? (
        <Grid className={styles['LogoSuite__content']}>
          {hasVisibleTextContent && (
            <Grid.Column span={{large: 3}} className={styles['LogoSuite__textContainer']}>
              {HeadingChild}
              {DescriptionChild}
            </Grid.Column>
          )}
          <Grid.Column span={{large: hasVisibleTextContent ? 9 : 12}} className={styles['LogoSuite__logobarContainer']}>
            {!hasVisibleTextContent && isHeadingVisuallyHidden && HeadingChild}
            {LogobarChild}
          </Grid.Column>
        </Grid>
      ) : (
        <>
          {HeadingChild}
          {DescriptionChild}
          {LogobarChild}
        </>
      )}
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
      size = 'subhead-large',
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
    {className, children, size = '200', variant = 'muted', ...props}: LogoSuiteDescriptionProps,
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

const PauseIcon = () => <OcticonPauseIcon aria-label="Pause icon" size={16} />
const PlayIcon = () => (
  <svg role="presentation" aria-hidden="true" viewBox="8 7 9 10" width="16" height="16">
    <path
      d="M9.5 15.584V8.416a.5.5 0 0 1 .77-.42l5.576 3.583a.5.5 0 0 1 0 .842l-5.576 3.584a.5.5 0 0 1-.77-.42Z"
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
   * The gap between logos
   */
  gap?: 'default' | 'condensed'
  /**
   * Enables an optional marquee effect
   */
  marquee?: boolean
  /**
   * The speed of the marquee effect
   */
  marqueeSpeed?: 'slow' | 'normal' | 'idle'
  /**
   * The stylistic variant of the LogoBar.
   */
  variant?: 'muted' | 'emphasis'
  /**
   * Displays an optional takeover button (as an anchor) on hover/focus.
   */
  takeoverButton?: {
    label: string
  } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> &
    BaseProps<HTMLAnchorElement>
}

const _LogoBar = forwardRef(
  (
    {
      className,
      children,
      gap = 'default',
      marquee = false,
      marqueeSpeed = 'normal',
      variant = 'muted',
      takeoverButton,
      ...props
    }: LogoSuiteLogoBarProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
    const [isPlaying, setIsPlaying] = useState(marquee && !prefersReducedMotion && marqueeSpeed !== 'idle')

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

    useEffect(() => {
      setIsPlaying(marquee && !prefersReducedMotion && marqueeSpeed !== 'idle')
    }, [marquee, prefersReducedMotion, marqueeSpeed])

    if (marquee && takeoverButton) {
      if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
        // eslint-disable-next-line no-console
        console.warn(
          'LogoSuite.Logobar: `takeoverButton` cant be used with `marquee` prop due to accessibility risks. Set `marquee={false}` to use the takeover feature.',
        )
      }
    }

    const defaultProps = {
      ref,
      className: clsx(
        styles['LogoSuite__logobar'],
        styles[`LogoSuite__logobar--variant-${variant}`],
        styles[`LogoSuite__logobar--gap-${gap}`],
        className,
      ),
      ...props,
    }

    const [isFocusWithin, setIsFocusWithin] = useState(false)

    const handleFocus = useCallback(() => {
      setIsFocusWithin(true)
    }, [])

    const handleBlur = useCallback((event: React.FocusEvent) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node)) {
        setIsFocusWithin(false)
      }
    }, [])

    const renderTakeoverButton = () => {
      if (!takeoverButton) return null
      const {className: takeoverButtonClassName, label, ref: _ref, ...takeoverButtonProps} = takeoverButton
      return (
        <div className={styles['LogoSuite__logobar-takeoverButtonContainer']}>
          <Button
            as="a"
            variant="accent"
            className={clsx(styles['LogoSuite__logobar-takeoverButton'], takeoverButtonClassName)}
            {...takeoverButtonProps}
          >
            {label}
          </Button>
        </div>
      )
    }

    if (marquee) {
      const {className: marqueeDefaultClassName, ...restProps} = defaultProps
      const shouldPause = !isPlaying || prefersReducedMotion
      return (
        <div
          {...restProps}
          className={clsx(
            styles['LogoSuite__logobar--has-marquee'],
            marqueeDefaultClassName,
            shouldPause && styles['LogoSuite__logobar--paused'],
          )}
        >
          <div
            className={clsx(
              styles['LogoSuite__logobar-marquee'],
              isFocusWithin && styles['LogoSuite__logobar-marquee--focused'],
            )}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
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

    if (takeoverButton) {
      const {className: defaultClassName, ...restProps} = defaultProps
      return (
        <div {...restProps} className={clsx(defaultClassName, styles['LogoSuite__logobar--has-takeover'])}>
          {children}
          {renderTakeoverButton()}
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
export const LogoSuite = Object.assign(LogoSuiteBase, {
  Heading: _Heading,
  Description: _Description,
  Logobar: _LogoBar,
  testIds,
})
