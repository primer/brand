---
'@primer/react-brand': minor
---

Replaced twitter references in MinimalFooter with X

> [!WARNING]  
> This is a breaking, but necessary change to the API.

Migration steps:

```diff
- <MinimalFooter socialLinks={['twitter']} />
+ <MinimalFooter socialLinks={['x']} />
```
