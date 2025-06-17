---
'@primer/react-brand': patch
---

Restore `idle` option to `LogoSuite.Logobar` for enabling a default paused state, and programmatic control over animation.

Use `marqueeSpeed="idle"` to display a logo bar that is initially paused.

```jsx
<LogoSuite>
  <LogoSuite.Heading />
  <LogoSuite.Logobar marquee marqueeSpeed="idle" />
</LogoSuite>
```
