import React from 'react'
import {useId} from '@reach/auto-id'
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
    <Heading as={as} className={clsx(styles.FAQ__subheading, className)} {...rest}>
      {children}
    </Heading>
  )
}

type FAQGroupProps = React.PropsWithChildren<{
  id?: string
  defaultSelectedIndex?: number
}>

function _FAQGroup({children, id, defaultSelectedIndex = 0, ...rest}: FAQGroupProps) {
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
        child => React.isValidElement(child) && child.type === FAQ.Heading,
      )

      return (
        <Button
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
          key={index}
          data-testid={`FAQGroup-tab-${index + 1}`}
        >
          {React.isValidElement(GroupHeadingChild) && GroupHeadingChild.props.children}
        </Button>
      )
    }
    return null
  })

  const TabPanels = React.Children.map(faqChildren, (faqChild, index) => {
    if (React.isValidElement<FAQRootProps>(faqChild) && faqChild.props.children) {
      const FAQItemChild = React.Children.map(faqChild.props.children, child =>
        React.isValidElement(child) && child.type !== FAQ.Heading ? child : null,
      )

      const FAQItemHeadingText = React.Children.map(faqChild.props.children, child =>
        React.isValidElement(child) && child.type === FAQ.Heading ? child.props.children : null,
      )

      return (
        <div
          role="tabpanel"
          id={`${instanceId}-panel-${index}`}
          aria-labelledby={`${instanceId}-tab-${index}`}
          hidden={selectedIndex !== index}
          key={index}
          data-testid={`FAQGroup-tab-panel-${index + 1}`}
        >
          {FAQItemHeadingText && (
            <FAQ.Subheading data-testid={`FAQGroup-tab-panel-heading-${index + 1}`}>
              {FAQItemHeadingText}
            </FAQ.Subheading>
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
          <Box marginBlockEnd={{narrow: 48, regular: 112}}>
            <Grid>
              <Grid.Column>{GroupHeading}</Grid.Column>
            </Grid>
          </Box>
        )}

        <div className={clsx(styles.FAQGroup__accordion)}>{SectionedAccordions}</div>
        <Grid className={clsx(styles.FAQGroup)}>
          <Grid.Column span={{medium: 5, large: 4}} className={styles.FAQGroup__tablist}>
            <Stack direction="vertical" padding="none" role="tablist" alignItems="flex-start">
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
