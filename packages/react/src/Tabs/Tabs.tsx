import React, {
  memo,
  ReactNode,
  forwardRef,
  Children,
  isValidElement,
  cloneElement,
  useRef,
  useEffect,
  HTMLAttributes,
  useCallback,
} from 'react'
import clsx from 'clsx'
import {ChevronLeftIcon, ChevronRightIcon} from '@primer/octicons-react'
import {useTabs} from '../hooks/useTabs'
import {useProvidedRefOrCreate} from '../hooks/useRef'
import {BaseProps} from '../component-helpers'
import {Animate, AnimationProvider, AnimationVariants} from '../animation'
import {Text} from '../Text'
import {Stack} from '../Stack'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/tabs/base.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/tabs/colors-with-modes.css'

/** * Main Stylesheet (as a CSS Module) */
import styles from './Tabs.module.css'

const testIds = {
  root: 'Tabs',
  get tab() {
    return `${this.root}-tab`
  },
  get panel() {
    return `${this.root}-panel`
  },
}

/**
 * Accessible label for the entire tabs component, used by screen readers to describe the tab group.
 * Note: Only use one of `aria-label` or `aria-labelled` by. Not both or neither.
 */
type LabelOrLabelledBy =
  | {'aria-label': string; 'aria-labelledby'?: never}
  | {'aria-labelledby': string; 'aria-label'?: never}

export type TabsProps = {
  /**
   * Visual style variant of the tabs. Affects the appearance and styling theme.
   */
  variant?: 'default' | 'accent' | 'underline'
  /**
   * Horizontal alignment of the tab navigation. Defaults to 'start'.
   */
  align?: 'start' | 'center'
  /**
   * Named children to be rendered as tab items and panels.
   */
  children: ReactNode
  /**
   * Sets the default active tab. "0" (first tab) by default.
   */
  defaultActiveTab?: string
  /**
   * Callback function triggered when the active tab changes. Receives the new active tab identifier.
   */
  onChange?: (activeTab: string) => void

  /**
   * Additional CSS class names to apply to the tabs container for custom styling.
   */
  className?: string
  /**
   * @param internalAccessibleLabels - Customizable labels for screen readers to improve accessibility. These are applied internally using the aria-label attribute.
   * @param internalAccessibleLabels.controlsNext - Label for the "next tab" control button, used by screen readers. Default is "Next tab".
   * @param internalAccessibleLabels.controlsPrev - Label for the "previous tab" control button, used by screen readers. Default is "Previous tab".
   */
  internalAccessibleLabels?: {
    controlsNext: string
    controlsPrev: string
  }
} & LabelOrLabelledBy &
  BaseProps<HTMLDivElement> &
  Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>

const defaultInternalAccessibleLabels = {
  controlsNext: 'Next tab',
  controlsPrev: 'Previous tab',
}

const _TabsRoot = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      align = 'center',
      children,
      defaultActiveTab,
      onChange,
      variant = 'default',
      className,
      'aria-label': ariaLabel,
      internalAccessibleLabels = defaultInternalAccessibleLabels,
      ...props
    },
    ref,
  ) => {
    const {activeTab, activateTab, getTabListProps, getTabProps, getTabPanelProps} = useTabs({
      defaultTab: defaultActiveTab,
      onTabActivate: onChange,
    })
    const tabsContainerRef = useRef<HTMLDivElement>(null)
    const tabsWrapperRef = useRef<HTMLDivElement>(null)
    const sliderRef = useRef<HTMLDivElement>(null)

    const childrenArray = Children.toArray(children)

    const tabs = childrenArray
      .filter((child): child is React.ReactElement => isValidElement(child) && child.type === TabsItem)
      .map((tab, index) => {
        const tabId = String(index)
        const originalRef = (tab as React.ReactElement & {ref?: React.Ref<HTMLButtonElement>}).ref
        const tabProps = getTabProps(tabId, originalRef)

        return cloneElement(tab, {
          ...tabProps,
          id: tab.props.id ?? tabProps.id,
          'aria-controls': tab.props['aria-controls'] ?? tabProps['aria-controls'],
          value: tabId,
          key: tabProps.id,
          isActive: activeTab === tabId,
          variant,
        })
      })

    const panels = childrenArray
      .filter((child): child is React.ReactElement => isValidElement(child) && child.type === TabsPanel)
      .map((child, index) => {
        const panelId = String(index)
        const tabPanelProps = getTabPanelProps(panelId)

        return cloneElement(child, {
          ...tabPanelProps,
          id: child.props.id ?? tabPanelProps.id,
          key: String(index),
        })
      })

    useEffect(() => {
      if (!tabsContainerRef.current || !sliderRef.current) return

      const activeTabButton = tabsContainerRef.current.querySelector(`[aria-selected="true"]`) as HTMLButtonElement

      if (!activeTab) return

      const updateSliderPosition = () => {
        const sliderElement = sliderRef.current
        const tabsContainer = tabsContainerRef.current
        if (!sliderElement || !tabsContainer) return

        const containerPaddingRem = window
          .getComputedStyle(tabsContainer)
          .getPropertyValue('--brand-Tabs-container-padding')

        const containerPadding = parseFloat(containerPaddingRem) * 16 // base size

        const offsetX = activeTabButton.offsetLeft - containerPadding
        const width = activeTabButton.offsetWidth

        sliderElement.style.setProperty('--brand-Tabs-slider-x', `${offsetX}px`)
        sliderElement.style.setProperty('--brand-Tabs-slider-width', `${width}px`)
      }

      updateSliderPosition()

      const resizeObserver = new ResizeObserver(updateSliderPosition)
      resizeObserver.observe(tabsContainerRef.current)

      // On narrow viewports this will scroll the active tab into the center.
      // Important because we show a gradient in dark mode.
      const tabsContainer = tabsContainerRef.current
      const containerWidth = tabsContainer.clientWidth
      const containerPaddingRem = window
        .getComputedStyle(tabsContainer)
        .getPropertyValue('--brand-Tabs-container-padding')
      const containerPadding = parseFloat(containerPaddingRem) * 16
      const tabLeft = activeTabButton.offsetLeft - containerPadding
      const tabWidth = activeTabButton.offsetWidth
      const tabCenter = tabLeft + tabWidth / 2

      const targetScrollLeft = tabCenter - containerWidth / 2

      const maxScrollLeft = tabsContainer.scrollWidth - containerWidth // defines boudnary
      const finalScrollLeft = Math.max(0, Math.min(targetScrollLeft, maxScrollLeft))

      tabsContainer.scrollTo({
        left: finalScrollLeft,
        behavior: 'smooth',
      })

      return () => {
        resizeObserver.disconnect()
      }
    }, [activeTab])

    // Tracks the overflow state for mobile gradient visibility
    // Should only appear when enough items trigger an overflow
    // Related to gradient functionality
    useEffect(() => {
      const tabsContainer = tabsContainerRef.current
      const wrapperElement = tabsWrapperRef.current
      if (!tabsContainer || !wrapperElement) return

      const updateScrollState = () => {
        const {scrollLeft, scrollWidth, clientWidth} = tabsContainer
        const hasOverflow = scrollWidth > clientWidth
        const canScrollRight = hasOverflow && scrollLeft < scrollWidth - clientWidth - 1

        // Set CSS variables on the wrapper element for the gradient
        wrapperElement.style.setProperty('--scroll-offset', `${scrollLeft}px`)
        wrapperElement.style.setProperty('--has-overflow', hasOverflow ? '1' : '0')
        wrapperElement.style.setProperty('--can-scroll-right', canScrollRight ? '1' : '0')
      }

      updateScrollState()
      const resizeObserver = new ResizeObserver(updateScrollState)
      resizeObserver.observe(tabsContainer)

      // eslint-disable-next-line github/prefer-observers
      tabsContainer.addEventListener('scroll', updateScrollState)

      return () => {
        tabsContainer.removeEventListener('scroll', updateScrollState)
        resizeObserver.disconnect()
      }
    }, [tabs])

    const tabListProps = getTabListProps({label: ariaLabel})

    const handleNextTabControl = useCallback(() => {
      if (activeTab && activeTab !== String(tabs.length - 1)) {
        activateTab(String(Number(activeTab) + 1))
      }
    }, [activeTab, activateTab, tabs])

    const handlePrevTabControl = useCallback(() => {
      if (activeTab && activeTab !== '0') {
        activateTab(String(Number(activeTab) - 1))
      }
    }, [activeTab, activateTab])

    const hasMoreThanTwoTabs = tabs.length >= 3
    const isLastTabActive = String(tabs.length - 1) === activeTab

    return (
      <div
        className={clsx(
          styles['Tabs-container'],
          styles[`Tabs-container--align-${align}`],
          isLastTabActive && styles['Tabs-container--lastTabIsActive'],
          className,
        )}
        ref={ref}
        data-testid={testIds.root}
        {...props}
      >
        {/* Narrow only indicators and controls */}
        {tabs.length >= 3 && (
          <div className={styles.Tabs__controls}>
            <Stack direction="horizontal" padding="none" justifyContent="space-between">
              <button
                onClick={handlePrevTabControl}
                className={styles.Tabs__control}
                aria-label={internalAccessibleLabels.controlsPrev}
              >
                <Text size="100">
                  <ChevronLeftIcon size={16} className={styles['Tabs__control-icon']} />
                </Text>
              </button>
              <Stack direction="horizontal" gap={4} padding="none" justifyContent="space-between" alignItems="center">
                {tabs.map((_, index) => {
                  return (
                    <div
                      key={index}
                      className={clsx(
                        styles.Tabs__indicator,
                        activeTab && Number(activeTab) === index && styles['Tabs__indicator--active'],
                      )}
                    />
                  )
                })}
              </Stack>
              <button
                onClick={handleNextTabControl}
                className={styles.Tabs__control}
                aria-label={internalAccessibleLabels.controlsNext}
              >
                <Text size="100">
                  <ChevronRightIcon size={16} className={styles['Tabs__control-icon']} />
                </Text>
              </button>
            </Stack>
          </div>
        )}

        <div
          ref={tabsWrapperRef}
          className={clsx(
            styles['Tablist__wrapper'],
            styles[`Tablist__wrapper--${variant}`],
            isLastTabActive && styles['Tablist__wrapper--lastTabIsActive'],
          )}
        >
          <div
            {...tabListProps}
            ref={tabsContainerRef}
            className={clsx(
              styles.Tabs,
              styles[`Tabs--${variant}`],
              hasMoreThanTwoTabs && styles['Tabs--hasMoreThanTwoTabs'],
            )}
          >
            <div ref={sliderRef} className={styles.Tabs__slider} aria-hidden />
            {tabs}
          </div>
        </div>

        {panels.length > 0 && <div className={styles['Tabs__panelContainer']}>{panels}</div>}
      </div>
    )
  },
)

export type TabsItemProps = {
  children: ReactNode
  className?: string
  isActive?: boolean
  variant?: 'default' | 'accent'
  /**
   * ⚠️ WARNING: Setting a custom id will override the automatically generated ARIA attributes
   * (aria-controls, aria-labelledby). You will need to manually implement proper accessibility
   * relationships between tabs and panels.
   * @see https://primer.style/brand/components/Tabs/#custom-panels
   */
  id?: string
} & Omit<React.ComponentPropsWithoutRef<'button'>, 'id'>

const TabsItem = forwardRef<HTMLButtonElement, TabsItemProps>(
  ({children, className, isActive, variant, ...props}, ref) => {
    const tabRef = useProvidedRefOrCreate(ref)

    return (
      <button
        ref={tabRef}
        className={clsx(
          styles.Tabs__item,
          isActive && styles['Tabs__item--active'],
          variant && styles[`Tabs__item--${variant}`],
          className,
        )}
        data-testid={testIds.tab}
        {...props}
      >
        {children}
      </button>
    )
  },
)

export type TabsPanelProps = {
  children: ReactNode
  className?: string
  animation?: (typeof AnimationVariants)[number] | false
  hidden?: boolean
  /**
   * ⚠️ WARNING: Setting a custom id will override the automatically generated ARIA attributes
   * (aria-controls, aria-labelledby). You will need to manually implement proper accessibility
   * relationships between tabs and panels.
   * @see https://primer.style/brand/components/Tabs/#custom-panels
   */
  id?: string
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'id'>

const TabsPanel = memo(function TabsPanel({
  children,
  animation = false,
  className,

  hidden,
  ...rest
}: TabsPanelProps) {
  const conditionalRender = animation ? (
    <AnimationProvider autoStaggerChildren={false}>
      <Animate animate={animation}>{children}</Animate>
    </AnimationProvider>
  ) : (
    children
  )

  return (
    <div className={clsx(styles['Tabs__panel'], className)} data-testid={testIds.panel} hidden={hidden} {...rest}>
      {conditionalRender}
    </div>
  )
})

/**
 * Use Tabs to display a list of tabs with associated content panels.
 * @see https://primer.style/brand/components/Tabs
 */
export const Tabs = Object.assign(_TabsRoot, {
  Item: TabsItem,
  Panel: TabsPanel,
  testIds,
})
