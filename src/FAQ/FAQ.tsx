import React from 'react'
import {isFragment} from 'react-is'
import clsx from 'clsx'

import {Heading, AccordionHeading, AccordionContent, AccordionRoot, AccordionRootProps} from '..'

/**
 * Design tokens
 */
import '../../lib/design-tokens/css/tokens/functional/components/faq/base.css'
import '../../lib/design-tokens/css/tokens/functional/components/faq/colors-with-modes.css'

/**
 * Main stylesheet (as a CSS Module)
 */
import styles from './FAQ.module.css'

type FAQRootProps = {
  className?: string
  children: React.ReactElement<FAQHeadingProps | FAQSubheadingProps | AccordionRootProps>[]
}

function FAQRoot({children, className}: FAQRootProps) {
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

  return (
    <section className={clsx(styles.FAQ, className)}>
      {React.Children.toArray(filteredChildren).map(child => {
        if (React.isValidElement(child) && typeof child.type !== 'string') {
          if (child.type === FAQHeading) {
            return React.cloneElement(child, {
              align: hasSubheading ? 'start' : child.props.align,
              size: hasSubheading ? 'large' : child.props.size,
              className: clsx(!hasSubheading && styles['FAQ__heading--with-margin'], child.props.className)
            })
          }
        }
        return child
      })}
    </section>
  )
}

type FAQHeadingProps = {
  className?: string
  size?: 'medium' | 'large'
  align?: 'start' | 'center'
  children: string
}

function FAQHeading({children, className, size = 'medium', align = 'center'}: FAQHeadingProps) {
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
    >
      {children}
    </Heading>
  )
}

type FAQSubheadingProps = {
  align?: 'start' | 'center'
  className?: string
  children: string
}

function FAQSubheading({children, className}: FAQSubheadingProps) {
  return (
    <Heading as="h3" className={clsx(styles.FAQ__subheading, className)}>
      {children}
    </Heading>
  )
}

/**
 * FAQ component:
 * {@link https://primer.style/react-brand/components/FAQ/ See usage examples}.
 */
export const FAQ = Object.assign(FAQRoot, {
  Subheading: FAQSubheading,
  Heading: FAQHeading,
  Item: AccordionRoot,
  Question: AccordionHeading,
  Answer: AccordionContent
})
