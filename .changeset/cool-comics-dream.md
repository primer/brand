---
"@primer/brand-primitives": minor
"@primer/react-brand": minor
---

- Change base color scales to hex instead of hsl
- Remove the hsl logic that handles opacity
- Use a raw hex8 value where alpha was used temporarily until we have the new build process in place from Primitives
- Adds new tokens for videoPlayer to help with this transition
- Use two files for light/dark vs. one in the base tokens
- Rename `--base-color-scale-white-0` to `--base-color-scale-white`
- Rename `--base-color-scale-black-0` to `--base-color-scale-black`
