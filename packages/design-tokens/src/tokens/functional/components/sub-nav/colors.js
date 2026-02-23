module.exports = {
  SubNav: {
    bgColor: {
      value: 'var(--brand-color-canvas-default)',
      dark: 'var(--brand-color-canvas-default)',
    },
    color: {
      link: {
        rest: {
          value: 'var(--brand-color-text-default)',
          dark: 'var(--brand-color-text-default)',
        },
        active: {
          value: 'var(--brand-color-text-default)',
          dark: 'var(--brand-color-text-default)',
        },
        bgColor: {
          value: '#E4EBE6', // TODO: change to gray-2 when color scales are updated
          dark: '#323834', // TODO: change to gray-2 when color scales are updated
        },
      },
    },
    shadow: {
      value:
        '0px 100px 80px rgba(0, 0, 0, 0.01), 0px 41px 33px rgba(0, 0, 0, 0.02), 0px 22px 17px rgba(0, 0, 0, 0.02), 0px 12px 10px rgba(0, 0, 0, 0.03), 0px 6px 5px rgba(0, 0, 0, 0.04), 0px 2px 2px rgba(0, 0, 0, 0.07);',
      dark: '0px 100px 80px rgba(0, 0, 0, 0.01), 0px 41px 33px rgba(0, 0, 0, 0.02), 0px 22px 17px rgba(0, 0, 0, 0.02), 0px 12px 10px rgba(0, 0, 0, 0.03), 0px 6px 5px rgba(0, 0, 0, 0.04), 0px 2px 2px rgba(0, 0, 0, 0.07);',
    },
  },
}
