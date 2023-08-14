import React, {forwardRef, PropsWithChildren} from 'react'
import {isFragment} from 'react-is'
import clsx from 'clsx'
import {useId} from '@reach/auto-id'

import {useAnimation, Heading, AccordionHeading, AccordionContent, AccordionRoot, HeadingProps, Accordion} from '..'
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

type FAQRootProps = PropsWithChildren<BaseProps<HTMLElement>> & React.HTMLAttributes<HTMLElement>

const FAQRoot = forwardRef<HTMLElement, FAQRootProps>(({children, style, animate, className, ...rest}, ref) => {
  const {classes: animationClasses, styles: animationInlineStyles} = useAnimation(animate)

  const filteredChildren = React.Children.toArray(children).filter(child => {
    if (React.isValidElement(child) && typeof child.type !== 'string') {
      if (
        isFragment(child) ||
        child.type === FAQHeading ||
        child.type === FAQSubheading ||
        child.type === FAQGroupHeading ||
        child.type === AccordionRoot
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
      {React.Children.toArray(filteredChildren).map(child => {
        if (React.isValidElement(child) && typeof child.type !== 'string') {
          if (child.type === FAQHeading) {
            return React.cloneElement(child as React.ReactElement, {
              align: hasSubheading ? 'start' : child.props.align,
              size: hasSubheading ? 'large' : child.props.size,
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
  children: React.ReactNode | React.ReactNode[]
  as?: HeadingProps['as']
}

const FAQHeading = forwardRef<HTMLHeadingElement, FAQHeadingProps>(
  ({children, className, size = 'medium', align = 'center', as, ...rest}, ref) => {
    const headingSize = size === 'medium' ? 'h3' : 'h2'
    return (
      <Heading
        as={as || headingSize}
        className={clsx(
          styles.FAQ__heading,
          size === 'large' && styles['FAQ__heading--large'],
          styles[`FAQ__heading--${align}`],
          className,
        )}
        ref={ref}
        {...rest}
      >
        {children}
      </Heading>
    )
  },
)

type FAQSubheadingProps = BaseProps<HTMLHeadingElement> & {
  align?: 'start' | 'center'
  children: React.ReactNode | React.ReactNode[]
  as?: Exclude<HeadingProps['as'], 'h1'>
}

function FAQSubheading({children, className, as = 'h3', ...rest}: FAQSubheadingProps) {
  return (
    <Heading as={as} className={clsx(styles.FAQ__subheading, className)} {...rest}>
      {children}
    </Heading>
  )
}

function FAQGroupHeading({children, className, as = 'h3', ...rest}: FAQSubheadingProps) {
  // TODO: update styling to match mocks
  return (
    <Heading as={as} className={clsx(styles.FAQ__subheading, className)} {...rest}>
      {children}
    </Heading>
  )
}

function FAQGroup({
  children,
  id,
  defaultSelectedIndex = 0,
}: React.PropsWithChildren<{id?: string; defaultSelectedIndex?: number}>) {
  const [selectedIndex, setSelectedIndex] = React.useState(defaultSelectedIndex)
  const instanceId = useId(id)
  const handleTabClick = (index: number) => (_event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedIndex(index)
  }

  const faqChildren = React.Children.toArray(children).filter(
    child => React.isValidElement<FAQRootProps>(child) && child.type === FAQ,
  )

  const Tabs = React.Children.map(faqChildren, (faqChild, index) => {
    if (React.isValidElement<FAQRootProps>(faqChild) && faqChild.props.children) {
      const GroupHeadingChild = React.Children.toArray(faqChild.props.children).find(
        child => React.isValidElement(child) && child.type === FAQGroupHeading,
      )

      return (
        <button
          type="button"
          role="tab"
          id={`${instanceId}-tab-${index}`}
          aria-controls={`${instanceId}-panel-${index}`}
          aria-selected={selectedIndex === index}
          onClick={handleTabClick(index)}
          key={index}
        >
          {React.isValidElement(GroupHeadingChild) && GroupHeadingChild.props.children}
        </button>
      )
    }
    return null
  })

  const TabPanels = React.Children.map(faqChildren, (faqChild, index) => {
    return (
      <div
        role="tabpanel"
        id={`${instanceId}-panel-${index}`}
        aria-labelledby={`${instanceId}-tab-${index}`}
        hidden={selectedIndex !== index}
        key={index}
      >
        {faqChild}
      </div>
    )
  })

  const SectionedAccordion = React.Children.map(faqChildren, (faqChild, index) => {
    if (React.isValidElement<FAQRootProps>(faqChild) && faqChild.props.children) {
      const GroupHeadingChild = React.Children.toArray(faqChild.props.children).find(
        child => React.isValidElement(child) && child.type === FAQGroupHeading,
      )
      const FAQItemChild = React.Children.map(faqChild.props.children, child =>
        React.isValidElement(child) && child.type !== FAQGroupHeading ? child : null,
      )

      return (
        <Accordion key={index}>
          <Accordion.Heading>
            {React.isValidElement(GroupHeadingChild) && GroupHeadingChild.props.children}
          </Accordion.Heading>
          <Accordion.Content>{FAQItemChild}</Accordion.Content>
        </Accordion>
      )
    }
  })

  return (
    <>
      <div className={clsx(styles.FAQAccordionGroup)}>{SectionedAccordion}</div>
      <div className={clsx(styles.FAQTabbedGroup)}>
        <div className={clsx(styles.FAQTabbedGroup__tablist)} role="tablist">
          {Tabs}
        </div>
        <div className={clsx(styles.FAQTabbedGroup__tabpanelContainer)}>{TabPanels}</div>
      </div>
    </>
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
  Group: FAQGroup,
  GroupHeading: FAQGroupHeading,
})
