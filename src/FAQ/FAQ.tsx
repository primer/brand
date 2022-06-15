import React from 'react'
import clsx from 'clsx'

import {Heading, AccordionRootProps} from '..'

import styles from './FAQ.module.css'

type FAQRootProps = {
  className?: string
  children: React.ReactElement<FAQHeadingProps | FAQSubheadingProps | AccordionRootProps>[]
}

export function FAQRoot({children, className}: FAQRootProps) {
  const filteredChildren = React.Children.toArray(children).filter(
    child =>
      React.isValidElement(child) &&
      typeof child.type !== 'string' &&
      (child.type.name === 'FAQHeading' ||
        child.type.name === 'FAQSubheading' ||
        child.type.name === 'AccordionRoot' ||
        child.type === React.Fragment)
  )

  const hasSubheading = React.Children.toArray(children).some(
    child => React.isValidElement(child) && typeof child.type !== 'string' && child.type.name === 'FAQSubheading'
  )

  return (
    <section className={clsx(styles.FAQ, className)}>
      {React.Children.toArray(filteredChildren).map(child => {
        if (React.isValidElement(child) && typeof child.type !== 'string') {
          if (child.type.name === 'FAQHeading') {
            return React.cloneElement(child, {
              align: hasSubheading ? 'left' : child.props.align,
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
  align?: 'left' | 'center'
  children: string
}

function FAQHeading({children, className, size = 'medium', align = 'center'}: FAQHeadingProps) {
  const headingSize = size === 'medium' ? 'h3' : 'h2'
  return (
    <Heading
      as={headingSize}
      className={clsx(size === 'large' && styles['FAQ__heading--large'], styles[`FAQ__heading--${align}`], className)}
    >
      {children}
    </Heading>
  )
}

type FAQSubheadingProps = {
  align?: 'left' | 'center'
  className?: string
  children: string
}

function FAQSubheading({children, className}: FAQSubheadingProps) {
  return (
    <Heading as="h4" className={clsx(styles.FAQ__subheading, className)}>
      {children}
    </Heading>
  )
}

/**
 * Branded FAQ component
 */
export const FAQ = Object.assign(FAQRoot, {Subheading: FAQSubheading, Heading: FAQHeading})
