---
'@primer/react-brand': minor
---

Added ESM library support.

A new `@primer/react-brand/esm` entry point is now available for modern bundlers (E.g. Vite, Next.js, etc).

Components imported from this path automatically include the minimum CSS needed. Separate global stylesheet imports are no longer required.

```js
import {Hero, ThemeProvider} from '@primer/react-brand/esm'
```

ESM features are opt-in, and the previous UMD bundle (`@primer/react-brand`) and global CSS (`@primer/react-brand/lib/css/main.css`) continue to work as before.

We recommend switching to ESM as soon as possible, as it will eventually become the default in future.

🔗 [Get started with ESM](https://primer.style/brand/introduction/getting-started/esm)
