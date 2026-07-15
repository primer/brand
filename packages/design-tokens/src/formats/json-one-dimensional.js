/**
 * @description Emits a one-dimensional JSON map of design tokens. Each entry is keyed by its CSS
 *   custom-property name (including the leading `--`) and maps directly to the token's literal
 *   value, with references left intact. Keys are sorted alphabetically and the output is
 *   terminated by a trailing newline.
 *
 *   The format carries no domain-specific logic, so it can back any one-dimensional export (e.g.
 *   colors, typography, spacing). Restrict the set of tokens it receives via the platform file
 *   `filter` rather than filtering here.
 *
 *   Output shape:
 *   {
 *     "--base-color-scale-black-0": "#000000",
 *     "--brand-color-text-default": "var(--base-color-scale-black-0)"
 *   }
 *
 * @type format — StyleDictionary.Format
 */
module.exports = {
  name: 'json/one-dimensional',
  formatter({dictionary}) {
    const entries = {}

    for (const token of dictionary.allTokens) {
      entries[`--${token.name}`] = token.value
    }

    const sorted = Object.fromEntries(
      Object.keys(entries)
        .sort()
        .map(key => [key, entries[key]]),
    )

    return `${JSON.stringify(sorted, null, 2)}\n`
  },
}
