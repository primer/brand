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
} from 'react'
import clsx from 'clsx'
import {useTabs} from '../hooks/useTabs'
import {BaseProps} from '../component-helpers'
import {Animate, AnimationProvider, AnimationVariants} from '../animation'

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
  const {activeTab, getTabListProps, getTabProps, getTabPanelProps} = useTabs({
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

    const sliderElement = sliderRef.current

    const containerPaddingRem = window
      .getComputedStyle(tabsContainerRef.current)
      .getPropertyValue('--brand-Tabs-container-padding')

    const containerPadding = parseFloat(containerPaddingRem) * 16 // base size

    const offsetX = activeTabButton.offsetLeft - containerPadding
    const width = activeTabButton.offsetWidth

    // Set CSS custom properties for slider positioning
    sliderElement.style.setProperty('--slider-x', `${offsetX}px`)
    sliderElement.style.setProperty('--slider-width', `${width}px`)
  }, [activeTab])

  const tabListProps = getTabListProps({label: ariaLabel})

  return (
    <div className={clsx(styles['Tabs-container'], styles[`Tabs-container--align-${align}`])}>
      <div
        {...tabListProps}
        ref={tabsContainerRef}
        className={clsx(styles.Tabs, styles[`Tabs--${variant}`], className)}
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
