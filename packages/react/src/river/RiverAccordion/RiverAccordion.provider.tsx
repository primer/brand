import React, {
  createContext,
  type Dispatch,
  ImgHTMLAttributes,
  useCallback,
  useContext,
  useState,
  type PropsWithChildren,
  type SetStateAction,
} from 'react'
import {type AccordionContentProps, type AccordionHeadingProps} from '../..'

type ObjectWithId<Type extends string = string, Props extends object = object> = {
  id: string
  type: Type
  props: Props
}

export type RiverVisualData = ObjectWithId<'image', ImgHTMLAttributes<HTMLImageElement>>
export type RiverHeadingData = ObjectWithId<'heading', AccordionHeadingProps>
export type RiverContentData = ObjectWithId<'content', AccordionContentProps>

type RiverAccordionContextType = {
  registerVisual: (data: RiverVisualData) => void
  registerHeading: (data: RiverHeadingData) => void
  registerContent: (data: RiverContentData) => void
  unregisterVisual: (id: string) => void
  unregisterHeading: (id: string) => void
  unregisterContent: (id: string) => void
  visuals: Map<string, RiverVisualData>
  headings: Map<string, RiverHeadingData>
  contents: Map<string, RiverContentData>
  align?: 'start' | 'end'
  expandedId: string | null
  setExpandedId: Dispatch<SetStateAction<string | null>>
}

type RiverAccordionItemContextType = {
  itemId: string
}

const RiverAccordionContext = createContext<RiverAccordionContextType | null>(null)
const RiverAccordionItemContext = createContext<RiverAccordionItemContextType | null>(null)

export const useRiverAccordionContext = () => {
  const context = useContext(RiverAccordionContext)
  if (!context) {
    throw new Error('RiverAccordion child components must be used within a RiverAccordion component')
  }
  return context
}

export const useRiverAccordionItemContext = () => {
  const context = useContext(RiverAccordionItemContext)
  if (!context) {
    throw new Error('RiverAccordion.Heading, Visual, and Content must be used within a RiverAccordion.Item')
  }
  return context
}

type Register<T extends ObjectWithId> = (data: T) => void
type Unregister = (id: string) => void

const useMap = <T extends ObjectWithId>(): [Map<string, T>, Register<T>, Unregister] => {
  const [state, setState] = useState(new Map<string, T>())

  const register = useCallback((data: T) => {
    setState(prev => {
      if (prev.has(data.id)) return prev

      const newMap = new Map(prev)
      newMap.set(data.id, data)
      return newMap
    })
  }, [])

  const unregister = useCallback((id: string) => {
    setState(prev => {
      if (!prev.has(id)) return prev

      const newMap = new Map(prev)
      newMap.delete(id)
      return newMap
    })
  }, [])

  return [state, register, unregister]
}

type RiverAccordionProviderProps = PropsWithChildren<{
  align?: 'start' | 'end'
}>
export const RiverAccordionProvider = ({children, align}: RiverAccordionProviderProps) => {
  const [visuals, registerVisual, unregisterVisual] = useMap<RiverVisualData>()
  const [headings, registerHeading, unregisterHeading] = useMap<RiverHeadingData>()
  const [contents, registerContent, unregisterContent] = useMap<RiverContentData>()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const contextValue: RiverAccordionContextType = {
    registerVisual,
    registerHeading,
    registerContent,
    unregisterVisual,
    unregisterHeading,
    unregisterContent,
    visuals,
    headings,
    contents,
    align,
    expandedId,
    setExpandedId,
  }

  return <RiverAccordionContext.Provider value={contextValue}>{children}</RiverAccordionContext.Provider>
}

type RiverAccordionItemProviderProps = PropsWithChildren<{
  itemId: string
}>
export const RiverAccordionItemProvider = ({children, itemId}: RiverAccordionItemProviderProps) => (
  <RiverAccordionItemContext.Provider value={{itemId}}>{children}</RiverAccordionItemContext.Provider>
)
