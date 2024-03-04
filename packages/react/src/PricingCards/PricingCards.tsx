import {CheckIcon, XIcon} from '@primer/octicons-react'
import clsx from 'clsx'
import React, {HTMLAttributes, PropsWithChildren, forwardRef, type Ref} from 'react'
import {useAnimation} from '../animation'
import type {BaseProps} from '../component-helpers'

import {Button, ButtonBaseProps, Heading, HeadingProps, Label, Text, UnorderedList, UnorderedListProps} from '..'

/**
 * Design tokens
 */
// import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/pricing-cards/base.css'

/**
 * Main stylesheet (as a CSS Module)
 */
import styles from './PricingCards.module.css'

export type PricingCardsProps<C extends keyof JSX.IntrinsicElements = 'section'> = React.HTMLAttributes<C> & {
  /**
   * The HTML element used to render the PricingCards.
   */
  as?: C | 'section' | 'div'
  /**
   * The presentation style of the PricingCards.
   */
  presentation?: 'default' | 'cards'

  ['data-testid']?: string
} & (C extends 'section' ? PropsWithChildren<BaseProps<HTMLElement>> : PropsWithChildren<BaseProps<HTMLDivElement>>)

const testIds = {
  root: 'PricingCards',
  item: 'PricingCards__item',
  heading: 'PricingCards__heading',
  description: 'PricingCards__description',
  price: 'PricingCards__price',
  button: 'PricingCards__button',
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
  /**
   * The HTML element used to render individual PricingCards items.
   */
  as?: C | 'article' | 'div'
} & (C extends 'article' ? PropsWithChildren<BaseProps<HTMLElement>> : PropsWithChildren<BaseProps<HTMLDivElement>>)

const PricingCardsItem = forwardRef(
  (
    {children, className, animate, as = 'article', style, ...rest}: PropsWithChildren<PricingCardsItem>,
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
        ref={ref}
        {...(rest as HTMLAttributes<HTMLElement>)}
        style={{...animationInlineStyles, ...style}}
      >
        {Content}
        {Actions.length > 0 && <div className={styles.PricingCards__actions}>{Actions}</div>}
        {FeatureList}
        {Footnote}
      </Component>
    )
  },
)

type PricingCardsLabelProps = PropsWithChildren<BaseProps<HTMLSpanElement>>

const PricingCardsLabel = forwardRef<HTMLSpanElement, PricingCardsLabelProps>(({children, className, ...rest}, ref) => {
  return (
    <Label ref={ref} size="medium" className={clsx(styles.PricingCards__label, className)} {...rest}>
      {children}
    </Label>
  )
})

type PricingCardsDescriptionProps = PropsWithChildren<BaseProps<HTMLParagraphElement>>

const PricingCardsDescription = forwardRef<HTMLParagraphElement, PricingCardsDescriptionProps>(
  ({children, className, ...rest}, ref) => {
    return (
      <Text
        variant="muted"
        ref={ref}
        size="200"
        as="p"
        className={clsx(styles.PricingCards__description, className)}
        {...rest}
      >
        {children}
      </Text>
    )
  },
)

type PricingCardsHeadingProps = BaseProps<HTMLHeadingElement> & {
  children: React.ReactNode | React.ReactNode[]
  as?: Exclude<HeadingProps['as'], 'h1' | 'h2'>
} & HeadingProps

const PricingCardsHeading = forwardRef<HTMLHeadingElement, PricingCardsHeadingProps>(
  ({children, as = 'h3', size = '5', className, ...rest}, ref) => {
    return (
      <Heading
        size={size}
        className={clsx(styles.PricingCards__heading, styles[`PricingCards__heading--size-${size}`], className)}
        ref={ref}
        as={as}
        {...rest}
      >
        {children}
      </Heading>
    )
  },
)

type PricingCardsPriceProps = PropsWithChildren<BaseProps<HTMLParagraphElement>> & {
  currencySymbol?: string
  currencySymbolPosition?: 'leading' | 'trailing'
  trailingText?: string
}

const PricingCardsPrice = forwardRef<HTMLParagraphElement, PricingCardsPriceProps>(
  ({children, className, currencySymbol, currencySymbolPosition = 'leading', trailingText, ...rest}, ref) => {
    const currencySymbolMarkup = (
      <Text as="span" size="500" weight="normal" className={styles['PricingCards__price-currency-symbol']}>
        {currencySymbol}
      </Text>
    )

    return (
      <Text as="p" weight="normal" ref={ref} className={clsx(styles.PricingCards__price, className)} {...rest}>
        {currencySymbolPosition === 'leading' && currencySymbolMarkup}

        <Text as="span" size="700" weight="normal" className={styles['PricingCards__price-value']}>
          {children}
        </Text>

        {currencySymbolPosition === 'trailing' && currencySymbolMarkup}

        {trailingText && (
          <Text
            as="span"
            size="100"
            weight="light"
            variant="muted"
            className={styles['PricingCards__price-trailing-text']}
          >
            {trailingText}
          </Text>
        )}
      </Text>
    )
  },
)

type PricingCardsFeatureListProps = BaseProps<HTMLUListElement> & {
  children: React.ReactElement<PricingCardsFeatureHeadingProps | PricingCardsFeatureListItemProps>[]
}

type ValidFeatureListChildren = {
  Heading: React.ReactElement<PricingCardsFeatureHeadingProps> | null
  Items: React.ReactElement<PricingCardsFeatureListItemProps>[]
}[]

const PricingCardsFeatureList = forwardRef<HTMLDivElement, PricingCardsFeatureListProps>(
  ({children, className, ...rest}, ref) => {
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

    return (
      <div ref={ref} className={clsx(styles['PricingCards__feature-list'], className)}>
        {FilteredChidlrenSets.map(({Heading: HeadingChild, Items}, index) => (
          <div key={index} className={styles['PricingCards__feature-list-set']}>
            {HeadingChild}

            <UnorderedList variant="checked" {...(rest as UnorderedListProps)}>
              {Items}
            </UnorderedList>
          </div>
        ))}
      </div>
    )
  },
)

type PricingCardsFeatureHeadingProps = PropsWithChildren<BaseProps<HTMLHeadingElement>>

const PricingCardsFeatureHeading = forwardRef<HTMLHeadingElement, PricingCardsFeatureHeadingProps>(
  ({children, className, ...rest}, ref) => {
    return (
      <Heading
        as="h4"
        size="subhead-medium"
        className={clsx(styles['PricingCards__feature-list-heading'], className)}
        ref={ref}
        {...rest}
      >
        {children}
      </Heading>
    )
  },
)

type PricingCardsFeatureListItemProps = PropsWithChildren<BaseProps<HTMLLIElement>> & {
  variant?: 'included' | 'excluded'
}

const PricingCardsFeatureListItem = forwardRef<HTMLLIElement, PricingCardsFeatureListItemProps>(
  ({children, className, variant = 'included', ...rest}, ref) => {
    const itemLeadingVisual = variant === 'included' ? CheckIcon : XIcon
    const itemLeadingVisualAriaLabel = variant === 'included' ? 'Includes' : 'Does not include'
    const itemLeadingVisualFill =
      variant === 'included' ? 'var(--brand-color-accent-primary)' : 'var(--brand-color-text-muted'

    return (
      <UnorderedList.Item
        ref={ref}
        leadingVisual={itemLeadingVisual}
        leadingVisualFill={itemLeadingVisualFill}
        leadingVisualAriaLabel={itemLeadingVisualAriaLabel}
        className={clsx(
          styles['PricingCards__feature-list-item'],
          {[styles['PricingCards__feature-list-item--excluded']]: variant === 'excluded'},
          className,
        )}
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
} & ButtonBaseProps &
  RestrictedPolymorphism

const PricingCardsPrimaryAction = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  PropsWithChildren<PricingCardsActionsProps>
>(({as, children, className, ...rest}, ref) => {
  return (
    <Button
      as={as}
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
>(({as, children, className, ...rest}, ref) => {
  return (
    <Button
      as={as}
      className={clsx(styles['PricingCards__primary-action'], className)}
      variant="secondary"
      {...rest}
      ref={ref as React.Ref<HTMLButtonElement>}
      block
    >
      {children}
    </Button>
  )
})

type PricingCardsFootnoteProps = PropsWithChildren<BaseProps<HTMLParagraphElement>>

const PricingCardsFootnote = forwardRef<HTMLParagraphElement, PricingCardsFootnoteProps>(
  ({children, className, ...rest}, ref) => {
    return (
      <Text
        as="p"
        ref={ref}
        size="100"
        weight="light"
        variant="muted"
        className={clsx(styles.PricingCards__footnote, className)}
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
  Item: PricingCardsItem,
  Label: PricingCardsLabel,
  Heading: PricingCardsHeading,
  Description: PricingCardsDescription,
  Price: PricingCardsPrice,
  FeatureList: PricingCardsFeatureList,
  FeatureListHeading: PricingCardsFeatureHeading,
  FeatureListItem: PricingCardsFeatureListItem,
  PrimaryAction: PricingCardsPrimaryAction,
  SecondaryAction: PricingCardsSecondaryAction,
  Footnote: PricingCardsFootnote,
  testIds,
})
