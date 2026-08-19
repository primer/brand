---
'@primer/react-brand': patch
---

Added a new `InlineCode` component for short, in-situ code fragments.

Use it inside other components like `Card`, `CTABanner`, `River`, `Hero` and `Pillar`.

The native `code` elements remain supported in `Card`, `CTABanner` and `River` for backwards compatibility, but it's visual appearance has changed. It no longer features a border and has adjusted typographic spacing.

Example usage:

```js
import {InlineCode} from '@primer/react-brand'
```

```jsx
<InlineCode>git status</InlineCode>
```

Migration example for `Card`, `CTABanner` and `River`, which previously used `<code>`

```diff
+ import {Card, InlineCode} from '@primer/react-brand'

- <Card.Heading>Run <code>git status</code></Card.Heading>
+ <Card.Heading>Run <InlineCode>git status</InlineCode></Card.Heading>
```
