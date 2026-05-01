import React, {forwardRef, PropsWithChildren, HTMLAttributes, type Ref, type JSX} from 'react'
import {clsx} from 'clsx'
import {Heading, HeadingProps, Text, Image, type ImageProps, Link, LinkProps} from '..'
import {Icon, defaultIconSize, iconSizeMap, type IconProps} from '../Icon'
import type {BaseProps} from '../component-helpers'
import {Colors} from '../constants'
import {useAnimation} from '../animation'

/**
 * Main stylesheet (as a CSS Module)
 */
import styles from './Pillar.module.css'

export const PillarIconColors = Colors

export const defaultPillarIconColor = 'green'
export const defaultPillarIconSize = defaultIconSize
const defaultPillarIconSizeWithoutBackground = 32
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

type IconComponentProps = React.SVGAttributes<SVGElement> & {size?: number}
type IconComponent = React.ComponentType<IconComponentProps> | React.ExoticComponent<IconComponentProps>

type PillarIconProps = Omit<IconProps, 'icon' | 'color'> & {
  icon: React.ReactNode | IconComponent
  color?: (typeof PillarIconColors)[number]
}

function isIconComponent(icon: unknown): icon is IconComponent {
  return (
    typeof icon === 'function' ||
    (typeof icon === 'object' &&
      icon !== null &&
      '$$typeof' in icon &&
      [Symbol.for('react.forward_ref'), Symbol.for('react.memo')].includes(icon.$$typeof as symbol))
  )
}

function getNumericIconSize(size: IconProps['size'], defaultSize = defaultPillarIconSizeWithoutBackground) {
  if (typeof size === 'number') {
    return size
  }

  if (size) {
    return iconSizeMap[size]
  }

  return defaultSize
}

function renderIconWithoutBackground(icon: PillarIconProps['icon'], props: IconComponentProps) {
  if (isIconComponent(icon)) {
    return React.createElement(icon, props)
  }

  if (React.isValidElement<IconComponentProps>(icon)) {
    return React.cloneElement(icon, props)
  }

  return null
}

function PillarIcon({
  icon,
  className,
  color = defaultPillarIconColor,
  hasBackground = true,
  size,
  ...props
}: PillarIconProps) {
  if (!isIconComponent(icon) && !React.isValidElement(icon)) {
    return null
  }

  if (!hasBackground) {
    const {style, ...iconProps} = props

    return (
      <span
        className={clsx(styles.Pillar__icon, styles['Pillar__icon--without-background'], className)}
        style={{color: `var(--brand-Icon-color-${color})`, ...style}}
      >
        {renderIconWithoutBackground(icon, {
          ...iconProps,
          size: getNumericIconSize(size),
        })}
      </span>
    )
  }

  return (
    <Icon
      className={clsx(styles.Pillar__icon, styles['Pillar__icon--with-background'], className)}
      color={color}
      hasBackground
      icon={icon as IconProps['icon']}
      size={size ?? defaultPillarIconSize}
      {...props}
    />
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
