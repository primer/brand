import React, {forwardRef, PropsWithChildren} from 'react'
import {isFragment} from 'react-is'
import clsx from 'clsx'

import {useAnimation, Heading, AccordionHeading, AccordionContent, AccordionRoot, HeadingProps} from '..'
import type {BaseProps} from '../component-helpers'

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

export type FAQRootProps = PropsWithChildren<BaseProps<HTMLElement>> & React.HTMLAttributes<HTMLElement>

const FAQRoot = forwardRef<HTMLElement, FAQRootProps>(({children, style, animate, className, ...rest}, ref) => {
  const {classes: animationClasses, styles: animationInlineStyles} = useAnimation(animate)

  const filteredChildren = React.Children.toArray(children).filter(child => {
    if (React.isValidElement(child) && typeof child.type !== 'string') {
      if (
        isFragment(child) ||
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
      className={clsx(styles.FAQ, animationClasses, className)}
      style={{...animationInlineStyles, ...style}}
      {...rest}
    >
      {React.Children.toArray(filteredChildren).map(childMaybeFragment => {
        const child = (
          isFragment(childMaybeFragment) ? childMaybeFragment.props.children : childMaybeFragment
        ) as typeof childMaybeFragment

        if (React.isValidElement(child) && typeof child.type !== 'string') {
          if (child.type === FAQHeading) {
            return React.cloneElement(child as React.ReactElement, {
              align: hasSubheading ? 'start' : child.props.align,
              size: hasSubheading ? '3' : child.props.size,
              weight: hasSubheading ? 'semibold' : child.props.weight,
            })
          }

          // If there is a subheading, ensure that the FAQ.Question is rendered as a h5
          if (hasSubheading && child.type === FAQ.Item) {
            const grandChildren = React.Children.map(child.props.children, grandChild => {
              if (grandChild.type === FAQ.Question) {
                return React.cloneElement(grandChild as React.ReactElement, {
                  as: 'h5',
                  ...grandChild.props,
                })
              }
              return grandChild
            })

            return React.cloneElement(child as React.ReactElement, {
              children: grandChildren,
            })
          }
        }
        return child
      })}
    </section>
  )
})

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
  as = 'h4',
  size = 'subhead-large',
  weight = 'medium',
  ...rest
}: FAQSubheadingProps) {
  return (
    <Heading as={as} className={clsx(styles.FAQ__subheading, className)} weight={weight} size={size} {...rest}>
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
