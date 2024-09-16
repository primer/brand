module.exports = {
  brand: {
    videoPlayer: {
      playButton: {
        bgColor: {
          rest: {
            value: 'var(--base-color-scale-blue-5)',
            dark: 'var(--base-color-scale-blue-5)',
          },
        },
        fgColor: {
          rest: {
            value: 'var(--base-color-scale-gray-0)',
            dark: 'var(--base-color-scale-gray-0)',
          },
        },
      },
      title: {
        bgColor: {
          value: 'linear-gradient(180deg, #000000e6, #00000073 66%, transparent)',
          dark: 'linear-gradient(180deg, #000000e6, #00000073 66%, transparent)',
        },
        fgColor: {
          value: 'var(--base-color-scale-gray-0)',
          dark: 'var(--base-color-scale-gray-0)',
        },
      },
      controls: {
        bgColor: {
          value: '#000000bf',
          dark: '#000000bf',
        },
        fgColor: {
          value: 'var(--base-color-scale-gray-0)',
          dark: 'var(--base-color-scale-gray-0)',
        },
      },
      closedCaption: {
        bgColor: {
          enabled: {
            value: 'var(--base-color-scale-gray-0)',
            dark: 'var(--base-color-scale-gray-0)',
          },
        },
        fgColor: {
          enabled: {
            value: 'var(--base-color-scale-black-0)',
            dark: 'var(--base-color-scale-black-0)',
          },
          disabled: {
            value: 'var(--base-color-scale-gray-0)',
            dark: 'var(--base-color-scale-gray-0)',
          },
        },
        borderColor: {
          enabled: {
            value: 'var(--base-color-scale-gray-0)',
            dark: 'var(--base-color-scale-gray-0)',
          },
        },
      },
      range: {
        bgColor: {
          default: {
            value: 'var(--base-color-scale-gray-0)',
            dark: 'var(--base-color-scale-gray-0)',
          },
          progress: {
            value: 'var(--base-color-scale-blue-4)',
            dark: 'var(--base-color-scale-blue-4)',
          },
        },
      },
    },
  },
}
