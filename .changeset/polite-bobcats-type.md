---
'@primer/react-brand': patch
---

Add `stretch` and `letter-spacing` configurability to Heading

**Width**

```jsx
<>
  <Heading as="h3" stretch="condensed">
    condensed
  </Heading>
  <Heading as="h3" stretch="normal">
    normal
  </Heading>
  <Heading as="h3" stretch="expanded">
    wide
  </Heading>
</>
```

**Letter spacing**

```jsx
<>
  <Heading as="h3" letterSpacing="condensed">
    condensed
  </Heading>
  <Heading as="h3" letterSpacing="normal">
    normal
  </Heading>
  <Heading as="h3" letterSpacing="none">
    none
  </Heading>
</>
```
