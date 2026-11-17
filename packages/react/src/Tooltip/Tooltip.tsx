import React, {Children, useEffect, useRef, useState} from 'react'
import {clsx} from 'clsx'
import {useId} from '../hooks/useId'
import {getAnchoredPosition} from '@primer/behaviors'
import type {AnchorSide, AnchorAlignment} from '@primer/behaviors'
import {isSupported, apply} from '@oddbird/popover-polyfill/fn'
import {useProvidedRefOrCreate} from '../hooks/useRef'

/** * Main Stylesheet (as a CSS Module) */
import styles from './Tooltip.module.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/tooltip/colors-with-modes.css'
import {BaseProps} from '../component-helpers'

export const TooltipDirections = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'] as const
export const TooltipDelays = ['short', 'medium', 'long'] as const
export type TooltipDirection = (typeof TooltipDirections)[number]
export type TooltipDelay = (typeof TooltipDelays)[number]
export type TooltipProps = {
  direction?: TooltipDirection
  delay?: TooltipDelay
  text: string
  type?: 'label' | 'description'
  children?: React.ReactNode
} & BaseProps<HTMLDivElement>

export type TriggerPropsType = {
  'aria-describedby'?: string
  'aria-labelledby'?: string
  'aria-label'?: string
  onBlur?: React.FocusEventHandler
  onFocus?: React.FocusEventHandler
  onMouseEnter?: React.MouseEventHandler
  onMouseLeave?: React.MouseEventHandler
  ref?: React.RefObject<HTMLElement | null>
}

// map tooltip direction to anchoredPosition props
const directionToPosition: Record<TooltipDirection, {side: AnchorSide; align: AnchorAlignment}> = {
  nw: {side: 'outside-top', align: 'end'},
  n: {side: 'outside-top', align: 'center'},
  ne: {side: 'outside-top', align: 'start'},
  e: {side: 'outside-right', align: 'center'},
  se: {side: 'outside-bottom', align: 'start'},
  s: {side: 'outside-bottom', align: 'center'},
  sw: {side: 'outside-bottom', align: 'end'},
  w: {side: 'outside-left', align: 'center'},
}

// map anchoredPosition props to tooltip direction
const positionToDirection: Record<string, TooltipDirection> = {
  'outside-top-end': 'nw',
  'outside-top-center': 'n',
  'outside-top-start': 'ne',
  'outside-right-center': 'e',
  'outside-bottom-start': 'se',
  'outside-bottom-center': 's',
  'outside-bottom-end': 'sw',
  'outside-left-center': 'w',
}

const tooltipDelayMap: Record<TooltipDelay, number> = {
  short: 50,
  medium: 400,
  long: 1200,
}

// The list is from GitHub's custom-axe-rules https://github.com/github/github/blob/master/app/assets/modules/github/axe-custom-rules.ts#L3
const interactiveElements = [
  'a[href]',
  'button:not(:disabled)',
  'summary',
  'select',
  'input:not([type=hidden])',
  'textarea',
]

const isInteractive = (element: HTMLElement) => {
  return (
    interactiveElements.some(selector => element.matches(selector)) ||
    (element.hasAttribute('role') && element.getAttribute('role') === 'button')
  )
}
export const TooltipContext = React.createContext<{tooltipId?: string}>({})

export const Tooltip = React.forwardRef(
  (
    {direction = 's', delay = 'short', text, type = 'description', children, id, className, ...rest}: TooltipProps,
    forwardedRef,
  ) => {
    const tooltipId = useId(id)
    const child = (Children.only(children) as React.ReactElement<TriggerPropsType> | null) ?? null
    const triggerRef = useProvidedRefOrCreate(forwardedRef as React.RefObject<HTMLElement | null> | null)
    const tooltipElRef = useRef<HTMLDivElement>(null)
    const openTooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    // Used to delay the closing of the tooltip to make sure the user can move the mouse from the trigger to the tooltip
    const closeTooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const tooltipCloseTimeout = 200

    const [calculatedDirection, setCalculatedDirection] = useState<TooltipDirection>(direction)

    const openTooltip = React.useCallback(() => {
      if (openTooltipTimeoutRef.current) {
        clearTimeout(openTooltipTimeoutRef.current)
        openTooltipTimeoutRef.current = null
      }

      const ariaHasPopup = triggerRef.current?.getAttribute('aria-haspopup')
      const hasActivePopup =
        triggerRef.current?.getAttribute('aria-expanded') === 'true' &&
        ariaHasPopup !== null &&
        ariaHasPopup !== 'false'
      if (hasActivePopup) return

      if (closeTooltipTimeoutRef.current) {
        clearTimeout(closeTooltipTimeoutRef.current)
        closeTooltipTimeoutRef.current = null
      }

      if (
        tooltipElRef.current &&
        triggerRef.current &&
        typeof tooltipElRef.current.showPopover === 'function' &&
        !tooltipElRef.current.matches(':popover-open')
      ) {
        tooltipElRef.current.showPopover()
      }
    }, [tooltipElRef, triggerRef])

    const openTooltipWithDelay = React.useCallback(() => {
      if (openTooltipTimeoutRef.current) {
        clearTimeout(openTooltipTimeoutRef.current)
      }

      openTooltipTimeoutRef.current = setTimeout(() => {
        openTooltipTimeoutRef.current = null
        openTooltip()
      }, tooltipDelayMap[delay])
    }, [delay, openTooltip])

    const closeTooltip = React.useCallback(() => {
      if (openTooltipTimeoutRef.current) {
        clearTimeout(openTooltipTimeoutRef.current)
        openTooltipTimeoutRef.current = null
      }

      closeTooltipTimeoutRef.current = setTimeout(() => {
        if (
          tooltipElRef.current &&
          triggerRef.current &&
          typeof tooltipElRef.current.hidePopover === 'function' &&
          tooltipElRef.current.matches(':popover-open')
        ) {
          tooltipElRef.current.hidePopover()
        }
      }, tooltipCloseTimeout)
    }, [tooltipElRef, triggerRef])

    useEffect(() => {
      return () => {
        if (openTooltipTimeoutRef.current) {
          clearTimeout(openTooltipTimeoutRef.current)
        }
        if (closeTooltipTimeoutRef.current) {
          clearTimeout(closeTooltipTimeoutRef.current)
        }
      }
    }, [closeTooltipTimeoutRef])

    useEffect(() => {
      if (!tooltipElRef.current || !triggerRef.current) return
      /*
       * ACCESSIBILITY CHECKS
       */
      // Has trigger element or any of its children interactive elements?
      const isTriggerInteractive = isInteractive(triggerRef.current)
      const triggerChildren = triggerRef.current.childNodes
      const hasInteractiveChild = Array.from(triggerChildren).some(triggerChild => {
        return triggerChild instanceof HTMLElement && isInteractive(triggerChild)
      })

      if (
        !(isTriggerInteractive || hasInteractiveChild) &&
        (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test')
      ) {
        // eslint-disable-next-line no-console
        console.warn(
          'The `Tooltip` component expects a single React element that contains interactive content. Consider using a `<button>` or equivalent interactive element instead.',
        )
      }

      // If the tooltip is used for labelling the interactive element, the trigger element or any of its children should not have aria-label
      if (type === 'label') {
        const hasAriaLabel = triggerRef.current.hasAttribute('aria-label')
        const hasAriaLabelInChildren = Array.from(triggerRef.current.childNodes).some(
          triggerChild => triggerChild instanceof HTMLElement && triggerChild.hasAttribute('aria-label'),
        )

        if (
          (hasAriaLabel || hasAriaLabelInChildren) &&
          (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test')
        ) {
          // eslint-disable-next-line no-console
          console.warn(
            'The label type `Tooltip` is going to be used here to label the trigger element. Please remove the aria-label from the trigger element.',
          )
        }
      }

      // SSR safe polyfill apply
      if (typeof window !== 'undefined') {
        if (!isSupported()) {
          apply()
        }
      }

      /*
       * TOOLTIP POSITIONING
       */
      const tooltip = tooltipElRef.current
      const trigger = triggerRef.current
      tooltip.setAttribute('popover', 'auto')
      const settings = {
        side: directionToPosition[direction].side,
        align: directionToPosition[direction].align,
        anchorOffset: 8,
      }

      const positionSet = () => {
        const {top, left, anchorAlign, anchorSide} = getAnchoredPosition(tooltip, trigger, settings)

        tooltip.style.top = `${top}px`
        tooltip.style.left = `${left}px`

        const tooltipRect = tooltip.getBoundingClientRect()
        const triggerRect = trigger.getBoundingClientRect()
        const isVerticalPlacement = anchorSide === 'outside-top' || anchorSide === 'outside-bottom'
        const caretPosition = isVerticalPlacement
          ? triggerRect.left + triggerRect.width / 2 - tooltipRect.left
          : triggerRect.top + triggerRect.height / 2 - tooltipRect.top
        const tooltipSize = isVerticalPlacement ? tooltipRect.width : tooltipRect.height
        const constrainedCaretPosition = Math.max(0, Math.min(caretPosition, tooltipSize))

        tooltip.style.setProperty('--p', `${constrainedCaretPosition}px`)

        // This is required to make sure the popover is positioned correctly i.e. when there is not enough space on the specified direction, we set a new direction to position the ::after
        const calculatedDirectionString = positionToDirection[`${anchorSide}-${anchorAlign}` as string]
        setCalculatedDirection(calculatedDirectionString)
      }

      tooltip.addEventListener('toggle', positionSet)

      return () => {
        tooltip.removeEventListener('toggle', positionSet)
      }
    }, [tooltipElRef, triggerRef, direction, type])

    return (
      <TooltipContext.Provider value={{tooltipId}}>
        {child &&
          React.cloneElement(child, {
            ref: triggerRef,
            // If it is a type description, we use tooltip to describe the trigger
            'aria-describedby': type === 'description' ? tooltipId : child.props['aria-describedby'],
            // If it is a label type, we use tooltip to label the trigger
            'aria-labelledby': type === 'label' ? tooltipId : child.props['aria-labelledby'],
            onBlur: (event: React.FocusEvent) => {
              closeTooltip()
              child.props.onBlur?.(event)
            },
            onFocus: (event: React.FocusEvent) => {
              openTooltip()
              child.props.onFocus?.(event)
            },
            onMouseEnter: (event: React.MouseEvent) => {
              openTooltipWithDelay()
              child.props.onMouseEnter?.(event)
            },
            onMouseLeave: (event: React.MouseEvent) => {
              closeTooltip()
              child.props.onMouseLeave?.(event)
            },
          })}
        <div
          className={clsx(styles.Tooltip, className)}
          ref={tooltipElRef}
          data-direction={calculatedDirection}
          {...rest}
          // Only need tooltip role if the tooltip is a description for supplementary information
          role={type === 'description' ? 'tooltip' : undefined}
          // stop AT from announcing the tooltip twice when it is a label type because it will be announced with "aria-labelledby"
          aria-hidden={type === 'label' ? true : undefined}
          id={tooltipId}
          // mouse leave and enter on the tooltip itself is needed to keep the tooltip open when the mouse is over the tooltip
          onMouseEnter={openTooltip}
          onMouseLeave={closeTooltip}
        >
          {text}
        </div>
      </TooltipContext.Provider>
    )
  },
)
