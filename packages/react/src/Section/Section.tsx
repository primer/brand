import React, {forwardRef, PropsWithChildren, useCallback, useMemo} from 'react'
import {clsx} from 'clsx'
import type {BaseProps} from '../component-helpers'

import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/section/section.css'
import styles from './Section.module.css'

export const SectionPaddingVariants = ['none', 'condensed', 'normal', 'spacious'] as const
export const SectionBackgroundColors = ['default', 'subtle'] as const

const defaultSectionPadding = SectionPaddingVariants[2]

type ResponsiveMap<T> = {
  narrow?: T
  regular?: T
  wide?: T
}

type BackgroundColors = (typeof SectionBackgroundColors)[number] | AnyString // The AnyString union type is a workaround to provide autocompletion for the SectionBackgroundColors values
type PaddingVariants = (typeof SectionPaddingVariants)[number]
type ResponsiveBackgroundColorMap = ResponsiveMap<BackgroundColors>
type ResponsiveBackgroundImagePositionMap = ResponsiveMap<string | string[]>
type ResponsiveBackgroundImageSizeMap = ResponsiveMap<string | string[]>
type ResponsiveBackgroundImageSrcMap = ResponsiveMap<string | string[]>
type ResponsivePaddingVariantsMap = ResponsiveMap<PaddingVariants>

type SectionProps = {
  /**
   * The HTML element used to render the section.
   */
  as?: 'section' | 'div'
  /**
   * The padding applied to the start of the section.
   */
  paddingBlockStart?: PaddingVariants | ResponsivePaddingVariantsMap
  /**
   * The padding applied to the end of the section.
   */
  paddingBlockEnd?: PaddingVariants | ResponsivePaddingVariantsMap
  /**
   * The system-level or custom background color of the section.
   */
  backgroundColor?: BackgroundColors | ResponsiveBackgroundColorMap
  /**
   * The background image of the section.
   */
  backgroundImageSrc?: string | string[] | ResponsiveBackgroundImageSrcMap
  /**
   * The position of the background image.
   */
  backgroundImagePosition?: string | string[] | ResponsiveBackgroundImagePositionMap
  /**
   * The size of the background image.
   */
  backgroundImageSize?: string | string[] | ResponsiveBackgroundImageSizeMap
  /**
   * Makes the content of the section span the full width of its parent container.
   */
  fullWidth?: boolean
  /**
   * Adds rounded corners to the top of the section.
   */
  rounded?: boolean
  /**
   * Forward inline styles
   */
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

export const Section = forwardRef<HTMLDivElement, PropsWithChildren<SectionProps>>(
  (
    {
      as: Component = 'section',
      paddingBlockStart = defaultSectionPadding,
      paddingBlockEnd = defaultSectionPadding,
      backgroundColor,
      backgroundImageSrc,
      backgroundImagePosition = '50%',
      backgroundImageSize = 'cover',
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

    const processBackgroundValue = useCallback((value: string | string[], property) => {
      if (property === 'background-image-src') {
        return Array.isArray(value) ? value.map(img => `url(${img})`).join() : `url(${value})`
      }

      if (property === 'background-color' && typeof value === 'string') {
        return SectionBackgroundColors.includes(value as (typeof SectionBackgroundColors)[number])
          ? `var(--brand-color-canvas-${value})`
          : value
      }

      return Array.isArray(value) ? value.join() : value
    }, [])

    const createStyles = useCallback(
      (property, value) =>
        typeof value === 'string' || Array.isArray(value)
          ? {[`--brand-Section-${property}`]: processBackgroundValue(value, property)}
          : {
              [`--brand-Section-narrow-${property}`]: processBackgroundValue(value?.narrow, property),
              [`--brand-Section-regular-${property}`]: processBackgroundValue(value?.regular, property),
              [`--brand-Section-wide-${property}`]: processBackgroundValue(value?.wide, property),
            },
      [processBackgroundValue],
    )

    const addStyle = useCallback(
      (obj, property, value) => {
        if (value) {
          Object.assign(obj, createStyles(property, value))
        }
      },
      [createStyles],
    )

    const paddingBlockStartClass = useMemo(
      () => createPaddingClasses(paddingBlockStart, 'paddingBlockStart'),
      [paddingBlockStart, createPaddingClasses],
    )
    const paddingBlockEndClass = useMemo(
      () => createPaddingClasses(paddingBlockEnd, 'paddingBlockEnd'),
      [paddingBlockEnd, createPaddingClasses],
    )

    const backgroundStyles = useMemo(() => {
      const allStyles = {}

      addStyle(allStyles, 'background-color', backgroundColor)
      addStyle(allStyles, 'background-image-src', backgroundImageSrc)
      addStyle(allStyles, 'background-image-position', backgroundImagePosition)
      addStyle(allStyles, 'background-image-size', backgroundImageSize)

      return allStyles
    }, [addStyle, backgroundColor, backgroundImageSrc, backgroundImagePosition, backgroundImageSize])

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
