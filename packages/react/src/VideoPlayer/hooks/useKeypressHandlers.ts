import {type RefObject, useEffect} from 'react'

export type KeypressHandler = [KeyboardEvent['key'], (e: KeyboardEvent) => void]

export const useKeypressHandlers = (ref: RefObject<HTMLElement>, keypressHandlers: KeypressHandler[]) => {
  useEffect(() => {
    console.debug('binding key handlers')
    const refCurrent = ref.current

    if (!refCurrent) return

    const handleKeyPress = (e: KeyboardEvent) => {
      const {key} = e

      for (const [keyName, handler] of keypressHandlers) {
        if (key === keyName) {
          handler(e)
        }
      }
    }

    refCurrent.addEventListener('keydown', handleKeyPress)

    return () => {
      refCurrent.removeEventListener('keydown', handleKeyPress)
    }
  }, [ref, keypressHandlers])
}
