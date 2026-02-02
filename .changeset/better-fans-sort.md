---
'@primer/react-brand': patch
---

Added additional customization options to the `Box` component

- Responsive border width values:

  ```jsx
  <Box
    borderWidth={{narrow: 'thin', regular: 'none'}} // now accepts an Object
  />
  ```

- Border width can be set to `none`

  ```jsx
  <Box borderBlockEndWidth={{narrow: 'thin', wide: 'none'}} />
  ```

- Fixed bug whereby adding individual borders wasn't previously possible

  ```jsx
  <Box borderBlockStartWidth="thin" borderInlineEndWidth="thin" borderInlineStartWidth="thin" />
  ```

- Arbitrary background color values (e.g. CSS variables)

  ```jsx
  <Box backgroundColor="var(--base-color-scale-gray-1)" />
  ```
