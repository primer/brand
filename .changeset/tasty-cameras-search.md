---
'@primer/react-brand': minor
'@primer/brand-primitives': patch
---

Updated `SubdomainNavBar` with a gridline visual design, content slots, search APIs, and responsive navigation behavior.

- **Migration note:** The opinionated gridline design changes the component's default appearance. After upgrading, manually inspect affected sites, especially existing subdomain sites. If adjustments are needed, override the `--brand-SubdomainNavBar-*` custom properties through the root `className` or `style` props.
- Added `leadingComponent` and `trailingComponent` props for rendering custom content around the navigation links and actions.

```tsx
<SubdomainNavBar
  title="Subdomain"
  fullWidth
  leadingComponent={<span>Leading content</span>}
  trailingComponent={<span>Trailing content</span>}
>
  <SubdomainNavBar.Link href="/item-1">Item 1</SubdomainNavBar.Link>
  <SubdomainNavBar.Link href="/item-2">Item 2</SubdomainNavBar.Link>
  <SubdomainNavBar.PrimaryAction href="/action">Action</SubdomainNavBar.PrimaryAction>
</SubdomainNavBar>
```

- Added a responsive input-style search trigger that collapses to an icon-only button on smaller viewports, custom placeholder and shortcut labels, opt-in keyboard shortcuts, grouped results, and a `labels` prop for localizing visible and accessible search text. Pass `keyboardShortcut`, such as `keyboardShortcut="/"`, to enable a global shortcut.
- Added a `menuLabels` prop for localizing the narrow and desktop overflow menu controls.
- The `SubdomainNavBar` ref now exposes `openSearch()` and `closeSearch()` methods.
- Improved desktop overflow handling. Overflowed links are removed from keyboard and assistive technology navigation, and focus returns to the More button when its menu closes.

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
