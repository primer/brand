import {useEffect, useState, type RefObject} from 'react'
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'
import {useReducedMotion} from './useReducedMotion'

export type CursorAnimationPhase = 'initial' | 'correction' | 'final' | 'complete'

export type UseCursorAnimationResult = {
  visibleText: string
  showCursor: boolean
  cursorPhase: CursorAnimationPhase
}

export type UseCursorAnimationOptions = {
  text: string
  initialText?: string
  animate?: boolean
  delay?: number
  waitForPageLoad?: boolean
  startOnIntersection?: boolean
  intersectionRef?: RefObject<HTMLElement | null>
}

export function useCursorAnimation({
  text,
  initialText,
  animate,
  delay = 500,
  waitForPageLoad = true,
  startOnIntersection = false,
  intersectionRef,
}: UseCursorAnimationOptions): UseCursorAnimationResult {
  const prefersReducedMotion = useReducedMotion()
  const [hasIntersected, setHasIntersected] = useState(false)
  const shouldStartHidden = animate === true && text.length > 0
  const motionEnabled = shouldStartHidden && !prefersReducedMotion
  const shouldAnimate = motionEnabled && (!startOnIntersection || hasIntersected)
  const [frame, setFrame] = useState<{visibleText: string; cursorPhase: CursorAnimationPhase}>({
    visibleText: shouldStartHidden ? '' : text,
    cursorPhase: shouldStartHidden ? 'initial' : 'complete',
  })

  useEffect(() => {
    if (!startOnIntersection || !motionEnabled || hasIntersected) return

    if (typeof IntersectionObserver === 'undefined') {
      setHasIntersected(true)
      return
    }

    const observedElement = intersectionRef?.current
    if (!observedElement) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasIntersected(true)
        observer.disconnect()
      }
    })

    observer.observe(observedElement)
    return () => observer.disconnect()
  }, [hasIntersected, intersectionRef, motionEnabled, startOnIntersection])

  useIsomorphicLayoutEffect(() => {
    if (!motionEnabled) {
      setFrame({visibleText: text, cursorPhase: 'complete'})
    }
  }, [motionEnabled, text])

  useEffect(() => {
    if (!shouldAnimate) return

    const frameDuration = 1000 / 60
    const charactersPerSecond = 30 * (85 / 75)
    const deleteCharactersPerSecond = 24 * (85 / 75)
    const correctionPauseDuration = 350 / (85 / 75)
    const scrambleSymbols = ['>', '*', '=', '&', '+', '-', '%', '^', '_']

    setFrame({visibleText: '', cursorPhase: 'initial'})

    const candidateInitialText =
      typeof initialText === 'string' && initialText.length > 0 && initialText !== text ? initialText : undefined
    let sharedPrefixLength = 0

    if (candidateInitialText) {
      while (
        sharedPrefixLength < candidateInitialText.length &&
        sharedPrefixLength < text.length &&
        candidateInitialText[sharedPrefixLength] === text[sharedPrefixLength]
      ) {
        sharedPrefixLength += 1
      }
    }

    const hasCorrection = candidateInitialText !== undefined && sharedPrefixLength < candidateInitialText.length
    const firstText = hasCorrection ? candidateInitialText : text
    const deletedCharacterCount = hasCorrection ? firstText.length - sharedPrefixLength : 0
    const firstTypeDuration = (firstText.length / charactersPerSecond) * 1000
    const correctionStart = firstTypeDuration + (hasCorrection ? correctionPauseDuration : 0)
    const deleteDuration = (deletedCharacterCount / deleteCharactersPerSecond) * 1000
    const secondTypeStart = correctionStart + deleteDuration
    const secondTypeCharacterCount = hasCorrection ? text.length - sharedPrefixLength : 0
    const secondTypeDuration = (secondTypeCharacterCount / charactersPerSecond) * 1000
    const typingComplete = secondTypeStart + secondTypeDuration
    const correctionCursorStart = correctionStart - frameDuration
    const finalCursorStart = typingComplete - 6 * frameDuration

    const getScrambledText = (sourceText: string, characterCount: number) => {
      let result = ''
      let visibleCharacterIndex = 0

      for (let index = 0; index < characterCount; index += 1) {
        const character = sourceText[index]

        if (/\s/.test(character)) {
          result = `${result}${character}`
          continue
        }

        visibleCharacterIndex += 1
        result = `${result}${character}`

        if (index === characterCount - 1) {
          result = `${result}${scrambleSymbols[(visibleCharacterIndex - 1) % scrambleSymbols.length]}`
        }
      }

      return result
    }

    const getFrame = (elapsed: number) => {
      let nextText = ''

      if (elapsed > 0 && elapsed < firstTypeDuration) {
        const typedCharacterCount = Math.floor((elapsed / 1000) * charactersPerSecond)
        nextText = getScrambledText(firstText, typedCharacterCount)
      } else if (hasCorrection && elapsed >= firstTypeDuration && elapsed < correctionStart) {
        nextText = firstText
      } else if (hasCorrection && elapsed >= correctionStart && elapsed < secondTypeStart) {
        const deleteElapsed = elapsed - correctionStart
        const currentDeletedCharacterCount = Math.floor((deleteElapsed / 1000) * deleteCharactersPerSecond)
        nextText = firstText.slice(0, firstText.length - currentDeletedCharacterCount)
      } else if (hasCorrection && elapsed >= secondTypeStart && elapsed < typingComplete) {
        const secondTypeElapsed = elapsed - secondTypeStart
        const typedCharacterCount = Math.min(
          text.length,
          sharedPrefixLength + Math.floor((secondTypeElapsed / 1000) * charactersPerSecond),
        )
        nextText = text.slice(0, typedCharacterCount)
      } else if (elapsed >= typingComplete) {
        nextText = text
      }

      let nextCursorPhase: CursorAnimationPhase = 'initial'
      if (hasCorrection && elapsed >= correctionCursorStart) nextCursorPhase = 'correction'
      if (elapsed >= finalCursorStart) nextCursorPhase = 'final'
      if (elapsed >= typingComplete) nextCursorPhase = 'complete'

      return {visibleText: nextText, cursorPhase: nextCursorPhase}
    }

    let animationFrame: number | undefined
    let delayTimer: ReturnType<typeof setTimeout> | undefined

    const startAnimation = () => {
      const startTime = performance.now()
      let previousFrame = {visibleText: '', cursorPhase: 'initial' as CursorAnimationPhase}

      const tick = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const nextFrame = getFrame(elapsed)

        if (
          previousFrame.visibleText !== nextFrame.visibleText ||
          previousFrame.cursorPhase !== nextFrame.cursorPhase
        ) {
          previousFrame = nextFrame
          setFrame(nextFrame)
        }

        if (elapsed < typingComplete) {
          animationFrame = window.requestAnimationFrame(tick)
        }
      }

      animationFrame = window.requestAnimationFrame(tick)
    }

    const startDelayTimer = () => {
      delayTimer = setTimeout(startAnimation, delay)
    }

    if (waitForPageLoad && typeof window !== 'undefined') {
      if (document.readyState === 'complete') {
        startDelayTimer()
      } else {
        const handleLoad = () => startDelayTimer()
        window.addEventListener('load', handleLoad)
        return () => {
          window.removeEventListener('load', handleLoad)
          if (delayTimer !== undefined) clearTimeout(delayTimer)
          if (animationFrame !== undefined) window.cancelAnimationFrame(animationFrame)
        }
      }
    } else {
      startDelayTimer()
    }

    return () => {
      if (delayTimer !== undefined) clearTimeout(delayTimer)
      if (animationFrame !== undefined) window.cancelAnimationFrame(animationFrame)
    }
  }, [delay, initialText, shouldAnimate, text, waitForPageLoad])

  return {
    visibleText: frame.visibleText,
    showCursor: shouldStartHidden ? frame.visibleText.length > 0 : true,
    cursorPhase: frame.cursorPhase,
  }
}
