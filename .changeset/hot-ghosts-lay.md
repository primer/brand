---
'@primer/react-brand': patch
---

Removed `gh-variables.css` from package as Brand variables are now surfaced in main.css

**To upgrade:**

- _Remove_ `import "@primer/react-brand/lib/css/gh-variables.css"` 

- _Add_ `import "@primer/react-brand/lib/css/main.css"`
