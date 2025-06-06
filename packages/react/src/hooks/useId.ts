import {useId as useReactId} from 'react'

export type UseId = (id?: string) => string

export const useId: UseId = id => {
  const uniqueId = useReactId()

  if (id) {
    return id
  }

  return uniqueId
}
