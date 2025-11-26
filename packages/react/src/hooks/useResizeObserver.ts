import {RefObject, useEffect, useRef} from 'react'

export type ResizeObserverCallback = (entries: ResizeObserverEntry[]) => void

export interface ResizeObserverEntry {
  contentRect: DOMRectReadOnly
}

export function useResizeObserver<T extends HTMLElement>(
  callback: ResizeObserverCallback,
  target?: RefObject<T | null>,
) {
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    const targetEl = target && 'current' in target ? target.current : document.documentElement
    if (!targetEl) {
      return
    }

    const observer = new ResizeObserver(entries => {
      savedCallback.current(entries)
    })

    observer.observe(targetEl)

    return () => {
      observer.disconnect()
    }
  }, [target])
}
