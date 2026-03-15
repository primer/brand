---
'@primer/react-brand': patch
---

Added `'use client'` directive to the `@primer/react-brand` entrypoints to support React Server Components.

Primer Brand components can now be imported into RSC-enabled frameworks like Next.js without manually adding `'use client'` to your files.
