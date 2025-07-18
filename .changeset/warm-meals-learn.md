---
'@primer/react-brand': patch
---

The `Button` component now automatically applies semantically correct disabled attributes based on the rendered element type. E.g. `disabled` for button elements and `aria-disabled` for other elements.

⚠️ Please review usage of `Button` in your application code or tests, to ensure that you are not relying on the previously incorrect markup. For example, if you previously targeted `a[disabled]`, you should now target `a[aria-disabled]` instead.
