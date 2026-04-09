import React, {cloneElement, forwardRef, useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {clsx} from 'clsx'

import {Accordion, Heading, Link, Text, type HeadingProps} from '../..'
import {Icon, type IconProps} from '../../Icon'
import {Visual as RiverVisual, type RiverVisualProps} from '../River/River'
import {useId} from '../../hooks/useId'
import {useTabs} from '../../hooks/useTabs'
import {useWindowSize} from '../../hooks/useWindowSize'
import riverStyles from '../river-shared.module.css'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/river/base.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/river/river.css'

/** Main Stylesheet (as a CSS Module) */
import styles from './RiverBreakoutTabs.module.css'

const createComponentTypeGuard =
  <T,>(componentType: React.ComponentType<T>) =>
  (element: unknown): element is React.ReactElement<T> =>
    React.isValidElement<T>(element) && element.type === componentType

export type RiverBreakoutTabsProps = React.PropsWithChildren<{
  defaultSelectedIndex?: number
  selectedIndex?: number
  onChange?: (selectedIndex: number) => void
}> &
  Omit<React.HTMLAttributes<HTMLElement>, 'onChange'>

export type RiverBreakoutTabsItemProps = React.PropsWithChildren<{
  className?: string
}>

export type RiverBreakoutTabsA11yHeadingProps = React.PropsWithChildren<{
  as?: 'h2' | 'h3'
  id?: string
}>

export type RiverBreakoutTabsHeadingProps = HeadingProps

export type RiverBreakoutTabsContentProps = React.HTMLAttributes<HTMLDivElement>

export type RiverBreakoutTabsIconProps = IconProps

type RiverBreakoutTabsItemChild =
  | React.ReactElement<RiverBreakoutTabsIconProps>
  | React.ReactElement<RiverBreakoutTabsHeadingProps>
  | React.ReactElement<RiverBreakoutTabsContentProps>
  | React.ReactElement<RiverVisualProps>

type ExtractedItemParts = {
  icon: React.ReactElement<RiverBreakoutTabsIconProps> | null
  heading: React.ReactElement<RiverBreakoutTabsHeadingProps> | null
  content: React.ReactElement<RiverBreakoutTabsContentProps> | null
  visual: React.ReactElement<RiverVisualProps> | null
  className?: string
}

type ExtractedContentParts = {
  action: React.ReactElement<React.ComponentProps<typeof Link>> | null
  body: React.ReactNode[]
}

const RiverBreakoutTabsItem = ({children}: RiverBreakoutTabsItemProps) => <>{children}</>

const RiverBreakoutTabsA11yHeading = ({as = 'h3', children, id}: RiverBreakoutTabsA11yHeadingProps) => (
  <Heading as={as} id={id} className="visually-hidden">
    {children}
  </Heading>
)

const RiverBreakoutTabsIcon = ({color = 'green', ...props}: RiverBreakoutTabsIconProps) => (
  <Icon color={color} {...props} />
)

const RiverBreakoutTabsHeading = ({
  as = 'h3',
  children,
  className,
  size = 'subhead-large',
  weight = 'normal',
  ...props
}: RiverBreakoutTabsHeadingProps) => (
  <Heading
    as={as}
    className={clsx(styles.RiverBreakoutTabs__heading, className)}
    size={size}
    weight={weight}
    {...props}
  >
    {children}
  </Heading>
)

const RiverBreakoutTabsContent = ({children, className, ...props}: RiverBreakoutTabsContentProps) => {
  const Children = useMemo(
    () =>
      React.Children.toArray(children).map(child => {
        if (isTextChild(child)) {
          return cloneElement(child, {
            as: child.props.as ?? 'p',
            variant: child.props.variant ?? 'muted',
          })
        }

        if (isLinkChild(child)) {
          return cloneElement(child, {
            className: clsx(child.props.className, styles.RiverBreakoutTabs__link),
            size: child.props.size ?? 'medium',
            variant: child.props.variant ?? 'accent',
          })
        }

        return child
      }),
    [children],
  )

  return (
    <div className={clsx(styles.RiverBreakoutTabs__content, className)} {...props}>
      {Children}
    </div>
  )
}

const RiverBreakoutTabsVisual = forwardRef<HTMLDivElement, RiverVisualProps>(({className, ...props}, ref) => (
  <RiverVisual ref={ref} className={className} {...props} />
))

const isItem = createComponentTypeGuard(RiverBreakoutTabsItem)
const isA11yHeading = createComponentTypeGuard(RiverBreakoutTabsA11yHeading)
const isIcon = createComponentTypeGuard(RiverBreakoutTabsIcon)
const isHeading = createComponentTypeGuard(RiverBreakoutTabsHeading)
const isContent = createComponentTypeGuard(RiverBreakoutTabsContent)
const isVisual = createComponentTypeGuard(RiverBreakoutTabsVisual)

const isTextChild = (child: React.ReactNode): child is React.ReactElement<React.ComponentProps<typeof Text>> =>
  React.isValidElement<React.ComponentProps<typeof Text>>(child) && child.type === Text

const isLinkChild = (child: React.ReactNode): child is React.ReactElement<React.ComponentProps<typeof Link>> =>
  React.isValidElement<React.ComponentProps<typeof Link>>(child) && child.type === Link

const extractItemParts = (item: React.ReactElement<RiverBreakoutTabsItemProps>): ExtractedItemParts => {
  const Children = React.Children.toArray(item.props.children) as RiverBreakoutTabsItemChild[]

  return Children.reduce<ExtractedItemParts>(
    (acc, child) => {
      if (isIcon(child)) {
        acc.icon = child
      }

      if (isHeading(child)) {
        acc.heading = child
      }

      if (isContent(child)) {
        acc.content = child
      }

      if (isVisual(child)) {
        acc.visual = child
      }

      return acc
    },
    {icon: null, heading: null, content: null, visual: null, className: item.props.className},
  )
}

const extractWideTabListContentParts = (
  content: React.ReactElement<RiverBreakoutTabsContentProps> | null,
): ExtractedContentParts => {
  if (!content) {
    return {action: null, body: []}
  }

  const Children = React.Children.toArray(content.props.children).map(child => {
    if (isTextChild(child)) {
      return cloneElement(child, {
        as: child.props.as ?? 'p',
        variant: child.props.variant ?? 'muted',
      })
    }

    if (isLinkChild(child)) {
      return cloneElement(child, {
        className: clsx(child.props.className, styles.RiverBreakoutTabs__link),
        size: child.props.size ?? 'medium',
        variant: child.props.variant ?? 'accent',
      })
    }

    return child
  })

  return Children.reduce<ExtractedContentParts>(
    (acc, child) => {
      if (isLinkChild(child)) {
        if (!acc.action) {
          acc.action = child
        }

        return acc
      }

      acc.body.push(child)
      return acc
    },
    {action: null, body: []},
  )
}

const clampIndex = (index: number, length: number) => {
  if (length === 0) return -1

  const normalizedIndex = Number.isFinite(index) ? Math.trunc(index) : 0
  return Math.min(Math.max(normalizedIndex, 0), length - 1)
}

const RiverBreakoutTabsRoot = forwardRef<HTMLElement, RiverBreakoutTabsProps>(
  ({children, className, defaultSelectedIndex = 0, onChange, selectedIndex, ...props}, ref) => {
    const instanceId = useId()
    const {isLarge} = useWindowSize()

    const Children = useMemo(() => React.Children.toArray(children), [children])

    const A11yHeadingChild = Children.find(isA11yHeading) ?? null
    const Items = Children.filter(isItem)
      .map(extractItemParts)
      .filter(item => item.heading && item.content && item.visual)

    const defaultActiveIndex = clampIndex(defaultSelectedIndex, Items.length)
    const controlledActiveIndex =
      typeof selectedIndex === 'number' && Number.isFinite(selectedIndex)
        ? clampIndex(selectedIndex, Items.length)
        : null
    const initialActiveIndex = controlledActiveIndex ?? defaultActiveIndex
    const headingId = A11yHeadingChild?.props.id ?? `${instanceId}-heading`
    const wideTabListColumns = Math.min(Math.max(Items.length, 1), 3)
    const initialActiveTab = initialActiveIndex >= 0 ? String(initialActiveIndex) : undefined
    const isWideTabList = isLarge === true
    const suppressOnTabActivateRef = useRef(false)

    const handleTabActivate = useCallback(
      (id: string) => {
        if (suppressOnTabActivateRef.current) {
          suppressOnTabActivateRef.current = false
          return
        }

        if (!onChange) return

        const nextIndex = Number(id)
        if (!Number.isNaN(nextIndex)) {
          onChange(nextIndex)
        }
      },
      [onChange],
    )

    const {activeTab, activateTab, getTabListProps, getTabPanelProps, getTabProps} = useTabs({
      defaultTab: initialActiveTab,
      onTabActivate: handleTabActivate,
    })

    const [activeAccordionIndex, setActiveAccordionIndex] = useState(initialActiveIndex)

    useEffect(() => {
      if (activeTab === null) return

      const nextIndex = Number(activeTab)
      if (!Number.isNaN(nextIndex)) {
        setActiveAccordionIndex(nextIndex)
      }
    }, [activeTab])

    useEffect(() => {
      if (controlledActiveIndex === null || controlledActiveIndex < 0) return

      const controlledTab = String(controlledActiveIndex)
      if (activeTab !== controlledTab) {
        suppressOnTabActivateRef.current = true
        activateTab(controlledTab)
      }

      setActiveAccordionIndex(controlledActiveIndex)
    }, [activateTab, activeTab, controlledActiveIndex])

    if (!A11yHeadingChild && (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test')) {
      // eslint-disable-next-line no-console
      console.warn(
        'RiverBreakoutTabs: A11yHeading child is required. This element will not be visible, only read by screenreaders.',
      )
    }

    const handleAccordionOpen = (index: number) => (isOpen: boolean) => {
      if (isOpen) {
        setActiveAccordionIndex(index)
        if (activeTab !== String(index)) {
          activateTab(String(index))
        }
      }
    }

    const handleAccordionToggle: React.ReactEventHandler<HTMLDetailsElement> = event => {
      const toggledIndex = Number(event.currentTarget.getAttribute('data-index'))

      if (!event.currentTarget.open && activeAccordionIndex === toggledIndex) {
        event.currentTarget.open = true
      }
    }

    const tabListProps = A11yHeadingChild
      ? getTabListProps({labelledBy: headingId})
      : getTabListProps({label: 'River breakout tabs'})
    const WideTabListContentParts = useMemo(
      () => Items.map(item => extractWideTabListContentParts(item.content)),
      [Items],
    )

    return (
      <section
        ref={ref}
        className={clsx(
          riverStyles.RiverBreakout,
          riverStyles['RiverBreakout--variant-gridline'],
          styles.RiverBreakoutTabs,
          className,
        )}
        {...props}
      >
        {A11yHeadingChild && cloneElement(A11yHeadingChild, {id: headingId})}

        {isWideTabList ? (
          <div className={styles.RiverBreakoutTabs__wideTabList}>
            <div
              {...tabListProps}
              className={styles.RiverBreakoutTabs__tablist}
              style={{'--river-breakout-tabs-columns': String(wideTabListColumns)} as React.CSSProperties}
            >
              {Items.map((item, index) => {
                const isSelected = activeTab === String(index)
                const tabProps = getTabProps<HTMLDivElement>(String(index))
                const {body} = WideTabListContentParts[index]

                return (
                  <div
                    key={index}
                    className={clsx(
                      styles.RiverBreakoutTabs__item,
                      isSelected && styles['RiverBreakoutTabs__item--selected'],
                      item.className,
                    )}
                  >
                    <div {...tabProps} className={styles.RiverBreakoutTabs__tab}>
                      {item.icon &&
                        cloneElement(item.icon, {
                          className: item.icon.props.className,
                        })}

                      {item.heading &&
                        cloneElement(item.heading, {
                          className: clsx(item.heading.props.className, styles.RiverBreakoutTabs__tabHeading),
                        })}

                      {body.length > 0 && <div className={styles.RiverBreakoutTabs__wideTabListContent}>{body}</div>}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className={styles.RiverBreakoutTabs__sharedVisuals}>
              {Items.map((item, index) => {
                const panelProps = getTabPanelProps(String(index))

                return (
                  <div
                    key={index}
                    {...panelProps}
                    tabIndex={-1}
                    className={styles.RiverBreakoutTabs__sharedVisualPanel}
                  >
                    {cloneElement(item.visual as React.ReactElement<RiverVisualProps>, {
                      className: clsx(item.visual?.props.className, styles.RiverBreakoutTabs__sharedVisual),
                    })}
                  </div>
                )
              })}
            </div>

            {WideTabListContentParts.some(content => content.action) && (
              <div
                className={styles.RiverBreakoutTabs__wideTabListActions}
                style={{'--river-breakout-tabs-columns': String(wideTabListColumns)} as React.CSSProperties}
              >
                {Items.map((_, index) => {
                  const {action} = WideTabListContentParts[index]

                  return (
                    <div key={index} className={styles.RiverBreakoutTabs__wideTabListActionItem}>
                      {action &&
                        cloneElement(action, {
                          className: clsx(action.props.className, styles.RiverBreakoutTabs__wideTabListAction),
                        })}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        ) : (
          <div className={styles.RiverBreakoutTabs__accordion}>
            {activeAccordionIndex >= 0 && Items[activeAccordionIndex]?.visual && (
              <div className={styles.RiverBreakoutTabs__accordionSharedVisuals}>
                {cloneElement(Items[activeAccordionIndex].visual as React.ReactElement<RiverVisualProps>, {
                  className: clsx(
                    Items[activeAccordionIndex].visual.props.className,
                    styles.RiverBreakoutTabs__accordionSharedVisual,
                  ),
                })}
              </div>
            )}

            {Items.map((item, index) => {
              return (
                <Accordion
                  key={index}
                  data-index={index}
                  className={clsx(
                    styles.RiverBreakoutTabs__accordionItem,
                    index === activeAccordionIndex && styles['RiverBreakoutTabs__item--selected'],
                    item.className,
                  )}
                  onToggle={handleAccordionToggle}
                  open={index === activeAccordionIndex}
                  handleOpen={handleAccordionOpen(index)}
                >
                  <Accordion.Heading className={styles.RiverBreakoutTabs__accordionHeading}>
                    <span className={styles.RiverBreakoutTabs__accordionHeadingInner}>
                      {item.icon &&
                        cloneElement(item.icon, {
                          className: clsx(item.icon.props.className, styles.RiverBreakoutTabs__accordionIcon),
                        })}
                      <span className={styles.RiverBreakoutTabs__accordionLabel}>{item.heading?.props.children}</span>
                    </span>
                  </Accordion.Heading>

                  <Accordion.Content className={styles.RiverBreakoutTabs__accordionPanel}>
                    {cloneElement(item.content as React.ReactElement<RiverBreakoutTabsContentProps>, {
                      className: clsx(item.content?.props.className, styles.RiverBreakoutTabs__accordionContent),
                    })}
                  </Accordion.Content>
                </Accordion>
              )
            })}
          </div>
        )}
      </section>
    )
  },
)

/**
 * Use RiverBreakoutTabs to showcase multiple feature stories within a single immersive surface.
 */
export const RiverBreakoutTabs = Object.assign(RiverBreakoutTabsRoot, {
  A11yHeading: RiverBreakoutTabsA11yHeading,
  Content: RiverBreakoutTabsContent,
  Heading: RiverBreakoutTabsHeading,
  Icon: RiverBreakoutTabsIcon,
  Item: RiverBreakoutTabsItem,
  Visual: RiverBreakoutTabsVisual,
})
