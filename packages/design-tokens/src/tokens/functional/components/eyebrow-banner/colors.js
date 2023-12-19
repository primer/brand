module.exports = {
  brand: {
    Eyebrowbanner: {
      bgColor: {
        rest: {
          value: '#FFFFFF99', // white at 60%
          dark: '#0D111799', // 0D1117 at 60%
        },
      },
      borderColor: {
        rest: {
          value: 'var(--brand-color-border-default)',
          dark: 'var(--base-color-scale-gray-5)',
        },
      },
      heading: {
        fgColor: {
          value: 'var(--brand-color-text-default)',
          dark: 'var(--brand-color-text-default)',
        },
      },
      subHeading: {
        fgColor: {
          value: 'var(--brand-color-text-muted)',
          dark: 'var(--brand-color-text-muted)',
        },
      },
      fgColor: {
        default: {
          start: {
            value: 'var(--base-color-scale-purple-5)',
            dark: 'var(--base-color-scale-purple-2)',
          },
          middle: {
            value: 'var(--base-color-scale-pink-5)',
            dark: 'var(--base-color-scale-pink-3)',
          },
          end: {
            value: 'var(--base-color-scale-red-5)',
            dark: 'var(--base-color-scale-red-3)',
          },
        },
      },
    },
  },
}
