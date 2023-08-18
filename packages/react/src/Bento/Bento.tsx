import React, {ReactHTML} from 'react'
import clsx from 'clsx'
import type {BaseProps} from '../component-helpers'
import {Heading, Text, Link, HeadingProps, TextProps, LinkProps} from '../'

import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/bento/colors-with-modes.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/bento/base.css'
import styles from './Bento.module.css'

export type ColumnIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

type ResponsiveMap = {
  xsmall?: ColumnIndex
  small?: ColumnIndex
  medium?: ColumnIndex
  large?: ColumnIndex
  xlarge?: ColumnIndex
  xxlarge?: ColumnIndex
}

type Flow = 'row' | 'column'

type ResponsiveFlow = {
  xsmall?: Flow
  small?: Flow
  medium?: Flow
  large?: Flow
  xlarge?: Flow
  xxlarge?: Flow
}

type Align = 'start' | 'center' | 'end'

type ResponsiveAlign = {
  xsmall?: Flow
  small?: Flow
  medium?: Flow
  large?: Flow
  xlarge?: Flow
  xxlarge?: Flow
}

type BentoProps = React.HTMLAttributes<HTMLDivElement> & BaseProps<HTMLDivElement>

const Root = ({className, ...rest}: BentoProps) => {
  return <section className={clsx(styles.Bento, className)} {...rest}></section>
}

type BentoItemProps = {
  columnStart?: ColumnIndex | ResponsiveMap
  columnSpan?: ColumnIndex | ResponsiveMap
  rowStart?: number | ResponsiveMap
  rowSpan?: number | ResponsiveMap
  flow?: Flow | ResponsiveFlow
  horizontalAlign?: Align | ResponsiveAlign
  verticalAlign?: Align | ResponsiveAlign
  colorMode?: 'light' | 'dark'
  visualAsBackground?: boolean
} & React.HTMLAttributes<HTMLDivElement> &
  BaseProps<HTMLDivElement>

const returnClassBasedOnResponsiveMap = (
  propName: string,
  prop?: (ColumnIndex | ResponsiveMap) | (number | ResponsiveMap) | (Flow | ResponsiveFlow) | (Align | ResponsiveAlign),
) => {
  const classesToMerge: string[] = []
  if (typeof prop === 'number' || typeof prop === 'string') {
    classesToMerge.push(styles[`Bento__Item--${propName}-${prop}`])
  } else if (typeof prop === 'object') {
    for (const [key, value] of Object.entries(prop)) {
      classesToMerge.push(styles[`Bento__Item--${key}-${propName}-${value}`])
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
  flow,
  horizontalAlign = 'center',
  verticalAlign = 'center',
  colorMode = 'light',
  visualAsBackground = false,
  children,
  ...rest
}: BentoItemProps) => {
  const bentoItemClassArray = [styles.Bento__Item]
  bentoItemClassArray.push(
    ...returnClassBasedOnResponsiveMap('column-span', columnSpan),
    ...returnClassBasedOnResponsiveMap('row-span', rowSpan),
    ...returnClassBasedOnResponsiveMap('column-start', columnStart),
    ...returnClassBasedOnResponsiveMap('row-start', rowStart),
    ...returnClassBasedOnResponsiveMap('flow', flow),
    ...returnClassBasedOnResponsiveMap('horizontalAlign', horizontalAlign),
    ...returnClassBasedOnResponsiveMap('verticalAlign', verticalAlign),
  )

  return (
    <div
      data-color-mode={colorMode}
      className={clsx(
        ...bentoItemClassArray,
        // flow && styles[`Bento__Item--flow-${flow}`],
        styles[`Bento__Item-verticalAlign--${verticalAlign}`],
        styles[`Bento__Item-horizontalAlign--${horizontalAlign}`],
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
  padding?: 'condensed' | 'normal' | 'spacious'
} & React.HTMLAttributes<HTMLDivElement> &
  BaseProps<HTMLDivElement>

const Content = ({children, padding, className, ...rest}: BentoContentProps) => {
  const HeadingChild = React.Children.toArray(children).find(
    child => React.isValidElement(child) && child.type === Heading,
  )
  const TextChild = React.Children.toArray(children).find(child => React.isValidElement(child) && child.type === Text)
  const LinkChild = React.Children.toArray(children).find(child => React.isValidElement(child) && child.type === Link)
  return (
    <div className={clsx(!!padding && styles[`Bento-padding--${padding}`], styles.Bento__Content, className)} {...rest}>
      <div>
        {React.isValidElement(HeadingChild) && (
          <div className={styles.Bento__heading}>
            {React.cloneElement(HeadingChild as React.ReactElement<HeadingProps>, {
              // as uses h3 default, but can be overridden
              as: HeadingChild.props.as || 'h3',
              size: HeadingChild.props.size || '3',
            })}
          </div>
        )}

        {React.isValidElement(TextChild) && (
          <div className={styles['Bento__body-text']}>
            {React.cloneElement(TextChild as React.ReactElement<TextProps>, {
              variant: 'muted',
              as: 'p',
              className: clsx(styles.Bento__text, TextChild.props.className),
            })}
          </div>
        )}
      </div>
      {React.isValidElement(LinkChild) && (
        <div className={styles['Bento__call-to-action']}>
          {React.cloneElement(LinkChild as React.ReactElement<LinkProps>, {
            className: clsx(styles['Bento__call-to-action'], LinkChild.props.className),
          })}
        </div>
      )}
    </div>
  )
}

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

export const Bento = Object.assign(Root, {Item, Visual, Content})
