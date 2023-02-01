import React, {forwardRef, PropsWithChildren} from 'react'
import {isFragment} from 'react-is'
import clsx from 'clsx'
import {useHash} from '../hooks/useHash'

import {Heading, AccordionHeading, AccordionContent, AccordionRoot} from '..'
import type {BaseProps} from '../component-helpers'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/faq/base.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/faq/colors-with-modes.css'

/**
 * Main stylesheet (as a CSS Module)
 */
import styles from './FAQ.module.css'

type FAQRootProps = PropsWithChildren<BaseProps<HTMLElement>>

const FAQRoot = forwardRef<HTMLElement, FAQRootProps>(({children, className, ...rest}, ref) => {
  const childrenHasFragment = React.Children.toArray(children).some(child => isFragment(child))
  const filteredChildren = React.Children.toArray(children).filter(child => {
    if (React.isValidElement(child) && typeof child.type !== 'string') {
      if (
        childrenHasFragment ||
        child.type === FAQHeading ||
        child.type === FAQSubheading ||
        child.type === AccordionRoot
      ) {
        return true
      }
    }
    return false
  })

  const hasSubheading = React.Children.toArray(children).some(
    child => React.isValidElement(child) && typeof child.type !== 'string' && child.type === FAQSubheading
  )

  const hash = useHash()

  return (
    <section className={clsx(styles.FAQ, className)} ref={ref} {...rest}>
      {React.Children.toArray(filteredChildren).map(child => {
        if (React.isValidElement(child) && typeof child.type !== 'string') {
          if (child.type === FAQHeading) {
            return React.cloneElement(child, {
              align: hasSubheading ? 'start' : child.props.align,
              size: hasSubheading ? 'large' : child.props.size,
              className: clsx(!hasSubheading && styles['FAQ__heading--with-margin'], child.props.className)
            })
          }
          if (child.type === AccordionRoot) {
            return React.cloneElement(child, {
              open: hash && hash.substring(1) === child.props.id ? true : false
            })
          }
        }
        return child
      })}
    </section>
  )
})

type FAQHeadingProps = BaseProps<HTMLHeadingElement> & {
  size?: 'medium' | 'large'
  align?: 'start' | 'center'
  children: string
}

const FAQHeading = forwardRef<HTMLHeadingElement, FAQHeadingProps>(
  ({children, className, size = 'medium', align = 'center', ...rest}, ref) => {
    const headingSize = size === 'medium' ? 'h3' : 'h2'
    return (
      <Heading
        as={headingSize}
        className={clsx(
          styles.FAQ__heading,
          size === 'large' && styles['FAQ__heading--large'],
          styles[`FAQ__heading--${align}`],
          className
        )}
        ref={ref}
        {...rest}
      >
        {children}
      </Heading>
    )
  }
)

type FAQSubheadingProps = BaseProps<HTMLHeadingElement> & {
  align?: 'start' | 'center'
  children: string
}

function FAQSubheading({children, className, ...rest}: FAQSubheadingProps) {
  return (
    <Heading as="h3" className={clsx(styles.FAQ__subheading, className)} {...rest}>
      {children}
    </Heading>
  )
}

/**
 * FAQ component:
 * {@link https://primer.style/brand/components/FAQ/ See usage examples}.
 */
export const FAQ = Object.assign(FAQRoot, {
  Subheading: FAQSubheading,
  Heading: FAQHeading,
  Item: AccordionRoot,
  Question: AccordionHeading,
  Answer: AccordionContent
})
