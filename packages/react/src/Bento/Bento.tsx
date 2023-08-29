import React, {ReactHTML, ReactElement, forwardRef, useCallback, useMemo, Ref, PropsWithChildren} from 'react'
import clsx from 'clsx'
import {Icon, IconProps} from '@primer/octicons-react'
import type {BaseProps} from '../component-helpers'
import {Heading, Text, Link, HeadingProps, TextProps, LinkProps, ColorModesEnum} from '../'

import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/bento/colors-with-modes.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/bento/base.css'
import styles from './Bento.module.css'

export type Size = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge'
export type ColumnIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

type ResponsiveColumnIndex = Partial<Record<Size, ColumnIndex>>
type ResponsiveRowIndex = Partial<Record<Size, number>>

type Flow = 'row' | 'column'
type ResponsiveFlow = Partial<Record<Size, Flow>>

type Align = 'start' | 'center' | 'end'
type ResponsiveAlign = Partial<Record<Size, Align>>

type ReducedAlign = 'start' | 'center'
type ResponsiveReducedAlign = Partial<Record<Size, Align>>

type Padding = 'condensed' | 'normal' | 'spacious'
type ResponsivePadding = Partial<Record<Size, Padding>>

type BentoProps = React.HTMLAttributes<HTMLDivElement> & BaseProps<HTMLDivElement>

const Root = ({className, ...rest}: BentoProps) => {
  return <section className={clsx(styles.Bento, className)} {...rest}></section>
}

type BentoItemProps = {
  columnStart?: ColumnIndex | ResponsiveColumnIndex
  columnSpan?: ColumnIndex | ResponsiveColumnIndex
  rowStart?: number | ResponsiveRowIndex
  rowSpan?: number | ResponsiveRowIndex
  flow?: Flow | ResponsiveFlow
  colorMode?: ColorModesEnum.LIGHT | ColorModesEnum.DARK
  visualAsBackground?: boolean
} & React.HTMLAttributes<HTMLDivElement> &
  BaseProps<HTMLDivElement>

const returnClassBasedOnResponsiveMap = (
  classIdentifier: string,
  propName: string,
  prop?:
    | ResponsiveColumnIndex
    | ColumnIndex
    | ResponsiveRowIndex
    | number
    | ResponsiveFlow
    | Flow
    | ResponsiveAlign
    | Align
    | ResponsivePadding
    | Padding,
) => {
  const classesToMerge: string[] = []
  if (typeof prop === 'number' || typeof prop === 'string') {
    classesToMerge.push(styles[`${classIdentifier}--${propName}-${prop}`])
  } else if (typeof prop === 'object') {
    for (const [key, value] of Object.entries(prop)) {
      classesToMerge.push(styles[`${classIdentifier}--${key}-${propName}-${value}`])
    }
  }
  return classesToMerge
}

const Item = ({
  className,
  columnStart,
  columnSpan,
  rowStart,
  rowSpan,
  flow = 'row',
  colorMode,
  visualAsBackground = false,
  children,
  ...rest
}: BentoItemProps) => {
  const bentoItemClassArray = [styles.Bento__Item]
  bentoItemClassArray.push(
    ...returnClassBasedOnResponsiveMap('Bento__Item', 'column-span', columnSpan),
    ...returnClassBasedOnResponsiveMap('Bento__Item', 'row-span', rowSpan),
    ...returnClassBasedOnResponsiveMap('Bento__Item', 'column-start', columnStart),
    ...returnClassBasedOnResponsiveMap('Bento__Item', 'row-start', rowStart),
    ...returnClassBasedOnResponsiveMap('Bento__Item', 'flow', flow),
  )

  if (!visualAsBackground) {
    flow === 'column' && bentoItemClassArray.push(styles['Bento-column-padding-override'])
    flow === 'row' && bentoItemClassArray.push(styles['Bento-row-padding-override'])
  }

  const colorModeProp = colorMode ? {'data-color-mode': colorMode} : {}

  return (
    <div
      {...colorModeProp}
      className={clsx(
        ...bentoItemClassArray,
        visualAsBackground && styles[`Bento__Item--visual-as-background`],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

type BentoContentProps = {
  leadingVisual?: ReactElement | Icon
  padding?: Padding | ResponsivePadding
  verticalAlign?: Align | ResponsiveAlign
  horizontalAlign?: ReducedAlign | ResponsiveReducedAlign
  fixedBottomLink?: boolean
} & React.HTMLAttributes<HTMLDivElement> &
  BaseProps<HTMLDivElement>

const Content = ({
  children,
  leadingVisual: LeadingVisual,
  padding = 'normal',
  verticalAlign = 'start',
  horizontalAlign = 'start',
  fixedBottomLink = false,
  className,
  ...rest
}: BentoContentProps) => {
  const bentoContentClassArray = [styles.Bento__Content]
  bentoContentClassArray.push(
    ...returnClassBasedOnResponsiveMap('Bento__Item', 'verticalAlign', verticalAlign),
    ...returnClassBasedOnResponsiveMap('Bento__Item', 'horizontalAlign', horizontalAlign),
    ...returnClassBasedOnResponsiveMap('Bento', 'padding', padding),
  )
  const HeadingChild = React.Children.toArray(children).find(
    child => React.isValidElement(child) && child.type === _Heading,
  )

  const TextChild = React.Children.toArray(children).find(child => React.isValidElement(child) && child.type === Text)
  const LinkChild = React.Children.toArray(children).find(child => React.isValidElement(child) && child.type === Link)
  return (
    <div className={clsx(styles[`Bento-padding--${padding}`], ...bentoContentClassArray, className)} {...rest}>
      {React.isValidElement(LeadingVisual) &&
        React.cloneElement(LeadingVisual as React.ReactElement<IconProps>, {
          className: styles['Bento__Content-icon'],
          size: LeadingVisual['size'] || 44,
        })}
      {React.isValidElement(HeadingChild) && React.cloneElement(HeadingChild as React.ReactElement<BentoHeadingProps>)}
      {React.isValidElement(TextChild) &&
        React.cloneElement(TextChild as React.ReactElement<TextProps>, {
          variant: TextChild.props.variant || 'muted',
          as: TextChild.props.as || 'p',
          size: TextChild.props.size || '300',
          className: clsx(styles['Bento_Content-text'], TextChild.props.className),
        })}
      {React.isValidElement(LinkChild) &&
        React.cloneElement(LinkChild as React.ReactElement<LinkProps>, {
          variant: LinkChild.props.variant || 'accent',
          className: clsx(
            styles['Bento__call-to-action'],
            fixedBottomLink && styles['Bento__call-to-action--fixed'],
            LinkChild.props.className,
          ),
        })}
    </div>
  )
}

type BentoHeadingProps = BaseProps<HTMLHeadingElement> & HeadingProps

const defaultHeadingTag = 'h3'
const defaultHeadingSize = '5'
const defaultHeadingWeight = 'medium'

const _Heading = forwardRef(
  (
    {
      as = defaultHeadingTag,
      size = defaultHeadingSize,
      weight = defaultHeadingWeight,
      className,
      children,
      ...props
    }: PropsWithChildren<BentoHeadingProps>,
    ref: Ref<HTMLHeadingElement>,
  ) => {
    const childrenArray = useMemo(() => React.Children.toArray(children), [children])

    const getConditionalVariant = useCallback(() => {
      if (childrenArray.some(child => React.isValidElement(child) && child.type === 'em')) {
        return 'muted'
      }
      return 'default'
    }, [childrenArray])

    const defaultColor = childrenArray.length === 1 ? 'default' : getConditionalVariant()

    return (
      <Heading
        ref={ref}
        className={clsx(defaultColor === 'muted' && styles[`Bento__heading--muted`], className)}
        size={size}
        as={as}
        weight={weight}
        {...props}
      >
        {children}
      </Heading>
    )
  },
)

type BentoVisualProps = {
  fillMedia?: boolean
  position?: string
  padding?: 'condensed' | 'normal' | 'spacious'
} & React.HTMLAttributes<HTMLDivElement> &
  BaseProps<HTMLDivElement>

const Visual = ({fillMedia = true, position = '50% 50%', padding, className, children, ...rest}: BentoVisualProps) => {
  const childrenToRender = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      if (child.type === 'img') {
        return React.cloneElement(child as ReturnType<ReactHTML['img']>, {
          style: {objectPosition: position},
        })
      }
      return child
    }
  })
  return (
    <div
      className={clsx(
        styles.Bento__Visual,
        !fillMedia && styles['Bento__Visual-no-fill'],
        !!padding && styles[`Bento-padding--${padding}`],
        className,
      )}
      {...rest}
    >
      {childrenToRender}
    </div>
  )
}

export const Bento = Object.assign(Root, {Item, Visual, Content, Heading: _Heading})
