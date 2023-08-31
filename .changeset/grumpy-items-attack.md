---
'@primer/react-brand': minor
---

Visual updates to the Card component.

- Increase border radius to 16px.
- Adjust inner spacing between body text and link.
- Use accent color in the link.

Removed shadow and border by default to Card

⚠️ This is a visual breaking change

To restore the previous visual appearance, use the following

```diff
- <Card>
+ <Card hasShadow hasBorder>
```
