---
'@primer/react-brand': minor
---

> [!WARNING]  
> This update contains breaking changes to `Heading` and `Text` components. Please read carefully if you are using these components.

## Heading

- New `font` prop to alternate between `mona-sans` and `hubot-sans` variable fonts.
- Uses latest `v1.0.1` releases of (`Hubot Sans`)[https://github.com/github/hubot-sans/releases/tag/v1.0.1] and (`Mona Sans`)[https://github.com/github/mona-sans/releases/tag/v1.0.1] fonts.
- :warning: Replaced `heavy` width option with `black`
- Added `extralight` width option

```diff
- <Heading width="heavy" />
+ <Heading width="black" />
```

### Text

- New `font` prop to alternate between `mona-sans` and `hubot-sans` variable fonts.
- Uses latest `v1.0.1` releases of (`Hubot Sans`)[https://github.com/github/hubot-sans/releases/tag/v1.0.1] and (`Mona Sans`)[https://github.com/github/mona-sans/releases/tag/v1.0.1] fonts.
- :warning: Replaced `heavy` width option with `black`
- Added `extralight` width option

```diff
- <Text width="heavy" />
+ <Text width="black" />
```
