import React, {forwardRef, PropsWithChildren, useMemo, type Ref, useCallback} from 'react'
import {clsx} from 'clsx'
import {Grid} from '../Grid'
import {Link, LinkProps} from '../Link'
import {Heading, HeadingProps, defaultHeadingTag} from '../Heading'
import {Text} from '../Text'
import {useAnimation} from '../animation'

import styles from './SectionIntroStacked.module.css'

import type {BaseProps} from '../component-helpers'

export type SectionIntroStackedProps = React.HTMLAttributes<HTMLElement> & BaseProps<HTMLElement> & PropsWithChildren

const Root = forwardRef<HTMLElement, PropsWithChildren<SectionIntroStackedProps>>(
  ({animate, className, children, style, ...props}, ref) => {
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

          animationClasses,
          className,
        )}
        {...props}
        style={{...animationInlineStyles, ...style}}
      >
        <Grid fullWidth>
          <Grid.Column span={{medium: 6}}>{otherChildren}</Grid.Column>
          <Grid.Column span={{medium: 5}} start={{medium: 8}}>
            {items}
          </Grid.Column>
        </Grid>
      </header>
    )
  },
)

type SectionIntroStackedHeadingProps = BaseProps<HTMLHeadingElement> & HeadingProps

const defaultHeadingSize = '5'

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

type SectionIntroStackedLinkProps = LinkProps & BaseProps<HTMLAnchorElement>

const _Link = forwardRef(
  (
    {className, children, variant = 'accent', size = 'large', ...props}: SectionIntroStackedLinkProps,
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

export type SectionIntroStackedItemProps = BaseProps<HTMLLIElement>

const ItemBase = ({className, children, ...rest}: PropsWithChildren<SectionIntroStackedItemProps>) => {
  const itemClassName = clsx(styles['SectionIntroStackedItem-item'], className)
  const childrenArray = useMemo(() => React.Children.toArray(children), [children])

  const getConditionalVariant = useCallback(() => {
    if (childrenArray.some(child => React.isValidElement(child) && (child.type === 'b' || child.type === 'em'))) {
      return 'muted'
    }
    return 'default'
  }, [childrenArray])

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
  Link: _Link,
  Items: ItemsBase,
  Item: ItemBase,
})
