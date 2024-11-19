---
'@primer/react-brand': minor
---

Switched to use CSS Logical Properties in compiled output.

- Compiled styles now directly use CSS logical properties (e.g., `margin-inline-start`, `margin-inline-end`) instead of physical properties (`margin-left`, `margin-right`).
- This change simplifies the stylesheet and reduces its overall size (`652kB` > `593kB`)

Example of the change:

Source:

```css
.selector {
  margin-inline-start: var(--base-size-20);
}
```

<table>
<tr>
<th> Previous compiled output
</th> <th> New compiled output </th>
</tr>
<tr>
<td valign="top">

```css
[dir='ltr'] .selector {
  margin-left: 2px;
}

[dir='rtl'] .selector {
  margin-right: 2px;
}
```

 </td>
<td valign="top">

```css
.selector {
  margin-inline-start: 2px;
}
```

</td>
</tr>
</table>
