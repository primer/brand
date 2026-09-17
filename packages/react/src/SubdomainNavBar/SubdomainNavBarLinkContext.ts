import React, {useContext} from 'react'

type SubdomainNavBarLinkContextValue = {
  isOverflowed?: boolean
  onLinkClick?: React.MouseEventHandler<HTMLAnchorElement>
}

export const SubdomainNavBarLinkContext = React.createContext<SubdomainNavBarLinkContextValue>({})

export function useSubdomainNavBarLinkContext() {
  return useContext(SubdomainNavBarLinkContext)
}
