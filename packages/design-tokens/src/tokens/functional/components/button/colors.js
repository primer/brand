module.exports = {
  brand: {
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
      secondary: {
        bgColor: {
          rest: {
            value: 'transparent',
            dark: 'transparent',
          },
          hover: {
            value: 'hsl(var(--base-color-scale-gray-3-hsl) / 20%)',
            dark: 'hsl(var(--base-color-scale-gray-3-hsl) / 20%)',
          },
          active: {
            value: 'hsl(var(--base-color-scale-gray-3-hsl) / 40%)',
            dark: 'hsl(var(--base-color-scale-gray-3-hsl) / 40%)',
          },
        },
        borderColor: {
          rest: {
            value: 'var(--brand-color-border-default)',
            dark: 'var(--brand-color-border-default)',
          },
          hover: {
            value: 'var(--base-color-scale-gray-9)',
            dark: 'var(--base-color-scale-white-0)',
          },
          active: {
            value: 'var(--base-color-scale-gray-9)',
            dark: 'var(--base-color-scale-white-0)',
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
        borderColor: {
          rest: {
            value: 'transparent',
            dark: 'transparent',
          },
          hover: {
            value: 'var(--base-color-scale-gray-9)',
            dark: 'var(--base-color-scale-white-0)',
          },
          active: {
            value: 'var(--base-color-scale-gray-9)',
            dark: 'var(--base-color-scale-white-0)',
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
  },
}
