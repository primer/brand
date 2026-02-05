import React, {PropsWithChildren, forwardRef, useMemo} from 'react'
import {clsx} from 'clsx'
import styles from './Heading.module.css'
import type {BaseProps} from '../component-helpers'
import {useAnimation} from '..'

export const HeadingSizes = ['display', '1', '2', '3', '4', '5', '6', 'subhead-large', 'subhead-medium'] as const
export const HeadingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const

export const HeadingWeights = [
  'heavy',
  'extrabold',
  'bold',
  'semibold',
  'medium',
  'normal',
  'light',
  'extralight',
] as const
export const HeadingStretch = ['condensed', 'normal', 'expanded'] as const
export const HeadingLetterSpacing = ['condensed', 'normal', 'none'] as const
export const HeadingFontVariants = ['mona-sans', 'hubot-sans', 'monospace'] as const

export const defaultHeadingTag = HeadingTags[1]
export const defaultHeadingFont = HeadingFontVariants[0]

type HeadingWeightVariants = (typeof HeadingWeights)[number]
type HeadingStretchVariants = (typeof HeadingStretch)[number]
type HeadingLetterSpacingVariants = (typeof HeadingLetterSpacing)[number]
type HeadingFontVariants = (typeof HeadingFontVariants)[number]
type HeadingTextWrapVariants = 'wrap' | 'balance'

type ResponsiveStretchMap = {
  narrow?: HeadingStretchVariants
  regular?: HeadingStretchVariants
  wide?: HeadingStretchVariants
}

type ResponsiveLetterSpacingMap = {
  narrow?: HeadingLetterSpacingVariants
  regular?: HeadingLetterSpacingVariants
  wide?: HeadingLetterSpacingVariants
}

type ResponsiveWeightMap = {
  narrow?: HeadingWeightVariants
  regular?: HeadingWeightVariants
  wide?: HeadingWeightVariants
}

export const classMap = {
  h1: HeadingSizes[1],
  h2: HeadingSizes[2],
  h3: HeadingSizes[3],
  h4: HeadingSizes[4],
  h5: HeadingSizes[5],
  h6: HeadingSizes[6],
}

export type HeadingProps = {
  as?: (typeof HeadingTags)[number]
  size?: (typeof HeadingSizes)[number]
  weight?: HeadingWeightVariants | ResponsiveWeightMap
  stretch?: HeadingStretchVariants | ResponsiveStretchMap
  letterSpacing?: HeadingLetterSpacingVariants | ResponsiveLetterSpacingMap
  font?: HeadingFontVariants
  textWrap?: HeadingTextWrapVariants
} & React.HTMLAttributes<HTMLHeadingElement> &
  BaseProps<HTMLHeadingElement>

export const Heading = forwardRef<HTMLHeadingElement, PropsWithChildren<HeadingProps>>(
  (
    {
      animate,
      className,
      children,
      as: HeadingComponent = defaultHeadingTag,
      size,
      letterSpacing,
      weight,
      stretch,
      style,
      font = 'mona-sans',
      textWrap = 'balance',
      ...rest
    },
    ref,
  ) => {
    const {classes: animationClasses, styles: animationInlineStyles} = useAnimation(animate)

    const buildClass = (type: string, value) => {
      if (!value) return null
      return typeof value === 'string'
        ? styles[`Heading--${type}-${value}`]
        : Object.keys(value)
            .map(viewport => {
              return styles[`Heading-${viewport}--${type}-${value[viewport]}`]
            })
            .join(' ')
    }

    const weightClass = useMemo(() => buildClass('weight', weight), [weight])
    const stretchClass = useMemo(() => buildClass('stretch', stretch), [stretch])
    const letterSpacingClass = useMemo(() => buildClass('letter-spacing', letterSpacing), [letterSpacing])

    const headingClassNames = clsx(
      animationClasses,
      styles.Heading,
      styles[`Heading-font--${font}`],
      !size && styles[`Heading--${classMap[HeadingComponent]}`],
      size && styles[`Heading--${size}`],
      styles[`Heading--textWrap-${textWrap}`],
      weight && weightClass,
      stretch && stretchClass,
      letterSpacingClass && letterSpacingClass,
      className,
    )

    if (!HeadingTags.includes(HeadingComponent)) {
      // eslint-disable-next-line no-console
      console.error(`Heading: 'as' prop must be one of ${HeadingTags.join(', ')}`)
      return null
    }

    return (
      <HeadingComponent ref={ref} className={headingClassNames} style={{...animationInlineStyles, ...style}} {...rest}>
        {children}
      </HeadingComponent>
    )
  },
)
