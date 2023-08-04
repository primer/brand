---
'@primer/react-brand': minor
---

- Updated heading weights in hero, river, section intro, faq, CTABanner and comparison table components

- Added emphasized text support to section intro component

:warning: This update contains breaking changes, both visually and one to the API of FAQ.

#### Hero

- ❌ Breaking API change
- ✅ Visual change

Visual diff:

#### Section intro

- ❌ Breaking API change
- ✅ Visual change
- 🆕 Added support for emphasized text

<table>
<tr>
<th> Snippet</th> <th> Visual appearance </th>
</tr>
<tr>
<td valign="top">

Use `<em>` to emphasize parts of the heading.

Example:

```
<SectionIntro>
  <SectionIntro.Heading>
    <em>Expressive headline</em> about an exclusive set of features.
  </SectionIntro.Heading>
</SectionIntro>
```

</td>

<td valign="top">

![Standalone section intro header, with the first two words emphasised in a darker color to the rest of the text.](https://github.com/primer/brand/assets/13340707/e60a345b-e9c4-4478-8263-3c436df47b12)

 </td>
</tr>
</table>

Visual diff:

#### River

- ❌ Breaking API change
- ✅ Visual change

Visual diff:

#### FAQ

- ✅ Breaking API change
- ✅ Visual change

`size` prop has been removed from `FAQ.Heading`. Use `size` instead to alternate between headings. `FAQ` continues to provide recommended defaults.

Visual diff:

#### CTABanner

- ❌ Breaking API change
- ✅ Visual change

Visual diff:

#### Comparison table

- ❌ Breaking API change
- ✅ Visual change

Visual diff:
