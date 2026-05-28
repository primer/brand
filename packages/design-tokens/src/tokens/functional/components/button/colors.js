module.exports = {
  button: {
    primary: {
      bgColor: {
        rest: {
          value: 'var(--base-color-scale-green-6)',
          dark: 'var(--base-color-scale-green-5)',
        },
        hover: {
          value: 'color-mix(in srgb, var(--base-color-scale-green-6), #000 16%)',
          dark: 'color-mix(in srgb, var(--base-color-scale-green-5), #000 16%)',
        },
        active: {
          value:
            'linear-gradient(0deg, rgba(0, 0, 0, 0.24) 0%, rgba(0, 0, 0, 0.24) 100%), var(--base-color-scale-green-6)', // 000000 at 24% opacity
          dark: 'linear-gradient(0deg, rgba(0, 0, 0, 0.24) 0%, rgba(0, 0, 0, 0.24) 100%), var(--base-color-scale-green-5)', // 000000 at 24% opacity
        },
        disabled: {
          value: 'var(--base-color-scale-gray-4)',
          dark: 'var(--base-color-scale-gray-4)',
        },
      },
      borderColor: {
        rest: {
          value: 'transparent',
          dark: 'transparent',
        },
        hover: {
          value: 'transparent',
          dark: 'transparent',
        },
        active: {
          value: 'var(--base-color-scale-green-7)',
          dark: 'var(--base-color-scale-green-6)',
        },
        disabled: {
          value: 'transparent',
          dark: 'transparent',
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
      shadow: {
        active: {
          value: 'none',
          dark: 'none',
        },
      },
    },
    secondary: {
      bgColor: {
        rest: {
          value: 'rgba(0, 0, 0, 0.06)', // 000000 at 6% opacity
          dark: 'rgba(255, 255, 255, 0.12)', // ffffff at 12% opacity
        },
        hover: {
          value: 'linear-gradient(0deg, rgba(0, 0, 0, 0.06) 0%, rgba(0, 0, 0, 0.06) 100%), rgba(0, 0, 0, 0.06)', // 000000 at 6% opacity overlay and base
          dark: 'rgba(255, 255, 255, 0.16)', // ffffff at 16% opacity
        },
        active: {
          value: 'linear-gradient(0deg, rgba(0, 0, 0, 0.16) 0%, rgba(0, 0, 0, 0.16) 100%), rgba(0, 0, 0, 0.06)', // 000000 at 16% opacity over 000000 at 6% opacity
          dark: 'rgba(255, 255, 255, 0.26)', // ffffff at 26% opacity
        },
      },
      borderColor: {
        rest: {
          value: 'var(--base-color-scale-gray-2)',
          dark: 'rgba(255, 255, 255, 0.06)', // ffffff at 6% opacity
        },
        hover: {
          value: 'var(--base-color-scale-gray-2)',
          dark: 'rgba(255, 255, 255, 0.12)', // ffffff at 12% opacity
        },
        active: {
          value: 'var(--base-color-scale-gray-2)',
          dark: 'rgba(255, 255, 255, 0.12)', // ffffff at 12% opacity
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
          value: 'rgba(0, 0, 0, 0.01)', // 000000 at 1% opacity
          dark: 'rgba(0, 0, 0, 0.01)', // 000000 at 1% opacity
        },
        hover: {
          value: 'linear-gradient(0deg, rgba(0, 0, 0, 0.06) 0%, rgba(0, 0, 0, 0.06) 100%), rgba(0, 0, 0, 0.06)', // 000000 at 6% opacity overlay and base
          dark: 'rgba(255, 255, 255, 0.16)', // ffffff at 16% opacity
        },
        active: {
          value: 'linear-gradient(0deg, rgba(0, 0, 0, 0.16) 0%, rgba(0, 0, 0, 0.16) 100%), rgba(0, 0, 0, 0.06)', // 000000 at 16% opacity over 000000 at 6% opacity
          dark: 'rgba(255, 255, 255, 0.24)', // ffffff at 24% opacity
        },
      },
      borderColor: {
        rest: {
          value: 'var(--base-color-scale-gray-2)',
          dark: 'var(--base-color-scale-gray-6)',
        },
        hover: {
          value: 'var(--base-color-scale-gray-2)',
          dark: 'rgba(255, 255, 255, 0.12)', // ffffff at 12% opacity
        },
        active: {
          value: 'var(--base-color-scale-gray-2)',
          dark: 'rgba(255, 255, 255, 0.12)', // ffffff at 12% opacity
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
