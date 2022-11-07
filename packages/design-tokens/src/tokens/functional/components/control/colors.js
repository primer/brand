module.exports = {
  brand: {
    control: {
      color: {
        border: {
          default: {
            value: 'var(--base-color-scale-gray-4)',
            dark: 'var(--base-color-scale-gray-4)'
          },
          disabled: {
            value: 'var(--base-color-scale-gray-2)',
            dark: 'var(--base-color-scale-gray-5)'
          }
        },
        canvas: {
          disabled: {
            value: 'var(--base-color-scale-gray-1)',
            dark: 'var(--base-color-scale-gray-8)'
          }
        },
        fg: {
          default: {
            value: 'var(--brand-color-text-default)',
            dark: 'var(--brand-color-text-default)'
          },
          disabled: {
            value: 'var(--base-color-scale-gray-4)',
            dark: 'var(--base-color-scale-gray-5)'
          }
        }
      },
      checkbox: {
        bg: {
          default: {
            value: 'var(--base-color-scale-white-0)',
            dark: 'var(--base-color-scale-gray-7)'
          },
          checked: {
            value: 'var(--base-color-scale-black-0)',
            dark: 'var(--base-color-scale-white-0)'
          },
          indeterminate: {
            value: 'var(--base-color-scale-black-0)',
            dark: 'var(--base-color-scale-white-0)'
          },
          disabled: {
            value: 'var(--base-color-scale-gray-1)',
            dark: 'var(--base-color-scale-gray-4)'
          }
        },
        fg: {
          checked: {
            value: 'var(--base-color-scale-white-0)',
            dark: 'var(--base-color-scale-black-0)'
          }
        },
        border: {
          default: {
            value: 'var(--base-color-scale-gray-4)',
            dark: 'var(--base-color-scale-gray-4)'
          },
          checked: {
            value: 'var(--base-color-scale-black-0)',
            dark: 'var(--base-color-scale-white-0)'
          },
          indeterminate: {
            value: 'var(--base-color-scale-black-0)',
            dark: 'var(--base-color-scale-white-0)'
          },
          disabled: {
            value: 'var(--base-color-scale-gray-2)',
            dark: 'var(--base-color-scale-gray-4)'
          }
        }
      },
      radio: {
        bg: {
          default: {
            value: 'var(--base-color-scale-white-0)',
            dark: 'var(--base-color-scale-gray-7)'
          },
          checked: {
            value: 'var(--base-color-scale-white-0)',
            dark: 'var(--base-color-scale-blue-4)'
          },
          disabled: {
            value: 'var(--base-color-scale-gray-1)',
            dark: 'var(--base-color-scale-gray-4)'
          }
        },
        border: {
          default: {
            value: 'var(--brand-control-color-border-default)',
            dark: 'var(--base-color-scale-white-0)'
          },
          checked: {
            value: 'var(--base-color-scale-black-0)',
            dark: 'var(--base-color-scale-white-0)'
          }
        },
        dot: {
          default: {
            value: 'var(--base-color-scale-blue-5)',
            dark: 'var(--base-color-scale-blue-4)'
          }
        }
      }
    }
  }
}
