import React, {forwardRef, HTMLAttributes, PropsWithChildren, useMemo, Ref, Dispatch} from 'react'
import {CheckIcon, ChevronDownIcon, XIcon} from '@primer/octicons-react'
import {clsx} from 'clsx'
import type {ListItemProps} from '../list/ListItem/ListItem'
import type {BaseProps} from '../component-helpers'

import {
  Accordion,
  Button,
  ButtonBaseProps,
  Heading as HeadingComponent,
  HeadingProps,
  Label as LabelComponent,
  LabelProps,
  Text,
  UnorderedList,
  UnorderedListProps,
  useWindowSize,
} from '..'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/pricing-options/pricing-options.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/pricing-options/colors-with-modes.css'

/**
 * Main stylesheet (as a CSS Module)
 */
import styles from './PricingOptions.module.css'

type AlignOptions = 'start' | 'center'

export type PricingOptionsProps = {
  align?: AlignOptions
  variant?: 'default' | 'default-gradient' | 'cards' | 'cards-gradient'
  ['data-testid']?: string
} & PropsWithChildren<BaseProps<HTMLDivElement>>

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
  featureListHeading: 'PricingOptions__featureListHeading',
  featureListItem: 'PricingOptions__featureListItem',
  featureListGroupHeading: 'PricingOptions__featureListGroupHeading',
  footnote: 'PricingOptions__footnote',
}

type PricingOptionsContextValue = {
  align: AlignOptions
  allFeatureListsExpanded: boolean
  updateFeatureListExpanded: Dispatch<boolean>
  featureListUserInteracted: boolean
  setFeatureListUserInteracted: Dispatch<boolean>
}

const PricingOptionsContext = React.createContext<PricingOptionsContextValue>({
  align: 'start',
  allFeatureListsExpanded: false,
  featureListUserInteracted: false,
  updateFeatureListExpanded: () => {},
  setFeatureListUserInteracted: () => {},
})

const PricingOptionsProvider = ({children, align = 'start'}: PropsWithChildren<{align: AlignOptions}>) => {
  const [allFeatureListsExpanded, setAllFeatureListsExpanded] = React.useState(false)
  const [featureListUserInteracted, setFeatureListUserInteracted] = React.useState(false)

  const updateFeatureListExpanded = (newValue: boolean) => {
    setAllFeatureListsExpanded(() => newValue)
  }

  return (
    <PricingOptionsContext.Provider
      value={{
        allFeatureListsExpanded,
        updateFeatureListExpanded,
        align,
        featureListUserInteracted,
        setFeatureListUserInteracted,
      }}
    >
      {children}
    </PricingOptionsContext.Provider>
  )
}

const usePricingOptions = (): PricingOptionsContextValue => {
  return React.useContext(PricingOptionsContext)
}

const pricingOptionsDefaultFeatureListHeading = "What's included"

const PricingOptionsRoot = forwardRef(
  (
    {
      align = 'start',
      children,
      className,
      'data-testid': testId,
      variant = 'default',
      ...rest
    }: PropsWithChildren<PricingOptionsProps>,
    ref: Ref<HTMLDivElement>,
  ) => {
    const filteredChildren = useMemo(
      () =>
        React.Children.toArray(children).filter(
          child => React.isValidElement(child) && typeof child.type !== 'string' && child.type === PricingOptionsItem,
        ),
      [children],
    ).slice(0, 4)

    return (
      <PricingOptionsProvider align={align}>
        <div
          className={clsx(
            styles.PricingOptions,
            styles[`PricingOptions--layout-${variant.includes('default') ? 'default' : 'cards'}`],
            styles[`PricingOptions--items${filteredChildren.length}`],
            styles[`PricingOptions--appearance-${variant.includes('gradient') ? 'gradient' : 'solid'}`],
            className,
          )}
          data-testid={testId || testIds.root}
          ref={ref}
          {...(rest as HTMLAttributes<HTMLElement>)}
        >
          {filteredChildren.filter(child => React.isValidElement(child) && child.type === PricingOptionsItem)}
        </div>
      </PricingOptionsProvider>
    )
  },
)

export type PricingOptionsItem = {
  ['data-testid']?: string
  /**
   * Escape-hatch for inserting custom React components.
   * Warning:
   *   This prop isn't advertised in our docs but remains part of the public API for edge-cases.
   *   Need to use this prop? Please check in with #primer-brand first to confirm correct usage.
   */
  leadingComponent?: React.ReactElement
} & PropsWithChildren<BaseProps<HTMLDivElement>>

type FilteredChildren = {
  FeatureList: React.ReactElement<PricingOptionsFeatureListProps> | null
  Actions: React.ReactElement<PricingOptionsActionsProps>[]
  Footnote: React.ReactElement<PricingOptionsFootnoteProps> | null
  Heading: React.ReactElement<PricingOptionsHeadingProps> | null
  Description: React.ReactElement<PricingOptionsDescriptionProps> | null
  Label: React.ReactElement<PricingOptionsLabelProps> | null
  Price: React.ReactElement<PricingOptionsPriceProps> | null
}

const PricingOptionsItem = forwardRef(
  (
    {'data-testid': testId, children, className, leadingComponent, ...rest}: PropsWithChildren<PricingOptionsItem>,
    ref: Ref<HTMLDivElement>,
  ) => {
    const {align} = usePricingOptions()

    const memoizedChildren = useMemo(() => React.Children.toArray(children), [children])

    const {Heading, Description, Label, Price, FeatureList, Actions, Footnote} =
      memoizedChildren.reduce<FilteredChildren>(
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

            if (child.type === PricingOptionsHeading) {
              acc.Heading = child as React.ReactElement<PricingOptionsHeadingProps>
            }

            if (child.type === PricingOptionsDescription) {
              acc.Description = child as React.ReactElement<PricingOptionsDescriptionProps>
            }

            if (child.type === PricingOptionsLabel) {
              acc.Label = child as React.ReactElement<PricingOptionsLabelProps>
            }

            if (child.type === PricingOptionsPrice) {
              acc.Price = child as React.ReactElement<PricingOptionsPriceProps>
            }
          }
          return acc
        },
        {FeatureList: null, Actions: [], Footnote: null, Heading: null, Description: null, Label: null, Price: null},
      )

    return (
      <div
        className={clsx(
          styles.PricingOptions__item,
          leadingComponent && styles['PricingOptions__item--has-leading-component'],
          styles[`PricingOptions__item--align-${align}`],
          className,
        )}
        data-testid={testId || testIds.item}
        ref={ref}
        {...(rest as HTMLAttributes<HTMLElement>)}
      >
        <div className={styles['PricingOptions__header']}>
          {Heading}
          {Label}
        </div>
        {Description}
        {Price}
        {leadingComponent && <div className={styles['PricingOptions__leading-component']}>{leadingComponent}</div>}
        {Actions.length > 0 && <div className={styles.PricingOptions__actions}>{Actions}</div>}
        {FeatureList}
        {Footnote}
      </div>
    )
  },
)

type PricingOptionsLabelProps = PropsWithChildren<BaseProps<HTMLSpanElement>> & {
  'data-testid'?: string
} & LabelProps

const PricingOptionsLabel = forwardRef<HTMLSpanElement, PricingOptionsLabelProps>(
  ({children, className, 'data-testid': testId, ...rest}, ref) => {
    return (
      <LabelComponent
        className={clsx(styles.PricingOptions__label, className)}
        data-testid={testId || testIds.label}
        ref={ref}
        size="small"
        {...rest}
      >
        {children}
      </LabelComponent>
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

type PricingOptionsHeadingProps = PropsWithChildren<BaseProps<HTMLHeadingElement>> & {
  'data-testid'?: string
} & HeadingProps

const PricingOptionsHeading = forwardRef<HTMLHeadingElement, PricingOptionsHeadingProps>(
  ({as = 'h3', children, 'data-testid': testId, size = '5', className, ...rest}, ref) => {
    return (
      <HeadingComponent
        as={as}
        className={clsx(styles.PricingOptions__heading, styles[`PricingOptions__heading--size-${size}`], className)}
        data-testid={testId || testIds.heading}
        ref={ref}
        size={size}
        {...rest}
      >
        {children}
      </HeadingComponent>
    )
  },
)

type PricingOptionsPriceProps = PropsWithChildren<BaseProps<HTMLParagraphElement>> & {
  currencyCode?: string
  currencySymbol?: string
  'data-testid'?: string
  originalPrice?: string
  trailingText?: string
}

const PricingOptionsPrice = forwardRef<HTMLParagraphElement, PricingOptionsPriceProps>(
  (
    {
      children,
      className,
      currencyCode = 'USD',
      currencySymbol = '$',
      'data-testid': testId,
      originalPrice,
      trailingText,
      ...rest
    },
    ref,
  ) => {
    return (
      <Text
        as="p"
        className={clsx(styles.PricingOptions__price, className)}
        data-testid={testId || testIds.price}
        ref={ref}
        weight="normal"
        {...rest}
      >
        <Text
          as="span"
          className={styles['PricingOptions__price-currency-symbol']}
          font="hubot-sans"
          size="700"
          weight="normal"
        >
          {currencySymbol}
        </Text>

        <Text as="span" className={styles['PricingOptions__price-value']} font="hubot-sans" size="700" weight="normal">
          {children}
        </Text>

        <Text
          as="span"
          className={styles['PricingOptions__price-currency-code']}
          font="hubot-sans"
          size="100"
          weight="normal"
        >
          {currencyCode}
        </Text>

        {originalPrice && (
          <del className={styles['PricingOptions__price-original-price']}>
            <Text font="hubot-sans" size="400" variant="muted" weight="normal">
              {currencySymbol}
            </Text>
            <Text
              className={styles['PricingOptions__price-original-price-value']}
              font="hubot-sans"
              size="400"
              variant="muted"
              weight="normal"
            >
              {originalPrice}
            </Text>
          </del>
        )}

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
  accordionAs?: HeadingProps['as']
  expanded?: ExpandedProp
  hasDivider?: boolean
  children: React.ReactElement<PricingOptionsFeatureListGroupHeadingProps | PricingOptionsFeatureListItemProps>[]
  'data-testid'?: string
}

type ExpandedProp = boolean | ResponsiveExpandableProps

type ResponsiveExpandableProps = {
  narrow: boolean
  regular: boolean
  wide: boolean
}

type ValidFeatureListChildren = {
  Heading: React.ReactElement<PricingOptionsFeatureListGroupHeadingProps> | null
  Items: React.ReactElement<PricingOptionsFeatureListItemProps>[]
}[]

const PricingOptionsFeatureList = forwardRef<HTMLDivElement, PricingOptionsFeatureListProps>(
  ({children, className, 'data-testid': testId, hasDivider = true, expanded, accordionAs = 'h4', ...rest}, ref) => {
    const {
      allFeatureListsExpanded,
      updateFeatureListExpanded,
      featureListUserInteracted,
      setFeatureListUserInteracted,
    } = usePricingOptions()
    const {isMedium: isRegular, isXLarge: isWide, isSmall: isNarrow} = useWindowSize()

    React.useEffect(() => {
      if (expanded === undefined || typeof expanded === 'object') {
        setFeatureListUserInteracted(false)
      }
    }, [isRegular, isWide, isNarrow, setFeatureListUserInteracted, expanded])

    const shouldBeOpen = React.useMemo(() => {
      if (featureListUserInteracted) {
        return allFeatureListsExpanded
      }

      // Important: Fixes layout shift by ensuring that explicit values are preserved.
      if (typeof expanded === 'boolean') {
        return expanded
      }
      // If undefined, should follow some default responsive logic
      if (expanded === undefined) {
        if (isWide) return true
        if (isRegular) return true
        return false
      }

      // finally handle responsive objects, and go from largest to smallest viewports
      const {narrow, regular, wide} = expanded
      if (isWide) return wide
      if (isRegular) return regular
      return narrow
    }, [expanded, allFeatureListsExpanded, isRegular, isWide, featureListUserInteracted])

    let FeatureListHeading = (
      <PricingOptions.FeatureListHeading>{pricingOptionsDefaultFeatureListHeading}</PricingOptions.FeatureListHeading>
    )

    const FilteredChildrenSet = React.Children.toArray(children).reduce<ValidFeatureListChildren>((acc, child) => {
      if (React.isValidElement(child) && child.type === PricingOptionsFeatureListHeading) {
        FeatureListHeading = child
      } else if (React.isValidElement(child) && child.type === PricingOptionsFeatureListItem) {
        if (acc.length === 0) {
          acc.push({Heading: null, Items: []})
        }
        acc[acc.length - 1].Items.push(child as React.ReactElement<PricingOptionsFeatureListItemProps>)
      } else if (React.isValidElement(child) && child.type === PricingOptionsFeatureListGroupHeading) {
        acc.push({
          Heading: child as React.ReactElement<PricingOptionsFeatureListGroupHeadingProps>,
          Items: [],
        })
      }

      return acc
    }, [])

    const FeatureListItems = FilteredChildrenSet.map(({Heading: HeadingChild, Items}, index) => (
      <div className={styles['PricingOptions__feature-list-set']} key={index}>
        {HeadingChild}

        <UnorderedList variant="checked" {...(rest as UnorderedListProps)}>
          {Items}
        </UnorderedList>
      </div>
    ))

    return (
      <div
        ref={ref}
        className={clsx(
          styles['PricingOptions__feature-list'],
          hasDivider && styles['PricingOptions__feature-list--has-divider'],
          className,
        )}
        data-testid={testId || testIds.featureList}
      >
        <Accordion
          className={styles['PricingOptions__feature-list-accordion']}
          open={shouldBeOpen}
          onToggle={event => {
            setFeatureListUserInteracted(true)
            updateFeatureListExpanded(event.currentTarget.open)
          }}
        >
          <Accordion.Heading
            as={accordionAs}
            className={styles['PricingOptions__feature-list-accordion-heading']}
            reversedToggles
          >
            <ChevronDownIcon className={styles['PricingOptions__feature-list-accordion-chevron']} />
            {FeatureListHeading}
          </Accordion.Heading>
          <Accordion.Content className={styles['PricingOptions__feature-list-accordion-content']}>
            {FeatureListItems}
          </Accordion.Content>
        </Accordion>
      </div>
    )
  },
)

type PricingOptionsFeatureListHeadingProps = PropsWithChildren<BaseProps<HTMLDivElement>> & {
  'data-testid'?: string
}

const PricingOptionsFeatureListHeading = forwardRef<HTMLDivElement, PricingOptionsFeatureListHeadingProps>(
  ({children, className, 'data-testid': testId, ...rest}, ref) => {
    return (
      <div className={className} data-testid={testId || testIds.featureListHeading} ref={ref} {...rest}>
        {children}
      </div>
    )
  },
)

type PricingOptionsFeatureListGroupHeadingProps = PropsWithChildren<BaseProps<HTMLHeadingElement>> & {
  as?: Exclude<HeadingProps['as'], 'h1' | 'h2'>
  'data-testid'?: string
}

const PricingOptionsFeatureListGroupHeading = forwardRef<
  HTMLHeadingElement,
  PricingOptionsFeatureListGroupHeadingProps
>(({children, className, 'data-testid': testId, ...rest}, ref) => {
  return (
    <HeadingComponent
      as="h4"
      className={clsx(styles['PricingOptions__feature-list-group-heading'], className)}
      data-testid={testId || testIds.featureListGroupHeading}
      ref={ref}
      size="subhead-medium"
      {...rest}
    >
      {children}
    </HeadingComponent>
  )
})

type PricingOptionsFeatureListItemProps = PropsWithChildren<BaseProps<HTMLLIElement>> & {
  'data-testid'?: string
  variant?: 'included' | 'excluded'
} & Omit<ListItemProps, 'variant'>

const PricingOptionsFeatureListItem = forwardRef<HTMLLIElement, PricingOptionsFeatureListItemProps>(
  (
    {children, className, leadingVisual, leadingVisualFill, variant = 'included', 'data-testid': testId, ...rest},
    ref,
  ) => {
    const itemLeadingVisual = leadingVisual ?? (variant === 'included' ? CheckIcon : XIcon)
    const itemLeadingVisualAriaLabel = variant === 'included' ? 'Includes' : 'Does not include'

    const itemLeadingVisualFill =
      leadingVisualFill ??
      (variant === 'included' ? 'var(--brand-color-accent-primary)' : 'var(--brand-color-text-muted)')

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

type AsA = {as: 'a'; href: string; 'data-testid'?: string} & React.AnchorHTMLAttributes<BaseProps<HTMLAnchorElement>> &
  ButtonBaseProps

type AsButton = {as: 'button'; 'data-testid'?: string} & React.ButtonHTMLAttributes<BaseProps<HTMLButtonElement>> &
  ButtonBaseProps

type PricingOptionsActionsProps = AsA | AsButton

const PricingOptionsPrimaryAction = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  PropsWithChildren<PricingOptionsActionsProps>
>(({as, children, className, 'data-testid': testId, ...rest}, ref) => {
  return (
    <Button
      ref={ref as React.Ref<HTMLButtonElement>}
      as={as}
      data-testid={testId || testIds.primaryAction}
      className={clsx(styles['PricingOptions__primary-action'], className)}
      size="medium"
      variant="primary"
      block
      {...rest}
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
      ref={ref as React.Ref<HTMLButtonElement>}
      as={as}
      className={clsx(styles['PricingOptions__primary-action'], className)}
      data-testid={testId || testIds.secondaryAction}
      variant="secondary"
      block
      {...rest}
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
 * Pricing options component:
 * {@link https://primer.style/brand/components/PricingOptions/ See usage examples}.
 */
export const PricingOptions = Object.assign(PricingOptionsRoot, {
  Description: PricingOptionsDescription,
  FeatureList: PricingOptionsFeatureList,
  FeatureListHeading: PricingOptionsFeatureListHeading,
  FeatureListGroupHeading: PricingOptionsFeatureListGroupHeading,
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
