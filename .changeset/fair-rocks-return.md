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

![Side-by-side comparison between previous and new hero](https://github.com/primer/brand/assets/13340707/fd803b28-dc07-4409-9509-227dd4ca0b9e)

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

![Side-by-side comparison between previous and new section intro](https://github.com/primer/brand/assets/13340707/3b819b86-2989-424d-b628-67ff755cafa4)

#### River

- ❌ Breaking API change
- ✅ Visual change

Visual diff:

![Side-by-side comparison between previous and new river](https://github.com/primer/brand/assets/13340707/c1d5ea1b-ac6f-4278-87a9-2eb0b3284d6c)

#### FAQ

- ✅ Breaking API change
- ✅ Visual change

`size` prop has been removed from `FAQ.Heading`. Use `size` instead to alternate between headings. `FAQ` continues to provide recommended defaults.

```diff
- <FAQ.Heading size="medium" />
+ <FAQ.Heading size={3} />
```

Visual diff:

![Side-by-side comparison between previous and new faq](https://github.com/primer/brand/assets/13340707/a5953b58-a6d1-4d3f-9b03-fc4896319a07)

#### CTABanner

- ❌ Breaking API change
- ✅ Visual change

Visual diff:

![Side-by-side comparison between previous and new cta banner](https://github.com/primer/brand/assets/13340707/92f94616-d6f8-4044-96fc-e78207ca6ab9)

#### Comparison table

- ❌ Breaking API change
- ✅ Visual change

Visual diff:
![Side-by-side comparison between previous and new comparison table](https://github.com/primer/brand/assets/13340707/99d1f36d-f8bd-4926-930c-271c4da1fece)
