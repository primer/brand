import React, {forwardRef, PropsWithChildren, useMemo, type Ref, useCallback} from 'react'
import clsx from 'clsx'
import {Link, LinkProps} from '../Link'
import {Heading, HeadingProps, defaultHeadingTag} from '../Heading'
import {Text} from '../Text'
import {Label, LabelProps} from '../Label'
import {useAnimation} from '../animation'

import styles from './SectionIntro.module.css'

import type {BaseProps} from '../component-helpers'

export type SectionIntroProps = {
  align?: 'start' | 'center'
} & React.HTMLAttributes<HTMLHeadingElement> &
  BaseProps<HTMLHeadingElement>

const Root = forwardRef<HTMLHeadingElement, PropsWithChildren<SectionIntroProps>>(
  ({align = 'start', animate, className, children, style, ...props}, ref) => {
    const {classes: animationClasses, styles: animationInlineStyles} = useAnimation(animate)

    return (
      <header
        ref={ref}
        className={clsx(styles.SectionIntro, styles[`SectionIntro--align-${align}`], animationClasses, className)}
        {...props}
        style={{...animationInlineStyles, ...style}}
      >
        {children}
      </header>
    )
  },
)

type SectionIntroHeadingProps = BaseProps<HTMLHeadingElement> & HeadingProps

const defaultHeadingSize = '4'

const _Heading = forwardRef(
  (
    {
      as = defaultHeadingTag,
      size = defaultHeadingSize,
      className,
      children,
      ...props
    }: PropsWithChildren<SectionIntroHeadingProps>,
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
        className={clsx(
          styles[`SectionIntro-heading`],
          defaultColor === 'muted' && styles[`SectionIntro-heading--muted`],
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

type SectionIntroDescriptionProps = BaseProps<HTMLParagraphElement> & {
  children: React.ReactNode | React.ReactNode[]
}

const _Description = forwardRef(
  ({className, children, ...props}: SectionIntroDescriptionProps, ref: Ref<HTMLParagraphElement>) => {
    return (
      <Text as="p" className={clsx(styles['SectionIntro-description'], className)} ref={ref} variant="muted" {...props}>
        {children}
      </Text>
    )
  },
)

type SectionIntroLabelProps = LabelProps & BaseProps<HTMLDivElement>

function _Label({children, size = 'small', ...rest}: PropsWithChildren<SectionIntroLabelProps>) {
  return (
    <Label className={styles['SectionIntro-label']} size={size} {...rest}>
      {children}
    </Label>
  )
}

type SectionIntroLinkProps = Omit<LinkProps, 'size'> & BaseProps<HTMLAnchorElement>

const _Link = forwardRef(({className, children, ...props}: SectionIntroLinkProps, ref: Ref<HTMLAnchorElement>) => {
  return (
    <Link ref={ref} className={clsx(styles['SectionIntro-link'], className)} size="medium" {...props}>
      {children}
    </Link>
  )
})

export const SectionIntro = Object.assign(Root, {
  Heading: _Heading,
  Description: _Description,
  Link: _Link,
  Label: _Label,
})
