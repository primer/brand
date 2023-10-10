---
'@primer/react-brand': patch
---

Added hook for `useWindowSize` to the library exports.

Usage example:

```js
import {useWindowSize} from '@primer/react-brand'
```

```jsx
const {width, height, isXSmall, isSmall, isMedium, isLarge, isXLarge, isXXLarge, currentBreakpointSize} =
  useWindowSize()
```
