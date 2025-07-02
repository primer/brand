import React, {useRef} from 'react'

/**
 * There are some situations where we only want to create a new ref if one is not provided to a component
 * or hook as a prop. However, due to the `rules-of-hooks`, we cannot conditionally make a call to `React.useRef`
 * only in the situations where the ref is not provided as a prop.
 * This hook aims to encapsulate that logic, so the consumer doesn't need to be concerned with violating `rules-of-hooks`.
 * @param providedRef The ref to use - if undefined, will use the ref from a call to React.useRef
 * @type TRef The type of the RefObject which should be created.
 */

export function useProvidedRefOrCreate<TRef>(providedRef?: React.RefObject<TRef>): React.RefObject<TRef> {
  const createdRef = useRef<TRef>(null)

  return providedRef ?? createdRef
}

/**
 * Combines multiple refs into a single callback ref that can be attached to a DOM element.
 * This is useful when a component needs to maintain its own internal ref while also supporting
 * a forwarded ref from a parent component. All provided refs will point to the same DOM element.
 * @param refs Refs to merge - can be MutableRefObjects, callback refs, or null/undefined
 * @type T The type of the DOM element or component instance that the refs will reference.
 */
export function useMergedRefs<T = HTMLElement>(
  ...refs: (React.MutableRefObject<T | null> | React.RefCallback<T> | undefined | null)[]
) {
  return (node: T | null) => {
    for (const ref of refs) {
      if (!ref) {
        // Refs can be null or undefined — e.g. on initial render — so skip in that case
        continue
      }

      if (typeof ref === 'function') {
        ref(node)
      } else {
        ref.current = node
      }
    }
  }
}
