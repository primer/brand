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
  ReactElement,
  useMemo,
} from 'react'
import {Button, ButtonProps, Text, ThemeProvider, useTheme} from '../'
import {useAnchoredPosition} from '../hooks/useAnchoredPosition'
import {useOnClickOutside} from '../hooks/useOnClickOutside'
import {useKeyboardEscape} from '../hooks/useKeyboardEscape'

import {clsx} from 'clsx'
import {CheckIcon, ChevronDownIcon, type Icon} from '@primer/octicons-react'
import {useId} from '../hooks/useId'

import {FocusKeys, type PositionSettings, focusZone} from '@primer/behaviors'
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

export const ActionMenuSizes = ['small', 'medium'] as const

export const ActionMenuButtonModes = ['default', 'split-button'] as const
export type ActionMenuButtonModes = (typeof ActionMenuButtonModes)[number]

export type ActionMenuSizes = (typeof ActionMenuSizes)[number]

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
  /**
   * Alternative behavior for the button and menu items
   * - `default`: The button and menu items behave as a standard button and menu item.
   * - `split-button`: The button behaves as a split button, and the menu items behave as links.
   */
  mode?: ActionMenuButtonModes
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
    menuAlignment = 'end',
    size = 'medium',
    menuSide,
    onSelect,
    mode = 'default',
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
        const isSplitLayout = mode === 'split-button'
        const splitLayoutFilter = isSplitLayout ? element => element.tagName === 'A' : undefined

        focusZone(floatingElementRef.current, {
          bindKeys: FocusKeys.ArrowVertical,
          focusableElementFilter: splitLayoutFilter,
          focusInStrategy: isSplitLayout ? 'first' : undefined,
        })

        // enter selects item
        floatingElement.addEventListener('keydown', event => {
          if (event.key === 'Enter') {
            const target = event.target as HTMLElement

            // Get the proper element containing the data-value
            const targetElement = target.tagName === 'A' ? target.closest('li') : target

            if (!targetElement || targetElement.getAttribute('aria-disabled') === 'true') return

            const value = targetElement.getAttribute('data-value')
            if (value) {
              handleOnSelect(value)
              setShowMenu(false)
              setTimeout(() => {
                anchorElementRef.current?.focus()
              }, 10)
            }
          }
        })

        const targetSelector = isSplitLayout ? 'a' : 'li'

        // focusses first item
        const firstItem = floatingElementRef.current.querySelector(targetSelector)
        if (firstItem) {
          setTimeout(() => {
            firstItem.focus()
          }, 10)
        }

        const lastItem =
          floatingElement.querySelectorAll(targetSelector)[floatingElement.querySelectorAll(targetSelector).length - 1]
        lastItem.addEventListener('keydown', (event: Event) => {
          const keyboardEvent = event as KeyboardEvent
          if (keyboardEvent.key === 'ArrowDown') {
            keyboardEvent.preventDefault()
            firstItem?.focus()
          }
        })

        firstItem?.addEventListener('keydown', (event: Event) => {
          const keyboardEvent = event as KeyboardEvent
          if (keyboardEvent.key === 'ArrowUp') {
            keyboardEvent.preventDefault()
            lastItem.focus()
          }
        })

        //on escape refocus
        floatingElement.addEventListener('keydown', (event: Event) => {
          const keyboardEvent = event as KeyboardEvent
          if (keyboardEvent.key === 'Escape') {
            anchorElementRef.current?.focus()
          }
        })
      }
    }, [showMenu, floatingElementRef, mode, handleItemSelection, toggleMenu, handleOnSelect])

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
      if (isValidElement<ActionMenuButtonProps>(child) && child.type === ActionMenuButton) {
        acc.Button = cloneElement(child, {
          onClick: toggleMenu,
          ref: anchorElementRef as React.RefObject<HTMLButtonElement>,
          className: clsx(child.props.className, styles[`ActionMenu__button--${mode}`], showMenu),
          menuOpen: showMenu,
          disabled,
          id: `${instanceId}-button`,
          size,
          _mode: mode,
        })
      } else if (isValidElement<ActionMenuOverlayProps>(child) && child.type === ActionMenuOverlay) {
        acc.Overlay = cloneElement(child, {
          ref: floatingElementRef as React.RefObject<HTMLUListElement>,
          className: clsx(
            styles.ActionMenu__menu,
            position && styles['ActionMenu__menu--visible'],
            position && styles[`ActionMenu__menu--pos-${position.anchorSide}`],
            styles[`ActionMenu__menu--${size}`],
            mode === 'split-button' && 'ActionMenu__menu--split',
          ),
          style: {
            top: `${position?.top ?? 0}px`,
            left: `${position?.left ?? 0}px`,
          },
          id: `${instanceId}-menu`,
          children: Children.map(child.props.children, item => {
            if (isValidElement<ActionMenuItemBaseProps>(item)) {
              return cloneElement(item, {
                handler: handleItemSelection,
                type: mode === 'split-button' ? 'link' : selectionVariant,
              })
            }
            return item
          }),
        })
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

type ActionMenuButtonProps = PropsWithChildren<
  BaseProps<HTMLButtonElement> & Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, 'id' | 'disabled' | 'onClick'>
> & {
  as?: ButtonProps<'a'>['as']
  href?: ButtonProps<'a'>['href']
  menuOpen?: boolean
  'data-testid'?: string
  size?: ActionMenuSizes
  _mode?: ActionMenuButtonModes
  variant?: ButtonProps<'a'>['variant']
  leadingVisual?: ButtonProps<'a'>['leadingVisual']
}

const ActionMenuButton = forwardRef<HTMLButtonElement, ActionMenuButtonProps>(
  (
    {
      as,
      href,
      children,
      className,
      'data-testid': testId,
      disabled,
      menuOpen,
      size,
      _mode = 'default',
      onClick,
      leadingVisual,
      variant = 'primary',
      ...props
    },
    ref,
  ) => {
    if (_mode === 'split-button') {
      return (
        <div className={clsx(styles.ActionMenu__button, styles[`ActionMenu__button--${size}`], className)}>
          <Button
            as={as}
            href={href}
            className={clsx(
              styles['ActionMenu__innerButton--split-button'],
              styles[`ActionMenu__innerButton--${variant}`],
              styles[`ActionMenu__innerButton--${size}`],
              disabled && styles['ActionMenu__innerButton--disabled'],
            )}
            variant={variant}
            hasArrow={false}
            aria-disabled={disabled}
            data-testid={testId || testIds.button}
            size={size}
            leadingVisual={leadingVisual}
          >
            <span className={styles['ActionMenu__button-text']}>{children}</span>
          </Button>
          <Button
            ref={ref}
            as="button"
            className={styles['ActionMenu__innerButton--split-button']}
            variant={variant}
            hasArrow={false}
            aria-haspopup="true"
            aria-label="Menu"
            size={size}
            aria-expanded={menuOpen ? 'true' : 'false'}
            onClick={onClick}
            disabled={disabled}
            {...props}
          >
            <ChevronDownIcon />
          </Button>
        </div>
      )
    }

    return (
      <Button
        ref={ref}
        className={clsx(styles.ActionMenu__button, styles[`ActionMenu__button--${size}`], className)}
        hasArrow={false}
        aria-haspopup="true"
        aria-expanded={menuOpen ? 'true' : 'false'}
        disabled={disabled}
        data-testid={testId || testIds.button}
        size={size}
        trailingVisual={<ChevronDownIcon />}
        onClick={onClick}
        {...props}
      >
        <span className={styles['ActionMenu__button-text']}>{children}</span>
      </Button>
    )
  },
)

type ActionMenuItemBaseProps = {
  handler?: (newValue: string) => void
  type?: 'none' | 'single' | 'link'
  disabled?: boolean
  size?: ActionMenuSizes
  leadingVisual?: React.ReactElement | React.ReactNode | Icon
} & PropsWithChildren<React.HTMLProps<HTMLLIElement>>

type ActionMenuItemAnchorProps = ActionMenuItemBaseProps & {
  as: 'a'
} & Omit<React.HTMLProps<HTMLAnchorElement>, keyof ActionMenuItemBaseProps | 'as'>

// Type for when 'as' is not set or is anything other than 'a'
type ActionMenuItemDefaultProps = ActionMenuItemBaseProps & {
  as?: string
  value?: string
  selected?: boolean
} & Omit<React.HTMLProps<HTMLLIElement>, keyof ActionMenuItemBaseProps | 'as'>

const roleTypeMap = {
  none: 'menuitem',
  single: 'menuitemradio',
  link: 'menuitem',
}

const ActionMenuItem = ({
  as,
  children,
  className,
  disabled,
  handler,
  selected,
  type,
  value,
  onClick,
  onKeyDown,
  leadingVisual: LeadingVisual,
  ...props
}: ActionMenuItemAnchorProps | ActionMenuItemDefaultProps) => {
  const {size} = useActionMenuContext()

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      onClick?.(e)

      if (!disabled) {
        handler?.(String(value))
      }
    },
    [handler, value, disabled, onClick],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLLIElement>) => {
      onKeyDown?.(e)

      if (!disabled && e.key === 'Enter') {
        handler?.(String(value))
      }
    },
    [handler, value, disabled, onKeyDown],
  )

  const liProps = useMemo<React.HTMLProps<HTMLLIElement> & {'data-value': unknown}>(
    () => ({
      className: clsx(
        styles.ActionMenu__item,
        type === 'single' && styles[`ActionMenu__item--selection-type-${type}`],
        size && styles[`ActionMenu__item--${size}`],
        className,
      ),
      role: roleTypeMap[type || 'single'],
      'aria-disabled': disabled,
      tabIndex: -1,
      'data-value': value,
      ...props,
    }),
    [props, type, size, className, disabled, value],
  )

  const contents = useMemo(
    () => (
      <>
        {React.isValidElement<{width?: number; height?: number}>(LeadingVisual)
          ? React.cloneElement(LeadingVisual, {
              width: LeadingVisual.props.width || 20,
              height: LeadingVisual.props.width || 20,
            })
          : null}
        {type === 'single' && (
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
      </>
    ),
    [LeadingVisual, children, selected, disabled, size, type],
  )

  if (as === 'a') {
    return (
      <li
        // This role will be overridden by the role prop in `liProps`. It's just here to keep the linter happy
        role="menuitem"
        {...liProps}
        // Intentionally not calling handle[Click/KeyDown] here so as to not call the handler
        onClick={onClick}
        onKeyDown={onKeyDown}
      >
        <a
          className={clsx(styles['ActionMenu__item-anchor'], disabled && styles['ActionMenu__item--disabled'])}
          href={props.href}
        >
          {contents}
        </a>
      </li>
    )
  }

  return (
    // eslint-disable-next-line jsx-a11y/role-supports-aria-props
    <li
      // This role will be overridden by the role prop in `liProps`. It's just here to keep the linter happy
      role="menuitem"
      {...liProps}
      aria-checked={type === 'none' ? undefined : selected ? 'true' : 'false'}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {contents}
    </li>
  )
}

type ActionMenuOverlayProps = PropsWithChildren<
  BaseProps<HTMLUListElement> & React.HTMLAttributes<HTMLUListElement>
> & {
  'aria-label': string
  id?: string
  'data-testid'?: string
  menuOpen?: boolean
  style?: React.CSSProperties
}

const ActionMenuOverlay = forwardRef<HTMLUListElement, ActionMenuOverlayProps>(
  ({children, className, 'data-testid': testId, menuOpen, ...rest}, ref) => {
    const {colorMode: defaultColorMode} = useTheme()

    const colorMode = className?.includes('ActionMenu__menu--split') ? 'light' : defaultColorMode

    return (
      <ThemeProvider colorMode={colorMode}>
        <ul ref={ref} className={clsx(className)} role="menu" data-testid={testId || testIds.list} {...rest}>
          {children}
        </ul>
      </ThemeProvider>
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
