import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'

type StoryScrollContextType = {
  visibilityStates: boolean[]
  setVisibilityStates: (index: number, isVisible: boolean) => void
}

const StoryScrollContext = createContext<StoryScrollContextType>({
  visibilityStates: [],
  setVisibilityStates: () => {},
})

export const useStoryScrollContext = () => useContext(StoryScrollContext)

export function RiverStoryScrollProvider({
  children,
  className,
  initialStates,
}: {
  children: ReactNode
  className?: string
  initialStates: boolean[]
}) {
  const [visibilityStates, setVisibilityStates] = useState<boolean[]>(
    initialStates
  )
  const [visibleIndexes, setVisibleIndexes] = useState<Set<number>>(new Set())
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null) // Track the last active index

  const updateVisibilityStates = (index: number, isVisible: boolean) => {
    setVisibleIndexes(currentVisibleIndexes => {
      const newVisibleIndexes = new Set(currentVisibleIndexes)

      if (isVisible) {
        newVisibleIndexes.add(index)
      } else {
        newVisibleIndexes.delete(index)
      }

      const highestVisibleIndex =
        newVisibleIndexes.size > 0
          ? Math.max(...Array.from(newVisibleIndexes))
          : lastActiveIndex

      if (highestVisibleIndex !== null) {
        // Update the last active index if a new item becomes the highest visible item
        setLastActiveIndex(highestVisibleIndex)
        // Ensure only the highest visible (or last active) index is marked as visible
        setVisibilityStates(states =>
          states.map((_, idx) => idx === highestVisibleIndex)
        )
      }

      return newVisibleIndexes
    })
  }

  return (
    <div className={className}>
      <StoryScrollContext.Provider
        value={{
          visibilityStates,
          setVisibilityStates: updateVisibilityStates,
        }}
      >
        {children}
      </StoryScrollContext.Provider>
    </div>
  )
}
