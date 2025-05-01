---
'@primer/react-brand': minor
---

Updated the underlying HTML elements in the `Statistic` component for improved accessibility. Now a paragraph by default, where it was previously a heading. It can optionally also be set as a `<span>` using the `as` prop.

⚠️ Breaking changes:

- `stretch` prop in `Statistic.Heading` has been removed.
- `as` prop now accepts `p` and `span` only
- `size` prop now accepts `1000`, `900`, `800`, `700`, `600`, `500`, `400`, `300`, `200`
