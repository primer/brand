---
'@primer/react-brand': patch
---

UI bugfixes for `SubdomainNavBar` and `Testimonial` components.

## SubdomainNavBar

- Fix bug where a missing `SubdomainNavBar.Search` child would cause the `SubdomainNavBar` to render incorrectly, despite being optional.
- Fix bug where the overflow menu still appears when there are no items in the overflow menu.
- Fix bug where longer titles caused text wrapping and layout issues. Slightly longer titles are now accepted.

## Testimonial

- Increase spacing beneath the quote visual to 48px from 45px.
