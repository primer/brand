---
'@primer/react-brand': minor
---

New `CheckboxGroup` and `RadioGroup` components to group `Checkbox` and `Radio` components are now available.

`CheckboxGroup`

```jsx
<CheckboxGroup>
  <CheckboxGroup.Label>Choose your favorite features</CheckboxGroup.Label>
  <FormControl>
    <FormControl.Label>Actions notifications</FormControl.Label>
    <Checkbox value="actions" />
  </FormControl>
  <FormControl>
    <FormControl.Label>Packages</FormControl.Label>
    <Checkbox value="packages" />
  </FormControl>
  <FormControl>
    <FormControl.Label>Codespaces</FormControl.Label>
    <Checkbox value="codespaces" />
  </FormControl>
</CheckboxGroup>
```

🔗 [Read the documentation for more `CheckboxGroup` examples](https://primer.style/brand/components/RadioGroup/react)

`RadioGroup`:

```jsx
<RadioGroup>
  <RadioGroup.Label>Choose your primary workspace</RadioGroup.Label>
  <FormControl>
    <FormControl.Label>Codespaces</FormControl.Label>
    <Radio name="workspace" value="codespaces" />
  </FormControl>
  <FormControl>
    <FormControl.Label>Local environment</FormControl.Label>
    <Radio name="workspace" value="local" />
  </FormControl>
  <FormControl>
    <FormControl.Label>Pen and paper</FormControl.Label>
    <Radio name="workspace" value="remote" />
  </FormControl>
</RadioGroup>
```

🔗 [Read the documentation for more `RadioGroup` examples](https://primer.style/brand/components/RadioGroup/react)
