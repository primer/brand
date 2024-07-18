---
'@primer/react-brand': minor
---

⚠️ This update contains a breaking change.

Refactored `VideoPlayer` component to make it more modular and customisable.

- The `showTitle` prop has been renamed to `visuallyHiddenTitle` and inverted.
  - This prop hides the title visually, but keeps it accessible to screen readers.
  - Where you previously passed `showTitle={false}`, you should now pass `visuallyHiddenTitle={true}`.
- The `branding` prop has been renamed to `showBranding`.
- Individual video controls can be optionally hidden by setting any of the `showPlayPauseButton`, `showSeekControl`, `showCCButton`, `showMuteButton`, `showVolumeControl`, and `showFullScreenButton` props to `false`.
- A custom play icon can be provided using the `playIcon` prop.
