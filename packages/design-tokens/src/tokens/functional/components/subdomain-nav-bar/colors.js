module.exports = {
  SubdomainNavBar: {
    canvas: {
      default: {
        value: '#ffffff80', // base.color.white 0.5 alpha
        dark: '#0d111780', // base.color.gray.9 0.5 alpha
      },
      search: {
        value: 'var(--base-color-scale-white-0)',
        dark: 'var(--base-color-scale-black-0)',
      },
      overflow: {
        default: {
          value: 'var(--base-color-scale-white-0)',
          dark: 'var(--base-color-scale-white-0)',
        },
        hover: {
          value: 'var(--base-color-scale-gray-0)',
          dark: 'var(--base-color-scale-gray-0)',
        },
      },
    },
    fg: {
      overflow: {
        default: {
          value: 'var(--brand-color-text-default)',
          dark: 'var(--brand-color-text-onEmphasis)',
        },
      },
    },
    border: {
      nav: {
        default: {
          value: 'var(--base-color-scale-gray-9)',
          dark: 'var(--base-color-scale-gray-3)',
        },
        pressed: {
          value: 'var(--base-color-scale-black-0)',
          dark: 'var(--base-color-scale-white-0)',
        },
      },
      button: {
        hover: {
          value: 'var(--base-color-scale-black-0)',
          dark: 'var(--base-color-scale-white-0)',
        },
      },
    },
  },
}
