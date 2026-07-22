import React from 'react'
import {focusTrap} from '@primer/behaviors'
import {useProvidedRefOrCreate} from './useRef'

export interface FocusTrapHookSettings<
  ContainerElement extends HTMLElement = HTMLElement,
  InitialFocusElement extends HTMLElement = HTMLElement,
> {
  /**
   * Ref object that will be used for the trapping container. If not provided, one will
   * be created by this hook and returned.
   */
  containerRef?: React.RefObject<ContainerElement | null>

  /**
   * Ref object for the element that should receive focus when the focus trap is first enabled.
   * If not provided, one will be created by this hook and returned. Its use is optional.
   */
  initialFocusRef?: React.RefObject<InitialFocusElement | null>

  /**
   * Set to true to disable the focus trap and clean up listeners. Can be re-enabled at any time.
   */
  disabled?: boolean

  /**
   * If true, when this focus trap is cleaned up, restore focus to the element that had focus immediately before the focus trap was enabled. (Default: false)
   */
  restoreFocusOnCleanUp?: boolean
}

/**
 * Hook used to trap focus inside a container. Returns a ref that can be added to the container
 * that should trap focus.
 * @param settings {FocusTrapHookSettings}
 */
export function useFocusTrap<
  ContainerElement extends HTMLElement = HTMLElement,
  InitialFocusElement extends HTMLElement = HTMLElement,
>(
  settings?: FocusTrapHookSettings<ContainerElement, InitialFocusElement>,
  dependencies: React.DependencyList = [],
): {
  containerRef: React.RefObject<ContainerElement | null>
  initialFocusRef: React.RefObject<InitialFocusElement | null>
} {
  const containerRef = useProvidedRefOrCreate<ContainerElement | null>(settings?.containerRef)
  const initialFocusRef = useProvidedRefOrCreate<InitialFocusElement | null>(settings?.initialFocusRef)
  const disabled = settings?.disabled
  const abortController = React.useRef<AbortController | null>(null)
  const previousFocusedElement = React.useRef<Element | null>(null)

  // This function removes the event listeners that enable the focus trap and restores focus
  // to the previously-focused element (if necessary).
  function disableTrap() {
    abortController.current?.abort()
    if (settings?.restoreFocusOnCleanUp && previousFocusedElement.current instanceof HTMLElement) {
      previousFocusedElement.current.focus()
    }
    previousFocusedElement.current = null
  }

  React.useEffect(
    () => {
      if (containerRef.current instanceof HTMLElement) {
        if (!disabled) {
          if (!previousFocusedElement.current) {
            previousFocusedElement.current = document.activeElement
          }
          abortController.current = focusTrap(containerRef.current, initialFocusRef.current ?? undefined) ?? null
          return () => {
            disableTrap()
          }
        } else {
          disableTrap()
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [containerRef, initialFocusRef, disabled, ...dependencies],
  )

  return {containerRef, initialFocusRef}
}
