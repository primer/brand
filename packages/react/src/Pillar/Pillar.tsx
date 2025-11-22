import React, {forwardRef, PropsWithChildren, HTMLAttributes, type Ref, type JSX} from 'react'
import {clsx} from 'clsx'
import {Heading, HeadingProps, Text, Image, type ImageProps, Link, LinkProps} from '..'
import type {BaseProps} from '../component-helpers'
import {Colors} from '../constants'
import {useAnimation} from '../animation'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/pillar/colors-with-modes.css'

/**
 * Main stylesheet (as a CSS Module)
 */
import styles from './Pillar.module.css'

export const PillarIconColors = Colors

export const defaultPillarIconColor = PillarIconColors[0]
export type PillarProps<C extends keyof JSX.IntrinsicElements = 'div'> = React.HTMLAttributes<C> & {
  /**
   * The HTML element used to render the Pillar.
   */
  as?: C | 'div' | 'article'
  /**
   * Aligns the pillar content
   */
  align?: 'start' | 'center'
  /**
   * Enables optional border around the pillar content
   */
  hasBorder?: boolean
} & (C extends 'article' ? PropsWithChildren<BaseProps<HTMLElement>> : PropsWithChildren<BaseProps<HTMLDivElement>>)

const PillarRoot = forwardRef(
  (
    {
      children,
      className,
      animate,
      as = 'div',
      align = 'start',
      style,
      hasBorder = false,
      ...rest
    }: PropsWithChildren<PillarProps>,
    ref: Ref<HTMLDivElement>,
  ) => {
    const {classes: animationClasses, styles: animationInlineStyles} = useAnimation(animate)

    const filteredChildren = React.Children.toArray(children).filter(child => {
      if (React.isValidElement(child) && typeof child.type !== 'string') {
        if (
          child.type === PillarImage ||
          child.type === PillarIcon ||
          child.type === PillarHeading ||
          child.type === PillarDescription ||
          child.type === PillarLink
        ) {
          return true
        }
      }
      return false
    })

    const validElements = ['div', 'article']
    const Component = validElements.includes(as) ? as : 'div'

    return (
      <Component
        className={clsx(
          styles.Pillar,
          styles[`Pillar--align-${align}`],
          hasBorder && styles['Pillar--has-border'],
          animationClasses,
          className,
        )}
        ref={ref}
        {...(rest as HTMLAttributes<HTMLElement>)}
        style={{...animationInlineStyles, ...style}}
      >
        {filteredChildren}
      </Component>
    )
  },
)

type PillarImageProps = ImageProps

function PillarImage({className, ...rest}: PillarImageProps) {
  return (
    <div className={styles.Pillar__image}>
      <Image className={className} {...rest} />
    </div>
  )
}

type IconComponent = React.ComponentType<{size?: number}>

type PillarIconProps = BaseProps<HTMLSpanElement> & {
  icon: React.ReactNode | IconComponent
  color?: (typeof PillarIconColors)[number]
}

function PillarIcon({icon: Icon, className, color = defaultPillarIconColor, ...rest}: PillarIconProps) {
  return (
    <span
      className={clsx(styles.Pillar__icon, styles[`Pillar__icon--color-${color}`], className)}
      {...rest}
      aria-hidden="true"
    >
      {typeof Icon === 'function'
        ? React.createElement(Icon as IconComponent, {size: 32})
        : React.isValidElement<{size?: number}>(Icon)
        ? React.cloneElement(Icon, {
            size: 32,
          })
        : null}
    </span>
  )
}

type PillarHeadingProps = BaseProps<HTMLHeadingElement> & {
  children: React.ReactNode | React.ReactNode[]
  as?: Exclude<HeadingProps['as'], 'h1'>
} & HeadingProps

const PillarHeading = forwardRef<HTMLHeadingElement, PillarHeadingProps>(
  ({children, as = 'h3', size = 'subhead-large', className, ...rest}, ref) => {
    return (
      <Heading
        size={size}
        className={clsx(styles.Pillar__heading, styles[`Pillar__heading--size-${size}`], className)}
        ref={ref}
        as={as}
        {...rest}
      >
        {children}
      </Heading>
    )
  },
)

type PillarDescriptionProps = PropsWithChildren<BaseProps<HTMLParagraphElement>>

const PillarDescription = forwardRef<HTMLParagraphElement, PillarDescriptionProps>(
  ({children, className, ...rest}, ref) => {
    return (
      <Text
        variant="muted"
        ref={ref}
        size="200"
        as="p"
        className={clsx(styles.Pillar__description, className)}
        {...rest}
      >
        {children}
      </Text>
    )
  },
)

type PillarLinkProps = {
  href: string
} & Omit<LinkProps, 'size' | 'direction'> &
  BaseProps<HTMLAnchorElement>

const PillarLink = forwardRef(({className, children, href, ...props}: PillarLinkProps, ref: Ref<HTMLAnchorElement>) => {
  return (
    <Link variant="accent" href={href} ref={ref} className={clsx(styles.Pillar__link, className)} {...props}>
      {children}
    </Link>
  )
})

/**
 * Pillar component:
 * {@link https://primer.style/brand/components/Pillar/ See usage examples}.
 */
export const Pillar = Object.assign(PillarRoot, {
  Icon: PillarIcon,
  Image: PillarImage,
  Heading: PillarHeading,
  Description: PillarDescription,
  Link: PillarLink,
})
