const {describe, it, expect} = require('@jest/globals')
const colors = require('./colors').ToggleSwitch
const light = require('../../../base/colors/light').base.color.scale
const dark = require('../../../base/colors/dark').base.color.scale

function resolveColor(token, mode) {
  const reference = mode === 'dark' ? token.dark : token.value
  const [, scale, step] = reference.match(/^var\(--base-color-scale-(\w+)-(\d+)\)$/)
  return (mode === 'dark' ? dark : light)[scale][step].value
}

function luminance(hex) {
  const channels = hex
    .slice(1)
    .match(/../g)
    .map(channel => {
      const value = parseInt(channel, 16) / 255
      return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
    })
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722
}

function contrast(foreground, background) {
  const first = luminance(foreground)
  const second = luminance(background)
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05)
}

describe.each(['light', 'dark'])('ToggleSwitch %s non-text contrast', mode => {
  const track = resolveColor(colors.track.bgColor, mode)
  const canvas = mode === 'dark' ? dark.black[0].value : light.white[0].value

  it('distinguishes the track border from the track and default canvas at 3:1', () => {
    const border = resolveColor(colors.track.borderColor, mode)
    expect(contrast(border, track)).toBeGreaterThanOrEqual(3)
    expect(contrast(border, canvas)).toBeGreaterThanOrEqual(3)
  })

  it('distinguishes the state symbols from the track at 3:1', () => {
    expect(contrast(resolveColor(colors.icon.fgColor, mode), track)).toBeGreaterThanOrEqual(3)
  })

  it.each([
    ['on', 'rest'],
    ['on', 'hover'],
    ['off', 'rest'],
    ['off', 'hover'],
  ])('distinguishes the %s thumb at %s from the track at 3:1', (state, interaction) => {
    expect(contrast(resolveColor(colors.thumb[state].bgColor[interaction], mode), track)).toBeGreaterThanOrEqual(3)
  })
})
