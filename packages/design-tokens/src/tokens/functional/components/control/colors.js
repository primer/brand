module.exports = {
  control: {
    color: {
      border: {
        default: {
          value: 'var(--base-color-scale-gray-4)',
          dark: 'var(--base-color-scale-gray-4)',
        },
        disabled: {
          value: 'var(--base-color-scale-gray-2)',
          dark: 'var(--base-color-scale-gray-5)',
        },
      },
      canvas: {
        disabled: {
          value: 'var(--base-color-scale-gray-1)',
          dark: 'var(--base-color-scale-gray-8)',
        },
      },
      fg: {
        default: {
          value: 'var(--brand-color-text-default)',
          dark: 'var(--brand-color-text-default)',
        },
        disabled: {
          value: 'var(--base-color-scale-gray-4)',
          dark: 'var(--base-color-scale-gray-5)',
        },
      },
      focus: {
        value: 'var(--base-color-scale-blue-6)',
        dark: 'var(--base-color-scale-blue-2)',
      },
    },
    checkbox: {
      bg: {
        default: {
          value: 'var(--base-color-scale-white-0)',
          dark: 'var(--base-color-scale-gray-7)',
        },
        hover: {
          value: 'var(--brand-color-canvas-subtle)',
          dark: 'var(--brand-color-canvas-subtle)',
        },
        checked: {
          value: 'var(--base-color-scale-green-6)',
          dark: 'var(--base-color-scale-green-5)',
        },
        'checked-hover': {
          value: 'color-mix(in srgb, var(--brand-color-text-emphasized), #000 26%)',
          dark: '#309A4D', // var(--base-color-scale-green-5) + #fff at 16% opacity
        },
        indeterminate: {
          value: 'var(--base-color-scale-green-6)',
          dark: 'var(--base-color-scale-green-5)',
        },
        'indeterminate-hover': {
          value: 'color-mix(in srgb, var(--brand-color-text-emphasized), #000 26%)',
          dark: '#309A4D', // var(--base-color-scale-green-5) + #fff at 16% opacity
        },
        disabled: {
          value: 'var(--brand-color-canvas-default)',
          dark: 'var(--brand-color-canvas-default)',
        },
      },
      fg: {
        checked: {
          value: 'var(--base-color-scale-white-0)',
          dark: 'var(--base-color-scale-white-0)',
        },
      },
      border: {
        default: {
          value: 'var(--base-color-scale-gray-4)',
          dark: 'var(--base-color-scale-gray-4)',
        },
        hover: {
          value: 'var(--base-color-scale-gray-4)',
          dark: 'var(--base-color-scale-gray-5)',
        },
        checked: {
          value: 'var(--base-color-scale-green-6)',
          dark: '#077726', // computed value
        },
        'checked-hover': {
          value: 'var(--brand-color-text-emphasized)',
          dark: 'rgba(0, 0, 0, 0.12)',
        },
        indeterminate: {
          value: 'var(--base-color-scale-green-6)',
          dark: '#077726', // computed value
        },
        'indeterminate-hover': {
          value: 'var(--brand-color-text-emphasized)',
          dark: 'rgba(0, 0, 0, 0.12)',
        },
        disabled: {
          value: 'var(--base-color-scale-gray-4)',
          dark: 'var(--base-color-scale-gray-5)',
        },
      },
    },
    radio: {
      bg: {
        default: {
          value: 'var(--base-color-scale-white-0)',
          dark: 'var(--base-color-scale-black-0)',
        },
        hover: {
          value: 'var(--brand-color-canvas-subtle)',
          dark: 'var(--brand-color-canvas-subtle)',
        },
        checked: {
          value: 'var(--base-color-scale-white-0)',
          dark: 'var(--base-color-scale-black-0)',
        },
        'checked-hover': {
          value: 'var(--brand-color-canvas-subtle)',
          dark: 'var(--brand-color-canvas-subtle)',
        },
        disabled: {
          value: 'var(--brand-color-canvas-default)',
          dark: 'var(--brand-color-canvas-default)',
        },
      },
      border: {
        default: {
          value: 'var(--brand-control-color-border-default)',
          dark: 'var(--base-color-scale-gray-4)',
        },
        hover: {
          value: 'var(--base-color-scale-gray-4)',
          dark: 'var(--base-color-scale-gray-5)',
        },
        checked: {
          value: 'var(--base-color-scale-green-6)',
          dark: '#077726', // computed value
        },
        'checked-hover': {
          value: 'var(--brand-color-text-emphasized)',
          dark: 'rgba(0, 0, 0, 0.12)',
        },
        disabled: {
          value: 'var(--base-color-scale-gray-4)',
          dark: 'var(--base-color-scale-gray-5)',
        },
      },
      dot: {
        default: {
          value: 'var(--base-color-scale-black-0)',
          dark: 'var(--base-color-scale-white-0)',
        },
        checked: {
          value: 'var(--base-color-scale-green-6)',
          dark: 'var(--base-color-scale-green-5)',
        },
        'checked-hover': {
          value: 'color-mix(in srgb, var(--brand-color-text-emphasized), #000 26%)',
          dark: '#309A4D', // var(--base-color-scale-green-5) + #fff at 16% opacity
        },
      },
    },
  },
}
