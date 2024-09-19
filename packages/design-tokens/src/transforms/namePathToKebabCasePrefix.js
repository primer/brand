/**
 * @description converts the [TransformedToken's](https://github.com/amzn/style-dictionary/blob/main/types/TransformedToken.d.ts) `.path` array to a kebab-case string, preserves casing of parts
 * @type name transformer — [StyleDictionary.NameTransform](https://github.com/amzn/style-dictionary/blob/main/types/Transform.d.ts)
 * @matcher omitted to match all tokens
 * @transformer returns `string` kebab-case
 */
module.exports = {
  name: 'name/pathToKebabCasePrefix',
  type: `name`,
  transformer: (token, platform = {}) => {
    const {prefix} = platform
    const addPrefix = platform.addPrefix ?? (() => true)

    const getPrefix = (token, addPrefix) => addPrefix(token) && prefix

    return (
      [getPrefix(token, addPrefix), ...token.path]
        // remove undefined if exists
        .filter(part => typeof part === 'string' && part !== '@')
        .join('-')
    )
  },
}
