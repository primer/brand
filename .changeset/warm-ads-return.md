---
'@primer/react-brand': minor
---

Enabled keyboard navigation in the `IDE` component and made the contents navigable by screen readers.

⚠️ Breaking changes

The `alternativeText` prop on the `IDE` component has been removed in favour of more granular descriptive text.

Alternative text should now be provided in the following ways:

- Via the `alternativeText` prop on the `IDE.Chat` component.
  ```tsx
  <IDE>
    <IDE.Chat
      alternativeText="A user asks how to concatenate arrays in JavaScript, Copilot demonstrates using the concat method, and the user confirms it worked."
      // ...
    />
  </IDE>
  ```
- Via `alternativeText` property on each file provided to the `IDE.Editor`.
  ```tsx
  <IDE>
    <IDE.Editor
      files={[
        {
          name: 'index.js',
          alternativeText: 'TypeScript sentiment analysis function with D3.js visualization.',
          // ...
        },
      ]}
    />
  </IDE>
  ```

🔗 [See the documentation for example usage, and more information on accessibility in the `IDE` component](https://primer.style/brand/components/IDE#accessibility)
