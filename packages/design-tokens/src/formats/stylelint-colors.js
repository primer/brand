/**
 * @description Emits a one-dimensional JSON allowlist of brand color custom properties for
 *   stylelint consumers. Each entry is keyed by its CSS custom-property name (including the
 *   leading `--`) and carries a `$type: "color"` annotation derived from the token's source
 *   file path. This lets linters build an authoritative color-token allowlist by type instead
 *   of relying on brittle name/path heuristics.
 *
 *   `$type` is injected here at build time (rather than annotated in source) because brand
 *   source tokens use the legacy `value`/`dark` shape without `$type`. Color tokens are cleanly
 *   delimited by file path, so the path is a reliable signal.
 *
 * @type format — StyleDictionary.Format
 */
const isColorTokenFilePath = filePath => {
  const fp = (filePath || '').replace(/\\/g, '/')
  return (
    /\/base\/colors\//.test(fp) ||
    /\/functional\/colors\//.test(fp) ||
    /\/functional\/components\/[^/]+\/colors\.(js|json)$/.test(fp)
  )
}

module.exports = {
  name: 'json/stylelint-colors',
  formatter({dictionary}) {
    const entries = {}

    for (const token of dictionary.allTokens) {
      if (!isColorTokenFilePath(token.filePath)) continue

      const name = `--${token.name}`
      entries[name] = {
        name,
        value: token.value,
        $type: 'color',
        filePath: token.filePath,
      }
    }

    const sorted = Object.fromEntries(
      Object.keys(entries)
        .sort()
        .map(key => [key, entries[key]]),
    )

    return `${JSON.stringify(sorted, null, 2)}\n`
  },
}
