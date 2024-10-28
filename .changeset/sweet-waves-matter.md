---
'@primer/react-brand': patch
---

- Update the order of River children to ensure an accessible markup structure.
- On narrow viewports, the content and visuals are now flipped, with the visuals always placed first to enhance visual hierarchy.

  > :warning: This may introduce a visual breaking change, whereby the visual is now displayed earlier in the page than originally intended. Please manually review content adjacent to the `River` components for correctness.
