---
'@primer/react-brand': patch
---

Added `leadingComponent` slot to `SectionIntro` for inserting arbitrary visuals and JSX above the heading.

```jsx
<SectionIntro leadingComponent={() => <img src="leading-visual.png" alt="description of your leading visual" />}>
  <SectionIntro.Heading>...</SectionIntro.Heading>
  <SectionIntro.Description>...</SectionIntro.Description>
  <SectionIntro.Link>...</SectionIntro.Link>
</SectionIntro>
```

🔗 [See Storybook example](https://primer.style/brand/storybook?path=/story/components-sectionintro-features--leading-component)
