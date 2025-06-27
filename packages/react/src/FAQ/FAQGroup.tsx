import React, {type ReactElement} from 'react'
import {useId} from '../hooks/useId'
import clsx from 'clsx'

import {FAQSubheadingProps, FAQRootProps, FAQ} from './'
import {Accordion, Button, Grid, Heading, Stack, Box} from '../'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/faq/base.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/faq/colors-with-modes.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/faq/faq.css'

/**
 * Main stylesheet (as a CSS Module)
 */
import styles from './FAQGroup.module.css'

function _Heading({children, className, as = 'h3', ...rest}: FAQSubheadingProps) {
  return (
    <Heading as={as} className={clsx(className)} {...rest}>
      {children}
    </Heading>
  )
}

export type FAQGroupProps = React.PropsWithChildren<{
  id?: string
  defaultSelectedIndex?: number
  tabAttributes?: (children: ReactElement, index: number) => Record<string, unknown>
}>

function _FAQGroup({children, id, defaultSelectedIndex = 0, tabAttributes, ...rest}: FAQGroupProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(defaultSelectedIndex)
  const [hasInteracted, setHasInteracted] = React.useState(false)
  const instanceId = useId(id)
  const selectedTabRef = React.useRef<HTMLButtonElement>(null)

  const handleTabClick = (index: number) => (_event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedIndex(index)
    if (!hasInteracted) setHasInteracted(true)
  }

  const handleKeyDown = (index: number) => (_event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (_event.key === 'ArrowUp') {
      _event.preventDefault()
      const prevIndex = (index - 1 + faqChildren.length) % faqChildren.length
      setSelectedIndex(prevIndex)
      if (!hasInteracted) setHasInteracted(true)
      return
    }

    if (_event.key === 'ArrowDown') {
      _event.preventDefault()
      const nextIndex = (index + 1) % faqChildren.length
      setSelectedIndex(nextIndex)
      if (!hasInteracted) setHasInteracted(true)
      return
    }
  }

  React.useEffect(() => {
    if (hasInteracted) selectedTabRef.current?.focus()
  }, [hasInteracted, selectedIndex])

  const faqChildren = React.Children.toArray(children).filter(
    child => React.isValidElement<FAQRootProps>(child) && child.type === FAQ,
  )

  const Tabs = React.Children.map(faqChildren, (faqChild, index) => {
    if (React.isValidElement<FAQRootProps>(faqChild) && faqChild.props.children) {
      const GroupHeadingChild = React.Children.toArray(faqChild.props.children).find(
        child => React.isValidElement(child) && child.type === FAQ.Heading,
      )

      const tabContents = React.isValidElement(GroupHeadingChild) && GroupHeadingChild.props.children

      const providedTabAttributes = tabAttributes?.(tabContents, index)

      return (
        <Button
          {...providedTabAttributes}
          variant="subtle"
          hasArrow={false}
          as="button"
          role="tab"
          className={styles['FAQGroup__tablist-button']}
          block
          id={`${instanceId}-tab-${index}`}
          aria-controls={`${instanceId}-panel-${index}`}
          aria-selected={selectedIndex === index}
          onClick={handleTabClick(index)}
          onKeyDown={handleKeyDown(index)}
          key={index}
          data-testid={`FAQGroup-tab-${index + 1}`}
          tabIndex={selectedIndex !== index ? -1 : undefined}
          ref={selectedIndex === index ? selectedTabRef : undefined}
        >
          {tabContents}
        </Button>
      )
    }
    return null
  })

  const TabPanels = React.Children.map(faqChildren, (faqChild, index) => {
    if (React.isValidElement<FAQRootProps>(faqChild) && faqChild.props.children) {
      const FAQItemChild = React.Children.map(faqChild.props.children, child => {
        if (!React.isValidElement(child) || child.type === FAQ.Heading) {
          return null
        }

        // Make sure that the FAQ.Question is rendered as a h5
        const grandChildren = React.Children.map(child.props.children, grandChild => {
          if (!React.isValidElement(grandChild) || typeof grandChild.type === 'string') {
            return grandChild
          }

          if (grandChild.type === FAQ.Question) {
            return React.cloneElement(grandChild as React.ReactElement, {
              as: 'h5',
              ...(grandChild as React.ReactElement).props,
            })
          }
          return grandChild
        })

        return React.cloneElement(child as React.ReactElement, {
          children: grandChildren,
        })
      })

      const FAQItemHeading = React.Children.toArray(faqChild.props.children).find(
        child => React.isValidElement(child) && child.type === FAQ.Heading,
      ) as ReactElement | undefined

      return (
        <div
          role="tabpanel"
          id={`${instanceId}-panel-${index}`}
          aria-labelledby={`${instanceId}-tab-${index}`}
          hidden={selectedIndex !== index}
          key={index}
          data-testid={`FAQGroup-tab-panel-${index + 1}`}
        >
          {FAQItemHeading && (
            <FAQ.Subheading
              {...FAQItemHeading.props}
              data-testid={`FAQGroup-tab-panel-heading-${index + 1}`}
              className={clsx(styles['FAQGroup__panel-subHeading'], FAQItemHeading.props.className)}
            />
          )}
          {FAQItemChild}
        </div>
      )
    }
  })

  const SectionedAccordions = React.Children.map(faqChildren, (faqChild, index) => {
    if (React.isValidElement<FAQRootProps>(faqChild) && faqChild.props.children) {
      const GroupHeadingChild = React.Children.toArray(faqChild.props.children).find(
        child => React.isValidElement(child) && child.type === FAQ.Heading,
      )
      const FAQItemChild = React.Children.map(faqChild.props.children, child =>
        React.isValidElement(child) && child.type !== FAQ.Heading
          ? React.cloneElement(child as React.ReactElement, {
              className: clsx(styles['FAQGroup__nested-accordion-item'], child.props.className),
            })
          : null,
      )

      if (!FAQItemChild) return null

      return (
        <Accordion key={index} variant="emphasis">
          <Accordion.Heading>
            {React.isValidElement(GroupHeadingChild) && GroupHeadingChild.props.children}
          </Accordion.Heading>
          <Accordion.Content>{FAQItemChild}</Accordion.Content>
        </Accordion>
      )
    }
  })

  const GroupHeading = React.Children.toArray(children).find(
    child => React.isValidElement(child) && child.type === _Heading,
  )

  return (
    <Grid {...rest}>
      <Grid.Column>
        {GroupHeading && (
          <Box marginBlockEnd={{narrow: 48, regular: 80}}>
            <Grid>
              <Grid.Column>{GroupHeading}</Grid.Column>
            </Grid>
          </Box>
        )}

        <div className={clsx(styles.FAQGroup__accordion)}>{SectionedAccordions}</div>
        <Grid className={clsx(styles.FAQGroup)}>
          <Grid.Column span={{medium: 5, large: 4}} className={styles.FAQGroup__tablist}>
            <Stack
              direction="vertical"
              aria-orientation="vertical"
              padding="none"
              role="tablist"
              alignItems="flex-start"
            >
              {Tabs}
            </Stack>
          </Grid.Column>
          <Grid.Column start={6} span={7}>
            {TabPanels}
          </Grid.Column>
        </Grid>
      </Grid.Column>
    </Grid>
  )
}

/**
 * FAQGroup component:
 * {@link https://primer.style/brand/components/FAQ#grouped-faqs See usage examples}.
 */
export const FAQGroup = Object.assign(_FAQGroup, {
  Heading: _Heading,
})
