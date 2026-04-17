---
'@primer/react-brand': patch
---

Refined the `Card` arrow CTA variant so the revealed label remains decorative, does not block the card-wide link target, and better matches the intended hover and focus motion.

Also exposed these `ExpandableArrow` CSS variables so its motion can be tuned by parent components:

```css
--ExpandableArrow-duration: 200ms;
--ExpandableArrow-easing: ease;
```
