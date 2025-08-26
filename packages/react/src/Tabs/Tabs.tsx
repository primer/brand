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
  align?: 'start' | 'center'
  children: ReactNode
  value?: string
  onChange?: (activeTab: string) => void
  variant?: 'default' | 'accent' | 'underline'
  className?: string
  'aria-label': string
} & BaseProps<HTMLDivElement> &
  Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>

const _TabsRoot = memo(function TabsRoot({
  align = 'center',
  children,
  value,
  onChange,
  variant = 'default',
  className,
  'aria-label': ariaLabel,
}: TabsProps) {
  const {activeTab, activateTab, getTabListProps, getTabProps, getTabPanelProps} = useTabs({
    defaultTab: value ? value : undefined,
    onTabActivate: onChange ? (id: string) => onChange(id) : undefined,
  })
  const tabsContainerRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  const childrenArray = Children.toArray(children)

  const tabs = childrenArray
    .filter((child): child is React.ReactElement => isValidElement(child) && child.type === TabsItem)
    .map((tab, index) => {
      const tabId = String(index)
      const tabProps = getTabProps(tabId)

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

      return cloneElement(child, {
        ...tabPanelProps,
        id: child.props.id ?? tabPanelProps.id,
        key: String(index),
        value: String(index),
        activeValue: activeTab,
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

    // Initial calculation
    updateSliderPosition()

    // Recalculate on container resize (handles breakpoint changes)
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

  // Tracks overflow state for mobile gradient visibility
  // Should only appear when enough items trigger an overflow
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
    <div className={clsx(styles['Tabs-container'], styles[`Tabs-container--align-${align}`])}>
      {/* Narrow only indicators and controls */}
      {tabs.length >= 3 && (
        <nav className={styles.Tabs__controls}>
          <Stack direction="horizontal" padding="none" justifyContent="space-between">
            <button onClick={handlePrevTabControl} className={styles.Tabs__control}>
              <Text size="100">
                <ChevronLeftIcon size={16} />
              </Text>
            </button>
            <Stack direction="horizontal" padding="none" justifyContent="space-between" alignItems="center">
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
            <button onClick={handleNextTabControl} className={styles.Tabs__control}>
              <Text size="100">
                <ChevronRightIcon size={16} />
              </Text>
            </button>
          </Stack>
        </nav>
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
        data-testid={testIds.root}
      >
        <div ref={sliderRef} className={styles.Tabs__slider} aria-hidden />
        {tabs}
      </div>

      {panels.length > 0 && <div className={styles['Tabs__panelContainer']}>{panels}</div>}
    </div>
  )
})

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
    return (
      <button
        ref={ref}
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
  value?: string
  activeValue?: string | number
  className?: string
  animation?: (typeof AnimationVariants)[number] | false
}

const TabsPanel = memo(function TabsPanel({
  children,
  animation = false,
  value,
  activeValue,
  className,
  ...rest
}: TabsPanelProps) {
  const isActive = value === activeValue

  const conditionalRender = animation ? (
    <AnimationProvider>
      <Animate animate={animation}>{children}</Animate>
    </AnimationProvider>
  ) : (
    children
  )

  return (
    <div
      role="tabpanel"
      hidden={!isActive}
      className={clsx(styles['Tabs__panel'], className)}
      data-testid={testIds.panel}
      tabIndex={0}
      {...rest}
    >
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

export default Tabs
