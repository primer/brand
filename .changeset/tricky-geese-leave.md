---
'@primer/react-brand': patch
---

The `inert` attribute applied to unopened `RiverAccordion` items is now set through a runtime DOM manipulation. This helps to bypass type mismatches between React 18 and 19 but has no material impact to the accessibility or rendering of the final markup.
