import {useCallback, useEffect, useState, type RefObject} from 'react'

/**
 * Determine if a child element of the provided ref is currently focussed.
 * @param containerRef The ref to the container element.
 * @param onFocusChange The callback to be called when the focus state changes.
 * @type T The type of the container element.
 * @returns The ref to be applied to the container element.
 */
export const useContainsFocus = <T extends HTMLElement>(
  containerRef?: RefObject<T | null>,
  onFocusChange?: (isFocussed: boolean) => void,
) => {
  const [isChildFocused, setIsChildFocused] = useState(false)

  const updateState = useCallback(
    (isFocused: boolean) => {
      if (isFocused !== isChildFocused) {
        setIsChildFocused(isFocused)
        onFocusChange?.(isFocused)
      }
    },
    [isChildFocused, onFocusChange],
  )

  useEffect(() => {
    if (!containerRef) {
      return
    }

    const handleFocusIn = () => {
      updateState(true)
    }

    const handleFocusOut = (event: FocusEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.relatedTarget as Node)) {
        updateState(false)
      }
    }

    const container = containerRef.current

    if (container) {
      container.addEventListener('focusin', handleFocusIn, true)
      container.addEventListener('focusout', handleFocusOut, true)

      return () => {
        container.removeEventListener('focusin', handleFocusIn, true)
        container.removeEventListener('focusout', handleFocusOut, true)
      }
    }
  }, [updateState, containerRef])
}
