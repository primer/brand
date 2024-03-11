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
import styles from './PricingOptions.module.css'

export type PricingOptionsProps<C extends keyof JSX.IntrinsicElements = 'section'> = React.HTMLAttributes<C> & {
  as?: C | 'section' | 'div'
  presentation?: 'default' | 'cards'
  ['data-testid']?: string
} & (C extends 'section' ? PropsWithChildren<BaseProps<HTMLElement>> : PropsWithChildren<BaseProps<HTMLDivElement>>)

const testIds = {
  root: 'PricingOptions',
  item: 'PricingOptions__item',
  heading: 'PricingOptions__heading',
  label: 'PricingOptions__label',
  description: 'PricingOptions__description',
  price: 'PricingOptions__price',
  primaryAction: 'PricingOptions__primaryAction',
  secondaryAction: 'PricingOptions__secondaryAction',
  featureList: 'PricingOptions__featureList',
  featureListItem: 'PricingOptions__featureListItem',
  featureListHeading: 'PricingOptions__featureListHeading',
  footnote: 'PricingOptions__footnote',
}

const PricingOptionsRoot = forwardRef(
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
    }: PropsWithChildren<PricingOptionsProps>,
    ref: Ref<HTMLDivElement>,
  ) => {
    const {classes: animationClasses, styles: animationInlineStyles} = useAnimation(animate)

    const filteredChildren = React.Children.toArray(children).filter(
      child => React.isValidElement(child) && typeof child.type !== 'string' && child.type === PricingOptionsItem,
    )

    const validElements = ['div', 'section']
    const Component = validElements.includes(as) ? as : 'div'

    return (
      <Component
        className={clsx(
          styles.PricingOptions,
          styles[`PricingOptions--presentation-${presentation}`],
          styles[`PricingOptions--items-${filteredChildren.length}`],
          animationClasses,
          className,
        )}
        ref={ref}
        {...(rest as HTMLAttributes<HTMLElement>)}
        style={{...animationInlineStyles, ...style}}
        data-testid={testId || testIds.root}
      >
        {filteredChildren.filter(child => React.isValidElement(child) && child.type === PricingOptionsItem)}
      </Component>
    )
  },
)

export type PricingOptionsItem<C extends keyof JSX.IntrinsicElements = 'article'> = React.HTMLAttributes<C> & {
  as?: C | 'article' | 'div'
  ['data-testid']?: string
} & (C extends 'article' ? PropsWithChildren<BaseProps<HTMLElement>> : PropsWithChildren<BaseProps<HTMLDivElement>>)

const PricingOptionsItem = forwardRef(
  (
    {
      animate,
      as = 'article',
      'data-testid': testId,
      children,
      className,
      style,
      ...rest
    }: PropsWithChildren<PricingOptionsItem>,
    ref: Ref<HTMLDivElement>,
  ) => {
    const {classes: animationClasses, styles: animationInlineStyles} = useAnimation(animate)

    type FilteredChildren = {
      Content: React.ReactElement<
        | PricingOptionsLabelProps
        | PricingOptionsHeadingProps
        | PricingOptionsDescriptionProps
        | PricingOptionsPriceProps
      >[]
      FeatureList: React.ReactElement<PricingOptionsFeatureListProps> | null
      Actions: React.ReactElement<PricingOptionsActionsProps>[]
      Footnote: React.ReactElement<PricingOptionsFootnoteProps> | null
    }

    const {Content, FeatureList, Actions, Footnote} = React.Children.toArray(children).reduce<FilteredChildren>(
      (acc, child) => {
        if (React.isValidElement(child) && typeof child.type !== 'string') {
          if (child.type === PricingOptionsFeatureList) {
            acc.FeatureList = child as React.ReactElement<PricingOptionsFeatureListProps> | null
          }

          if (child.type === PricingOptionsPrimaryAction || child.type === PricingOptionsSecondaryAction) {
            acc.Actions.push(child as React.ReactElement<PricingOptionsActionsProps>)
          }

          if (child.type === PricingOptionsFootnote) {
            acc.Footnote = child as React.ReactElement<PricingOptionsFootnoteProps>
          }

          if (
            child.type === PricingOptionsLabel ||
            child.type === PricingOptionsHeading ||
            child.type === PricingOptionsDescription ||
            child.type === PricingOptionsPrice
          ) {
            acc.Content.push(
              child as React.ReactElement<
                | PricingOptionsLabelProps
                | PricingOptionsDescriptionProps
                | PricingOptionsHeadingProps
                | PricingOptionsPriceProps
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
        className={clsx(styles.PricingOptions__item, animationClasses, className)}
        data-testid={testId || testIds.item}
        ref={ref}
        style={{...animationInlineStyles, ...style}}
        {...(rest as HTMLAttributes<HTMLElement>)}
      >
        {Content}
        {Actions.length > 0 && <div className={styles.PricingOptions__actions}>{Actions}</div>}
        {FeatureList}
        {Footnote}
      </Component>
    )
  },
)

type PricingOptionsLabelProps = PropsWithChildren<BaseProps<HTMLSpanElement>> & {
  'data-testid'?: string
}

const PricingOptionsLabel = forwardRef<HTMLSpanElement, PricingOptionsLabelProps>(
  ({children, className, 'data-testid': testId, ...rest}, ref) => {
    return (
      <Label
        className={clsx(styles.PricingOptions__label, className)}
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

type PricingOptionsDescriptionProps = PropsWithChildren<BaseProps<HTMLParagraphElement>> & {
  'data-testid'?: string
}

const PricingOptionsDescription = forwardRef<HTMLParagraphElement, PricingOptionsDescriptionProps>(
  ({children, className, 'data-testid': testId, ...rest}, ref) => {
    return (
      <Text
        as="p"
        className={clsx(styles.PricingOptions__description, className)}
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

type PricingOptionsHeadingProps = BaseProps<HTMLHeadingElement> & {
  as?: Exclude<HeadingProps['as'], 'h1' | 'h2'>
  children: React.ReactNode | React.ReactNode[]
  'data-testid'?: string
} & HeadingProps

const PricingOptionsHeading = forwardRef<HTMLHeadingElement, PricingOptionsHeadingProps>(
  ({as = 'h3', children, 'data-testid': testId, size = '5', className, ...rest}, ref) => {
    return (
      <Heading
        as={as}
        className={clsx(styles.PricingOptions__heading, styles[`PricingOptions__heading--size-${size}`], className)}
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

type PricingOptionsPriceProps = PropsWithChildren<BaseProps<HTMLParagraphElement>> & {
  currencyCode?: string
  currencySymbol?: string
  'data-testid'?: string
  trailingText?: string
}

const PricingOptionsPrice = forwardRef<HTMLParagraphElement, PricingOptionsPriceProps>(
  (
    {children, className, currencyCode = 'USD', currencySymbol = '$', 'data-testid': testId, trailingText, ...rest},
    ref,
  ) => {
    return (
      <Text
        as="p"
        className={clsx(styles.PricingOptions__price, className)}
        data-tesstid={testId || testIds.price}
        ref={ref}
        weight="normal"
        {...rest}
      >
        <Text as="span" className={styles['PricingOptions__price-currency-symbol']} size="500" weight="normal">
          {currencySymbol}
        </Text>

        <Text as="span" className={styles['PricingOptions__price-value']} size="700" weight="normal">
          {children}
        </Text>

        <Text as="span" className={styles['PricingOptions__price-currency-code']} size="500" weight="normal">
          {currencyCode}
        </Text>

        {trailingText && (
          <Text as="span" className={styles['PricingOptions__price-trailing-text']} size="200" variant="muted">
            {trailingText}
          </Text>
        )}
      </Text>
    )
  },
)

type PricingOptionsFeatureListProps = BaseProps<HTMLUListElement> & {
  children: React.ReactElement<PricingOptionsFeatureHeadingProps | PricingOptionsFeatureListItemProps>[]
  'data-testid'?: string
}

type ValidFeatureListChildren = {
  Heading: React.ReactElement<PricingOptionsFeatureHeadingProps> | null
  Items: React.ReactElement<PricingOptionsFeatureListItemProps>[]
}[]

const PricingOptionsFeatureList = forwardRef<HTMLDivElement, PricingOptionsFeatureListProps>(
  ({children, className, 'data-testid': testId, ...rest}, ref) => {
    const {isLarge} = useWindowSize()

    const FilteredChidlrenSets = React.Children.toArray(children).reduce<ValidFeatureListChildren>((acc, child) => {
      if (React.isValidElement(child) && child.type === PricingOptionsFeatureListItem) {
        if (acc.length === 0) {
          acc.push({Heading: null, Items: []})
        }
        acc[acc.length - 1].Items.push(child as React.ReactElement<PricingOptionsFeatureListItemProps>)
      } else if (React.isValidElement(child) && child.type === PricingOptionsFeatureHeading) {
        acc.push({
          Heading: child as React.ReactElement<PricingOptionsFeatureHeadingProps>,
          Items: [],
        })
      }

      return acc
    }, [])

    const FeautreListItems = FilteredChidlrenSets.map(({Heading: HeadingChild, Items}, index) => (
      <div className={styles['PricingOptions__feature-list-set']} key={index}>
        {HeadingChild}

        <UnorderedList variant="checked" {...(rest as UnorderedListProps)}>
          {Items}
        </UnorderedList>
      </div>
    ))

    return (
      <div
        className={clsx(styles['PricingOptions__feature-list'], className)}
        data-testid={testId || testIds.featureList}
        ref={ref}
      >
        {!isLarge ? (
          <Accordion className={styles['PricingOptions__feature-list-accordion']} open={false}>
            <Accordion.Heading
              as="h4"
              className={styles['PricingOptions__feature-list-accordion-heading']}
              reversedToggles
            >
              <ChevronDownIcon className={styles['PricingOptions__feature-list-accordion-chevron']} />
              What&apos;s included
            </Accordion.Heading>
            <Accordion.Content className={styles['PricingOptions__feature-list-accordion-content']}>
              {FeautreListItems}
            </Accordion.Content>
          </Accordion>
        ) : (
          <>
            <Text size="200" variant="muted" className={styles['PricingOptions__feature-list-toggle']}>
              What&apos;s included:
            </Text>
            {FeautreListItems}
          </>
        )}
      </div>
    )
  },
)

type PricingOptionsFeatureHeadingProps = PropsWithChildren<BaseProps<HTMLHeadingElement>> & {
  'data-testid'?: string
}

const PricingOptionsFeatureHeading = forwardRef<HTMLHeadingElement, PricingOptionsFeatureHeadingProps>(
  ({children, className, 'data-testid': testId, ...rest}, ref) => {
    return (
      <Heading
        as="h4"
        className={clsx(styles['PricingOptions__feature-list-heading'], className)}
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

type PricingOptionsFeatureListItemProps = PropsWithChildren<BaseProps<HTMLLIElement>> & {
  'data-testid'?: string
  variant?: 'included' | 'excluded'
}

const PricingOptionsFeatureListItem = forwardRef<HTMLLIElement, PricingOptionsFeatureListItemProps>(
  ({children, className, variant = 'included', 'data-testid': testId, ...rest}, ref) => {
    const itemLeadingVisual = variant === 'included' ? CheckIcon : XIcon
    const itemLeadingVisualAriaLabel = variant === 'included' ? 'Includes' : 'Does not include'
    const itemLeadingVisualFill =
      variant === 'included' ? 'var(--brand-color-accent-primary)' : 'var(--brand-color-text-muted'

    return (
      <UnorderedList.Item
        className={clsx(
          styles['PricingOptions__feature-list-item'],
          {[styles['PricingOptions__feature-list-item--excluded']]: variant === 'excluded'},
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

type PricingOptionsActionsProps = {
  as?: 'a' | 'button'
  href: string
  'data-testid'?: string
} & ButtonBaseProps &
  RestrictedPolymorphism

const PricingOptionsPrimaryAction = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  PropsWithChildren<PricingOptionsActionsProps>
>(({as, children, className, 'data-testid': testId, ...rest}, ref) => {
  return (
    <Button
      as={as}
      data-testid={testId || testIds.primaryAction}
      className={clsx(styles['PricingOptions__primary-action'], className)}
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

const PricingOptionsSecondaryAction = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  PropsWithChildren<PricingOptionsActionsProps>
>(({as, children, className, 'data-testid': testId, ...rest}, ref) => {
  return (
    <Button
      as={as}
      className={clsx(styles['PricingOptions__primary-action'], className)}
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

type PricingOptionsFootnoteProps = PropsWithChildren<BaseProps<HTMLParagraphElement>> & {
  'data-testid'?: string
}

const PricingOptionsFootnote = forwardRef<HTMLParagraphElement, PricingOptionsFootnoteProps>(
  ({children, className, 'data-testid': testId, ...rest}, ref) => {
    return (
      <Text
        as="p"
        className={clsx(styles.PricingOptions__footnote, className)}
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
 * {@link https://primer.style/brand/components/PricingOptions/ See usage examples}.
 */
export const PricingOptions = Object.assign(PricingOptionsRoot, {
  Description: PricingOptionsDescription,
  FeatureList: PricingOptionsFeatureList,
  FeatureListHeading: PricingOptionsFeatureHeading,
  FeatureListItem: PricingOptionsFeatureListItem,
  Footnote: PricingOptionsFootnote,
  Heading: PricingOptionsHeading,
  Item: PricingOptionsItem,
  Label: PricingOptionsLabel,
  Price: PricingOptionsPrice,
  PrimaryAction: PricingOptionsPrimaryAction,
  SecondaryAction: PricingOptionsSecondaryAction,
  testIds,
})
