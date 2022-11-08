---
'@primer/react-brand': minor
---

Fix conflict with id and name attributes for form components

The previous API for FormControl relied on the `id` prop to automatically assign the necessary `name` attribute for input tags. This had previously overridden the explicit `name` prop, which is not the desired behavior. This release fixes that by forwarding the `name` prop if it is provided, and falling back to the `id` prop if it is not.

```jsx
<FormControl>
  <FormControl.Label>Name</FormControl.Label>
  <TextInput name="name" />
</FormControl>
```

The above will now render as

```html
<section id="FormControl--custom-id">
  <label for="custom-id">Name</label>
  <input type="text" name="custom-name" id="custom-id" />
</section>
```
