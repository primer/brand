---
'@primer/react-brand': minor
---

Refactored `VideoPlayer` component to make it more modular and customisable.

- The `showTitle` prop has been renamed to `visuallyHiddenTitle` and inverted.
  - This prop hides the title visually, but keeps it accessible to screen readers.
  - Where you prviosuly passed `showTitle={false}`, you should now pass `visuallyHiddenTitle={true}`.
- The `branding` prop has been renamed to `showBranding`.
- Video controls are now modular and can be customised via the `renderControls` prop. This allows you to hide or show specific controls, or provide your own custom controls. See Storybook and the updated documentation for more information.
- A custom play overlay can now be provided via the `renderPlayOverlay` prop. This allows you to customise the appearance of the overlay that appears when the video is paused. See Storybook and the updated documentation for more information.
- Videos now support YouTube-like keyboard shortcuts to control video playback. See the updated documentation for specific shortcuts.
