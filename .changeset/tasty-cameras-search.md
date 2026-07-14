---
'@primer/react-brand': minor
---

Updated `SubdomainNavBar` with a new visual variant, content slots, search APIs, and responsive navigation behavior.

- Added a `gridline` variant with horizontal and vertical separators.
- Added `leadingComponent` and `trailingComponent` props for rendering custom content around the navigation links and actions.
- Added a `style` prop for forwarding custom styles to the root element.

```tsx
<SubdomainNavBar
  title="Subdomain"
  variant="gridline"
  fullWidth
  leadingComponent={<span>Leading content</span>}
  trailingComponent={<span>Trailing content</span>}
>
  <SubdomainNavBar.Link href="/item-1">Item 1</SubdomainNavBar.Link>
  <SubdomainNavBar.Link href="/item-2">Item 2</SubdomainNavBar.Link>
  <SubdomainNavBar.PrimaryAction href="/action">Action</SubdomainNavBar.PrimaryAction>
</SubdomainNavBar>
```

- Added an input-style search trigger, custom placeholder and shortcut labels, configurable keyboard shortcuts, and grouped results to `SubdomainNavBar.Search`. The default `/` shortcut can be remapped or disabled with `keyboardShortcut`.

  The `SubdomainNavBar` ref now exposes `openSearch()` and `closeSearch()` methods.

  ```tsx
  function Example() {
    const navRef = React.useRef<SubdomainNavBarHandle | null>(null)
    const [searchTerm, setSearchTerm] = React.useState('')
    const searchResults: SubdomainNavBarSearchResults = [
      {
        title: 'Group',
        results: [
          {
            title: 'Result',
            description: 'Result description',
            url: '/result',
            date: '2026-01-01',
          },
        ],
      },
    ]

    return (
      <>
        <SubdomainNavBar ref={navRef} title="Subdomain">
          <SubdomainNavBar.Link href="/item">Item</SubdomainNavBar.Link>
          <SubdomainNavBar.Search
            variant="input"
            placeholder="Search"
            keyboardShortcut="Command+Option+k"
            shortcutLabel="⌘+⌥+k"
            searchResults={searchResults}
            searchTerm={searchTerm}
            onChange={event => setSearchTerm(event.currentTarget.value)}
            onSubmit={event => event.preventDefault()}
          />
        </SubdomainNavBar>

        <Button onClick={() => navRef.current?.openSearch()}>Open search</Button>
        <Button onClick={() => navRef.current?.closeSearch()}>Close search</Button>
      </>
    )
  }
  ```

- Updated desktop overflow handling so links move into the More menu when space is limited and return when space becomes available. Overflowed links are removed from keyboard and assistive technology navigation.

- Updated the mobile menu layout. Leading content renders before navigation links, while actions and trailing content render in the menu footer.
