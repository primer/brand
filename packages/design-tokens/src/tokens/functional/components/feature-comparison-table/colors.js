module.exports = {
  FeatureComparisonTable: {
    label: {
      accentColor: {
        value: 'var(--brand-color-text-emphasized)',
        dark: 'var(--brand-color-accent-primary)',
      },
    },
    highlightedColumn: {
      bgColor: {
        value: 'var(--brand-color-canvas-subtle)',
        dark: 'var(--brand-color-canvas-subtle)',
      },
    },
    includedIndicator: {
      fgColor: {
        value: 'var(--brand-color-text-emphasized)',
        dark: 'var(--brand-color-accent-primary)',
      },
      bgColor: {
        value: 'rgba(8, 135, 43, 0.2)', // #08872B at 20% opacity
        dark: 'rgba(95, 237, 131, 0.2)', // #5FED83 at 20% opacity
      },
    },
    unlimitedIndicator: {
      fgColor: {
        value: 'var(--base-color-scale-green-6)',
        dark: 'var(--base-color-scale-green-2)',
      },
      bgColor: {
        value: 'rgba(8, 135, 43, 0.2)', // #08872B at 20% opacity
        dark: 'rgba(95, 237, 131, 0.2)', // #5FED83 at 20% opacity
      },
    },
    refreshIndicator: {
      fgColor: {
        value: 'var(--base-color-scale-purple-5)',
        dark: 'var(--base-color-scale-purple-2)',
      },
      bgColor: {
        value: 'rgba(133, 52, 243, 0.2)', // #8534F3 at 20% opacity
        dark: 'rgba(192, 139, 252, 0.2)', // #C08BFC at 20% opacity
      },
    },
    rowHighlight: {
      bgColor: {
        value: 'var(--brand-color-canvas-muted)',
        dark: 'var(--brand-color-canvas-muted)',
      },
    },
  },
}
