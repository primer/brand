import React, {useRef, useMemo} from 'react'

/**
 * There are some situations where we only want to create a new ref if one is not provided to a component
 * or hook as a prop. However, due to the `rules-of-hooks`, we cannot conditionally make a call to `React.useRef`
 * only in the situations where the ref is not provided as a prop.
 * This hook aims to encapsulate that logic, so the consumer doesn't need to be concerned with violating `rules-of-hooks`.
 * @param providedRef The ref to use - if undefined, will use the ref from a call to React.useRef
 * @type TRef The type of the RefObject which should be created.
 */
export function useProvidedRefOrCreate<TRef>(
  providedRef?: React.RefObject<TRef> | React.RefCallback<TRef>,
): React.RefObject<TRef> {
  const createdRef = useRef<TRef>(null)
  const callbackRef = useRef<React.RefCallback<TRef> | null>(null)
  const wrapperRef = useRef<React.MutableRefObject<TRef | null> | null>(null)

  // needed to keep the callback ref up-to-date between renders
  callbackRef.current = typeof providedRef === 'function' ? providedRef : null

  const finalRef = useMemo(() => {
    // Return a new ref if no ref was provided
    if (!providedRef) {
      wrapperRef.current = null
      return createdRef
    }

    // Return the provided ref if it's a RefObject
    if (typeof providedRef === 'object' && providedRef.current !== undefined) {
      wrapperRef.current = null
      return providedRef
    }

    // Handle function refs
    // We wrap it in a MutableRefObject to ensure we can set the current value
    // and also call the callback with the latest value
    if (typeof providedRef === 'function') {
      if (!wrapperRef.current) {
        let currentVal: TRef | null = null

        wrapperRef.current = {
          get current() {
            return currentVal
          },
          set current(value: TRef | null) {
            currentVal = value

            if (callbackRef.current) {
              callbackRef.current(value)
            }
          },
        }
      }
      return wrapperRef.current
    }

    wrapperRef.current = null
    return createdRef
  }, [providedRef, createdRef])

  return finalRef
}
