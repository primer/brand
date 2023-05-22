import React, {forwardRef, PropsWithChildren, type Ref} from 'react'
import clsx from 'clsx'
import {Link, LinkProps} from '../Link'
import {Heading, HeadingProps, defaultHeadingTag} from '../Heading'
import {Text} from '../Text'
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
  }
)

type SectionIntroHeadingProps = BaseProps<HTMLHeadingElement> & HeadingProps

const defaultHeadingSize = '2'

const _Heading = forwardRef(
  (
    {
      as = defaultHeadingTag,
      size = defaultHeadingSize,
      className,
      children,
      ...props
    }: PropsWithChildren<SectionIntroHeadingProps>,
    ref: Ref<HTMLHeadingElement>
  ) => {
    return (
      <Heading ref={ref} className={clsx(styles[`SectionIntro-heading`], className)} size={size} as={as} {...props}>
        {children}
      </Heading>
    )
  }
)

type SectionIntroDescriptionProps = BaseProps<HTMLParagraphElement> & {
  children: React.ReactNode | React.ReactNode[]
}

const _Description = forwardRef(
  ({className, children, ...props}: SectionIntroDescriptionProps, ref: Ref<HTMLParagraphElement>) => {
    return (
      <Text ref={ref} className={clsx(styles['SectionIntro-description'], className)} size={'400'} as="p" {...props}>
        {children}
      </Text>
    )
  }
)

type SectionIntroLinkProps = Omit<LinkProps, 'size'> & BaseProps<HTMLAnchorElement>

const _Link = forwardRef(({className, children, ...props}: SectionIntroLinkProps, ref: Ref<HTMLAnchorElement>) => {
  return (
    <Link ref={ref} className={clsx(styles['SectionIntro-link'], className)} size="large" {...props}>
      {children}
    </Link>
  )
})

export const SectionIntro = Object.assign(Root, {Heading: _Heading, Description: _Description, Link: _Link})
