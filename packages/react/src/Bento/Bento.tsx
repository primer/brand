import React, {ReactElement, forwardRef, useCallback, useMemo, Ref, PropsWithChildren} from 'react'
import {clsx} from 'clsx'
import {useWindowSize, BreakpointSize} from '../hooks/useWindowSize'
import type {BaseProps} from '../component-helpers'
import findElementInChildren from '../findElementInChildren'

import {Heading, Text, Link, HeadingProps, TextProps, LinkProps, ColorMode as FullColorMode, Image, Label} from '../'

import type {IconProps} from '../Icon'

import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/bento/base.css'
import styles from './Bento.module.css'

type ColorMode = Exclude<FullColorMode, 'auto'>

export type Size = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge'
export type ColumnIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

type ResponsiveColumnIndex = Partial<Record<Size, ColumnIndex>>
type ResponsiveRowIndex = Partial<Record<Size, number>>

type Flow = 'row' | 'column'
type ResponsiveFlow = Partial<Record<Size, Flow>>

type Align = 'start' | 'center' | 'end'
type ResponsiveAlign = Partial<Record<Size, Align>>

type Padding = 'condensed' | 'normal' | 'spacious'
type ResponsivePadding = Partial<Record<Size, Padding>>

type Order = 'default' | 'reversed'
type ResponsiveOrder = Partial<Record<Size, Order>>

type BentoProps = React.HTMLAttributes<HTMLDivElement> & BaseProps<HTMLDivElement>

const Root = ({className, ...rest}: BentoProps) => {
  return <section className={clsx(styles.Bento, className)} {...rest}></section>
}

type ValidChildren = React.ReactElement<BentoVisualProps | BentoContentProps>
type ValidItemChildren = [ValidChildren?, ValidChildren?]

type BentoItemProps = {
  columnStart?: ColumnIndex | ResponsiveColumnIndex
  columnSpan?: ColumnIndex | ResponsiveColumnIndex
  rowStart?: number | ResponsiveRowIndex
  rowSpan?: number | ResponsiveRowIndex
  flow?: Flow | ResponsiveFlow
  colorMode?: ColorMode
  visualAsBackground?: boolean
  order?: Order | ResponsiveOrder
  bgColor?: 'default' | 'subtle'
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

type ReturnOrderedChildrenProps = {
  order: Order | ResponsiveOrder
  children: React.ReactNode
  currentBreakpointSize?: BreakpointSize
}

const returnOrderedChildren = ({order, children, currentBreakpointSize}: ReturnOrderedChildrenProps) => {
  if (typeof order === 'string') {
    return order === 'default' ? children : React.Children.toArray(children).reverse()
  } else if (typeof order === 'object' && currentBreakpointSize) {
    // This handles setting the order based on breakpoints as you might expect via CSS
    const filledStyleOrder: ResponsiveOrder = {}
    let previousSize: Order = 'default'
    for (const size of Object.keys(BreakpointSize)) {
      const lowerCaseSize = size.toLocaleLowerCase()
      if (order[lowerCaseSize]) previousSize = order[lowerCaseSize]
      filledStyleOrder[lowerCaseSize] = order[lowerCaseSize] || previousSize
    }
    return filledStyleOrder[currentBreakpointSize] === 'default' ? children : React.Children.toArray(children).reverse()
  } else {
    return children
  }
}

const Item = ({
  className,
  columnStart,
  columnSpan = 12,
  rowStart,
  rowSpan = 2,
  flow = 'row',
  colorMode,
  visualAsBackground = false,
  order = 'default',
  bgColor = 'subtle',
  children,
  ...rest
}: BentoItemProps) => {
  const {currentBreakpointSize} = useWindowSize()

  const validChildren = React.Children.toArray(children).reduce<ValidItemChildren>((acc, child) => {
    if (React.isValidElement<BentoVisualProps>(child) && child.type === Visual) {
      acc.push(child)
    }
    if (React.isValidElement<BentoContentProps>(child) && child.type === Content) {
      acc.push(child)
    }
    return acc
  }, [])

  const contentChildPadding =
    validChildren.find(
      (child): child is React.ReactElement<BentoContentProps> =>
        React.isValidElement<BentoContentProps>(child) && child.type === Content,
    )?.props.padding || 'spacious'

  const bentoItemClassArray = [styles.Bento__Item, styles[`Bento__Item--bgColor-${bgColor}`]]

  bentoItemClassArray.push(
    ...returnClassBasedOnResponsiveMap('Bento__Item', 'column-span', columnSpan),
    ...returnClassBasedOnResponsiveMap('Bento__Item', 'row-span', rowSpan),
    ...returnClassBasedOnResponsiveMap('Bento__Item', 'column-start', columnStart),
    ...returnClassBasedOnResponsiveMap('Bento__Item', 'row-start', rowStart),
    ...returnClassBasedOnResponsiveMap('Bento__Item', 'flow', flow),
    ...returnClassBasedOnResponsiveMap('Bento__Item', 'gap', contentChildPadding),
  )

  if (!visualAsBackground && React.Children.toArray(children).length >= 1) {
    if (flow === 'column') {
      bentoItemClassArray.push(styles['Bento-column-padding-override'])
    }
    if (flow === 'row') {
      bentoItemClassArray.push(styles['Bento-row-padding-override'])
    }
  }

  const colorModeProp = colorMode ? {'data-color-mode': colorMode} : {}

  const orderedChildren = returnOrderedChildren({order, children: validChildren, currentBreakpointSize})

  return (
    <div
      {...colorModeProp}
      className={clsx(
        ...bentoItemClassArray,
        (visualAsBackground || React.Children.toArray(children).length === 1) &&
          styles[`Bento__Item--visual-as-background`],
        className,
      )}
      {...rest}
    >
      {orderedChildren}
    </div>
  )
}

type BentoContentProps = {
  leadingVisual?: ReactElement<IconProps>
  padding?: Padding | ResponsivePadding
  verticalAlign?: Align | ResponsiveAlign
  horizontalAlign?: Exclude<Align, 'end'> | Partial<Record<Size, Exclude<Align, 'end'>>>
} & React.HTMLAttributes<HTMLDivElement> &
  BaseProps<HTMLDivElement>

const Content = ({
  children,
  leadingVisual: LeadingVisual,
  padding = 'spacious',
  verticalAlign,
  horizontalAlign = 'start',
  className,
  ...rest
}: BentoContentProps) => {
  const bentoContentClassArray = [styles.Bento__Content]
  bentoContentClassArray.push(
    ...returnClassBasedOnResponsiveMap('Bento__Item', 'verticalAlign', verticalAlign),
    ...returnClassBasedOnResponsiveMap('Bento__Item', 'horizontalAlign', horizontalAlign),
    ...returnClassBasedOnResponsiveMap('Bento', 'padding', padding),
  )

  const memoizedChildren = useMemo(() => React.Children.toArray(children), [children])

  const HeadingChildren = memoizedChildren.filter(
    (child): child is React.ReactElement<BentoHeadingProps> =>
      React.isValidElement<BentoHeadingProps>(child) && child.type === _Heading,
  )

  const LabelChild = memoizedChildren.find(
    (child): child is React.ReactElement<TextProps> => React.isValidElement<TextProps>(child) && child.type === Label,
  )
  const TextChild = memoizedChildren.find(
    (child): child is React.ReactElement<TextProps> => React.isValidElement<TextProps>(child) && child.type === Text,
  )
  const LinkChild = memoizedChildren.find(
    (child): child is React.ReactElement<LinkProps> => React.isValidElement<LinkProps>(child) && child.type === Link,
  )

  return (
    <div className={clsx(styles[`Bento-padding--${padding}`], ...bentoContentClassArray, className)} {...rest}>
      {React.isValidElement<IconProps>(LeadingVisual) &&
        React.cloneElement(LeadingVisual, {
          className: styles['Bento__Content-icon'],
          size: LeadingVisual.props.size || 44,
        })}

      {React.isValidElement<TextProps>(LabelChild) &&
        React.cloneElement(LabelChild, {
          className: clsx(styles['Bento__Content-label'], LabelChild.props.className),
        })}

      {HeadingChildren.map(HeadingChild =>
        React.cloneElement(HeadingChild, {
          className: clsx(
            !React.isValidElement(TextChild) && styles['Bento__heading--no-text'],
            horizontalAlign === 'center' && styles['Bento__heading--with-max-width'],
            HeadingChild.props.className,
          ),
        }),
      )}

      {React.isValidElement<TextProps>(TextChild) &&
        React.cloneElement(TextChild, {
          variant: TextChild.props.variant || 'muted',
          as: TextChild.props.as || 'p',
          size: TextChild.props.size || '300',
          className: clsx(styles['Bento__Content-text'], TextChild.props.className),
        })}

      {React.isValidElement<LinkProps>(LinkChild) &&
        React.cloneElement(LinkChild, {
          variant: LinkChild.props.variant || 'accent',
          className: clsx(styles['Bento__call-to-action'], LinkChild.props.className),
        })}
    </div>
  )
}

type BentoHeadingProps = {
  variant?: 'default' | 'muted'
} & BaseProps<HTMLHeadingElement> &
  HeadingProps

const _Heading = forwardRef(
  (
    {
      as = 'h3',
      size = '5',
      weight = 'medium',
      variant = 'default',
      className,
      children,
      ...props
    }: PropsWithChildren<BentoHeadingProps>,
    ref: Ref<HTMLHeadingElement>,
  ) => {
    const childrenArray = useMemo(() => React.Children.toArray(children), [children])

    const getConditionalVariant = useCallback(() => {
      if (findElementInChildren(children, 'b') || findElementInChildren(children, 'em')) {
        return 'muted'
      }
      return 'default'
    }, [children])

    const defaultColor = childrenArray.length === 1 ? 'default' : getConditionalVariant()

    return (
      <Heading
        ref={ref}
        className={clsx(
          defaultColor === 'muted' && styles[`Bento__heading--muted`],
          variant === 'muted' && styles[`Bento__heading--muted`],
          className,
        )}
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
  horizontalAlign?: Align
  verticalAlign?: Align
  fillMedia?: boolean
  overflow?: 'hidden' | 'initial'
  position?: string
  padding?: Padding | ResponsivePadding
} & React.HTMLAttributes<HTMLDivElement> &
  BaseProps<HTMLDivElement>

const Visual = ({
  horizontalAlign,
  verticalAlign,
  fillMedia = true,
  overflow = 'hidden',
  position = '50% 50%',
  padding,
  className,
  children,
  ...rest
}: BentoVisualProps) => {
  const bentoVisualClassArray = [
    styles.Bento__Visual,
    horizontalAlign && styles[`Bento__Visual--horizontalAlign-${horizontalAlign}`],
    verticalAlign && styles[`Bento__Visual--verticalAlign-${verticalAlign}`],
    styles[`Bento__Visual--overflow-${overflow}`],
  ]
  bentoVisualClassArray.push(...returnClassBasedOnResponsiveMap('Bento', 'padding', padding))
  const childrenToRender = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      if (React.isValidElement<React.ImgHTMLAttributes<HTMLImageElement>>(child) && child.type === 'img') {
        return React.cloneElement(child, {
          style: {...child.props.style, objectPosition: position},
        })
      }
      if (React.isValidElement<React.ComponentProps<typeof Image>>(child) && child.type === Image) {
        return React.cloneElement(child, {
          style: {...child.props.style, objectPosition: position},
        })
      }
      return child
    }
    return null
  })
  return (
    <div
      className={clsx(
        ...bentoVisualClassArray,
        fillMedia && styles['Bento__Visual--fill'],
        !fillMedia && styles['Bento__Visual--no-fill'],
        className,
      )}
      {...rest}
    >
      {childrenToRender}
    </div>
  )
}

export const Bento = Object.assign(Root, {Item, Visual, Content, Heading: _Heading})
