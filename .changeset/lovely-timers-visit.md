---
'@primer/brand-primitives': minor
---

Change to `xxlarge` breakpoint and the addition of two new base scale size tokens.

Outcome of an upgrade to Primer Primitives `v9` release.

```diff
+ --base-size-2: 0.125rem;
```

```diff
+ --base-size-6: 0.375rem;
```

```diff
- --brand-breakpoint-xxlarge: 90rem;
+ --brand-breakpoint-xxlarge: 87.5rem;
```

```diff
- @custom-media --brand-viewportRange-wide-viewport (min-width: 90rem);
+ @custom-media --brand-viewportRange-wide-viewport (min-width: 87.5rem);
```
