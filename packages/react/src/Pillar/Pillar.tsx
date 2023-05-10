import React, {forwardRef, PropsWithChildren, type Ref} from 'react'
import clsx from 'clsx'
import {Heading, HeadingTags, HeadingProps, Text} from '..'
import type {BaseProps} from '../component-helpers'
import {Colors} from '../constants'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/pillar/base.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/pillar/colors-with-modes.css'

/**
 * Main stylesheet (as a CSS Module)
 */
import styles from './Pillar.module.css'
import {Icon as IconProps} from '@primer/octicons-react'

export const PillarIconColors = Colors

export const defaultPillarIconColor = PillarIconColors[0]
export type PillarProps<C extends keyof JSX.IntrinsicElements = 'div'> = BaseProps<C> & {
  /**
   * The HTML element used to render the grid.
   */
  as?: C | 'div' | 'span' | 'article'
  /**
   * Valid children include Pillar.Image, Pillar.Heading, and Pillar.Description
   */
  children:
    | React.ReactNode
    | React.ReactElement<PillarIconProps>
    | React.ReactElement<PillarHeadingProps>
    | React.ReactElement<PillarDescriptionProps>
  /**
   * Aligns the pillar content
   */
  align?: 'start' | 'center'
} & (C extends 'span'
    ? BaseProps<HTMLSpanElement>
    : C extends 'article'
    ? BaseProps<HTMLElement>
    : BaseProps<HTMLDivElement>)

const PillarRoot = forwardRef(
  (
    {children, className, as = 'div', align = 'start', ...props}: PropsWithChildren<PillarProps>,
    ref: Ref<HTMLDivElement>
  ) => {
    const filteredChildren = React.Children.toArray(children).filter(child => {
      if (React.isValidElement(child) && typeof child.type !== 'string') {
        if (child.type === PillarIcon || child.type === PillarHeading || child.type === PillarDescription) {
          return true
        }
      }
      return false
    })

    const validElements = ['div', 'span', 'section']
    const Component = validElements.includes(as) ? as : 'div'

    return (
      <Component className={clsx(styles.Pillar, className, styles[`Pillar--align-${align}`])} ref={ref} {...props}>
        {filteredChildren}
      </Component>
    )
  }
)

type PillarIconProps = BaseProps<HTMLSpanElement> & {
  icon: React.ReactNode | IconProps
  color?: typeof PillarIconColors[number]
}

function PillarIcon({icon: Icon, className, color = defaultPillarIconColor, ...rest}: PillarIconProps) {
  return (
    <span className={clsx(styles.Pillar__icon, styles[`Pillar__icon--color-${color}`], className)} {...rest}>
      {typeof Icon === 'function' ? <Icon size={24} /> : React.isValidElement(Icon) && React.cloneElement(Icon)}
    </span>
  )
}

type PillarHeadingProps = BaseProps<HTMLHeadingElement> & {
  children: React.ReactNode | React.ReactNode[]
  as?: Exclude<HeadingTags['as'], 'h1'>
} & HeadingProps

const PillarHeading = forwardRef<HTMLHeadingElement, PillarHeadingProps>(
  ({children, as = HeadingTags[2], size = '6', className, ...rest}, ref) => {
    return (
      <Heading size={size} className={clsx(styles.Pillar__heading, className)} ref={ref} as={as} {...rest}>
        {children}
      </Heading>
    )
  }
)

type PillarDescriptionProps = BaseProps<HTMLParagraphElement> & {
  children: React.ReactNode | React.ReactNode[]
}

const PillarDescription = forwardRef<HTMLParagraphElement, PillarDescriptionProps>(
  ({children, className, ...rest}, ref) => {
    return (
      <Text
        variant="muted"
        ref={ref}
        size="300"
        as="p"
        className={clsx(styles.Pillar__description, className)}
        {...rest}
      >
        {children}
      </Text>
    )
  }
)

/**
 * Pillar component:
 * {@link https://primer.style/brand/components/Pillar/ See usage examples}.
 */
export const Pillar = Object.assign(PillarRoot, {
  Icon: PillarIcon,
  Heading: PillarHeading,
  Description: PillarDescription
})
