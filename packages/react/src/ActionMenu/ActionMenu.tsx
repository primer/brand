import React, {
  Children,
  isValidElement,
  cloneElement,
  useRef,
  useCallback,
  useState,
  useEffect,
  PropsWithChildren,
  forwardRef,
  memo,
  Ref,
  ReactElement,
} from 'react'
import {Button, Text} from '../'
import {useAnchoredPosition} from '../hooks/useAnchoredPosition'
import {useOnClickOutside} from '../hooks/useOnClickOutside'
import {useKeyboardEscape} from '../hooks/useKeyboardEscape'

import {default as clsx} from 'clsx'
import {CheckIcon, ChevronDownIcon} from '@primer/octicons-react'
import {useId} from '../hooks/useId'

import {FocusKeys, PositionSettings, focusZone} from '@primer/behaviors'
import type {BaseProps} from '../component-helpers'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/action-menu/colors-with-modes.css'

/** * Main Stylesheet (as a CSS Module) */
import styles from './ActionMenu.module.css'

const testIds = {
  root: 'ActionMenu',
  get button() {
    return `${this.root}-button`
  },
  get overlay() {
    return `${this.root}-overlay`
  },
  get list() {
    return `${this.root}-list`
  },
  get item() {
    return `${this.root}-list-item`
  },
}

// primer behaviors doesn't export these values, recreating manually
// https://github.com/primer/behaviors/blob/main/src/anchored-position.ts#L5
export const actionMenuOverlaySides = [
  'inside-top',
  'inside-bottom',
  'inside-left',
  'inside-right',
  'inside-center',
  'outside-top',
  'outside-bottom',
  'outside-left',
  'outside-right',
] as PositionSettings['side'][]

export type ActionMenuSizes = 'small' | 'medium'

export type ActionMenuProps = {
  /**
   * The content of the ActionMenu. Must be an ActionMenu.Button and an ActionMenu.Overlay
   */
  children:
    | ReactElement<ActionMenuButtonProps>
    | ReactElement<ActionMenuOverlayProps>
    | Array<ReactElement<ActionMenuButtonProps> | ReactElement<ActionMenuOverlayProps>>
  /**
   * Determines whether the ActionMenu is disabled
   */
  disabled?: boolean
  /**
   * Determines whether the ActionMenu is open by default
   */
  open?: boolean
  /**
   * Callback that is called when an item is selected.
   * The value of the selected item is passed as an argument.
   */
  onSelect?: (newValue: string) => void
  /**
   * The selection variant of the ActionMenu.
   * - `single`: Only one item can be selected at a time. Menu items as a menuitemradio.
   * - `none`: No items can be selected. Menu items as a menuitem.
   */
  selectionVariant?: 'single' | 'none'
  /**
   * Test id for the ActionMenu
   */
  'data-testid'?: string
  /**
   * Horizontal alignment of the menu relative to the bottom of the button
   */
  menuAlignment?: 'start' | 'end'
  /**
   * Size configuratin of the ActionMenu
   */
  size?: ActionMenuSizes
  /*
   * Side the menu overlay appears
   */
  menuSide?: PositionSettings['side']
} & BaseProps<HTMLDivElement>

type ActionMenuContextType = {
  size?: ActionMenuSizes
  setSize?: React.Dispatch<React.SetStateAction<ActionMenuSizes | undefined>>
}

const ActionMenuContext = React.createContext<ActionMenuContextType>({})

export const useActionMenuContext = (): ActionMenuContextType => {
  return React.useContext(ActionMenuContext)
}

export const ActionMenuProvider: React.FC<ActionMenuProps> = ({size, children}) => {
  const [currentSize, setSize] = useState(size)

  return <ActionMenuContext.Provider value={{size: currentSize, setSize}}>{children}</ActionMenuContext.Provider>
}

const _ActionMenuRoot = memo(
  ({
    id,
    children,
    'data-testid': testId,
    disabled,
    open = false,
    selectionVariant = 'none',
    menuAlignment = 'start',
    size = 'medium',
    menuSide,
    onSelect,
  }: ActionMenuProps) => {
    const [showMenu, setShowMenu] = useState(open)
    const floatingElementRef = useRef<HTMLUListElement>(null)
    const anchorElementRef = useRef<HTMLButtonElement>(null)
    const instanceId = useId(id)

    useOnClickOutside(floatingElementRef, () => setShowMenu(false), anchorElementRef)

    const closeMenuCallback = useCallback(() => {
      setShowMenu(false)
    }, [])

    useKeyboardEscape(closeMenuCallback)

    const toggleMenu = useCallback(() => {
      setShowMenu(!showMenu)
    }, [showMenu])

    const handleOnSelect = useCallback(
      (newValue: string) => {
        if (onSelect) onSelect(newValue)
        toggleMenu()
      },
      [onSelect, toggleMenu],
    )

    const handleItemSelection = useCallback(
      (newValue: string) => {
        handleOnSelect(newValue)
        toggleMenu()
        anchorElementRef.current?.focus()
      },
      [handleOnSelect, toggleMenu, anchorElementRef],
    )

    useEffect(() => {
      if (showMenu && floatingElementRef.current) {
        const floatingElement = floatingElementRef.current

        focusZone(floatingElementRef.current, {
          bindKeys: FocusKeys.ArrowVertical,
        })

        // enter selects item
        floatingElement.addEventListener('keydown', event => {
          if (event.key === 'Enter') {
            const target = event.target as HTMLLIElement

            if (target.getAttribute('aria-disabled') === 'true') return

            const value = target.getAttribute('data-value')
            if (value) {
              handleOnSelect(value)
              setShowMenu(false)
              setTimeout(() => {
                anchorElementRef.current?.focus()
              }, 10)
            }
          }
        })

        // focusses first item
        const firstItem = floatingElementRef.current.querySelector('li')
        if (firstItem) {
          setTimeout(() => {
            firstItem.focus()
          }, 10)
        }

        const lastItem = floatingElement.querySelectorAll('li')[floatingElement.querySelectorAll('li').length - 1]
        lastItem.addEventListener('keydown', event => {
          if (event.key === 'ArrowDown') {
            event.preventDefault()
            firstItem?.focus()
          }
        })

        firstItem?.addEventListener('keydown', event => {
          if (event.key === 'ArrowUp') {
            event.preventDefault()
            lastItem.focus()
          }
        })

        //on escape refocus
        floatingElement.addEventListener('keydown', event => {
          if (event.key === 'Escape') {
            anchorElementRef.current?.focus()
          }
        })
      }
    }, [showMenu, floatingElementRef, handleItemSelection, toggleMenu, handleOnSelect])

    // Calculate the position of the menu
    const {position} = useAnchoredPosition(
      {
        floatingElementRef,
        anchorElementRef,
        align: menuAlignment,
        allowOutOfBounds: true,
        side: menuSide,
      },
      [showMenu],
    )

    const {Button: SelectButton, Overlay: SelectOverlay} = Children.toArray(children).reduce<{
      Button?: ReactElement<ActionMenuButtonProps>
      Overlay?: ReactElement<ActionMenuOverlayProps>
    }>((acc, child) => {
      if (isValidElement(child)) {
        if (child.type === ActionMenuButton) {
          acc['Button'] = cloneElement(child as ReactElement<ActionMenuButtonProps>, {
            onClick: toggleMenu,
            ref: anchorElementRef as React.RefObject<HTMLButtonElement>,
            className: clsx(child.props.className, showMenu),
            menuOpen: showMenu,
            disabled,
            id: `${instanceId}-button`,
            size,
          })
        } else if (child.type === ActionMenuOverlay) {
          acc['Overlay'] = cloneElement(child as ReactElement<ActionMenuOverlayProps>, {
            ref: floatingElementRef as React.RefObject<HTMLUListElement>,
            className: clsx(
              styles.ActionMenu__menu,
              position && styles['ActionMenu__menu--visible'],
              position && styles[`ActionMenu__menu--pos-${position.anchorSide}`],
              styles[`ActionMenu__menu--${size}`],
            ),
            style: {
              top: `${position?.top ?? 0}px`,
              left: `${position?.left ?? 0}px`,
            },
            id: `${instanceId}-menu`,
            children: Children.map(child.props.children, item => {
              if (isValidElement(item)) {
                return cloneElement(item as ReactElement<ActionMenuItemProps>, {
                  handler: handleItemSelection,
                  type: selectionVariant,
                })
              }
              return item
            }),
          })
        }
      }
      return acc
    }, {})

    return (
      <ActionMenuProvider size={size}>
        <div
          id={instanceId}
          className={clsx(styles.ActionMenu, disabled && styles['ActionMenu--disabled'])}
          data-testid={testId || testIds.root}
        >
          {SelectButton}
          {showMenu ? SelectOverlay : null}
        </div>
      </ActionMenuProvider>
    )
  },
)

type ActionMenuButtonProps = PropsWithChildren<Ref<HTMLButtonElement>> & {
  id?: string
  ref?: React.RefObject<HTMLButtonElement>
  className?: string
  menuOpen?: boolean
  disabled?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  'data-testid'?: string
  size?: ActionMenuSizes
}

const ActionMenuButton = forwardRef<HTMLButtonElement, ActionMenuButtonProps>(
  ({children, className, 'data-testid': testId, disabled, menuOpen, size, ...props}, ref) => {
    return (
      <Button
        ref={ref}
        className={clsx(styles.ActionMenu__button, styles[`ActionMenu__button--${size}`], className)}
        hasArrow={false}
        aria-haspopup="true"
        aria-expanded={menuOpen ? 'true' : 'false'}
        trailingVisual={<ChevronDownIcon />}
        disabled={disabled}
        data-testid={testId || testIds.button}
        size={size}
        {...props}
      >
        <span className={styles['ActionMenu__button-text']}>{children}</span>
      </Button>
    )
  },
)

type ActionMenuItemProps = {
  value: string
  handler?: (newValue: string) => void
  selected?: boolean
  type?: 'none' | 'single'
  disabled?: boolean
  size?: ActionMenuSizes
} & PropsWithChildren<React.HTMLProps<HTMLLIElement>>

const roleTypeMap = {
  none: 'menuitem',
  single: 'menuitemradio',
}

const ActionMenuItem = ({
  children,
  className,
  disabled,
  handler,
  selected,
  type,
  value,
  ...props
}: ActionMenuItemProps) => {
  const {size} = useActionMenuContext()

  return (
    <li
      className={clsx(
        styles.ActionMenu__item,
        type === 'single' && styles[`ActionMenu__item--selection-type-${type}`],
        size && styles[`ActionMenu__item--${size}`],
        className,
      )}
      role={roleTypeMap[type || 'single']}
      aria-checked={type === 'none' ? undefined : selected ? 'true' : 'false'}
      aria-disabled={disabled ? 'true' : 'false'}
      onClick={handler && !disabled ? () => handler(value) : undefined}
      onKeyDown={handler && !disabled ? event => event.key === 'Enter' && handler(value) : undefined}
      tabIndex={0}
      data-value={value}
      {...props}
    >
      {type !== 'none' && (
        <span className={styles['ActionMenu__item-leadingVisual']}>
          {selected && (
            <CheckIcon
              className={clsx(styles['ActionMenu__item-icon'], disabled && styles['ActionMenu__item-icon--disabled'])}
              size={16}
            />
          )}
        </span>
      )}

      <span className={styles['ActionMenu__item-text']}>
        <Text
          variant={disabled ? 'muted' : 'default'}
          size={size === 'medium' ? '200' : '100'}
          className={clsx(disabled && styles['ActionMenu__item-content--disabled'])}
        >
          {children}
        </Text>
      </span>
    </li>
  )
}

type ActionMenuOverlayProps = PropsWithChildren<Ref<HTMLUListElement>> & {
  'aria-label': string
  id?: string
  ref?: React.RefObject<HTMLUListElement>
  className?: string
  'data-testid'?: string
  menuOpen?: boolean
  style?: React.CSSProperties
}

const ActionMenuOverlay = forwardRef<HTMLUListElement, ActionMenuOverlayProps>(
  ({children, className, 'data-testid': testId, menuOpen, ...rest}, ref) => {
    return (
      <ul ref={ref} className={clsx(className)} role="menu" data-testid={testId || testIds.list} {...rest}>
        {children}
      </ul>
    )
  },
)

/**
 * Use ActionMenu to display a list of actions or selections that expand through a trigger button.
 * @see https://primer.style/brand/components/ActionMenu
 */
export const ActionMenu = Object.assign(_ActionMenuRoot, {
  Button: ActionMenuButton,
  Item: ActionMenuItem,
  Overlay: ActionMenuOverlay,
  testIds,
})
