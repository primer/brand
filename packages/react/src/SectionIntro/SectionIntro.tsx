import React, {forwardRef, PropsWithChildren, type Ref} from 'react'
import clsx from 'clsx'
import {Button} from '../Button'
import {Heading, HeadingTags} from '../Heading'
import {Text} from '../Text'
import styles from './SectionIntro.module.css'

import type {BaseProps} from '../component-helpers'

export type SectionIntroProps = BaseProps<PropsWithChildren<HTMLHeadingElement>> & {
  align?: 'start' | 'center'
}

const Root = forwardRef<HTMLHeadingElement, SectionIntroProps>(
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

type SectionIntroHeadingProps = BaseProps<HTMLHeadingElement> & {
  children: React.ReactNode | React.ReactNode[]
} & HeadingTags

const defaultHeadingTag = HeadingTags[1]
const defaultHeadingSize = '2'

const _Heading = forwardRef(
  (
    {as = defaultHeadingTag, size = defaultHeadingSize, className, children, ...props}: SectionIntroHeadingProps,
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

type SectionIntroActionProps = BaseProps<HTMLButtonElement> & {
  children: React.ReactNode | React.ReactNode[]
  href: string
  subtle?: boolean
}

const _Action = forwardRef(
  ({className, subtle, children, ...props}: SectionIntroActionProps, ref: Ref<HTMLButtonElement>) => {
    return (
      <Button
        as="a"
        variant={subtle ? 'subtle' : 'secondary'}
        className={clsx(styles[`SectionIntro-action`], className)}
        ref={ref}
        {...props}
      >
        {children}
      </Button>
    )
  }
)

export const SectionIntro = Object.assign(Root, {Heading: _Heading, Description: _Description, Action: _Action})
