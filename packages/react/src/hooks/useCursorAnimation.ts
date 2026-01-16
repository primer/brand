import {useState, useEffect, useCallback} from 'react'
import {useReducedMotion} from './useReducedMotion'

export type UseCursorAnimationOptions = {
  /**
   * The text content to animate
   */
  text: string
  /**
   * Whether to animate the text reveal with a cursor effect
   */
  animate?: boolean
  /**
   * Duration of the reveal animation in milliseconds
   */
  duration?: number
  /**
   * Delay to start the animation in milliseconds
   */
  delay?: number
  /**
   * Loads after the page has fully loads
   */
  waitForPageLoad?: boolean
}

export type UseCursorAnimationResult = {
  /**
   * Whether the animation is currently running
   */
  isAnimating: boolean
  /**
   * Whether to show the cursor
   */
  showCursor: boolean
  /**
   * Progress of the animation (0 to 1)
   */
  progress: number
}

export function useCursorAnimation({
  text,
  animate,
  duration = 500,
  delay = 500,
  waitForPageLoad = true,
}: UseCursorAnimationOptions): UseCursorAnimationResult {
  const prefersReducedMotion = useReducedMotion()
  const shouldAnimate = animate === true && !prefersReducedMotion && text.length > 0

  const [isAnimating, setIsAnimating] = useState(shouldAnimate)
  const [progress, setProgress] = useState(shouldAnimate ? 0 : 1)

  const startAnimation = useCallback(() => {
    if (!shouldAnimate) {
      setProgress(1)
      setIsAnimating(false)
      return
    }

    setIsAnimating(true)
    setProgress(0)

    const startTime = performance.now()

    const tick = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const newProgress = Math.min(elapsed / duration, 1)

      setProgress(newProgress)

      if (newProgress < 1) {
        requestAnimationFrame(tick)
      } else {
        setIsAnimating(false)
      }
    }

    requestAnimationFrame(tick)
  }, [shouldAnimate, duration])

  useEffect(() => {
    if (!shouldAnimate) {
      setProgress(1)
      setIsAnimating(false)
      return
    }

    const startDelayTimer = () => {
      return setTimeout(() => {
        startAnimation()
      }, delay)
    }

    let delayTimer: ReturnType<typeof setTimeout> | undefined

    if (waitForPageLoad && typeof window !== 'undefined') {
      // Check if page is already loaded
      if (document.readyState === 'complete') {
        delayTimer = startDelayTimer()
      } else {
        // Wait for page load before starting the delay timer
        const handleLoad = () => {
          delayTimer = startDelayTimer()
        }
        window.addEventListener('load', handleLoad)
        return () => {
          window.removeEventListener('load', handleLoad)
          if (delayTimer) clearTimeout(delayTimer)
        }
      }
    } else {
      delayTimer = startDelayTimer()
    }

    return () => {
      if (delayTimer) clearTimeout(delayTimer)
    }
  }, [startAnimation, delay, shouldAnimate, waitForPageLoad])

  const showCursor = !prefersReducedMotion && animate === true

  return {
    isAnimating,
    showCursor,
    progress,
  }
}
