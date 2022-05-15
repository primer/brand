/* eslint-disable prettier/prettier */
const {transparentize} = require("color2k")
const scales = require("../../../base/colors/color-scales")

module.exports = {
  brand: {
    Button: {
      background: {
        default: {
          value: `var(--base-color-scale-black-0)`,
          darkValue: `var(--base-color-scale-white-0)`
        },
        hover: {}
      }
    }
  }
}
