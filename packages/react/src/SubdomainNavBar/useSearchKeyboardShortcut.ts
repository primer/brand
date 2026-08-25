import {useEffect, useMemo} from 'react'

type SearchKeyboardShortcut = {
  key: string
  altKey: boolean
  ctrlKey: boolean
  metaKey: boolean
  shiftKey: boolean
}

type UseSearchKeyboardShortcutOptions = {
  disabled: boolean
  keyboardShortcut?: string | false
  onTrigger: () => void
}

const searchKeyboardShortcutModifiers = new Set(['alt', 'option', 'ctrl', 'control', 'meta', 'cmd', 'command', 'shift'])

function isEditableKeyboardTarget(target: EventTarget | Element | null): boolean {
  if (!(target instanceof Element)) return false

  const editableElement = target.closest(
    'input, textarea, select, [role="textbox"], [role="combobox"], [role="searchbox"], [contenteditable]',
  )

  if (!editableElement) return false

  if (editableElement instanceof HTMLElement && editableElement.isContentEditable) return true

  return editableElement.matches('input, textarea, select, [role="textbox"], [role="combobox"], [role="searchbox"]')
}

function parseSearchKeyboardShortcut(keyboardShortcut: string | false): SearchKeyboardShortcut | false {
  if (!keyboardShortcut) return false

  const shortcutParts = keyboardShortcut
    .split('+')
    .map(part => part.trim())
    .filter(Boolean)
  const key = shortcutParts.pop()
  if (!key) return false

  const modifiers = shortcutParts.map(part => part.toLowerCase())

  if (!modifiers.every(modifier => searchKeyboardShortcutModifiers.has(modifier))) return false

  return {
    key,
    altKey: modifiers.includes('alt') || modifiers.includes('option'),
    ctrlKey: modifiers.includes('ctrl') || modifiers.includes('control'),
    metaKey: modifiers.includes('meta') || modifiers.includes('cmd') || modifiers.includes('command'),
    shiftKey: modifiers.includes('shift'),
  }
}

function keyboardEventMatchesShortcut(event: KeyboardEvent, shortcut: SearchKeyboardShortcut): boolean {
  const shortcutKey = shortcut.key.toLowerCase()
  const eventKey = event.key.toLowerCase()
  const eventCode = event.code.toLowerCase()

  if (event.altKey !== shortcut.altKey || event.ctrlKey !== shortcut.ctrlKey || event.metaKey !== shortcut.metaKey) {
    return false
  }

  if (/^[^a-z0-9]$/.test(shortcutKey) && eventKey === shortcutKey) {
    return shortcut.shiftKey ? event.shiftKey : true
  }

  if (event.shiftKey !== shortcut.shiftKey) {
    return false
  }

  if (/^[a-z]$/.test(shortcutKey)) {
    return eventKey === shortcutKey || eventCode === `key${shortcutKey}`
  }

  if (/^[0-9]$/.test(shortcutKey)) {
    return eventKey === shortcutKey || eventCode === `digit${shortcutKey}`
  }

  return eventKey === shortcutKey
}

export function useSearchKeyboardShortcut({
  disabled,
  keyboardShortcut = false,
  onTrigger,
}: UseSearchKeyboardShortcutOptions) {
  const shortcut = useMemo(() => parseSearchKeyboardShortcut(keyboardShortcut), [keyboardShortcut])

  useEffect(() => {
    if (!shortcut) return

    const handleDocumentKeyDown = (event: KeyboardEvent) => {
      if (disabled || event.defaultPrevented || event.isComposing || !keyboardEventMatchesShortcut(event, shortcut)) {
        return
      }

      if (isEditableKeyboardTarget(event.target) || isEditableKeyboardTarget(document.activeElement)) {
        return
      }

      event.preventDefault()
      onTrigger()
    }

    document.addEventListener('keydown', handleDocumentKeyDown)
    return () => document.removeEventListener('keydown', handleDocumentKeyDown)
  }, [disabled, onTrigger, shortcut])
}
