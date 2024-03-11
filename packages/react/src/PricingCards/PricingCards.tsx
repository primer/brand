import React, {forwardRef, HTMLAttributes, PropsWithChildren, type Ref} from 'react'
import {CheckIcon, ChevronDownIcon, XIcon} from '@primer/octicons-react'
import clsx from 'clsx'
import {useAnimation} from '../animation'
import type {BaseProps} from '../component-helpers'

import {
  Accordion,
  Button,
  ButtonBaseProps,
  Heading,
  HeadingProps,
  Label,
  Text,
  UnorderedList,
  UnorderedListProps,
  useWindowSize,
} from '..'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/pricing-cards/pricing-cards.css'

/**
 * Main stylesheet (as a CSS Module)
 */
import styles from './PricingCards.module.css'

export type PricingCardsProps<C extends keyof JSX.IntrinsicElements = 'section'> = React.HTMLAttributes<C> & {
  as?: C | 'section' | 'div'
  presentation?: 'default' | 'cards'
  ['data-testid']?: string
} & (C extends 'section' ? PropsWithChildren<BaseProps<HTMLElement>> : PropsWithChildren<BaseProps<HTMLDivElement>>)

const testIds = {
  root: 'PricingCards',
  item: 'PricingCards__item',
  heading: 'PricingCards__heading',
  label: 'PricingCards__label',
  description: 'PricingCards__description',
  price: 'PricingCards__price',
  primaryAction: 'PricingCards__primaryAction',
  secondaryAction: 'PricingCards__secondaryAction',
  featureList: 'PricingCards__featureList',
  featureListItem: 'PricingCards__featureListItem',
  featureListHeading: 'PricingCards__featureListHeading',
  footnote: 'PricingCards__footnote',
}

const PricingCardsRoot = forwardRef(
  (
    {
      animate,
      as = 'section',
      children,
      className,
      'data-testid': testId,
      presentation = 'default',
      style,
      ...rest
    }: PropsWithChildren<PricingCardsProps>,
    ref: Ref<HTMLDivElement>,
  ) => {
    const {classes: animationClasses, styles: animationInlineStyles} = useAnimation(animate)

    const filteredChildren = React.Children.toArray(children).filter(
      child => React.isValidElement(child) && typeof child.type !== 'string' && child.type === PricingCardsItem,
    )

    const validElements = ['div', 'section']
    const Component = validElements.includes(as) ? as : 'div'

    return (
      <Component
        className={clsx(
          styles.PricingCards,
          styles[`PricingCards--presentation-${presentation}`],
          styles[`PricingCards--items-${filteredChildren.length}`],
          animationClasses,
          className,
        )}
        ref={ref}
        {...(rest as HTMLAttributes<HTMLElement>)}
        style={{...animationInlineStyles, ...style}}
        data-testid={testId || testIds.root}
      >
        {filteredChildren.filter(child => React.isValidElement(child) && child.type === PricingCardsItem)}
      </Component>
    )
  },
)

export type PricingCardsItem<C extends keyof JSX.IntrinsicElements = 'article'> = React.HTMLAttributes<C> & {
  as?: C | 'article' | 'div'
  ['data-testid']?: string
} & (C extends 'article' ? PropsWithChildren<BaseProps<HTMLElement>> : PropsWithChildren<BaseProps<HTMLDivElement>>)

const PricingCardsItem = forwardRef(
  (
    {
      animate,
      as = 'article',
      'data-testid': testId,
      children,
      className,
      style,
      ...rest
    }: PropsWithChildren<PricingCardsItem>,
    ref: Ref<HTMLDivElement>,
  ) => {
    const {classes: animationClasses, styles: animationInlineStyles} = useAnimation(animate)

    type FilteredChildren = {
      Content: React.ReactElement<
        PricingCardsLabelProps | PricingCardsHeadingProps | PricingCardsDescriptionProps | PricingCardsPriceProps
      >[]
      FeatureList: React.ReactElement<PricingCardsFeatureListProps> | null
      Actions: React.ReactElement<PricingCardsActionsProps>[]
      Footnote: React.ReactElement<PricingCardsFootnoteProps> | null
    }

    const {Content, FeatureList, Actions, Footnote} = React.Children.toArray(children).reduce<FilteredChildren>(
      (acc, child) => {
        if (React.isValidElement(child) && typeof child.type !== 'string') {
          if (child.type === PricingCardsFeatureList) {
            acc.FeatureList = child as React.ReactElement<PricingCardsFeatureListProps> | null
          }

          if (child.type === PricingCardsPrimaryAction || child.type === PricingCardsSecondaryAction) {
            acc.Actions.push(child as React.ReactElement<PricingCardsActionsProps>)
          }

          if (child.type === PricingCardsFootnote) {
            acc.Footnote = child as React.ReactElement<PricingCardsFootnoteProps>
          }

          if (
            child.type === PricingCardsLabel ||
            child.type === PricingCardsHeading ||
            child.type === PricingCardsDescription ||
            child.type === PricingCardsPrice
          ) {
            acc.Content.push(
              child as React.ReactElement<
                | PricingCardsLabelProps
                | PricingCardsDescriptionProps
                | PricingCardsHeadingProps
                | PricingCardsPriceProps
              >,
            )
          }
        }
        return acc
      },
      {Content: [], FeatureList: null, Actions: [], Footnote: null},
    )

    const validElements = ['div', 'article']
    const Component = validElements.includes(as) ? as : 'div'

    return (
      <Component
        className={clsx(styles.PricingCards__item, animationClasses, className)}
        data-testid={testId || testIds.item}
        ref={ref}
        style={{...animationInlineStyles, ...style}}
        {...(rest as HTMLAttributes<HTMLElement>)}
      >
        {Content}
        {Actions.length > 0 && <div className={styles.PricingCards__actions}>{Actions}</div>}
        {FeatureList}
        {Footnote}
      </Component>
    )
  },
)

type PricingCardsLabelProps = PropsWithChildren<BaseProps<HTMLSpanElement>> & {
  'data-testid'?: string
}

const PricingCardsLabel = forwardRef<HTMLSpanElement, PricingCardsLabelProps>(
  ({children, className, 'data-testid': testId, ...rest}, ref) => {
    return (
      <Label
        className={clsx(styles.PricingCards__label, className)}
        data-testid={testId || testIds.label}
        ref={ref}
        size="medium"
        {...rest}
      >
        {children}
      </Label>
    )
  },
)

type PricingCardsDescriptionProps = PropsWithChildren<BaseProps<HTMLParagraphElement>> & {
  'data-testid'?: string
}

const PricingCardsDescription = forwardRef<HTMLParagraphElement, PricingCardsDescriptionProps>(
  ({children, className, 'data-testid': testId, ...rest}, ref) => {
    return (
      <Text
        as="p"
        className={clsx(styles.PricingCards__description, className)}
        data-testid={testId || testIds.description}
        ref={ref}
        size="200"
        variant="muted"
        {...rest}
      >
        {children}
      </Text>
    )
  },
)

type PricingCardsHeadingProps = BaseProps<HTMLHeadingElement> & {
  as?: Exclude<HeadingProps['as'], 'h1' | 'h2'>
  children: React.ReactNode | React.ReactNode[]
  'data-testid'?: string
} & HeadingProps

const PricingCardsHeading = forwardRef<HTMLHeadingElement, PricingCardsHeadingProps>(
  ({as = 'h3', children, 'data-testid': testId, size = '5', className, ...rest}, ref) => {
    return (
      <Heading
        as={as}
        className={clsx(styles.PricingCards__heading, styles[`PricingCards__heading--size-${size}`], className)}
        data-testid={testId || testIds.heading}
        ref={ref}
        size={size}
        {...rest}
      >
        {children}
      </Heading>
    )
  },
)

type PricingCardsPriceProps = PropsWithChildren<BaseProps<HTMLParagraphElement>> & {
  currencyCode?: string
  currencySymbol?: string
  'data-testid'?: string
  trailingText?: string
}

const PricingCardsPrice = forwardRef<HTMLParagraphElement, PricingCardsPriceProps>(
  (
    {children, className, currencyCode = 'USD', currencySymbol = '$', 'data-testid': testId, trailingText, ...rest},
    ref,
  ) => {
    return (
      <Text
        as="p"
        className={clsx(styles.PricingCards__price, className)}
        data-tesstid={testId || testIds.price}
        ref={ref}
        weight="normal"
        {...rest}
      >
        <Text as="span" className={styles['PricingCards__price-currency-symbol']} size="500" weight="normal">
          {currencySymbol}
        </Text>

        <Text as="span" className={styles['PricingCards__price-value']} size="700" weight="normal">
          {children}
        </Text>

        <Text as="span" className={styles['PricingCards__price-currency-code']} size="500" weight="normal">
          {currencyCode}
        </Text>

        {trailingText && (
          <Text as="span" className={styles['PricingCards__price-trailing-text']} size="200" variant="muted">
            {trailingText}
          </Text>
        )}
      </Text>
    )
  },
)

type PricingCardsFeatureListProps = BaseProps<HTMLUListElement> & {
  children: React.ReactElement<PricingCardsFeatureHeadingProps | PricingCardsFeatureListItemProps>[]
  'data-testid'?: string
}

type ValidFeatureListChildren = {
  Heading: React.ReactElement<PricingCardsFeatureHeadingProps> | null
  Items: React.ReactElement<PricingCardsFeatureListItemProps>[]
}[]

const PricingCardsFeatureList = forwardRef<HTMLDivElement, PricingCardsFeatureListProps>(
  ({children, className, 'data-testid': testId, ...rest}, ref) => {
    const {isLarge} = useWindowSize()

    const FilteredChidlrenSets = React.Children.toArray(children).reduce<ValidFeatureListChildren>((acc, child) => {
      if (React.isValidElement(child) && child.type === PricingCardsFeatureListItem) {
        if (acc.length === 0) {
          acc.push({Heading: null, Items: []})
        }
        acc[acc.length - 1].Items.push(child as React.ReactElement<PricingCardsFeatureListItemProps>)
      } else if (React.isValidElement(child) && child.type === PricingCardsFeatureHeading) {
        acc.push({
          Heading: child as React.ReactElement<PricingCardsFeatureHeadingProps>,
          Items: [],
        })
      }

      return acc
    }, [])

    const FeautreListItems = FilteredChidlrenSets.map(({Heading: HeadingChild, Items}, index) => (
      <div className={styles['PricingCards__feature-list-set']} key={index}>
        {HeadingChild}

        <UnorderedList variant="checked" {...(rest as UnorderedListProps)}>
          {Items}
        </UnorderedList>
      </div>
    ))

    return (
      <div
        className={clsx(styles['PricingCards__feature-list'], className)}
        data-testid={testId || testIds.featureList}
        ref={ref}
      >
        {!isLarge ? (
          <Accordion className={styles['PricingCards__feature-list-accordion']} open={false}>
            <Accordion.Heading
              as="h4"
              className={styles['PricingCards__feature-list-accordion-heading']}
              reversedToggles
            >
              <ChevronDownIcon className={styles['PricingCards__feature-list-accordion-chevron']} />
              What&apos;s included
            </Accordion.Heading>
            <Accordion.Content className={styles['PricingCards__feature-list-accordion-content']}>
              {FeautreListItems}
            </Accordion.Content>
          </Accordion>
        ) : (
          <>
            <Text size="200" variant="muted" className={styles['PricingCards__feature-list-toggle']}>
              What&apos;s included:
            </Text>
            {FeautreListItems}
          </>
        )}
      </div>
    )
  },
)

type PricingCardsFeatureHeadingProps = PropsWithChildren<BaseProps<HTMLHeadingElement>> & {
  'data-testid'?: string
}

const PricingCardsFeatureHeading = forwardRef<HTMLHeadingElement, PricingCardsFeatureHeadingProps>(
  ({children, className, 'data-testid': testId, ...rest}, ref) => {
    return (
      <Heading
        as="h4"
        className={clsx(styles['PricingCards__feature-list-heading'], className)}
        data-testid={testId || testIds.featureListHeading}
        ref={ref}
        size="subhead-medium"
        {...rest}
      >
        {children}
      </Heading>
    )
  },
)

type PricingCardsFeatureListItemProps = PropsWithChildren<BaseProps<HTMLLIElement>> & {
  'data-testid'?: string
  variant?: 'included' | 'excluded'
}

const PricingCardsFeatureListItem = forwardRef<HTMLLIElement, PricingCardsFeatureListItemProps>(
  ({children, className, variant = 'included', 'data-testid': testId, ...rest}, ref) => {
    const itemLeadingVisual = variant === 'included' ? CheckIcon : XIcon
    const itemLeadingVisualAriaLabel = variant === 'included' ? 'Includes' : 'Does not include'
    const itemLeadingVisualFill =
      variant === 'included' ? 'var(--brand-color-accent-primary)' : 'var(--brand-color-text-muted'

    return (
      <UnorderedList.Item
        className={clsx(
          styles['PricingCards__feature-list-item'],
          {[styles['PricingCards__feature-list-item--excluded']]: variant === 'excluded'},
          className,
        )}
        data-testid={testId || testIds.featureListItem}
        leadingVisual={itemLeadingVisual}
        leadingVisualAriaLabel={itemLeadingVisualAriaLabel}
        leadingVisualFill={itemLeadingVisualFill}
        ref={ref}
        {...rest}
      >
        {children}
      </UnorderedList.Item>
    )
  },
)

type RestrictedPolymorphism =
  | (BaseProps<HTMLAnchorElement> & {as?: 'a'})
  | (BaseProps<HTMLButtonElement> & {as?: 'button'})

type PricingCardsActionsProps = {
  as?: 'a' | 'button'
  href: string
  'data-testid'?: string
} & ButtonBaseProps &
  RestrictedPolymorphism

const PricingCardsPrimaryAction = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  PropsWithChildren<PricingCardsActionsProps>
>(({as, children, className, 'data-testid': testId, ...rest}, ref) => {
  return (
    <Button
      as={as}
      data-testid={testId || testIds.primaryAction}
      className={clsx(styles['PricingCards__primary-action'], className)}
      size="medium"
      variant="primary"
      {...rest}
      ref={ref as React.Ref<HTMLButtonElement>}
      block
    >
      {children}
    </Button>
  )
})

const PricingCardsSecondaryAction = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  PropsWithChildren<PricingCardsActionsProps>
>(({as, children, className, 'data-testid': testId, ...rest}, ref) => {
  return (
    <Button
      as={as}
      className={clsx(styles['PricingCards__primary-action'], className)}
      data-testid={testId || testIds.secondaryAction}
      variant="secondary"
      {...rest}
      ref={ref as React.Ref<HTMLButtonElement>}
      block
    >
      {children}
    </Button>
  )
})

type PricingCardsFootnoteProps = PropsWithChildren<BaseProps<HTMLParagraphElement>> & {
  'data-testid'?: string
}

const PricingCardsFootnote = forwardRef<HTMLParagraphElement, PricingCardsFootnoteProps>(
  ({children, className, 'data-testid': testId, ...rest}, ref) => {
    return (
      <Text
        as="p"
        className={clsx(styles.PricingCards__footnote, className)}
        data-testid={testId || testIds.footnote}
        ref={ref}
        size="100"
        variant="muted"
        weight="light"
        {...rest}
      >
        {children}
      </Text>
    )
  },
)

/**
 * Pricing card component:
 * {@link https://primer.style/brand/components/PricingCards/ See usage examples}.
 */
export const PricingCards = Object.assign(PricingCardsRoot, {
  Description: PricingCardsDescription,
  FeatureList: PricingCardsFeatureList,
  FeatureListHeading: PricingCardsFeatureHeading,
  FeatureListItem: PricingCardsFeatureListItem,
  Footnote: PricingCardsFootnote,
  Heading: PricingCardsHeading,
  Item: PricingCardsItem,
  Label: PricingCardsLabel,
  Price: PricingCardsPrice,
  PrimaryAction: PricingCardsPrimaryAction,
  SecondaryAction: PricingCardsSecondaryAction,
  testIds,
})
