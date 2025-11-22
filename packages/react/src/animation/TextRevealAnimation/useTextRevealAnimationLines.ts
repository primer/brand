import {useRef, useEffect, useState, RefObject} from 'react'

export const useTextRevealAnimationLines = (text?: string, providedRef?: RefObject<HTMLElement>) => {
  const internalRef = useRef<HTMLElement>(null)
  const ref = providedRef ?? internalRef
  const [lines, setLines] = useState<string[]>()

  useEffect(() => {
    if (!ref.current || !text) return

    const wrapLines = () => {
      const element = ref.current

      if (!element || !text) return

      const originalColor = window.getComputedStyle(element).color

      element.style.color = 'transparent'
      element.textContent = ''

      const words = text.split(' ')

      const lineBreakPositions: number[] = []
      let prevHeight = 0
      const linesArr: string[][] = []

      for (const word of words) {
        element.textContent += `${word} `
        const height = element.offsetHeight

        if (linesArr.length === 0) {
          prevHeight = height
          linesArr.push([word])
          continue
        }

        if (height > prevHeight) {
          lineBreakPositions.push(linesArr.length)
          linesArr.push([word])
        } else {
          linesArr.at(-1)?.push(word)
        }

        prevHeight = height
      }

      element.style.color = originalColor
      element.textContent = ''

      setLines(linesArr.map(line => line.join(' ')))
    }

    wrapLines()
  }, [text, ref])

  return {ref, lines}
}
