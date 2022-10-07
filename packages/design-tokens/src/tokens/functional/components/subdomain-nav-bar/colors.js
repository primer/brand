module.exports = {
  brand: {
    SubdomainNavBar: {
      canvas: {
        default: {
          value: "hsl(var(--base-color-scale-white-0-hsl) / 50%)",
          dark: "hsl(var(--base-color-scale-gray-9-hsl) / 50%)"
        },
        search: {
          value: "var(--base-color-scale-white-0)",
          dark: "var(--base-color-scale-black-0)"
        },
        overflow: {
          default: {
            value: "var(--base-color-scale-white-0)",
            dark: "var(--base-color-scale-white-0)"
          },
          hover: {
            value: "var(--base-color-scale-gray-0)",
            dark: "var(--base-color-scale-gray-0)"
          }
        }
      },
      fg: {
        overflow: {
          default: {
            value: "var(--brand-color-fg-default)",
            dark: "var(--brand-color-text-onEmphasis)"
          }
        }
      },
      border: {
        nav: {
          default: {
            value: "var(--base-color-scale-gray-9)",
            dark: "var(--base-color-scale-gray-3)"
          },
          pressed: {
            value: "var(--base-color-scale-black-0)",
            dark: "var(--base-color-scale-white-0)"
          }
        },
        button: {
          hover: {
            value: "var(--base-color-scale-black-0)",
            dark: "var(--base-color-scale-white-0)"
          }
        }
      }
    }
  }
}
