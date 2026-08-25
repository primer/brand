import {useEffect, useState} from 'react'
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
}

export function useCursorAnimation({
  text,
  initialText,
  animate,
  delay = 500,
  waitForPageLoad = true,
}: UseCursorAnimationOptions): UseCursorAnimationResult {
  const prefersReducedMotion = useReducedMotion()

  const shouldAnimate = animate === true && !prefersReducedMotion && text.length > 0
  const shouldStartHidden = animate === true && text.length > 0

  const [frame, setFrame] = useState<UseCursorAnimationResult>({
    visibleText: shouldStartHidden ? '' : text,
    showCursor: !shouldStartHidden,
    cursorPhase: shouldStartHidden ? 'initial' : 'complete',
  })

  useEffect(() => {
    if (!shouldAnimate) {
      setFrame({visibleText: text, showCursor: true, cursorPhase: 'complete'})
      return
    }

    const frameDuration = 1000 / 60
    const charactersPerSecond = 30 * (85 / 75)
    const deleteCharactersPerSecond = 24 * (85 / 75)
    const correctionPauseDuration = 350 / (85 / 75)
    const scrambleSymbols = ['>', '*', '=', '&', '+', '-', '%', '^', '_']

    setFrame({visibleText: '', showCursor: false, cursorPhase: 'initial'})

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

    const getFrame = (elapsed: number): UseCursorAnimationResult => {
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

      return {
        visibleText: nextText,
        showCursor: nextText.length > 0,
        cursorPhase: nextCursorPhase,
      }
    }

    let animationFrame: number | undefined
    let delayTimer: ReturnType<typeof setTimeout> | undefined

    const startAnimation = () => {
      const startTime = performance.now()
      let previousFrame: UseCursorAnimationResult = {
        visibleText: '',
        showCursor: false,
        cursorPhase: 'initial',
      }

      const tick = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const nextFrame = getFrame(elapsed)

        if (
          previousFrame.visibleText !== nextFrame.visibleText ||
          previousFrame.showCursor !== nextFrame.showCursor ||
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

  return frame
}
