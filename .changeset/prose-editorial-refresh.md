---
'@primer/react-brand': minor
'@primer/brand-css': minor
'@primer/brand-primitives': minor
---

- Visual refresh to `Prose`. Applies broad design changes from typography and spacing to code blocks, images and tables. Existing props and supported HTML elements remain unchanged.

- ⚠️ Breaking change: Editorial width now defaults to `62ch` and uses `--brand-Prose-editorial-lineLength` instead of `--brand-Prose-lineLength`, which still controls the default variant.

- ⚠️ Breaking change: Removed `--brand-Prose-code-bgColor` and `--brand-Prose-unorderedList-imageUrl`. Code backgrounds use `--brand-color-canvas-subtle` and Lists now use disc markers.

- `--brand-Prose-blockquote-spacing` still controls default blockquotes, but not editorial blockquotes.
