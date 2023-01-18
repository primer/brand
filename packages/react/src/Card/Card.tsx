import React, {forwardRef, PropsWithChildren} from 'react'
import {isFragment} from 'react-is'
import clsx from 'clsx'

import {Heading, Text, AccordionHeading, AccordionContent, AccordionRoot} from '..'
import type {BaseProps} from '../component-helpers'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/card/base.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/card/colors-with-modes.css'

/**
 * Main stylesheet (as a CSS Module)
 */
import styles from './Card.module.css'

// type CardRootProps = PropsWithChildren<BaseProps<HTMLElement>>
type CardRootProps = PropsWithChildren<BaseProps<HTMLElement>> & {
  variant: 'default' | 'inset' | 'elevated'
}

const CardRoot = forwardRef<HTMLElement, CardRootProps>(({children, className, variant = 'default', ...rest}, ref) => {
  const childrenHasFragment = React.Children.toArray(children).some(child => isFragment(child))
  const filteredChildren = React.Children.toArray(children).filter(child => {
    if (React.isValidElement(child) && typeof child.type !== 'string') {
      if (
        childrenHasFragment ||
        child.type === CardHeading ||
        child.type === CardDescription ||
        child.type === CardAction ||
        child.type === AccordionRoot
      ) {
        return true
      }
    }
    return false
  })

  return (
    <section className={clsx(styles.Card, styles[`Card__variant--${variant}`], className)} ref={ref} {...rest}>
      {React.Children.toArray(filteredChildren).map(child => {
        if (React.isValidElement(child) && typeof child.type !== 'string') {
          if (child.type === CardHeading) {
            return React.cloneElement(child, {})
          }
        }
        return child
      })}
    </section>
  )
})

type CardHeadingProps = BaseProps<HTMLHeadingElement> & {
  // size?: 'medium' | 'large'
  children: string
}

const CardHeading = forwardRef<HTMLHeadingElement, CardHeadingProps>(({children, className, ...rest}, ref) => {
  // const headingSize = size === 'medium' ? 'h3' : 'h2'
  return (
    <Heading
      // // as={headingSize}
      className={clsx(styles.Card__heading, className)}
      ref={ref}
      {...rest}
    >
      {children}
    </Heading>
  )
})

type CardDescriptionProps = BaseProps<HTMLHeadingElement> & {
  align?: 'start' | 'center'
  children: string
}

function CardDescription({children, className, ...rest}: CardDescriptionProps) {
  return (
    <Text as="p" className={clsx(styles.Card__description, className)} {...rest}>
      {children}
    </Text>
  )
}

type CardActionProps = BaseProps<HTMLHeadingElement> & {
  // align?: 'start' | 'center'
  children: string
}

function CardAction({children, className, ...rest}: CardActionProps) {
  return (
    <div className={clsx(styles.Card__action, className)} {...rest}>
      {children}
    </div>
  )
}

/**
 * Card component:
 * {@link https://primer.style/brand/components/Card/ See usage examples}.
 */
export const Card = Object.assign(CardRoot, {
  Heading: CardHeading,
  Description: CardDescription,
  Item: AccordionRoot,
  Question: AccordionHeading,
  Answer: AccordionContent,
  Action: CardAction
})
