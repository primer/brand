import React from 'react'
import clsx from 'clsx'
import {Heading, Text, Link} from '../'

import styles from './Bento.module.css'

type ColumnIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
type ResponsiveMap = {
  xs?: 2
  sm?: 4
  md?: 6
  lg?: 8
  xl?: 10
  xxl?: 12
}

type BentoProps = {} & React.HTMLAttributes<HTMLDivElement>

const Root = ({className, ...rest}: BentoProps) => {
  return <section className={clsx(styles.Bento, className)} {...rest}></section>
}

type BentoItemProps = {
  columnStart?: ColumnIndex | ResponsiveMap // defaults to 12
  columnSpan?: ColumnIndex | ResponsiveMap // defaults to 1
  rowStart?: number | ResponsiveMap // defaults to 1
  rowSpan?: number | ResponsiveMap // defaults to 1
  flow?: 'row' | 'column' | ResponsiveMap // defaults to row
  align?: 'start' | 'center' | ResponsiveMap // defaults to start
  verticalAlign?: 'start' | 'center' | 'end' | ResponsiveMap // defaults to start
  colorMode?: 'light | dark' // default to light
} & React.HTMLAttributes<HTMLDivElement>

const Item = ({
  className,
  columnStart,
  columnSpan,
  rowStart,
  rowSpan,
  flow,
  align,
  verticalAlign,
  colorMode,
  ...rest
}: BentoItemProps) => {
  return (
    <div
      className={clsx(
        styles.Bento__Item,
        columnSpan && styles[`Bento__Item--column-span-${columnSpan}`],
        rowSpan && styles[`Bento__Item--row-span-${rowSpan}`],
        columnStart && styles[`Bento__Item--column-start-${columnStart}`],
        rowStart && styles[`Bento__Item--row-start-${rowStart}`],
        className,
      )}
      {...rest}
    ></div>
  )
}

type BentoContentProps = {
  // Similar to the River.Content component:
  // Icon, Text,Heading, Link are the only children accepted. They can be composed in any order, but their rendered output will always be in a predetermined order.
} & React.HTMLAttributes<HTMLDivElement>

//   const filteredChildren = React.Children.toArray(children).filter(child => {
//     if (React.isValidElement(child) && typeof child.type !== 'string') {
//       if (isFragment(child) || child.type === HTMLImageElement) {
//         return true
//       }
//     }
//     return false
//   })

const Content = ({children}: BentoContentProps) => {
  const HeadingChild = React.Children.toArray(children).find(
    child => React.isValidElement(child) && child.type === Heading,
  )
  const TextChild = React.Children.toArray(children).find(child => React.isValidElement(child) && child.type === Text)
  const LinkChild = React.Children.toArray(children).find(child => React.isValidElement(child) && child.type === Link)
  return <div>{children}</div>
}

type BentoVisualProps = {
  fillMedia?: boolean // defaults to true
  isBackground?: 'false' | 'true' // defaults to false
  position?: string // defaults to 50% 50%
  padding?: 'condensed' | 'normal' | 'spacious' //defaults to none
} & React.HTMLAttributes<HTMLDivElement>

const Visual = ({
  fillMedia = true,
  isBackground,
  position = '50% 50%',
  padding,
  className,
  children,
  ...rest
}: BentoVisualProps) => {
  const childrenToRender = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      if (child.type === 'img') {
        return React.cloneElement(child, {
          // TODO: This works but the type is incorrect
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
