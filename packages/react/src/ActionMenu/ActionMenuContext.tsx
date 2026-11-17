import React, {PropsWithChildren, useState} from 'react'

export const ActionMenuSizes = ['small', 'medium'] as const
export type ActionMenuSizes = (typeof ActionMenuSizes)[number]

export const ActionMenuButtonModes = ['default', 'split-button'] as const
export type ActionMenuButtonModes = (typeof ActionMenuButtonModes)[number]

type ActionMenuContextType = {
  menuLabel: string
  mode: ActionMenuButtonModes
  onMenuToggle?: () => void
  setSize?: React.Dispatch<React.SetStateAction<ActionMenuSizes | undefined>>
  size?: ActionMenuSizes
}

export const ActionMenuContext = React.createContext<ActionMenuContextType | undefined>(undefined)

type ActionMenuProviderProps = PropsWithChildren<{
  menuLabel?: string
  mode?: ActionMenuButtonModes
  onMenuToggle?: () => void
  size?: ActionMenuSizes
}>

export const ActionMenuProvider = ({
  children,
  menuLabel = 'Menu',
  mode = 'default',
  onMenuToggle,
  size,
}: ActionMenuProviderProps) => {
  const [currentSize, setSize] = useState(size)

  return (
    <ActionMenuContext.Provider value={{menuLabel, mode, onMenuToggle, setSize, size: currentSize}}>
      {children}
    </ActionMenuContext.Provider>
  )
}

export const useActionMenuContext = (): ActionMenuContextType => {
  const context = React.useContext(ActionMenuContext)
  if (!context) {
    throw new Error('useActionMenuContext must be used within an ActionMenuProvider')
  }

  return context
}
