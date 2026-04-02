import React, {forwardRef, PropsWithChildren, useMemo, type Ref, useCallback} from 'react'
import {clsx} from 'clsx'
import {Grid} from '../Grid'
import {Link, LinkProps} from '../Link'
import {Heading, HeadingProps, defaultHeadingTag} from '../Heading'
import {Text, TextProps} from '../Text'
import {Icon, IconProps} from '../Icon'
import {useAnimation} from '../animation'

import styles from './SectionIntroStacked.module.css'

import type {BaseProps} from '../component-helpers'

export const SectionIntroStackedVariants = ['default', 'gridline'] as const
export type SectionIntroStackedVariant = (typeof SectionIntroStackedVariants)[number]

export type SectionIntroStackedProps = React.HTMLAttributes<HTMLElement> &
  BaseProps<HTMLElement> &
  PropsWithChildren & {
    variant?: SectionIntroStackedVariant
  }

const Root = forwardRef<HTMLElement, PropsWithChildren<SectionIntroStackedProps>>(
  ({animate, className, children, style, variant = 'default', ...props}, ref) => {
    const {classes: animationClasses, styles: animationInlineStyles} = useAnimation(animate)

    const childrenArray = React.Children.toArray(children)

    // extract Items and everything else into two separate arrays
    const items = childrenArray.filter(child => React.isValidElement(child) && child.type === ItemsBase)

    const otherChildren = childrenArray.filter(child => !items.includes(child))

    return (
      <header
        ref={ref}
        className={clsx(
          styles.SectionIntroStacked,
          variant === 'gridline' && styles['SectionIntroStacked--variant-gridline'],
          animationClasses,
          className,
        )}
        {...props}
        style={{...animationInlineStyles, ...style}}
      >
        <Grid fullWidth enableGutters={variant !== 'gridline'}>
          <Grid.Column span={{large: 6}}>{otherChildren}</Grid.Column>
          <Grid.Column
            span={variant === 'gridline' ? {large: 6} : {large: 5}}
            start={variant === 'gridline' ? {large: 7} : {large: 8}}
          >
            {items}
          </Grid.Column>
        </Grid>
      </header>
    )
  },
)

type SectionIntroStackedHeadingProps = BaseProps<HTMLHeadingElement> & HeadingProps

const defaultHeadingSize = '3'

const _Heading = forwardRef(
  (
    {
      as = defaultHeadingTag,
      size = defaultHeadingSize,
      className,
      children,
      ...props
    }: PropsWithChildren<SectionIntroStackedHeadingProps>,
    ref: Ref<HTMLHeadingElement>,
  ) => {
    const childrenArray = useMemo(() => React.Children.toArray(children), [children])

    const getConditionalVariant = useCallback(() => {
      if (childrenArray.some(child => React.isValidElement(child) && (child.type === 'b' || child.type === 'em'))) {
        return 'muted'
      }
      return 'default'
    }, [childrenArray])

    const defaultColor = childrenArray.length === 1 ? 'default' : getConditionalVariant()

    return (
      <Heading
        ref={ref}
        className={clsx(
          styles[`SectionIntroStacked-heading`],
          defaultColor === 'muted' && styles[`SectionIntroStacked-heading--muted`],
          className,
        )}
        size={size}
        as={as}
        {...props}
      >
        {children}
      </Heading>
    )
  },
)

type SectionIntroStackedDescriptionProps = Omit<TextProps, 'as' | 'variant'> &
  BaseProps<HTMLParagraphElement> & {
    as?: 'p'
    children: React.ReactNode | React.ReactNode[]
  }

const _Description = forwardRef(
  ({className, children, ...props}: SectionIntroStackedDescriptionProps, ref: Ref<HTMLParagraphElement>) => {
    return (
      <Text
        as="p"
        className={clsx(styles['SectionIntroStacked-description'], className)}
        ref={ref}
        variant="muted"
        {...props}
      >
        {children}
      </Text>
    )
  },
)

type SectionIntroStackedLinkProps = LinkProps & BaseProps<HTMLAnchorElement>

const _Link = forwardRef(
  (
    {className, children, variant = 'accent', size = 'medium', ...props}: SectionIntroStackedLinkProps,
    ref: Ref<HTMLAnchorElement>,
  ) => {
    return (
      <Link
        ref={ref}
        className={clsx(styles['SectionIntroStacked-link'], className)}
        size={size}
        variant={variant}
        {...props}
      >
        {children}
      </Link>
    )
  },
)

type SectionIntroStackedItemsProps = BaseProps<HTMLUListElement>

const ItemsBase = ({animate, className, children, ...rest}: PropsWithChildren<SectionIntroStackedItemsProps>) => {
  const {classes: animationClasses, styles: animationInlineStyles} = useAnimation(animate)

  const timelineClassName = clsx(animationClasses, styles['SectionIntroStacked-items'], className)

  return (
    <ul className={timelineClassName} style={{...animationInlineStyles}} {...rest}>
      {children}
    </ul>
  )
}

type SectionIntroStackedItemIconProps = IconProps

const ItemIcon = ({className, color = 'green', ...props}: SectionIntroStackedItemIconProps) => {
  return (
    <Icon
      className={clsx(styles['SectionIntroStackedItem__icon'], className)}
      hasBackground
      size="medium"
      color={color}
      {...props}
    />
  )
}

type SectionIntroStackedItemHeadingProps = HeadingProps

const ItemHeading = forwardRef(
  (
    {
      as = 'h3',
      size = 'subhead-large',
      className,
      children,
      ...props
    }: PropsWithChildren<SectionIntroStackedItemHeadingProps>,
    ref: Ref<HTMLHeadingElement>,
  ) => {
    return (
      <Heading
        ref={ref}
        as={as}
        size={size}
        className={clsx(styles['SectionIntroStackedItem__heading'], className)}
        {...props}
      >
        {children}
      </Heading>
    )
  },
)

type SectionIntroStackedItemDescriptionProps = Omit<TextProps, 'as' | 'variant' | 'size'> &
  BaseProps<HTMLParagraphElement> & {
    as?: 'p'
    children: React.ReactNode | React.ReactNode[]
  }

const ItemDescription = forwardRef(
  ({className, children, ...props}: SectionIntroStackedItemDescriptionProps, ref: Ref<HTMLParagraphElement>) => {
    return (
      <Text
        as="p"
        variant="muted"
        size="200"
        className={clsx(styles['SectionIntroStackedItem__description'], className)}
        ref={ref}
        {...props}
      >
        {children}
      </Text>
    )
  },
)

export type SectionIntroStackedItemProps = BaseProps<HTMLLIElement>

const ItemBase = ({className, children, ...rest}: PropsWithChildren<SectionIntroStackedItemProps>) => {
  const itemClassName = clsx(styles['SectionIntroStackedItem-item'], className)
  const childrenArray = useMemo(() => React.Children.toArray(children), [children])

  const hasSubComponents = childrenArray.some(
    child =>
      React.isValidElement(child) &&
      (child.type === ItemIcon || child.type === ItemHeading || child.type === ItemDescription),
  )

  if (hasSubComponents) {
    const iconChild = childrenArray.find(child => React.isValidElement(child) && child.type === ItemIcon)

    const contentChildren = childrenArray.filter(child => !(React.isValidElement(child) && child.type === ItemIcon))

    return (
      <li className={clsx(itemClassName, !!iconChild && styles['SectionIntroStackedItem-item--with-icon'])} {...rest}>
        {iconChild}
        <div className={styles['SectionIntroStackedItem__content']}>{contentChildren}</div>
      </li>
    )
  }

  const getConditionalVariant = () => {
    if (childrenArray.some(child => React.isValidElement(child) && (child.type === 'b' || child.type === 'em'))) {
      return 'muted'
    }
    return 'default'
  }

  const defaultColor = childrenArray.length === 1 ? 'default' : getConditionalVariant()
  return (
    <li className={itemClassName} {...rest}>
      <Text
        as="span"
        className={clsx(
          styles['SectionIntroStackedItem__item-text'],
          defaultColor === 'muted' && styles[`SectionIntroStackedItem__item-text--muted`],
        )}
        size="350"
      >
        {children}
      </Text>
    </li>
  )
}

export const SectionIntroStacked = Object.assign(Root, {
  Heading: _Heading,
  Description: _Description,
  Link: _Link,
  Items: ItemsBase,
  Item: ItemBase,
  ItemIcon,
  ItemHeading,
  ItemDescription,
})
