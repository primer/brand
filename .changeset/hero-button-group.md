---
'@primer/react-brand': patch
---

Added `Hero.ButtonGroup` for rendering `Button` and `ActionMenu` children. `Hero.ButtonGroup` is now the de facto way to display buttons in the `Hero`.

⚠️ `Hero.PrimaryAction` and `Hero.SecondaryAction` are now deprecated. Please migrate over to `Hero.ButtonGroup` as they will be removed in a future release.

Migrate using the following approach:

```diff
-<Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
-<Hero.SecondaryAction href="#">Secondary action</Hero.SecondaryAction>
+<Hero.ButtonGroup>
+  <Button as="a" href="#">
+    Primary action
+  </Button>
+  <Button as="a" href="#">
+    Secondary action
+  </Button>
+</Hero.ButtonGroup>
```
