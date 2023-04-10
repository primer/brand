import React, {forwardRef} from 'react'
import clsx from 'clsx'

import {Heading, Text} from '../'
import type {BaseProps} from '../component-helpers'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/accordion/colors-with-modes.css'

/** * Main Stylesheet (as a CSS Module) */
import styles from './Accordion.module.css'

export type AccordionRootProps = BaseProps<HTMLDetailsElement> & {
  open?: boolean // Manually declared due to known issue with the native open attribute: https://github.com/facebook/react/issues/15486
  children: React.ReactElement<AccordionHeadingProps | AccordionContentProps>[]
} & React.HTMLAttributes<HTMLDetailsElement>

type ValidRootChildren = {
  AccordionHeading: React.ReactElement<AccordionHeadingProps> | null
  AccordionContent: React.ReactElement<AccordionContentProps> | typeof React.Fragment | null
}

export const AccordionRoot = forwardRef<HTMLDetailsElement, AccordionRootProps>(
  ({children, className, open = false, ...rest}, ref) => {
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
      <details className={clsx(styles.Accordion, className)} open={open} {...rest} ref={ref}>
        {HeadingChild}
        {AccordionContentChild}
      </details>
    )
  }
)

type AccordionHeadingProps = BaseProps<HTMLHeadingElement> & {
  className?: string
  children: string
  as?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export const AccordionHeading = forwardRef<HTMLHeadingElement, AccordionHeadingProps>(
  ({children, className, as = 'h4', ...rest}, ref) => {
    return (
      <summary className={clsx(styles.Accordion__summary, className)} ref={ref} {...rest}>
        <span aria-hidden="true" className={styles['Accordion__summary--collapsed']}></span>
        <Heading as={as} className={styles['Accordion__summary-heading']}>
          {children}
        </Heading>
        <span aria-hidden="true" className={styles['Accordion__summary--expanded']}></span>
      </summary>
    )
  }
)

type AccordionContentProps = BaseProps<HTMLElement> & {
  className?: string
  children: React.ReactElement | React.ReactElement[]
}

export function AccordionContent({children, className, ...rest}: AccordionContentProps) {
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
    <section className={clsx(styles.Accordion__content, className)} {...rest}>
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
