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
   * Accessible label for the entire tabs component, used by screen readers to describe the tab group.
   */
  'aria-label': string
  /**
   * @param internalAccessibleLabels - Customizable labels for screen readers to improve accessibility. These are applied internally using the aria-label attribute.
   * @param internalAccessibleLabels.controls - Label for the tab navigation controls, used by screen readers. Default is "Tab navigation controls".
   * @param internalAccessibleLabels.controlsNext - Label for the "next tab" control button, used by screen readers. Default is "Next tab".
   * @param internalAccessibleLabels.controlsPrev - Label for the "previous tab" control button, used by screen readers. Default is "Previous tab".
   */
  internalAccessibleLabels?: {
    ['controls']: string
    controlsNext: string
    controlsPrev: string
  }
} & BaseProps<HTMLDivElement> &
  Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>

const defaultInternalAccessibleLabels = {
  controls: 'Tab navigation controls',
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
      defaultTab: defaultActiveTab ? defaultActiveTab : undefined,
      onTabActivate: onChange ? (id: string) => onChange(id) : undefined,
    })
    const tabsContainerRef = useRef<HTMLDivElement>(null)
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
          'data-value': tabId,
        })
      })

    const panels = childrenArray
      .filter((child): child is React.ReactElement => isValidElement(child) && child.type === TabsPanel)
      .map((child, index) => {
        const panelId = String(index)
        const tabPanelProps = getTabPanelProps(panelId)
        const isActive = activeTab === panelId

        return cloneElement(child, {
          ...tabPanelProps,
          id: child.props.id ?? tabPanelProps.id,
          key: String(index),
          value: String(index),
          activeValue: activeTab,
          hidden: !isActive,
        })
      })

    useEffect(() => {
      if (!tabsContainerRef.current || !sliderRef.current) return

      const activeTabButton = tabsContainerRef.current.querySelector(`[data-value="${activeTab}"]`) as HTMLButtonElement

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
      if (!tabsContainer) return

      const updateScrollState = () => {
        const {scrollLeft, scrollWidth, clientWidth} = tabsContainer
        const hasOverflow = scrollWidth > clientWidth
        const canScrollRight = hasOverflow && scrollLeft < scrollWidth - clientWidth - 1

        tabsContainer.style.setProperty('--scroll-offset', `${scrollLeft}px`)
        tabsContainer.style.setProperty('--has-overflow', hasOverflow ? '1' : '0')
        tabsContainer.style.setProperty('--can-scroll-right', canScrollRight ? '1' : '0')
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
        className={clsx(styles['Tabs-container'], styles[`Tabs-container--align-${align}`], className)}
        ref={ref}
        data-testid={testIds.root}
        {...props}
      >
        {/* Narrow only indicators and controls */}
        {tabs.length >= 3 && (
          <div className={styles.Tabs__controls} role="toolbar" aria-label={internalAccessibleLabels.controls}>
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
          {...tabListProps}
          ref={tabsContainerRef}
          className={clsx(
            styles.Tabs,
            styles[`Tabs--${variant}`],
            hasMoreThanTwoTabs && styles['Tabs--hasMoreThanTwoTabs'],
            isLastTabActive && styles['Tabs--lastTabIsActive'],
            className,
          )}
        >
          <div ref={sliderRef} className={styles.Tabs__slider} aria-hidden />
          {tabs}
        </div>

        {panels.length > 0 && <div className={styles['Tabs__panelContainer']}>{panels}</div>}
      </div>
    )
  },
)

export type TabsItemProps = {
  children: ReactNode
  value?: string
  disabled?: boolean
  className?: string
  isActive?: boolean
  variant?: 'default' | 'accent'
  'data-value'?: string
}

const TabsItem = forwardRef<HTMLButtonElement, TabsItemProps & React.ComponentPropsWithoutRef<'button'>>(
  ({children, value, disabled, className, isActive, variant, ...props}, ref) => {
    const tabRef = useProvidedRefOrCreate(ref)

    return (
      <button
        ref={tabRef}
        disabled={disabled}
        className={clsx(
          styles.Tabs__item,
          isActive && styles.active,
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
  activeValue?: string
  value?: string
  hidden?: boolean
} & React.HTMLAttributes<HTMLDivElement>

const TabsPanel = memo(function TabsPanel({
  children,
  animation = false,
  className,
  activeValue,
  value,
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
