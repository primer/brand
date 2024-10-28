---
'@primer/brand-primitives': minor
'@primer/react-brand': patch
---

Fixed issue where `Button` component would reflow and break over multiple lines when its text content exceeded the viewport width.

:warning: Breaking changes to the following design tokens:

```diff
- --brand-control-medium-paddingBlock
+ --brand-control-medium-paddingBlock-normal
```

```diff
- --brand-control-large-paddingBlock
+ --brand-control-large-paddingBlock-normal
```

Additional tokens added:

```diff
+ --brand-control-medium-paddingBlock-condensed
+ --brand-control-large-paddingBlock-condensed
```
