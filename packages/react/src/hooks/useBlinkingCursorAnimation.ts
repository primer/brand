import {useState, useEffect} from 'react'
import {useReducedMotion} from './useReducedMotion'

export type BlinkingCursorAnimationType = 'blinking-cursor'

export type UseBlinkingCursorAnimationOptions = {
  /**
   * The text content to animate
   */
  text: string
  /**
   * The animation effect to apply
   */
  animation?: BlinkingCursorAnimationType
}

export type UseBlinkingCursorAnimationResult = {
  /**
   * The text to display (animated or full)
   */
  displayedText: string
  /**
   * Whether the animation is currently running
   */
  isAnimating: boolean
  /**
   * Whether to show the cursor
   */
  showCursor: boolean
  /**
   * Whether the cursor should blink (only after animation completes)
   */
  shouldBlink: boolean
}

export function useBlinkingCursorAnimation({
  text,
  animation,
}: UseBlinkingCursorAnimationOptions): UseBlinkingCursorAnimationResult {
  const prefersReducedMotion = useReducedMotion()
  const shouldAnimate = animation === 'blinking-cursor' && !prefersReducedMotion
  const delay = 20

  const [displayedText, setDisplayedText] = useState(shouldAnimate ? '' : text)
  const [isAnimating, setIsAnimating] = useState(shouldAnimate)

  useEffect(() => {
    // short-circuit if no animation is needed
    if (!shouldAnimate || !text) {
      setDisplayedText(text)
      setIsAnimating(false)
      return
    }

    setDisplayedText('')
    setIsAnimating(true)
    let currentIndex = 0

    const animationInterval = setInterval(() => {
      currentIndex++
      setDisplayedText(text.slice(0, currentIndex))

      if (currentIndex >= text.length) {
        clearInterval(animationInterval)
        setIsAnimating(false)
      }
    }, delay)

    return () => clearInterval(animationInterval)
  }, [text, shouldAnimate, delay])

  const showCursor = !prefersReducedMotion
  const shouldBlink = showCursor && animation !== undefined && !isAnimating

  return {
    displayedText: shouldAnimate ? displayedText : text,
    isAnimating,
    showCursor,
    shouldBlink,
  }
}
