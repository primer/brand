import React, {forwardRef, PropsWithChildren, type Ref} from 'react'
import clsx from 'clsx'
import {Link, LinkProps} from '../Link'
import {Heading, HeadingTags} from '../Heading'
import {Text} from '../Text'
import styles from './SectionIntro.module.css'

import type {BaseProps} from '../component-helpers'

export type SectionIntroProps = BaseProps<HTMLHeadingElement> & {
  align?: 'start' | 'center'
}

const Root = forwardRef<HTMLHeadingElement, PropsWithChildren<SectionIntroProps>>(
  ({align = 'start', className, children, ...props}, ref) => {
    return (
      <header
        ref={ref}
        className={clsx(styles.SectionIntro, styles[`SectionIntro--align-${align}`], className)}
        {...props}
      >
        {children}
      </header>
    )
  }
)

type SectionIntroHeadingProps = BaseProps<HTMLHeadingElement> & HeadingTags

const defaultHeadingTag = HeadingTags[1]
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
