import React, {forwardRef, useRef} from 'react'
import {clsx} from 'clsx'
import {ChevronLeftIcon, ChevronRightIcon} from '@primer/octicons-react'
import {IconButton} from '../IconButton'
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect'
import type {BaseProps} from '../component-helpers'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/carousel-pagination/colors-with-modes.css'
/** Main Stylesheet (as a CSS Module) */
import styles from './CarouselPagination.module.css'

const testIds = {
  root: 'CarouselPagination',
}

type ItemAttributes = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'type' | 'disabled' | 'aria-disabled' | 'aria-current'
> & {[attribute: `data-${string}`]: string | number | boolean | undefined}

export type CarouselPaginationProps = BaseProps<HTMLDivElement> &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onChange'> & {
    /** Total number of carousel items. */
    itemCount: number
    /** The current active item */
    activeIndex: number
    /** Requests a new activeIndex; the parent updates selection. */
    onChange: (activeIndex: number) => void
    /** Enables looping navigation between the first and last items. */
    loop?: boolean
    /** Accessible control labels for localization. */
    labels?: {
      previous?: string
      next?: string
      /** Prefix for numbered item labels. */
      item?: string
    }
    /** Builds attributes for each item selector. */
    itemAttributesBuilder?: (index: number) => ItemAttributes
    /** Accessible name for the controls. */
    'aria-label': string
    'data-testid'?: string
  }

const defaultLabels = {
  previous: 'Previous item',
  next: 'Next item',
  item: 'Go to item',
}

function CarouselPaginationBase(
  {
    itemCount,
    activeIndex,
    onChange,
    loop = false,
    labels,
    itemAttributesBuilder,
    className,
    'data-testid': testId,
    ...props
  }: CarouselPaginationProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const indicatorsRef = useRef<HTMLDivElement>(null)
  const currentIndex = Math.max(0, Math.min(Number.isInteger(activeIndex) ? activeIndex : 0, itemCount - 1))

  useIsomorphicLayoutEffect(() => {
    const indicators = indicatorsRef.current
    const activeIndicator = indicators?.querySelector<HTMLButtonElement>('[aria-current="true"]')
    if (!indicators || !activeIndicator) return

    const keepActiveIndicatorVisible = () => {
      if (indicators.clientWidth === 0) return
      const containerBounds = indicators.getBoundingClientRect()
      const indicatorBounds = activeIndicator.getBoundingClientRect()
      const previousBounds = activeIndicator.previousElementSibling?.getBoundingClientRect()
      const nextBounds = activeIndicator.nextElementSibling?.getBoundingClientRect()
      const visibleLeft = containerBounds.left + indicators.clientLeft
      const visibleRight = visibleLeft + indicators.clientWidth
      const selectionBounds = [indicatorBounds, ...(nextBounds ? [nextBounds] : [])]
      const surroundingBounds = [...selectionBounds, ...(previousBounds ? [previousBounds] : [])]
      let targetLeft = Math.min(...surroundingBounds.map(bounds => bounds.left))
      let targetRight = Math.max(...surroundingBounds.map(bounds => bounds.right))

      if (targetRight - targetLeft > indicators.clientWidth) {
        targetLeft = Math.min(...selectionBounds.map(bounds => bounds.left))
        targetRight = Math.max(...selectionBounds.map(bounds => bounds.right))
      }
      if (targetRight - targetLeft > indicators.clientWidth) {
        targetLeft = indicatorBounds.left
        targetRight = indicatorBounds.right
      }

      if (targetLeft < visibleLeft) {
        indicators.scrollLeft += targetLeft - visibleLeft
      } else if (targetRight > visibleRight) {
        indicators.scrollLeft += targetRight - visibleRight
      }
    }

    keepActiveIndicatorVisible()
    const observer = new ResizeObserver(keepActiveIndicatorVisible)
    observer.observe(indicators)
    const finishIndicatorTransition = (event: TransitionEvent) => {
      if (event.target === activeIndicator && event.propertyName === 'width') keepActiveIndicatorVisible()
    }
    activeIndicator.addEventListener('transitionend', finishIndicatorTransition)
    return () => {
      observer.disconnect()
      activeIndicator.removeEventListener('transitionend', finishIndicatorTransition)
    }
  }, [currentIndex, itemCount])

  // Short circuit if the carousel has less than 2 items
  if (!Number.isInteger(itemCount) || itemCount <= 1) return null

  const previousUnavailable = !loop && currentIndex === 0
  const nextUnavailable = !loop && currentIndex === itemCount - 1

  return (
    <div
      {...props}
      ref={ref}
      role="group"
      className={clsx(styles.CarouselPagination, className)}
      data-testid={testId || testIds.root}
    >
      <IconButton
        type="button"
        icon={ChevronLeftIcon}
        size="small"
        variant="secondary"
        rounded
        inactive={previousUnavailable}
        className={clsx(
          styles.CarouselPagination__control,
          styles[`CarouselPagination__control--${previousUnavailable ? 'inactive' : 'available'}`],
        )}
        aria-label={labels?.previous ?? defaultLabels.previous}
        onClick={() => {
          if (!previousUnavailable) onChange(currentIndex === 0 ? itemCount - 1 : currentIndex - 1)
        }}
      />
      <div
        ref={indicatorsRef}
        className={styles.CarouselPagination__indicators}
        style={{'--carousel-pagination-item-count': itemCount} as React.CSSProperties}
      >
        {Array.from({length: itemCount}, (_, index) => {
          const attributes = itemAttributesBuilder?.(index)
          const {className: itemClassName, onClick, ...itemAttributes} = attributes ?? {}
          const isActive = index === currentIndex

          return (
            <button
              {...itemAttributes}
              key={index}
              type="button"
              className={clsx(
                styles.CarouselPagination__indicator,
                isActive && styles['CarouselPagination__indicator--active'],
                itemClassName,
              )}
              aria-label={itemAttributes['aria-label'] ?? `${labels?.item ?? defaultLabels.item} ${index + 1}`}
              aria-current={isActive ? 'true' : undefined}
              aria-disabled={isActive || undefined}
              onClick={event => {
                onClick?.(event)
                if (!event.defaultPrevented && !isActive) onChange(index)
              }}
            />
          )
        })}
      </div>
      <IconButton
        type="button"
        icon={ChevronRightIcon}
        size="small"
        variant="secondary"
        rounded
        inactive={nextUnavailable}
        className={clsx(
          styles.CarouselPagination__control,
          styles[`CarouselPagination__control--${nextUnavailable ? 'inactive' : 'available'}`],
        )}
        aria-label={labels?.next ?? defaultLabels.next}
        onClick={() => {
          if (!nextUnavailable) onChange(currentIndex === itemCount - 1 ? 0 : currentIndex + 1)
        }}
      />
    </div>
  )
}

const Root = forwardRef<HTMLDivElement, CarouselPaginationProps>(CarouselPaginationBase)

/**
 * @internal
 * Use the CarouselPagination to create a pagination control for carousels.
 * Currently a private component and not publicly documented.
 */
export const CarouselPagination = Object.assign(Root, {testIds})
