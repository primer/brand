---
'@primer/react-brand': minor
'@primer/brand-primitives': patch
---

Updated `SubdomainNavBar` with a new visual variant, content slots, search APIs, and responsive navigation behavior.

- Added a `gridline` variant with horizontal and vertical separators.
- Added `leadingComponent` and `trailingComponent` props for rendering custom content around the navigation links and actions.
- Added a typed `id` prop for setting an HTML ID on the root element.
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

- Added an input-style search trigger, custom placeholder and shortcut labels, configurable keyboard shortcuts, grouped results, and a `labels` prop for localizing visible and accessible search text. The default `/` shortcut can be remapped or disabled with `keyboardShortcut`.

  Exported `SubdomainNavBarSearchLabels` and `SubdomainNavBarSearchProps` for typed search configuration. The `SubdomainNavBar` ref now exposes `openSearch()` and `closeSearch()` methods.

  ```tsx
  import * as React from 'react'
  import {
    Button,
    SubdomainNavBar,
    type SubdomainNavBarHandle,
    type SubdomainNavBarSearchLabels,
    type SubdomainNavBarSearchProps,
    type SubdomainNavBarSearchResults,
  } from '@primer/react-brand'

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
    const labels = {
      searchLabel: 'Buscar',
      closeLabel: 'Cerrar',
      formatResultsHeading: (term: string) => `Resultados para “${term}”`,
      formatSuggestions: (count: number) => `${count} sugerencias.`,
    } satisfies Partial<SubdomainNavBarSearchLabels>
    const searchProps: SubdomainNavBarSearchProps = {
      variant: 'input',
      placeholder: 'Buscar',
      keyboardShortcut: 'Command+Option+k',
      shortcutLabel: '⌘+⌥+k',
      labels,
      searchResults,
      searchTerm,
      onChange: event => setSearchTerm(event.currentTarget.value),
      onSubmit: event => event.preventDefault(),
    }

    return (
      <>
        <SubdomainNavBar ref={navRef} title="Subdomain">
          <SubdomainNavBar.Link href="/item">Item</SubdomainNavBar.Link>
          <SubdomainNavBar.Search {...searchProps} />
        </SubdomainNavBar>

        <Button onClick={() => navRef.current?.openSearch()}>Open search</Button>
        <Button onClick={() => navRef.current?.closeSearch()}>Close search</Button>
      </>
    )
  }
  ```

- Updated desktop overflow handling so a contiguous set of links moves into the More menu when space is limited and returns when space becomes available. Overflowed links are removed from keyboard and assistive technology navigation, and focus returns to the More button when its menu closes.

- Updated responsive and mobile menu behavior. Mobile navigation stays out of the desktop overflow menu, disclosures remain keyboard accessible when only slot content is present, and each control is associated with its menu. Leading content renders before navigation links, while actions and trailing content render in the menu footer.
