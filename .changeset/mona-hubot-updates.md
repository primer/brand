---
'@primer/react-brand': minor
---

> [!WARNING]  
> This update contains breaking changes to `Heading` and `Text` components. Please read carefully if you are using these components.

## Heading

- New `font` prop to alternate between `mona-sans` and `hubot-sans` variable fonts.
- Uses latest `v1.0.1` releases of (`Hubot Sans`)[https://github.com/github/hubot-sans/releases/tag/v1.0.1] and (`Mona Sans`)[https://github.com/github/mona-sans/releases/tag/v1.0.1] fonts.
- :warning: Replaced `heavy` weight option with `black`
- :warning: Replaced `normal` weight option with `regular`
- Added `extralight` weight option

```diff
- <Heading weight="heavy" />
+ <Heading weight="black" />
```

```diff
- <Heading weight="normal" />
+ <Heading weight="regular" />
```

### Text

- New `font` prop to alternate between `mona-sans` and `hubot-sans` variable fonts.
- Uses latest `v1.0.1` releases of (`Hubot Sans`)[https://github.com/github/hubot-sans/releases/tag/v1.0.1] and (`Mona Sans`)[https://github.com/github/mona-sans/releases/tag/v1.0.1] fonts.
- :warning: Replaced `heavy` weight option with `black`
- :warning: Replaced `normal` weight option with `regular`
- Added `extralight` weight option

```diff
- <Text weight="heavy" />
+ <Text weight="black" />
```

```diff
- <Text weight="normal" />
+ <Text weight="regular" />
```
