---
'@primer/react-brand': minor
---

Enabled keyboard navigation in the `IDE` component and made the contents navigable by screen readers.

⚠️ Breaking changes

The `alternativeText` prop on the `IDE` component has been removed in favour of more granular descriptive text.

<table width="100%">
<tr>
<th> Before</th>
</tr>
<tr>
<td valign="top">

```tsx
<IDE alternativeText="A user asks how to concatenate arrays in JavaScript, Copilot demonstrates using the concat method, and the user confirms it worked.">
  <IDE.Chat />
</IDE>
```

 </td>
</tr>
<tr>
<th> After</th>
</tr>
<tr>
<td valign="top">

```tsx
<IDE>
  <IDE.Chat alternativeText="A user asks how to concatenate arrays in JavaScript, Copilot demonstrates using the concat method, and the user confirms it worked." />
</IDE>
```

</td>
</tr>
</table>

<table width="100%">
<tr>
<th> Before</th>
</tr>
<tr>
<td valign="top">

```tsx
<IDE alternativeText="TypeScript sentiment analysis function with D3.js visualization.">
  <IDE.Editor
    files={[
      {
        name: 'index.js',
      },
    ]}
  />
</IDE>
```

 </td>
</tr>
<tr>
<th> After</th>
</tr>
<tr>
<td valign="top">

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

</td>
</tr>
</table>

🔗 [See the documentation for example usage, and more information on accessibility in the `IDE` component](https://primer.style/brand/components/IDE#accessibility)
