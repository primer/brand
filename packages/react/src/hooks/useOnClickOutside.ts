import {RefObject, useEffect} from 'react'

export function useOnClickOutside(
  ref: RefObject<HTMLElement | null>,
  handler?: (event: MouseEvent | TouchEvent | FocusEvent) => void,
  excludeRef?: RefObject<HTMLElement | null>,
): void {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent | FocusEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (
        !ref.current ||
        ref.current.contains(event.target as Node) ||
        (excludeRef && excludeRef.current && excludeRef.current.contains(event.target as Node))
      ) {
        return
      }
      if (handler) {
        handler(event)
      }
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener, {passive: true})
    document.addEventListener('focusin', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
      document.removeEventListener('focusin', listener)
    }
  }, [ref, handler, excludeRef])
}
