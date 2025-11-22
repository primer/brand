import React, {RefObject, useCallback, useEffect, useState} from 'react'
import {getAnchoredPosition} from '@primer/behaviors'
import type {AnchorPosition, PositionSettings} from '@primer/behaviors'
import {useResizeObserver} from './useResizeObserver'

export type AnchoredPositionHookSettings = Partial<PositionSettings> & {
  floatingElementRef?: React.RefObject<Element | null>
  anchorElementRef?: React.RefObject<Element | null>
}

/**
 * Calculates the top and left values for an absolutely-positioned floating element
 * to be anchored to some anchor element. Returns refs for the floating element
 * and the anchor element, along with the position.
 * @param settings Settings for calculating the anchored position.
 * @param dependencies Dependencies to determine when to re-calculate the position.
 * @returns An object of {top: number, left: number} to absolutely-position the
 * floating element.
 */
export function useAnchoredPosition(
  settings?: AnchoredPositionHookSettings,
  dependencies: React.DependencyList = [],
): {
  floatingElementRef: RefObject<Element | null> | undefined
  anchorElementRef: RefObject<Element | null> | undefined
  position: AnchorPosition | undefined
} {
  const floatingElementRef = settings?.floatingElementRef as RefObject<Element | null>
  const anchorElementRef = settings?.anchorElementRef as RefObject<Element | null>

  const [position, setPosition] = useState<AnchorPosition | undefined>(undefined)

  const updatePosition = useCallback(
    () => {
      if (floatingElementRef.current instanceof Element && anchorElementRef.current instanceof Element) {
        const anchoredPosition = getAnchoredPosition(floatingElementRef.current, anchorElementRef.current, {
          side: settings?.side,
          align: settings?.align,
        })
        setPosition(anchoredPosition)
      } else {
        setPosition(undefined)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [floatingElementRef, anchorElementRef, ...dependencies],
  )

  useEffect(updatePosition, [updatePosition])

  useResizeObserver(updatePosition)

  return {
    floatingElementRef,
    anchorElementRef,
    position,
  }
}
