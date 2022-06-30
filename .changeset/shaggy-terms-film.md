---
'@primer/react-brand': minor
---
> **Warning**
> This is a breaking change, but as the library is a pre-v1 release we are publishing this update as a `minor` change. 
> Please read the following instructions carefully before updating:

### Updated references for "left" and "right" to "start" and "end"

For improved i18n support and closer alignment with our Figma naming conventions, we have updated the references for "left" and "right" to "start" and "end" respectively in `Hero` and `River` components.

```diff
- <River align="left">
- <River align="right">
+ <River align="start">
+ <River align="end">
```
