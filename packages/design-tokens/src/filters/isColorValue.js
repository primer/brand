/**
 * @description Predicate that decides whether a token's value is a CSS color, used to restrict a
 *   one-dimensional export to color tokens. Brand color sources still use the legacy `value`/`dark`
 *   shape without `$type`, and some `colors.*` files also hold non-color values (gradients,
 *   shadows, filters, `none`). Rather than trusting file paths, this inspects the emitted value:
 *   a value is treated as a color when it starts with a recognised color-function prefix or is one
 *   of the keyword colors. This excludes gradients (`linear-gradient(...)`), shadows
 *   (`0px ...`, `0 4px ...`), filters (`brightness(...)`) and `none`, while keeping hex / rgb /
 *   rgba / hsl / hsla / color-mix / var references and the `transparent` / `currentColor` keywords.
 *
 * @param {string} value the token's resolved value
 * @returns {boolean} `true` when the value is color-shaped
 */
const COLOR_PREFIXES = ['#', 'rgb(', 'rgba(', 'hsl(', 'hsla(', 'color-mix(', 'var(']
const COLOR_KEYWORDS = ['transparent', 'currentcolor']

const isColorValue = value => {
  if (typeof value !== 'string') return false

  const normalized = value.trim().toLowerCase()

  if (COLOR_KEYWORDS.includes(normalized)) return true

  return COLOR_PREFIXES.some(prefix => normalized.startsWith(prefix))
}

module.exports = isColorValue
