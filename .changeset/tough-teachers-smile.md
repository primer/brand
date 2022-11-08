---
'@primer/react-brand': patch
---

Fixed conditional rendering bug in SubdomainNavBar

Previously, SubdomainNavBar links would not appear correctly onscreen following a rerender.

This bug has been fixed to ensure that conditional rendering - using `showLinks` below as an example - works as expected.

```jsx
<SubdomainNavBar title="Subdomain">
  {showLinks &&
    ['Collections', 'Topics', 'Articles', 'Events', 'Video'].map(link => {
      return (
        <SubdomainNavBar.Link key={link} href={`#${link}`}>
          {link}
        </SubdomainNavBar.Link>
      )
    })}
</SubdomainNavBar>
```
