import React from 'react'
import {ArrowUpRightIcon, TriangleDownIcon} from '@primer/octicons-react'
import styles from './navigation.module.css'
import {ActionList, ActionMenu, Button} from '@primer/react'

const navItems = [
  {href: 'https://primer.style/', label: 'Product UI'}, // TODO: update to https://primer.style/product when we launch the new docs site
  {href: '/', label: 'Brand UI'},
  {href: 'https://primer.style/octicons', label: 'Octicons'},
  {href: 'https://primer.style/guides/accessibility', label: 'Accessibility'}, // TODO: update to https://primer.style/accessibility when we launch the new docs site
  {href: 'https://brand.github.com/', label: 'Brand Toolkit', external: true},
]

export function Navigation() {
  const activeItem = navItems.find((item) => item.label === 'Brand UI')
  const otherItems = navItems.filter((item) => item.label !== 'Brand UI')
  const sortedNavItems = activeItem ? [activeItem, ...otherItems] : otherItems

  return (
    <nav aria-label="Main navigation" className={styles.Navigation}>
      <div className={styles.Separator}>/</div>
      <div className={styles.Dropdown}>
        <ActionMenu>
          <ActionMenu.Anchor>
            <Button
              aria-label="Open menu"
              trailingVisual={TriangleDownIcon}
              variant="invisible"
            >
              <div className={styles.DropdownLink}>
                {activeItem ? activeItem.label : 'Library'}
              </div>
            </Button>
          </ActionMenu.Anchor>
          <ActionMenu.Overlay width="small">
            <ActionList>
              {navItems.map((item) => (
                <ActionList.LinkItem
                  key={item.href}
                  href={item.href}
                  active={activeItem?.label === item.label}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                >
                  {item.label}
                  {item.external && (
                    <ArrowUpRightIcon className={styles.Icon} size={10} />
                  )}
                </ActionList.LinkItem>
              ))}
            </ActionList>
          </ActionMenu.Overlay>
        </ActionMenu>
      </div>
      <ul className={styles.HorizontalList}>
        {sortedNavItems.map((item) => {
          const active = item.label === 'Brand UI'
          return (
            <li
              key={item.href}
              className={active ? styles.ActiveLink : undefined}
            >
              {item.external ? (
                <a
                  className={styles.Link}
                  data-active={active ? true : undefined}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.label}
                  <ArrowUpRightIcon className={styles.Icon} size={10} />
                </a>
              ) : (
                <a
                  className={styles.Link}
                  data-active={active ? true : undefined}
                  href={item.href}
                >
                  {item.label}
                </a>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
