import React, {forwardRef, PropsWithChildren, useMemo, type Ref, useCallback} from 'react'
import clsx from 'clsx'
import {Grid} from '../Grid'
import {Link, LinkProps} from '../Link'
import {Heading, HeadingProps, defaultHeadingTag} from '../Heading'
import {Text} from '../Text'
import {useAnimation} from '../animation'

import styles from './StackedSectionIntro.module.css'

import type {BaseProps} from '../component-helpers'

export type StackedSectionIntroProps = React.HTMLAttributes<HTMLElement> &
  BaseProps<HTMLElement> & {
    children: React.ReactElement<
      StackedSectionIntroHeadingProps | StackedSectionIntroItemsProps | StackedSectionIntroLinkProps
    >[]
  }

const Root = forwardRef<HTMLElement, PropsWithChildren<StackedSectionIntroProps>>(
  ({animate, className, children, style, ...props}, ref) => {
    const {classes: animationClasses, styles: animationInlineStyles} = useAnimation(animate)

    const childrenArray = React.Children.toArray(children)

    // extract Items and everything else into two separate arrays
    const items = childrenArray.filter(child => React.isValidElement(child) && child.type === _Items)

    const otherChildren = childrenArray.filter(child => !items.includes(child))

    return (
      <header
        ref={ref}
        className={clsx(
          styles.StackedSectionIntro,

          animationClasses,
          className,
        )}
        {...props}
        style={{...animationInlineStyles, ...style}}
      >
        <Grid fullWidth>
          <Grid.Column span={{medium: 5}}>{otherChildren}</Grid.Column>
          <Grid.Column span={{medium: 6}} start={{medium: 7}}>
            {items}
          </Grid.Column>
        </Grid>
      </header>
    )
  },
)

type StackedSectionIntroHeadingProps = BaseProps<HTMLHeadingElement> & HeadingProps

const defaultHeadingSize = '5'

const _Heading = forwardRef(
  (
    {
      as = defaultHeadingTag,
      size = defaultHeadingSize,
      className,
      children,
      ...props
    }: PropsWithChildren<StackedSectionIntroHeadingProps>,
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
          styles[`StackedSectionIntro-heading`],
          defaultColor === 'muted' && styles[`StackedSectionIntro-heading--muted`],
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

type StackedSectionIntroLinkProps = Omit<LinkProps, 'size'> & BaseProps<HTMLAnchorElement>

const _Link = forwardRef(
  ({className, children, variant = 'accent', ...props}: StackedSectionIntroLinkProps, ref: Ref<HTMLAnchorElement>) => {
    return (
      <Link
        ref={ref}
        className={clsx(styles['StackedSectionIntro-link'], className)}
        size="large"
        variant={variant}
        {...props}
      >
        {children}
      </Link>
    )
  },
)

type StackedSectionIntroItemsProps = BaseProps<HTMLUListElement>

const _Items = ({animate, className, children, ...rest}: PropsWithChildren<StackedSectionIntroItemsProps>) => {
  const {classes: animationClasses, styles: animationInlineStyles} = useAnimation(animate)

  const timelineClassName = clsx(animationClasses, styles['StackedSectionIntro-items'], className)

  return (
    <ul className={timelineClassName} style={{...animationInlineStyles}} {...rest}>
      {children}
    </ul>
  )
}

export type StackedSectionIntroItemProps = BaseProps<HTMLLIElement>

const _Item = ({className, children, ...rest}: PropsWithChildren<StackedSectionIntroItemProps>) => {
  const itemClassName = clsx(styles['StackedSectionIntroItem-item'], className)
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
          styles['StackedSectionIntroItem__item-text'],
          defaultColor === 'muted' && styles[`StackedSectionIntroItem__item-text--muted`],
        )}
        size="350"
        weight="medium"
      >
        {children}
      </Text>
    </li>
  )
}

export const StackedSectionIntro = Object.assign(Root, {
  Heading: _Heading,
  Link: _Link,
  Items: _Items,
  Item: _Item,
})
