---
'@primer/react-brand': minor
---

Accessibility improvements to the `FormControl.Hint` component.

- `FormControl.Hint` is now automatically associated with the form field using `aria-describedby`.
- Improvements to the styling of `FormControl.Hint` when used alongside a `Checkbox`.

**Warning**

This update contains a breaking visual change to `Checkbox` components used within a `FormControl`. When the `FormControl` component contains a `Checkbox`, children of the `FormControl` will now be rendered in the order in which they are declared in the DOM, rather than in reverse order. If you are using the `Checkbox` component within a `FormControl`, you may need to adjust the order of your form elements to maintain the desired visual layout.
