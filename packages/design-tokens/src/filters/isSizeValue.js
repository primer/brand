/**
 * @description Predicate that decides whether a token's value is a CSS size/length, used to
 *   restrict a one-dimensional export to spacing/size tokens. Brand size sources mix value kinds:
 *   the size files hold a couple of animation tokens (`--brand-control-animation-easing`,
 *   `--brand-control-animation-duration`), the border file holds `inset ...` shadow composites,
 *   and the viewport file holds media-query ranges (`(max-width: ...)`). Rather than trusting file
 *   paths, this inspects the emitted value: a value is treated as a size when it is a bare length
 *   (`px` / `rem` / `em` / viewport / `ch` units), a math function (`max()` / `min()` / `clamp()`
 *   / `calc()`), or a `var(...)` reference to another size token. It excludes time values
 *   (`80ms`, `0.6s`), easing (`cubic-bezier(...)`), `inset ...` composites, media-query ranges,
 *   `none`, and `var(...)` references into the animation / motion domain.
 *
 * @param {string} value the token's resolved value
 * @returns {boolean} `true` when the value is size-shaped
 */
const SIZE_FUNCTION_PREFIXES = ['max(', 'min(', 'clamp(', 'calc(']
const LENGTH_VALUE = /^-?(\d+\.?\d*|\.\d+)(px|rem|em|vh|vw|vmin|vmax|ch)$/
const NON_SIZE_VAR = /(animation|easing|duration|transition|motion|cubic)/

const isSizeValue = value => {
  if (typeof value !== 'string') return false

  const normalized = value.trim().toLowerCase()

  if (normalized === '') return false

  if (normalized.startsWith('(')) return false
  if (normalized.startsWith('inset')) return false
  if (normalized.includes('cubic-bezier')) return false
  if (/^-?(\d+\.?\d*|\.\d+)(ms|s)$/.test(normalized)) return false

  if (normalized.startsWith('var(')) return !NON_SIZE_VAR.test(normalized)

  if (SIZE_FUNCTION_PREFIXES.some(prefix => normalized.startsWith(prefix))) return true

  return LENGTH_VALUE.test(normalized)
}

module.exports = isSizeValue
