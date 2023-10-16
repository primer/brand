import React, {forwardRef} from 'react'
import clsx from 'clsx'

import {Heading, Text} from '../'
import type {BaseProps} from '../component-helpers'
import {ChevronDownIcon, ChevronUpIcon} from '@primer/octicons-react'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/accordion/colors-with-modes.css'

/** * Main Stylesheet (as a CSS Module) */
import styles from './Accordion.module.css'

export type AccordionRootProps = BaseProps<HTMLDetailsElement> & {
  open?: boolean // Manually declared due to known issue with the native open attribute: https://github.com/facebook/react/issues/15486
  children: React.ReactElement<AccordionHeadingProps | AccordionContentProps>[]
  variant?: 'default' | 'emphasis'
} & React.HTMLAttributes<HTMLDetailsElement>

type ValidRootChildren = {
  AccordionHeading: React.ReactElement<AccordionHeadingProps> | null
  AccordionContent: React.ReactElement<AccordionContentProps> | typeof React.Fragment | null
}

export const AccordionRoot = forwardRef<HTMLDetailsElement, AccordionRootProps>(
  ({children, className, open = false, variant = 'default', ...rest}, ref) => {
    const {AccordionHeading: HeadingChild, AccordionContent: AccordionContentChild} = React.Children.toArray(
      children,
    ).reduce<ValidRootChildren>(
      (acc, child) => {
        if (React.isValidElement(child) && typeof child.type !== 'string') {
          if (child.type === AccordionContent) {
            acc.AccordionContent = child as React.ReactElement<AccordionContentProps>
          }
          if (child.type === AccordionHeading) {
            acc.AccordionHeading = React.cloneElement(child as React.ReactElement, {
              variant,
            }) as React.ReactElement<AccordionHeadingProps>
          }
        }
        return acc
      },
      {AccordionHeading: null, AccordionContent: null},
    )

    return (
      <details
        className={clsx(styles.Accordion, styles[`Accordion--${variant}`], className)}
        open={open}
        {...rest}
        ref={ref}
      >
        {HeadingChild}
        {AccordionContentChild}
      </details>
    )
  },
)

type AccordionHeadingProps = BaseProps<HTMLHeadingElement> & {
  className?: string
  children: string
  as?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  reversedToggles?: boolean
  variant?: 'default' | 'emphasis'
}

export const AccordionHeading = forwardRef<HTMLHeadingElement, AccordionHeadingProps>(
  ({children, className, as = 'h4', variant = 'default', reversedToggles, ...rest}, ref) => {
    return (
      <summary
        className={clsx(
          styles.Accordion__summary,
          reversedToggles && styles['Accordion__summary--reversed-toggles'],
          styles[`Accordion__summary--${variant}`],
          className,
        )}
        ref={ref}
        {...rest}
      >
        <span aria-hidden="true" className={styles['Accordion__summary--collapsed']}>
          {variant === 'emphasis' && <ChevronDownIcon size={24} fill="var(--brand-color-text-default)" />}
        </span>
        <Heading as={as} size={variant === 'emphasis' ? '6' : 'subhead-large'}>
          {children}
        </Heading>
        <span aria-hidden="true" className={styles['Accordion__summary--expanded']}>
          {variant === 'emphasis' && <ChevronUpIcon size={24} fill="var(--brand-color-text-default)" />}
        </span>
      </summary>
    )
  },
)

type AccordionContentProps = BaseProps<HTMLElement> & {
  children: React.ReactElement | React.ReactElement[]
}

export function AccordionContent({children, className, ...rest}: AccordionContentProps) {
  return (
    <section className={clsx(styles.Accordion__content, className)} {...rest}>
      {children}
    </section>
  )
}

/**
 * Branded Accordion component
 */
export const Accordion = Object.assign(AccordionRoot, {Content: AccordionContent, Heading: AccordionHeading})
