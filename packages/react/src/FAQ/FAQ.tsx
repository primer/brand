import React, {forwardRef, PropsWithChildren} from 'react'
import {clsx} from 'clsx'

import {useAnimation, Heading, AccordionHeading, AccordionContent, AccordionRoot, HeadingProps} from '..'
import type {BaseProps} from '../component-helpers'
import {isFragmentElement} from '../utils/isFragmentElement'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/faq/base.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/faq/colors-with-modes.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/faq/faq.css'

/**
 * Main stylesheet (as a CSS Module)
 */
import styles from './FAQ.module.css'

export type FAQRootProps = {
  variant?: 'default' | 'gridline'
} & PropsWithChildren<BaseProps<HTMLElement>> &
  React.HTMLAttributes<HTMLElement>

const FAQRoot = forwardRef<HTMLElement, FAQRootProps>(
  ({children, style, animate, className, variant = 'default', ...rest}, ref) => {
    const {classes: animationClasses, styles: animationInlineStyles} = useAnimation(animate)

    const filteredChildren = React.Children.toArray(children).filter(child => {
      if (React.isValidElement(child) && typeof child.type !== 'string') {
        if (
          isFragmentElement(child) ||
          (child as React.ReactElement).type === FAQHeading ||
          (child as React.ReactElement).type === FAQSubheading ||
          (child as React.ReactElement).type === AccordionRoot
        ) {
          return true
        }
      }
      return false
    })

    const hasSubheading = React.Children.toArray(children).some(
      child => React.isValidElement(child) && typeof child.type !== 'string' && child.type === FAQSubheading,
    )

    return (
      <section
        ref={ref}
        className={clsx(styles.FAQ, styles[`FAQ--variant-${variant}`], animationClasses, className)}
        style={{...animationInlineStyles, ...style}}
        {...rest}
      >
        {React.Children.toArray(filteredChildren).map((child, index) => {
          if (React.isValidElement<FAQHeadingProps>(child) && child.type === FAQHeading) {
            const clonedChild = React.cloneElement(child, {
              align: hasSubheading ? 'start' : child.props.align,
              size: hasSubheading ? '3' : child.props.size,
              weight: hasSubheading ? 'medium' : child.props.weight,
            })

            if (variant === 'gridline') {
              return (
                <div key={child.key} className={styles[`FAQ__heading-wrapper--${variant}`]}>
                  {clonedChild}
                </div>
              )
            }
            return clonedChild
          }

          const otherChild = child

          return variant === 'gridline' ? (
            <div key={index} className={styles[`FAQ__content-wrapper--${variant}`]}>
              {otherChild}
            </div>
          ) : (
            otherChild
          )
        })}
      </section>
    )
  },
)

type FAQHeadingProps = BaseProps<HTMLHeadingElement> & {
  align?: 'start' | 'center'
  children: React.ReactNode | React.ReactNode[]
  as?: HeadingProps['as']
} & HeadingProps

const FAQHeading = forwardRef<HTMLHeadingElement, FAQHeadingProps>(
  ({children, className, size = '3', align = 'center', as, ...rest}, ref) => {
    const headingLevel = size === '3' ? 'h3' : 'h2'
    return (
      <Heading
        as={as || headingLevel}
        size={size}
        className={clsx(styles.FAQ__heading, styles[`FAQ__heading--${align}`], className)}
        ref={ref}
        {...rest}
      >
        {children}
      </Heading>
    )
  },
)

export type FAQSubheadingProps = BaseProps<HTMLHeadingElement> & {
  align?: 'start' | 'center'
  children: React.ReactNode | React.ReactNode[]
  as?: Exclude<HeadingProps['as'], 'h1'>
} & HeadingProps

function FAQSubheading({
  children,
  className,
  as = 'h3',
  size = 'subhead-medium',
  font = 'monospace',
  weight = 'medium',
  ...rest
}: FAQSubheadingProps) {
  return (
    <Heading
      as={as}
      className={clsx(styles.FAQ__subheading, className)}
      weight={weight}
      size={size}
      font={font}
      {...rest}
    >
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
  Answer: AccordionContent,
})
