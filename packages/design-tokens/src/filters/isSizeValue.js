/**
 * @description Check whether a token value can be used as a CSS size.
 *
 * @param {string} value the token's resolved value
 * @returns {boolean} `true` when the value is size-shaped
 */
const SIZE_FUNCTION_PREFIXES = ['max(', 'min(', 'clamp(', 'calc(']
const LENGTH_VALUE = /^-?(\d+\.?\d*|\.\d+)(px|rem|em|vh|vw|vmin|vmax|ch)$/

// TODO: Use isDimension from @primer/primitives once all size tokens include $type metadata.
const isSizeValue = value => {
  if (typeof value !== 'string') return false

  const normalized = value.trim().toLowerCase()

  if (normalized === '') return false

  if (normalized.startsWith('(')) return false
  if (normalized.startsWith('inset')) return false
  if (normalized.includes('cubic-bezier')) return false
  if (/^-?(\d+\.?\d*|\.\d+)(ms|s)$/.test(normalized)) return false

  if (normalized.startsWith('var(')) return false

  if (SIZE_FUNCTION_PREFIXES.some(prefix => normalized.startsWith(prefix))) return true

  return LENGTH_VALUE.test(normalized)
}

module.exports = isSizeValue
