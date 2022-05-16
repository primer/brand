const {transparentize} = require("color2k")
const scales = require("../../base/colors/color-scales")

module.exports = {
  brand: {
    color: {
      fg: {
        default: {
          value: "var(--base-color-scale-gray-9)",
          darkValue: "var(--base-color-scale-white-0)"
        },
        muted: {
          value: "var(--base-color-scale-gray-6)",
          darkValue: "var(--base-color-scale-gray-3)"
        },
        subtle: {
          value: "var(--base-color-scale-gray-5)",
          darkValue: "var(--base-color-scale-gray-4)"
        },
        onEmphasis: {
          value: "var(--base-color-scale-white-0)",
          darkValue: "var(--base-color-scale-black-0)"
        }
      },
      neutral: {
        emphasisPlus: {
          value: "var(--base-color-scale-gray-9)",
          darkValue: "var(--base-color-scale-gray-4)"
        },
        emphasis: {
          value: "var(--base-color-scale-gray-5)",
          darkValue: "var(--base-color-scale-gray-4)"
        },
        muted: {
          value: transparentize(scales.base.color.scale.gray[3].value, 0.2),
          darkValue: transparentize(scales.base.color.scale.gray[4].value, 0.4)
        },
        subtle: {
          value: transparentize(scales.base.color.scale.gray[1].value, 0.5),
          darkValue: transparentize(scales.base.color.scale.gray[4].value, 0.1)
        }
      },
      canvas: {
        default: {
          value: "var(--base-color-scale-white-0)",
          darkValue: "var(--base-color-scale-gray-9)"
        },
        overlay: {
          value: "var(--base-color-scale-white-0)",
          darkValue: "var(--base-color-scale-gray-8)"
        },
        inset: {
          value: "var(--base-color-scale-gray-0)",
          darkValue: "var(--base-color-scale-black-0)"
        },
        subtle: {
          value: "var(--base-color-scale-gray-0)",
          darkValue: "var(--base-color-scale-gray-8)"
        }
      },
      border: {
        default: {
          value: "var(--base-color-scale-gray-2)",
          darkValue: "var(--base-color-scale-gray-6)"
        },
        muted: {
          value: transparentize(scales.base.color.scale.gray[2].value, 0.03),
          darkValue: "var(--base-color-scale-gray-7)"
        },
        subtle: {
          value: transparentize(scales.base.color.scale.black[0].value, 0.15),
          darkValue: transparentize(scales.base.color.scale.gray[0].value, 0.1)
        }
      }
    }
  }
}
