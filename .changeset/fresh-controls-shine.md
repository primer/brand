---
'@primer/brand-primitives': patch
---

Added and updated form control color tokens for `Checkbox`, `Radio`, and shared focus states.

New tokens are now available:

```diff
+ --brand-control-color-focus
+ --brand-control-checkbox-bg-hover
+ --brand-control-checkbox-bg-checked-hover
+ --brand-control-checkbox-bg-indeterminate-hover
+ --brand-control-checkbox-border-hover
+ --brand-control-checkbox-border-checked-hover
+ --brand-control-checkbox-border-indeterminate-hover
+ --brand-control-radio-bg-hover
+ --brand-control-radio-bg-checked-hover
+ --brand-control-radio-border-hover
+ --brand-control-radio-border-checked-hover
+ --brand-control-radio-border-disabled
+ --brand-control-radio-dot-checked
+ --brand-control-radio-dot-checked-hover
```

Existing tokens were also updated:

```diff
/* light */
- --brand-control-checkbox-bg-checked: var(--base-color-scale-black-0)
+ --brand-control-checkbox-bg-checked: var(--base-color-scale-green-6)
- --brand-control-checkbox-bg-indeterminate: var(--base-color-scale-black-0)
+ --brand-control-checkbox-bg-indeterminate: var(--base-color-scale-green-6)
- --brand-control-checkbox-bg-disabled: var(--base-color-scale-gray-1)
+ --brand-control-checkbox-bg-disabled: var(--brand-color-canvas-default)
- --brand-control-checkbox-border-checked: var(--base-color-scale-black-0)
+ --brand-control-checkbox-border-checked: var(--base-color-scale-green-6)
- --brand-control-checkbox-border-indeterminate: var(--base-color-scale-black-0)
+ --brand-control-checkbox-border-indeterminate: var(--base-color-scale-green-6)
- --brand-control-checkbox-border-disabled: var(--base-color-scale-gray-2)
+ --brand-control-checkbox-border-disabled: var(--base-color-scale-gray-4)
- --brand-control-radio-bg-disabled: var(--base-color-scale-gray-1)
+ --brand-control-radio-bg-disabled: var(--brand-color-canvas-default)
- --brand-control-radio-border-checked: var(--base-color-scale-black-0)
+ --brand-control-radio-border-checked: var(--base-color-scale-green-6)

/* dark */
- --brand-control-checkbox-bg-checked: var(--base-color-scale-white-0)
+ --brand-control-checkbox-bg-checked: var(--base-color-scale-green-5)
- --brand-control-checkbox-bg-indeterminate: var(--base-color-scale-white-0)
+ --brand-control-checkbox-bg-indeterminate: var(--base-color-scale-green-5)
- --brand-control-checkbox-bg-disabled: var(--base-color-scale-gray-4)
+ --brand-control-checkbox-bg-disabled: var(--brand-color-canvas-default)
- --brand-control-checkbox-fg-checked: var(--base-color-scale-black-0)
+ --brand-control-checkbox-fg-checked: var(--base-color-scale-white-0)
- --brand-control-checkbox-border-checked: var(--base-color-scale-white-0)
+ --brand-control-checkbox-border-checked: #077726
- --brand-control-checkbox-border-indeterminate: var(--base-color-scale-white-0)
+ --brand-control-checkbox-border-indeterminate: #077726
- --brand-control-checkbox-border-disabled: var(--base-color-scale-gray-4)
+ --brand-control-checkbox-border-disabled: var(--base-color-scale-gray-5)
- --brand-control-radio-bg-disabled: var(--base-color-scale-gray-4)
+ --brand-control-radio-bg-disabled: var(--brand-color-canvas-default)
- --brand-control-radio-border-default: var(--base-color-scale-white-0)
+ --brand-control-radio-border-default: var(--base-color-scale-gray-4)
- --brand-control-radio-border-checked: var(--base-color-scale-white-0)
+ --brand-control-radio-border-checked: #077726
```
