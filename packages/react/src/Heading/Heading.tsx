import React, {PropsWithChildren, forwardRef, type Ref, useMemo} from 'react'
import clsx from 'clsx'
import styles from './Heading.module.css'
import type {BaseProps} from '../component-helpers'

export const HeadingSizes = ['1', '2', '3', '4', '5', '6'] as const
export const HeadingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const

export const HeadingWeights = ['heavy', 'extrabold', 'bold', 'semibold', 'medium', 'normal', 'light'] as const
export const HeadingWidths = ['condensed', 'normal', 'expanded'] as const
export const HeadingLetterSpacing = ['condensed', 'normal', 'none'] as const

export const defaultHeadingTag = HeadingTags[1]

type HeadingWeightVariants = typeof HeadingWeights[number]
type HeadingWidthVariants = typeof HeadingWidths[number]
type HeadingLetterSpacingVariants = typeof HeadingLetterSpacing[number]

type ResponsiveWidthMap = {
  narrow?: HeadingWidthVariants
  regular?: HeadingWidthVariants
  wide?: HeadingWidthVariants
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
  h1: HeadingSizes[0],
  h2: HeadingSizes[1],
  h3: HeadingSizes[2],
  h4: HeadingSizes[3],
  h5: HeadingSizes[4],
  h6: HeadingSizes[5]
}

export type HeadingTags = BaseProps<HTMLHeadingElement> & {
  as?: typeof HeadingTags[number]
  size?: typeof HeadingSizes[number]
  weight?: HeadingWeightVariants | ResponsiveWeightMap
  width?: HeadingWidthVariants | ResponsiveWidthMap
  letterSpacing?: HeadingLetterSpacingVariants | ResponsiveLetterSpacingMap
} & React.HTMLAttributes<HTMLHeadingElement>

export type HeadingProps = {
  className?: string
} & HeadingTags

export const Heading = forwardRef(
  (
    {
      className,
      children,
      as = defaultHeadingTag,
      size,
      letterSpacing,
      weight,
      width,
      ...rest
    }: PropsWithChildren<HeadingProps>,
    ref: Ref<HTMLHeadingElement>
  ) => {
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
    const widthClass = useMemo(() => buildClass('width', width), [width])
    const letterSpacingClass = useMemo(() => buildClass('letter-spacing', letterSpacing), [letterSpacing])

    const headingClassNames = clsx(
      styles.Heading,
      !size && styles[`Heading--${classMap[as]}`],
      size && styles[`Heading--${size}`],
      weight && weightClass,
      width && widthClass,
      letterSpacingClass && letterSpacingClass,
      className
    )

    const HeadingComponent = React.useCallback(
      ({...props}: React.HTMLAttributes<HTMLHeadingElement>) => {
        if (!HeadingTags.includes(as)) {
          // eslint-disable-next-line no-console
          console.error(`Heading: 'as' prop must be one of ${HeadingTags.join(', ')}`)
          return null
        }

        return React.createElement(as, props, children)
      },
      [as, children]
    )

    return (
      <HeadingComponent className={headingClassNames} ref={ref} {...rest}>
        {children}
      </HeadingComponent>
    )
  }
)
