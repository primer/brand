import {useCallback, useEffect} from 'react'

export function useKeyboardEscape(handler) {
  const handleKeyboardEscape = useCallback(
    event => {
      if (event.key === 'Escape') {
        handler()
      }
    },
    [handler],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboardEscape, false)

    return () => {
      document.removeEventListener('keydown', handleKeyboardEscape, false)
    }
  }, [handleKeyboardEscape])
}
