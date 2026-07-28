---
'@primer/react-brand': minor
---

Removed the global `block` layout applied to `img` and `picture` elements to prevent overriding of default inline behavior.

To minimize regressions, `block` has been applied to image elements at a component level instead.

⚠️ If you previously relied on the `display: block` styling from our `reset.css`, please apply it manually in your application code.
