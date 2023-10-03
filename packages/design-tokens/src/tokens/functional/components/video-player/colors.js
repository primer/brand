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
          value: 'linear-gradient(#01040966, var(--base-color-scale-transparent))',
          dark: 'linear-gradient(#01040966, var(--base-color-scale-transparent))',
        },
        fgColor: {
          value: 'var(--base-color-scale-gray-0)',
          dark: 'var(--base-color-scale-gray-0)',
        },
      },
      controls: {
        bgColor: {
          value: 'linear-gradient(var(--base-color-scale-transparent), #01040966)',
          dark: 'linear-gradient(var(--base-color-scale-transparent), #01040966)',
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
            value: 'var(--base-color-scale-black)',
            dark: 'var(--base-color-scale-black)',
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
            value: 'var(--base-color-scale-blue-5)',
            dark: 'var(--base-color-scale-blue-5)',
          },
        },
      },
    },
  },
}
