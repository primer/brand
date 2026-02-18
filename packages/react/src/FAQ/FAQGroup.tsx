import React from 'react'
import {useId} from '../hooks/useId'
import {clsx} from 'clsx'

import {FAQSubheadingProps, FAQRootProps, FAQ} from './'
import {Accordion, Grid, Heading, Stack, Box} from '../'

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

function HeadingBase({children, className, as = 'h3', ...rest}: FAQSubheadingProps) {
  return (
    <Heading as={as} className={clsx(className)} {...rest}>
      {children}
    </Heading>
  )
}

export type FAQGroupProps = React.PropsWithChildren<{
  id?: string
  variant?: 'default' | 'gridline'
  defaultSelectedIndex?: number
  tabAttributes?: (children: React.ReactNode, index: number) => Record<string, unknown>
}>

function FAQGroupBase({
  children,
  id,
  variant = 'default',
  defaultSelectedIndex = 0,
  tabAttributes,
  ...rest
}: FAQGroupProps) {
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
    (child): child is React.ReactElement<FAQRootProps> =>
      React.isValidElement<FAQRootProps>(child) && child.type === FAQ,
  )

  const Tabs = React.Children.map(faqChildren, (faqChild, index) => {
    if (faqChild.props.children) {
      const GroupHeadingChild = React.Children.toArray(faqChild.props.children).find(
        (child): child is React.ReactElement<React.ComponentProps<typeof FAQ.Heading>> =>
          React.isValidElement(child) && child.type === FAQ.Heading,
      )

      const tabContents = GroupHeadingChild?.props.children

      const providedTabAttributes =
        GroupHeadingChild && tabAttributes ? tabAttributes(tabContents ?? null, index) : undefined
      const tabAttributeProps = providedTabAttributes ?? {}
      const {ref: providedTabRef, ...tabAttributeRest} = tabAttributeProps as {
        ref?: React.Ref<HTMLButtonElement>
      }

      const handleTabRef = (node: HTMLButtonElement | null) => {
        if (selectedIndex === index) {
          selectedTabRef.current = node
        } else if (selectedTabRef.current === node) {
          selectedTabRef.current = null
        }

        assignRef(providedTabRef, node)
      }

      return (
        <button
          type="button"
          role="tab"
          className={styles['FAQGroup__tablist-button']}
          id={`${instanceId}-tab-${index}`}
          aria-controls={`${instanceId}-panel-${index}`}
          aria-selected={selectedIndex === index}
          onClick={handleTabClick(index)}
          onKeyDown={handleKeyDown(index)}
          key={index}
          data-testid={`FAQGroup-tab-${index + 1}`}
          tabIndex={selectedIndex !== index ? -1 : undefined}
          ref={handleTabRef}
          {...tabAttributeRest}
        >
          {tabContents}
        </button>
      )
    }
    return null
  })

  const TabPanels = React.Children.map(faqChildren, (faqChild, index) => {
    if (faqChild.props.children) {
      const FAQItemChild = React.Children.map(faqChild.props.children, child =>
        React.isValidElement(child) && child.type !== FAQ.Heading ? child : null,
      )

      const FAQItemHeadingText = React.Children.map(faqChild.props.children, child =>
        React.isValidElement<{children?: React.ReactNode}>(child) && child.type === FAQ.Heading
          ? child.props.children
          : null,
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
            <FAQ.Subheading
              data-testid={`FAQGroup-tab-panel-heading-${index + 1}`}
              className={clsx(styles['FAQGroup__panel-subHeading'])}
            >
              {FAQItemHeadingText}
            </FAQ.Subheading>
          )}
          {FAQItemChild}
        </div>
      )
    }
  })

  const SectionedAccordions = React.Children.map(faqChildren, (faqChild, index) => {
    if (faqChild.props.children) {
      const GroupHeadingChild = React.Children.toArray(faqChild.props.children).find(
        (child): child is React.ReactElement<React.ComponentProps<typeof FAQ.Heading>> =>
          React.isValidElement(child) && child.type === FAQ.Heading,
      )
      const FAQItemChild = React.Children.map(faqChild.props.children, child =>
        React.isValidElement<{className?: string}>(child) && child.type !== FAQ.Heading
          ? React.cloneElement(child, {
              className: clsx(styles['FAQGroup__nested-accordion-item'], child.props.className),
            })
          : null,
      )

      if (!GroupHeadingChild || !FAQItemChild) return null

      return (
        <Accordion key={index} variant="emphasis">
          <Accordion.Heading {...GroupHeadingChild.props} />
          <Accordion.Content>{FAQItemChild}</Accordion.Content>
        </Accordion>
      )
    }
  })

  const GroupHeading = React.Children.toArray(children).find(
    (child): child is React.ReactElement<FAQSubheadingProps> =>
      React.isValidElement(child) && child.type === HeadingBase,
  )

  const Tag = variant === 'gridline' ? Box : React.Fragment
  const tagProps =
    variant === 'gridline'
      ? {borderBlockEndWidth: 'thin' as const, borderColor: 'muted' as const, borderStyle: 'solid' as const}
      : {}

  return (
    <Tag {...tagProps}>
      <div className={clsx(styles[`FAQGroup__heading-wrapper`], styles[`FAQGroup__heading-wrapper--${variant}`])}>
        <Grid {...rest}>
          <Grid.Column>
            {GroupHeading && (
              <Grid>
                <Grid.Column>{GroupHeading}</Grid.Column>
              </Grid>
            )}

            <div className={clsx(styles.FAQGroup__accordion)}>{SectionedAccordions}</div>
          </Grid.Column>
        </Grid>
      </div>
      <Grid {...rest}>
        <Grid.Column span={12}>
          <Grid className={clsx(styles.FAQGroup)}>
            <Grid.Column
              span={{medium: 5, large: 4}}
              className={clsx(
                styles.FAQGroup__tablist,
                variant === 'gridline' && styles['FAQGroup__tablist--gridline'],
              )}
            >
              <Stack
                direction="vertical"
                aria-orientation="vertical"
                padding="none"
                role="tablist"
                gap="none"
                alignItems="flex-start"
              >
                {Tabs}
              </Stack>
            </Grid.Column>
            <Grid.Column
              start={6}
              span={7}
              className={clsx(variant === 'gridline' && styles['FAQGroup__content--gridline'])}
            >
              {TabPanels}
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>
    </Tag>
  )
}

/**
 * FAQGroup component:
 * {@link https://primer.style/brand/components/FAQ#grouped-faqs See usage examples}.
 */
export const FAQGroup = Object.assign(FAQGroupBase, {
  Heading: HeadingBase,
})

function assignRef<T>(ref: React.Ref<T> | undefined, value: T | null) {
  if (!ref) return
  if (typeof ref === 'function') {
    ref(value)
    return
  }

  ;(ref as React.MutableRefObject<T | null>).current = value
}
