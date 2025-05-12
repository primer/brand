---
'@primer/react-brand': minor
---

`MinimalFooter` now respects the ordering of the `socialLinks` prop when rendering social links, e.g. `<MinimalFooter socialLinks={['x', 'tiktok', 'youtube']} />` will render the links in that order.

Note: This may constitute a visual breaking change if you were relying on the social link order to _not_ be respected.
