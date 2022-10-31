import {useCallback, useEffect} from 'react'

export function useDevGridKeyCombo(handler) {
  const handleKeyCombo = useCallback(
    event => {
      // Shift + Control + L
      if (event.ctrlKey && event.shiftKey && event.which === 76) {
        handler()
      }
    },
    [handler]
  )

  useEffect(() => {
    document.addEventListener('keyup', handleKeyCombo, false)

    return () => {
      document.removeEventListener('keyup', handleKeyCombo, false)
    }
  }, [handleKeyCombo])
}
