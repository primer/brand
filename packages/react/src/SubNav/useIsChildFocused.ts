import {useCallback, useEffect, useRef, useState, type RefObject} from 'react'

/**
 * Determine if a child element of the provided ref is currently focussed.
 * @param onFocusChange The callback to be called when the focus state changes.
 * @type T The type of the container element.
 * @returns The ref to be applied to the container element.
 */
export const useIsChildFocused = <T extends HTMLElement>(
  onFocusChange?: (isFocussed: boolean) => void,
): RefObject<T> => {
  const [isChildFocused, setIsChildFocused] = useState(false)
  const containerRef = useRef<T>(null)

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
  }, [updateState])

  return containerRef
}
