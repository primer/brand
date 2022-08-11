import React from 'react'
import clsx from 'clsx'

import {Heading, Text} from '../'

/**
 * Design tokens
 */
import '../../lib/design-tokens/css/tokens/functional/components/accordion/colors-with-modes.css'

/**
 * Main Stylesheet (as a CSS Module)
 */
import styles from './Accordion.module.css'

export type AccordionRootProps = {
  open?: boolean // Manually declared due to known issue with the native open attribute: https://github.com/facebook/react/issues/15486
  className?: string
  children: React.ReactElement<AccordionHeadingProps | AccordionContentProps>[]
} & React.HTMLAttributes<HTMLDetailsElement>

type ValidRootChildren = {
  AccordionHeading: React.ReactElement<AccordionHeadingProps> | null
  AccordionContent: React.ReactElement<AccordionContentProps> | typeof React.Fragment | null
}

export function AccordionRoot({children, className, open = false, ...rest}: AccordionRootProps) {
  const {AccordionHeading: HeadingChild, AccordionContent: AccordionContentChild} = React.Children.toArray(
    children
  ).reduce<ValidRootChildren>(
    (acc, child) => {
      if (React.isValidElement(child) && typeof child.type !== 'string') {
        if (child.type === AccordionContent) {
          acc.AccordionContent = child
        }
        if (child.type === AccordionHeading) {
          acc.AccordionHeading = child
        }
      }
      return acc
    },
    {AccordionHeading: null, AccordionContent: null}
  )

  return (
    <details className={clsx(styles.Accordion, className)} open={open} {...rest}>
      {HeadingChild}
      {AccordionContentChild}
    </details>
  )
}

type AccordionHeadingProps = {
  className?: string
  children: string
}

export function AccordionHeading({children, className}: AccordionHeadingProps) {
  return (
    <summary className={clsx(styles.Accordion__summary, className)}>
      <Heading as="h4" className={styles['Accordion__summary-heading']}>
        {children}
      </Heading>
    </summary>
  )
}

type AccordionContentProps = {
  className?: string
  children: React.ReactElement | React.ReactElement[]
}

export function AccordionContent({children, className}: AccordionContentProps) {
  const resolvedChildren =
    React.isValidElement(children) && children.type === React.Fragment ? children.props.children : children

  const transformedChildren = React.Children.map<React.ReactNode, React.ReactNode>(resolvedChildren, child => {
    const targetChildTypes = ['p', 'span']
    if (React.isValidElement(child) && typeof child.type === 'string') {
      if (targetChildTypes.includes(child.type)) {
        return React.cloneElement(child, {
          children: (
            <Text variant="muted" size="300" as="span">
              {child.props.children}
            </Text>
          )
        })
      }
    }
    return child
  })

  return (
    <section className={clsx(styles.Accordion__content, className)}>
      {React.Children.toArray(transformedChildren).map(
        textNode =>
          React.isValidElement(textNode) &&
          React.cloneElement(textNode, {
            className: clsx(styles['Accordion__content-item'], textNode.props.className)
          })
      )}
    </section>
  )
}

/**
 * Branded Accordion component
 */
export const Accordion = Object.assign(AccordionRoot, {Content: AccordionContent, Heading: AccordionHeading})
