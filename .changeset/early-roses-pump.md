---
'@primer/react-brand': patch
---

Added `leadingComponent` slot to `SectionIntro` for inserting arbitrary visuals and JSX above the heading.

```jsx
<SectionIntro leadingComponent={() => <img src={mockImage} alt="mock" />}>
  <SectionIntro.Heading>...</SectionIntro.Heading>
  <SectionIntro.Description>...</SectionIntro.Description>
  <SectionIntro.Link>...</SectionIntro.Link>
</SectionIntro>
```

🔗 [See Storybook example](https://stunning-chainsaw-j82glqz.pages.github.io/?path=/story/components-sectionintro-features--leading-component)
