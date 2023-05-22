---
'@primer/brand-e2e': minor
'@primer/react-brand': minor
---

Provides the `Hero` component with a composable API.

> **Warning**
> This is a breaking change to the `Hero` component. Please review the following carefully.

<table>
<tr>
<th> Before</th> <th> After </th>
</tr>
<tr>
<td valign="top">

```jsx
<Hero
  heading="This is my super sweet hero heading"
  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  primaryAction={{
    text: 'Primary action',
    href: '#'
  }}
  align="center"
/>
```

 </td>
<td valign="top">

```jsx
<Hero>
  <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
  <Hero.Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Hero.Description>
  <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
</Hero>
```

</td>
</tr>
</table>
