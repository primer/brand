import React, {forwardRef, PropsWithChildren, useCallback, useMemo} from 'react'
import clsx from 'clsx'
import type {BaseProps} from '../component-helpers'

import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/section/section.css'
import styles from './Section.module.css'

const SectionPaddingVariants = ['none', 'condensed', 'normal', 'spacious'] as const
const defaultSectionPadding = SectionPaddingVariants[2]

type ResponsiveMap<T> = {
  narrow?: T
  regular?: T
  wide?: T
}

type SectionPaddingVariant = (typeof SectionPaddingVariants)[number]
type SectionPaddingVariants = SectionPaddingVariant
type ResponsivePaddingMap = ResponsiveMap<SectionPaddingVariant>
type ResponsiveBackgroundImageSrcMap = ResponsiveMap<string>
type ResponsiveBackgroundImagePositionMap = ResponsiveMap<string>
type ResponsiveBackgroundImageSizeMap = ResponsiveMap<string>
type ResponsiveBackgroundColorMap = ResponsiveMap<string>

type SectionProps = {
  /**
   * The HTML element used to render the section.
   */
  as?: 'section' | 'div'
  /**
   * The padding applied to the start of the section.
   */
  paddingBlockStart?: SectionPaddingVariants | ResponsivePaddingMap
  /**
   * The padding applied to the end of the section.
   */
  paddingBlockEnd?: SectionPaddingVariants | ResponsivePaddingMap
  /**
   * The background color of the section.
   */
  backgroundColor?: string | ResponsiveBackgroundColorMap
  /**
   * The background image of the section.
   */
  backgroundImageSrc?: string | ResponsiveBackgroundImageSrcMap
  /**
   * The position of the background image.
   */
  backgroundImagePosition?: string | ResponsiveBackgroundImagePositionMap
  /**
   * The size of the background image.
   */
  backgroundImageSize?: string | ResponsiveBackgroundImageSizeMap
  /**
   * Makes the content of the section fill the full width of its parent container.
   */
  fullWidth?: boolean
  /**
   * Adds rounder corners to the top of the section.
   */
  rounded?: boolean
  style?: React.CSSProperties
  /**
   * Optional attirbute for testing
   */
  ['data-testid']?: string
} & PropsWithChildren<BaseProps<HTMLDivElement>>

const testIds = {
  root: 'Section',
  container: 'Section__container',
}

const SectionRoot = forwardRef<HTMLDivElement, PropsWithChildren<SectionProps>>(
  (
    {
      as: Component = 'section',
      paddingBlockStart = defaultSectionPadding,
      paddingBlockEnd = defaultSectionPadding,
      backgroundColor,
      backgroundImageSrc,
      backgroundImagePosition,
      backgroundImageSize,
      className,
      children,
      'data-testid': testId,
      fullWidth = false,
      rounded = false,
      style,
      ...props
    },
    ref,
  ) => {
    const createPaddingClasses = useCallback(
      (paddingBlock, blockType) =>
        typeof paddingBlock === 'string'
          ? styles[`Section--${blockType}-${paddingBlock}`]
          : Object.keys(paddingBlock)
              .map(viewport => styles[`Section-${viewport}--${blockType}-${paddingBlock[viewport]}`])
              .join(' '),
      [],
    )

    const createStyles = useCallback(
      (property, value) =>
        typeof value === 'string'
          ? {[`--brand-Section-${property}`]: value}
          : {
              [`--brand-Section-narrow-${property}`]: value?.narrow,
              [`--brand-Section-regular-${property}`]: value?.regular,
              [`--brand-Section-wide-${property}`]: value?.wide,
            },
      [],
    )

    const paddingBlockStartClass = useMemo(
      () => createPaddingClasses(paddingBlockStart, 'paddingBlockStart'),
      [paddingBlockStart, createPaddingClasses],
    )
    const paddingBlockEndClass = useMemo(
      () => createPaddingClasses(paddingBlockEnd, 'paddingBlockEnd'),
      [paddingBlockEnd, createPaddingClasses],
    )

    const backgroundStyles = useMemo(
      () => ({
        ...createStyles('background-color', backgroundColor),
        ...createStyles('background-image-src', backgroundImageSrc),
        ...createStyles('background-image-position', backgroundImagePosition),
        ...createStyles('background-image-size', backgroundImageSize),
      }),
      [backgroundColor, backgroundImageSrc, backgroundImagePosition, backgroundImageSize, createStyles],
    )

    return (
      <Component
        ref={ref}
        className={clsx(
          styles.Section,
          paddingBlockStartClass,
          paddingBlockEndClass,
          rounded && styles['Section--rounded'],
          className,
        )}
        data-testid={testId || testIds.root}
        style={{...backgroundStyles, ...style}}
        {...props}
      >
        <div
          className={clsx(styles[`Section__container`], fullWidth && styles['Section__container--fullWidth'])}
          data-testid={testIds.container}
        >
          {children}
        </div>
      </Component>
    )
  },
)

export const Section = Object.assign(SectionRoot, {})
