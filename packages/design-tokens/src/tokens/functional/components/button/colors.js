module.exports = {
  button: {
    primary: {
      bgColor: {
        rest: {
          value: 'var(--base-color-scale-black-0)',
          dark: 'var(--base-color-scale-white-0)',
        },
        hover: {
          value: 'var(--base-color-scale-gray-8)',
          dark: 'var(--base-color-scale-gray-0)',
        },
        active: {
          value: 'var(--base-color-scale-gray-8)',
          dark: 'var(--base-color-scale-gray-0)',
        },
        disabled: {
          value: 'var(--base-color-scale-gray-4)',
          dark: 'var(--base-color-scale-gray-4)',
        },
      },
      borderColor: {
        rest: {
          value: 'var(--base-color-scale-black-0)',
          dark: 'var(--base-color-scale-white-0)',
        },
        hover: {
          value: 'var(--base-color-scale-gray-8)',
          dark: 'var(--base-color-scale-white-0)',
        },
        active: {
          value: 'var(--base-color-scale-gray-8)',
          dark: 'var(--base-color-scale-white-0)',
        },
        disabled: {
          value: 'var(--base-color-scale-gray-4)',
          dark: 'var(--base-color-scale-gray-4)',
        },
      },
      fgColor: {
        rest: {
          value: 'var(--brand-color-text-onEmphasis)',
          dark: 'var(--brand-color-text-onEmphasis)',
        },
        disabled: {
          value: 'var(--base-color-scale-gray-2)',
          dark: 'var(--base-color-scale-gray-2)',
        },
      },
      shadow: {
        active: {
          value: 'inset 0px 1px 0px 0px var(--brand-button-primary-borderColor-active)',
          dark: 'inset 0px 1px 0px 0px var(--brand-button-primary-borderColor-active)',
        },
      },
    },
    accent: {
      bgColor: {
        rest: {
          value: 'var(--base-color-scale-green-5)',
          dark: 'var(--base-color-scale-green-5)',
        },
        hover: {
          value: 'var(--base-color-scale-green-4)',
          dark: 'var(--base-color-scale-green-4)',
        },
        active: {
          value: 'var(--base-color-scale-green-5)',
          dark: 'var(--base-color-scale-green-5)',
        },
        disabled: {
          value: 'var(--base-color-scale-gray-4)',
          dark: 'var(--base-color-scale-gray-4)',
        },
      },
      borderColor: {
        active: {
          value: 'var(--base-color-scale-green-4)',
          dark: 'var(--base-color-scale-green-4)',
        },
      },
      fgColor: {
        rest: {
          value: 'var(--base-color-scale-white-0)',
          dark: 'var(--base-color-scale-white-0)',
        },
        disabled: {
          value: 'var(--base-color-scale-gray-2)',
          dark: 'var(--base-color-scale-gray-2)',
        },
      },
    },
    secondary: {
      bgColor: {
        rest: {
          value: 'transparent',
          dark: 'transparent',
        },
        hover: {
          value: '#b7bfc833',
          dark: '#8a939e33',
        },
        active: {
          value: '#b7bfc866',
          dark: '#8a939e66',
        },
      },
      borderColor: {
        rest: {
          value: '#0D111729', // 0D1117 at 16% opacity
          dark: '#ffffff29', // ffffff at 16% opacity
        },
        hover: {
          value: '#0D111750', // 0D1117 at 50% opacity
          dark: '#ffffff50', // ffffff at 50% opacity
        },
        active: {
          value: '#0D111750', // 0D1117 at 50% opacity
          dark: '#ffffff50', // ffffff at 50% opacity
        },
      },
      fgColor: {
        rest: {
          value: 'var(--brand-color-text-default)',
          dark: 'var(--brand-color-text-default)',
        },
        disabled: {
          value: 'var(--base-color-scale-gray-3)',
          dark: 'var(--base-color-scale-gray-4)',
        },
      },
    },
    subtle: {
      bgColor: {
        rest: {
          value: '#0D111712', // 0D1117 at 7% opacity
          dark: '#ffffff12', // ffffff at 7% opacity
        },
        hover: {
          value: '#0D11170D', // 0D1117 at 5% opacity
          dark: '#ffffff0D', // ffffff at 5% opacity
        },
        active: {
          value: '#0D111712', // 0D1117 at 7% opacity
          dark: '#ffffff12', // ffffff at 7% opacity
        },
      },
      fgColor: {
        rest: {
          value: 'var(--brand-color-text-default)',
          dark: 'var(--brand-color-text-default)',
        },
        disabled: {
          value: 'var(--base-color-scale-gray-3)',
          dark: 'var(--base-color-scale-gray-4)',
        },
      },
    },
  },
}
