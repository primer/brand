/**
 * @description Emits a sorted JSON map keyed by CSS custom-property names, with a trailing
 *   newline. Values are transformed by default; preserveReferences keeps original values
 *   and converts token references to var(...). Token selection belongs in the build's file filter.
 *
 *   Flat (default):
 *   {"--brand-color-text-default": "var(--base-color-scale-black-0)"}
 *
 *   Light/dark (colorModes):
 *   {"--brand-color-text-default": {"light": "#000000", "dark": "#ffffff"}}
 *
 *   Responsive (responsiveModes):
 *   {"--brand-text-size-1000": {"narrow": "40px", "medium": "56px", "large": "64px"}}
 *
 * @type format — StyleDictionary.Format
 */
module.exports = {
  name: 'json/one-dimensional',
  formatter({dictionary, options = {}}) {
    const {colorModes, preserveReferences, responsiveModes} = options
    const modes = responsiveModes ? Object.keys(responsiveModes) : ['light', 'dark']
    const namesByPath = new Map(dictionary.allTokens.map(token => [token.path?.join('.'), `--${token.name}`]))
    const entries = {}

    for (const token of dictionary.allTokens) {
      const source = preserveReferences ? token.original : token
      const overrides = responsiveModes
        ? Object.entries(source.responsive ?? {}).sort(([a], [b]) => parseFloat(a) - parseFloat(b))
        : []
      const formatValue = mode => {
        const baseValue = source.value ?? source.$value
        let value = mode === 'dark' ? source.dark ?? baseValue : baseValue
        for (const [breakpoint, override] of overrides) {
          if (!/^\d+px$/.test(breakpoint)) throw new Error(`Unsupported responsive breakpoint: ${breakpoint}`)
          if (parseFloat(breakpoint) <= responsiveModes[mode]) {
            value = override.value ?? override.$value
          }
        }
        if (!preserveReferences || typeof value !== 'string') return value
        return value.replace(/\{([^}]+)\}/g, (_, reference) => {
          if (!namesByPath.has(reference)) throw new Error(`Missing exported reference: ${reference}`)
          return `var(${namesByPath.get(reference)})`
        })
      }

      entries[`--${token.name}`] =
        colorModes || responsiveModes
          ? Object.fromEntries(modes.map(mode => [mode, formatValue(mode)]))
          : formatValue('light')
    }

    const sorted = Object.fromEntries(
      Object.keys(entries)
        .sort()
        .map(key => [key, entries[key]]),
    )

    return `${JSON.stringify(sorted, null, 2)}\n`
  },
}
