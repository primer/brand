---
'@primer/react-brand': minor
'@primer/brand-css': minor
---

⚠️ Breaking change to `Hero.Image` and `Hero.Video` ⚠️

Previously combined `padding` and `position` semantics have been separated.

The `position` prop will now only control layout and positioning relative to the content. It accepts `block-end`, `inline-start`, or `inline-end`.

Use `padding` to control the distance between the media container boundary and the media itself. `padding="all"` instead of the removed `*-padded` position values, or `padding="none"` to remove media padding and corner radius. The default padding remains position-specific.

```diff
-<Hero.Image position="block-end-padded" src="image.jpg" alt="" />
+<Hero.Image position="block-end" padding="all" src="image.jpg" alt="" />
```
